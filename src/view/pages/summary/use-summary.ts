import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useMemo } from "react";
import { buildSummary } from "./utils/build-summary";

export function useSummary() {
  const { pelada } = usePeladaStore();
  return useMemo(() => {
    if (!pelada) return null;

    return buildSummary(pelada);
  }, [pelada]);
}
