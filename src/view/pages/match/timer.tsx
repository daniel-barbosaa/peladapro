import { cn } from "@/app/utils/class-name-merger";
import type { Match } from "@/store/pelada/types";
import { motion } from "motion/react";

interface TimerProps {
  timeProgress: number;
  minutesRemaining: number;
  secondsRemaining: number;
  matchDurationInMinutes: number;
  match: Match;
  isOvertime: boolean;
}

export function Timer({
  timeProgress,
  minutesRemaining,
  secondsRemaining,
  matchDurationInMinutes,
  match,
  isOvertime,
}: TimerProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="mb-8"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border-2 p-8 text-center",
          isOvertime
            ? "border-amber-500/30 bg-linear-to-br from-amber-950/30 to-zinc-950"
            : "border-zinc-800 bg-linear-to-br from-zinc-900 to-zinc-950",
        )}
      >
        <div className="absolute right-0 bottom-0 left-0 h-1 bg-zinc-800">
          <motion.div
            className={cn(
              "h-full",
              isOvertime ? "bg-amber-500" : "bg-emerald-500",
            )}
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

        <div
          className={cn(
            "text-sm",
            isOvertime ? "text-amber-400" : "text-zinc-600",
          )}
        >
          {isOvertime
            ? "Partida empatada • Tempo extra em andamento"
            : `Limite: ${matchDurationInMinutes} minutos ou ${match.goalLimit} gols`}
        </div>
      </div>
    </motion.div>
  );
}
