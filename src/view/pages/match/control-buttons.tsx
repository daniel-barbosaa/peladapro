import type { Match } from "@/store/pelada/types";
import { Pause, Play, StopCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ControlButtonProps {
  setIsPaused(value: boolean): void;
  match: Match;
  isPaused: boolean;
  endMatch(): void;
}

export function ControlButtons({
  setIsPaused,
  match,
  isPaused,
  endMatch,
}: ControlButtonProps) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => setIsPaused(!isPaused)}
        disabled={!match.isActive}
        className="flex items-center justify-center gap-2 rounded-xl bg-zinc-800 py-4 font-semibold text-white transition-all hover:bg-zinc-700 active:scale-95 disabled:bg-zinc-900 disabled:text-zinc-700"
      >
        {isPaused ? <Play className="size-5" /> : <Pause className="size-5" />}
        {isPaused ? "Retomar" : "Pausar"}
      </button>

      <button
        onClick={() => {
          if (confirm("Deseja encerrar a partida agora?")) {
            endMatch();
            navigate("/match/result");
          }
        }}
        className="flex items-center justify-center gap-2 rounded-xl border border-red-700/30 bg-red-900/30 py-4 font-semibold text-red-400 transition-all hover:bg-red-900/50 active:scale-95"
      >
        <StopCircle className="size-5" />
        Encerrar
      </button>
    </div>
  );
}
