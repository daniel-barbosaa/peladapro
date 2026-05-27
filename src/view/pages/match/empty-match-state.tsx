import { BottomNav } from "@/view/components/button-nav";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EmptyMatchState() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 pb-24">
      <div className="px-6 text-center">
        <Trophy className="mx-auto mb-4 h-16 w-16 text-zinc-700" />
        <h2 className="mb-2 text-2xl font-bold text-white">
          Nenhuma partida ativa
        </h2>
        <p className="mb-6 text-zinc-500">
          Inicie uma nova partida para começar
        </p>
        <button
          onClick={() => navigate("/draw")}
          className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
        >
          Sortear Times
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
