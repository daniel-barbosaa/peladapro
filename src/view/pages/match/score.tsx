import type { Match, Pelada, Team } from "@/store/pelada/types";
import { motion } from "motion/react";

interface ScoreProps {
  match: Match;
  pelada: Pelada;
  isPaused: boolean;
  addGoal(teamId: string): void;
  removeGoal(teamId: string): void;
}

interface TeamScoreCardProps {
  team: Team;
  direction: "left" | "right";
  isPaused: boolean;
  isActive: boolean;
  maxConsecutiveWins: number;
  addGoal(teamId: string): void;
  removeGoal(teamId: string): void;
}

function TeamScoreCard({
  team,
  direction,
  isPaused,
  isActive,
  maxConsecutiveWins,
  addGoal,
  removeGoal,
}: TeamScoreCardProps) {
  const hasConsecutiveWins = team.consecutiveWins > 0;

  const reachedRestLimit = team.consecutiveWins >= maxConsecutiveWins;

  return (
    <motion.div
      initial={{
        x: direction === "left" ? -50 : 50,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="text-center"
    >
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-2 text-sm font-semibold text-zinc-400">
          {team.name}
        </div>

        <div className="mb-4 text-6xl font-bold text-white tabular-nums">
          {team.score}
        </div>

        <div className="space-y-2">
          <button
            onClick={() => addGoal(team.id)}
            disabled={!isActive || isPaused}
            className="w-full rounded-xl bg-emerald-500 py-4 text-lg font-bold text-white transition-all hover:bg-emerald-600 active:scale-95 disabled:bg-zinc-800 disabled:text-zinc-600"
          >
            + GOL
          </button>

          <button
            onClick={() => removeGoal(team.id)}
            disabled={!isActive || isPaused || team.score === 0}
            className="w-full rounded-lg bg-zinc-800 py-2 text-sm font-semibold text-zinc-300 transition-all hover:bg-zinc-700 active:scale-95 disabled:bg-zinc-900 disabled:text-zinc-700"
          >
            ANULAR
          </button>
        </div>
      </div>

      {hasConsecutiveWins && (
        <div className="mt-2 text-center">
          {!reachedRestLimit && (
            <span className="text-xs font-bold text-amber-400">
              🔥 {team.consecutiveWins} vitória
              {team.consecutiveWins > 1 ? "s" : ""} seguida
              {team.consecutiveWins > 1 ? "s" : ""}
            </span>
          )}

          {reachedRestLimit && (
            <span className="text-xs font-bold text-yellow-400">
              👑 {team.consecutiveWins} vitórias — sai para descanso se vencer
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function Score({
  match,
  pelada,
  isPaused,
  addGoal,
  removeGoal,
}: ScoreProps) {
  return (
    <div className="mb-6 grid grid-cols-3 items-center gap-4">
      <TeamScoreCard
        team={match.teamA}
        direction="left"
        isPaused={isPaused}
        isActive={match.isActive}
        maxConsecutiveWins={pelada.maxConsecutiveWins}
        addGoal={addGoal}
        removeGoal={removeGoal}
      />

      <div className="text-center">
        <div className="text-3xl font-bold text-zinc-700">VS</div>
      </div>

      <TeamScoreCard
        team={match.teamB}
        direction="right"
        isPaused={isPaused}
        isActive={match.isActive}
        maxConsecutiveWins={pelada.maxConsecutiveWins}
        addGoal={addGoal}
        removeGoal={removeGoal}
      />
    </div>
  );
}
