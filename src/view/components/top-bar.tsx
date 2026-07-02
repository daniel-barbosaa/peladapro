import { cn } from "@/app/utils/class-name-merger";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

interface TopBarProps {
  title: string;
  collapsed: boolean;
}

export function TopBar({ title, collapsed }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur">
      <div className="flex items-center gap-3 py-4">
        <Button
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="size-10 rounded-full border border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900 active:scale-95"
        >
          <ArrowLeft className="size-5" />
        </Button>

        <h1
          className={cn(
            "font-medium text-white transition-all duration-300",
            collapsed ? "text-lg" : "scale-95 text-xl opacity-0",
          )}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
