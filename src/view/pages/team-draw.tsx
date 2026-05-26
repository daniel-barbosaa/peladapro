import { usePeladaStore } from "@/store/pelada/pelada.store";
import { Clock, Play, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

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

  const playingTeams = pelada.queue.slice(0, 2);
  const waitingTeams = pelada.queue.slice(2);

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

        {(playingTeams[0]?.justReturned || playingTeams[1]?.justReturned) && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 rounded-xl border border-amber-600/50 bg-linear-to-r from-amber-900/40 to-yellow-900/40 p-5"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">👑</div>
              <div>
                <div className="font-bold text-amber-300">
                  {playingTeams[0]?.justReturned
                    ? playingTeams[0].name
                    : playingTeams[1]?.name}{" "}
                  voltou após descanso!
                </div>
                <div className="mt-1 text-sm text-amber-400/70">
                  Time retorna à rotação após cumprir descanso obrigatório
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {playingTeams.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wider text-emerald-400 uppercase">
              <Trophy className="size-4" />
              Primeira Partida
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {playingTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border-2 border-emerald-600/50 bg-linear-to-br from-emerald-900/30 to-emerald-950/30 p-5"
                >
                  <div className="mb-3 text-lg font-bold text-emerald-400">
                    {team.name}
                  </div>
                  <div className="space-y-2">
                    {team.players.map((player, idx) => (
                      <div
                        key={player.id}
                        className="flex items-center gap-2 rounded-lg bg-emerald-950/30 px-3 py-2"
                      >
                        <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/30 text-xs font-bold text-emerald-300">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {player.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {waitingTeams.length > 0 && (
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
                    {team.players.map((player, idx) => (
                      <div
                        key={player.id}
                        className="flex items-center gap-2 text-sm text-zinc-400"
                      >
                        <span className="font-bold text-zinc-700">
                          {idx + 1}
                        </span>
                        {player.name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="fixed right-0 bottom-6 left-0 px-6 pb-15">
          <div className="mx-auto max-w-2xl">
            {pelada.queue.length >= 2 && (
              <button
                onClick={handleStartMatch}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-5 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95"
              >
                <Play className="size-5" />
                Iniciar Primeira Partida
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
