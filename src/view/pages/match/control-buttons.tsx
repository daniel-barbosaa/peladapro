import type { Match } from "@/store/pelada/types";
import { Button } from "@/view/components/button";
import { Pause, Play, StopCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ControlButtonProps {
  setIsPaused(): void;
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
    <div className="fixed right-0 bottom-6 left-0 z-50 px-6">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/95 p-3 shadow-2xl backdrop-blur">
        <Button
          onClick={setIsPaused}
          disabled={!match.isActive}
          className="bg-zinc-800 py-4 hover:bg-zinc-700 active:scale-95 disabled:bg-zinc-900 disabled:text-zinc-700"
        >
          {isPaused ? (
            <Play className="size-5" />
          ) : (
            <Pause className="size-5" />
          )}
          {isPaused ? "Retomar" : "Pausar"}
        </Button>

        <Button
          onClick={() => {
            if (confirm("Deseja encerrar a partida agora?")) {
              endMatch();
              navigate("/match/result");
            }
          }}
          className="border border-red-700/30 bg-red-900/30 py-4 font-semibold text-red-400 hover:bg-red-900/50 active:scale-95"
        >
          <StopCircle className="size-5" />
          Encerrar
        </Button>
      </div>
    </div>
  );
}
