import type { Pelada } from "@/store/pelada/types";
import { Clock } from "lucide-react";
import { motion } from "motion/react";

interface WaitingTeamsSectionProps {
  pelada: Pelada;
}

export function WaitingTeamsSection({ pelada }: WaitingTeamsSectionProps) {
  const waitingTeams = pelada.queue.slice(2);

  if (waitingTeams.length < 0) {
    return null;
  }
  return (
    <div className="mb-24">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wider text-zinc-400 uppercase">
        <Clock className="size-4" />
        Aguardando na Fila
      </h2>
      <div className="space-y-3">
        {waitingTeams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-zinc-800">
                <span className="text-sm font-semibold text-zinc-500">
                  {index + 1}º
                </span>
              </div>
              <span className="font-bold text-white">{team.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {team.players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center gap-2 text-sm text-zinc-400"
                >
                  <span className="font-bold text-zinc-700">{index + 1}</span>
                  {player.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
