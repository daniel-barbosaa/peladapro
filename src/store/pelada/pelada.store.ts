import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CreatePeladaDTO,
  Match,
  Pelada,
  Player,
  PlayerStatus,
  Team,
} from "./types";

type Store = {
  pelada: Pelada | null;
  resetPelada: () => void;
  startMatch(): void;
  createPelada(data: CreatePeladaDTO): void;
  addPlayer(name: string): void;
  removePlayer(playerId: string): void;
  drawTeams(): void;
  addGoal(teamId: string): void;
  removeGoal(teamId: string): void;
  endMatch: () => void;
};

export const usePeladaStore = create<Store>()(
  persist(
    (set, get) => ({
      pelada: null,
      resetPelada: () => {
        set({ pelada: null });
      },
      startMatch: () => {
        const { pelada } = get();

        if (!pelada || pelada.queue.length < 2) return;

        const teamA = pelada.queue[0];
        const teamB = pelada.queue[1];

        const match: Match = {
          id: Date.now().toString(),
          teamA: { ...teamA, score: 0 },
          teamB: { ...teamB, score: 0 },
          startTime: Date.now(),
          duration: pelada.matchDuration * 60,
          goalLimit: pelada.goalLimit,
          isActive: true,
        };

        set({
          pelada: {
            ...pelada,
            currentMatch: match,
          },
        });
      },
      createPelada: ({
        name,
        matchDuration,
        goalLimit,
        maxConsecutiveWins,
      }: CreatePeladaDTO) => {
        const newPelada: Pelada = {
          id: uuid(),
          name,
          matchDuration,
          goalLimit,
          maxConsecutiveWins,
          createdAt: Date.now(),
          players: [],
          sessionPlayers: [],
          matches: [],
          queue: [],
        };
        set({ pelada: newPelada });
      },
      addPlayer: (name: string) => {
        const { pelada } = get();
        if (!pelada) return;

        const newPlayer: Player = {
          id: uuid(),
          name,
          status: pelada.sessionStarted ? "pending" : "available",
        };

        set({
          pelada: {
            ...pelada,
            players: [...pelada.players, newPlayer],
          },
        });
      },
      removePlayer: (playerId: string) => {
        const { pelada } = get();
        if (!pelada) return;

        set({
          pelada: {
            ...pelada,
            players: pelada.players.filter((p) => p.id !== playerId),
          },
        });
      },
      drawTeams: () => {
        const pelada = get().pelada;

        if (!pelada) return;

        // embaralhar jogadores
        const shuffled = [...pelada.players].sort(() => Math.random() - 0.5);

        // criar 4 times fixos
        const teams: Team[] = [];

        const teamNames = ["Time A", "Time B", "Time C", "Time D"];

        for (let i = 0; i < 4; i++) {
          const teamPlayers = shuffled.slice(i * 5, i * 5 + 5);

          if (teamPlayers.length === 5) {
            teams.push({
              id: `team-${String.fromCharCode(65 + i)}-${Date.now()}`,

              name: teamNames[i],

              players: teamPlayers.map((player) => ({
                ...player,
                status: "waiting" as PlayerStatus,
              })),

              score: 0,
              consecutiveWins: 0,
            });
          }
        }

        // primeiros dois times começam jogando
        if (teams.length >= 2) {
          teams[0].players.forEach((player) => {
            player.status = "playing";
          });

          teams[1].players.forEach((player) => {
            player.status = "playing";
          });
        }

        set({
          pelada: {
            ...pelada,
            queue: teams,
          },
        });
      },
      addGoal: (teamId: string) => {
        set((state) => {
          const pelada = state.pelada;

          if (!pelada || !pelada.currentMatch) {
            return state;
          }

          const match = pelada.currentMatch;

          const updatedMatch = { ...match };

          if (match.teamA.id === teamId) {
            updatedMatch.teamA = {
              ...match.teamA,
              score: match.teamA.score + 1,
            };
          } else if (match.teamB.id === teamId) {
            updatedMatch.teamB = {
              ...match.teamB,
              score: match.teamB.score + 1,
            };
          }

          return {
            pelada: {
              ...pelada,
              currentMatch: updatedMatch,
            },
          };
        });
      },
      removeGoal: (teamId: string) => {
        set((state) => {
          const pelada = state.pelada;

          if (!pelada || !pelada.currentMatch) {
            return state;
          }

          const match = pelada.currentMatch;

          const updatedMatch = { ...match };

          if (match.teamA.id === teamId && match.teamA.score > 0) {
            updatedMatch.teamA = {
              ...match.teamA,
              score: match.teamA.score - 1,
            };
          } else if (match.teamB.id === teamId && match.teamB.score > 0) {
            updatedMatch.teamB = {
              ...match.teamB,
              score: match.teamB.score - 1,
            };
          }

          return {
            pelada: {
              ...pelada,
              currentMatch: updatedMatch,
            },
          };
        });
      },
      endMatch: () => {
        set((state) => {
          const pelada = state.pelada;

          if (!pelada || !pelada.currentMatch) {
            return state;
          }

          const match = { ...pelada.currentMatch };

          match.isActive = false;
          match.endTime = Date.now();

          match.actualDuration = Math.floor(
            (match.endTime - match.startTime) / 1000,
          );

          if (match.teamA.score > match.teamB.score) {
            match.winnerId = match.teamA.id;
          } else if (match.teamB.score > match.teamA.score) {
            match.winnerId = match.teamB.id;
          }

          if (
            match.teamA.score >= pelada.goalLimit ||
            match.teamB.score >= pelada.goalLimit
          ) {
            match.endReason = "goal_limit";
          } else if (match.actualDuration >= match.duration) {
            match.endReason = "time";
          } else {
            match.endReason = "manual";
          }

          match.teamAConsecutiveWins = match.teamA.consecutiveWins;

          match.teamBConsecutiveWins = match.teamB.consecutiveWins;

          return {
            pelada: {
              ...pelada,
              currentMatch: match,
              matches: [...pelada.matches, match],
            },
          };
        });
      },
    }),
    { name: "pelada-storage" },
  ),
);
