import type { Pelada, Team } from "@/store/pelada/types";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";

interface ResultHeaderProps {
  isDraw: boolean;
  winner: Team | null;
  pelada: Pelada | null;
}

export function ResultHeader({ isDraw, winner, pelada }: ResultHeaderProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <div className="mb-4 inline-flex size-24 items-center justify-center rounded-full bg-emerald-500/20">
        <Trophy className="size-12 text-emerald-400" />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-white">
        {isDraw ? "Empate!" : "Partida Finalizada!"}
      </h1>
      <p className="text-zinc-500">
        {isDraw
          ? "Ambos os times foram para o final da fila"
          : winner && winner.consecutiveWins + 1 >= pelada!.maxConsecutiveWins
            ? "Time fica fora da próxima partida e retorna depois"
            : "Vencedor continua, perdedor vai para a fila"}
      </p>
    </motion.div>
  );
}
