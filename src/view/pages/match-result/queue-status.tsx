import type { Pelada, Team } from "@/store/pelada/types";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface QueueStatusProps {
  pelada: Pelada | null;
  nextMatch: {
    team1: Team | null;
    team2: Team | null;
  };
  winner: Team | null;
}

interface NextMatchCardProps {
  nextMatch: {
    team1: Team | null;
    team2: Team | null;
  };
  restingWinner: Team | null;
}
interface TeamPreviewProps {
  team: Team;
  align?: "left" | "right";
}
interface QueueInfoProps {
  restingTeam: Team | null;
  waitingTeams: Team[];
}

function NextMatchCard({ nextMatch, restingWinner }: NextMatchCardProps) {
  if (!nextMatch.team1 || !nextMatch.team2) {
    return (
      <div className="text-center text-sm text-zinc-500">
        Aguardando times disponíveis
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 items-center gap-4">
        <TeamPreview team={nextMatch.team1} />

        <div className="text-center">
          <div className="text-xl font-bold text-blue-600">VS</div>
        </div>

        <TeamPreview team={nextMatch.team2} align="right" />
      </div>

      {restingWinner && (
        <div className="mt-4 text-center text-xs text-amber-400/80">
          ⏳ {restingWinner.name} descansa enquanto essa partida acontece
        </div>
      )}
    </>
  );
}

function TeamPreview({ team, align = "left" }: TeamPreviewProps) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <div className="mb-1 text-xs text-blue-400 uppercase">
        {align === "right" ? "Time 2" : "Time 1"}
      </div>

      <div className="text-lg font-bold text-white">{team.name}</div>

      {team.justReturned && (
        <div className="mt-1 text-xs text-amber-400">🔄 Retornou</div>
      )}
    </div>
  );
}

function QueueInfo({ restingTeam, waitingTeams }: QueueInfoProps) {
  if (!restingTeam && waitingTeams.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-3 text-xs font-semibold text-zinc-500 uppercase">
        Estado da Fila
      </div>

      <div className="space-y-2">
        {restingTeam && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-700/30 bg-amber-900/20 p-2 text-sm">
            <span>👑</span>

            <span className="font-semibold text-amber-400">
              Fila de Descanso:
            </span>

            <span className="font-medium text-white">{restingTeam.name}</span>
          </div>
        )}

        {waitingTeams.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span>⏳</span>

            <span className="text-zinc-400">Fila de Espera:</span>

            <span className="font-medium text-white">
              {waitingTeams.map((team) => team.name).join(", ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function QueueStatus({ pelada, nextMatch, winner }: QueueStatusProps) {
  if (pelada!.queue.length < 2) {
    return null;
  }

  const restingWinner =
    winner && winner.consecutiveWins + 1 >= pelada!.maxConsecutiveWins
      ? winner
      : null;

  const restingTeam =
    restingWinner ?? pelada!.queue.find((team) => team.isResting) ?? null;

  const waitingTeams = pelada!.queue
    .slice(2)
    .filter((team) => !team.isResting && team.id !== winner?.id);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mb-8 space-y-4"
    >
      <div className="rounded-2xl border border-blue-700/30 bg-linear-to-br from-blue-900/20 to-blue-950/20 p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wider text-blue-400 uppercase">
          <ArrowRight className="size-4" />⚽ Próxima Partida
        </div>

        <NextMatchCard nextMatch={nextMatch} restingWinner={restingWinner} />
      </div>

      <QueueInfo restingTeam={restingTeam} waitingTeams={waitingTeams} />
    </motion.div>
  );
}
