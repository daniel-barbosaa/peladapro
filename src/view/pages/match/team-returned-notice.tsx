import type { Match } from "@/store/pelada/types";
import { motion } from "motion/react";
interface TeamReturnedNoticeProps {
  match: Match;
}

export function TeamReturnedNotice({ match }: TeamReturnedNoticeProps) {
  const NoTeamReturned =
    !match?.teamA.justReturned && !match?.teamB.justReturned;

  if (NoTeamReturned) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-4 rounded-xl border border-amber-600/50 bg-linear-to-r from-amber-900/40 to-yellow-900/40 p-4"
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">➡️</div>
        <div>
          <div className="text-sm font-bold text-amber-300">
            {match.teamA.justReturned ? match.teamA.name : match.teamB.name}{" "}
            retornou à quadra!
          </div>
          <div className="text-xs text-amber-400/70">
            Time volta após descanso automático
          </div>
        </div>
      </div>
    </motion.div>
  );
}
