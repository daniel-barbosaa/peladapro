import GoogleIcon from "@/assets/google.svg";
import { Button } from "@/view/components/button";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useSignInController } from "./use-sign-in-controller";

export function SignIn() {
  const { signInWithGoogle } = useSignInController();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-zinc-950 via-zinc-900 to-emerald-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="mb-10 text-center">
          <div className="relative mb-6 inline-block">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl" />

            <Trophy
              className="relative mx-auto size-20 text-emerald-400"
              strokeWidth={1.5}
            />
          </div>

          <h1 className="text-5xl font-bold text-white">
            Pelada<span className="text-emerald-400">Pro</span>
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            Organize suas peladas com rapidez
          </p>
        </div>

        <div className="mb-8 space-y-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm">
            ⚽ Monte times rapidamente
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm">
            📄 Gere resumos automáticos
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm">
            🏆 Salve o histórico das partidas
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 backdrop-blur-sm">
          <Button
            type="button"
            onClick={signInWithGoogle}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-950 text-base font-semibold text-white transition-all hover:border-zinc-600 hover:bg-zinc-900"
          >
            <img
              src={GoogleIcon}
              alt=""
              aria-hidden="true"
              className="size-5 shrink-0"
            />
            Continuar com Google
          </Button>

          <p className="mt-4 text-center text-xs leading-relaxed text-zinc-500">
            Entre em segundos usando sua conta Google.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
