import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { PlayingTeamsSection } from "./playing-teams-section";
import { ReturnedTeamBanner } from "./returned-team-banner";
import { StartMatchButton } from "./start-match-button";
import { WaitingTeamsSection } from "./waiting-teams-section";

export function TeamDraw() {
  const navigate = useNavigate();
  const { pelada, drawTeams, startMatch } = usePeladaStore();

  useEffect(() => {
    if (!pelada) {
      navigate("/home");
      return;
    }
    if (pelada.queue.length === 0) {
      drawTeams();
    }
  }, [pelada, navigate, drawTeams]);

  if (!pelada) {
    return null;
  }

  const handleStartMatch = () => {
    startMatch();
    navigate("/match");
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <div className="mx-auto max-w-2xl p-6">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-white">Times Fixos</h1>
          <p className="text-zinc-500">
            {pelada.queue.length} times formados • Composição permanente
          </p>
          <div className="mt-3 rounded-lg border border-emerald-700/30 bg-emerald-900/20 p-3">
            <p className="text-sm font-medium text-emerald-400">
              ⚡ Times permanecem fixos durante toda a sessão
            </p>
          </div>
        </div>

        <ReturnedTeamBanner pelada={pelada} />

        <PlayingTeamsSection pelada={pelada} />

        <WaitingTeamsSection pelada={pelada} />

        <div className="fixed right-0 bottom-6 left-0 px-6 pb-15">
          <div className="mx-auto max-w-2xl">
            <StartMatchButton pelada={pelada} onStart={handleStartMatch} />
          </div>
        </div>
      </div>
    </div>
  );
}
