import { cn } from "@/app/utils/class-name-merger";
import type { Match, Team } from "@/store/pelada/types";
import { Crown } from "lucide-react";
import { motion } from "motion/react";

interface ScoreDisplayProps {
  match: Match | null;
  winner: Team | null;
}

export function ScoreDisplay({ match, winner }: ScoreDisplayProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
    >
      <div className="grid grid-cols-3 items-center gap-4">
        <div
          className={cn(
            "text-center",
            match?.teamA.id === winner?.id ? "opacity-100" : "opacity-50",
          )}
        >
          <div
            className={cn(
              "mb-2 text-sm font-semibold",
              match?.teamA.id === winner?.id
                ? "text-emerald-400"
                : "text-zinc-500",
            )}
          >
            {match?.teamA.name}
            {match?.teamA.id === winner?.id && (
              <Crown className="ml-1 inline size-4" />
            )}
          </div>
          <div className="text-6xl font-bold text-white tabular-nums">
            {match?.teamA.score}
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-zinc-700">×</div>
        </div>

        <div
          className={cn(
            "text-center",
            match?.teamB.id === winner?.id ? "opacity-100" : "opacity-50",
          )}
        >
          <div
            className={cn(
              "mb-2 text-sm font-semibold",
              match?.teamB.id === winner?.id
                ? "text-emerald-400"
                : "text-zinc-500",
            )}
          >
            {match?.teamB.name}
            {match?.teamB.id === winner?.id && (
              <Crown className="ml-1 inline size-4" />
            )}
          </div>
          <div className="text-6xl font-bold text-white tabular-nums">
            {match?.teamB.score}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
