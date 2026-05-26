import type { Pelada } from "@/store/pelada/types";
import { Play } from "lucide-react";

interface StartMatchButton {
  pelada: Pelada;
  onStart(): void;
}
export function StartMatchButton({ pelada, onStart }: StartMatchButton) {
  const canStartMatch = pelada.queue.length >= 2;
  return (
    <button
      onClick={onStart}
      disabled={!canStartMatch}
      className="flex w-full items-center justify-center gap-2 rounded-xl py-5 font-semibold text-white transition-all active:scale-95 enabled:bg-emerald-500 enabled:shadow-lg enabled:shadow-emerald-500/20 enabled:hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
    >
      <Play className="size-5" />
      Iniciar Primeira Partida
    </button>
  );
}
