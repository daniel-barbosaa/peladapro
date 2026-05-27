import type { Match } from "@/store/pelada/types";
import { motion } from "motion/react";

interface TimerProps {
  timeProgress: number;
  minutesRemaining: number;
  secondsRemaining: number;
  matchDurationInMinutes: number;
  match: Match;
}

export function Timer({
  timeProgress,
  minutesRemaining,
  secondsRemaining,
  matchDurationInMinutes,
  match,
}: TimerProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="mb-8"
    >
      <div className="relative overflow-hidden rounded-3xl border-2 border-zinc-800 bg-linear-to-br from-zinc-900 to-zinc-950 p-8 text-center">
        <div className="absolute right-0 bottom-0 left-0 h-1 bg-zinc-800">
          <motion.div
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${timeProgress}%` }}
          />
        </div>

        <div className="mb-2 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
          Tempo Restante
        </div>
        <div className="mb-2 text-7xl font-bold text-white tabular-nums">
          {String(minutesRemaining).padStart(2, "0")}:
          {String(secondsRemaining).padStart(2, "0")}
        </div>
        <div className="text-sm text-zinc-600">
          Limite: {matchDurationInMinutes} minutos ou {match.goalLimit} gols
        </div>
      </div>
    </motion.div>
  );
}
