import { Button } from "@/view/components/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActionButtoProps {
  isDraw: boolean;
  handleStartNextMatch(): void;
}

export function ActionButton({
  isDraw,
  handleStartNextMatch,
}: ActionButtoProps) {
  const navigate = useNavigate();

  const primaryButtonClass =
    "rounded-xl bg-emerald-600 py-4 hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500";

  if (isDraw) {
    return (
      <Button
        className={primaryButtonClass}
        onClick={() => navigate("/match/organize")}
      >
        Organizar Próxima Rodada
      </Button>
    );
  }
  return (
    <>
      <Button onClick={handleStartNextMatch} className={primaryButtonClass}>
        <Play className="size-5" />
        Iniciar Próxima Partida
      </Button>
      <Button
        className="mt-3 rounded-xl border-zinc-800 bg-transparent py-4 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
        onClick={() => navigate("/match/organize")}
      >
        Organizar fila
      </Button>
    </>
  );
}
