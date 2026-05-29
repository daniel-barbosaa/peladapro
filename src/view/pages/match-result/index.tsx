import { ActionButton } from "./action-button";
import { Info } from "./info";
import { QueueStatus } from "./queue-status";
import { ResultHeader } from "./result-header";
import { ScoreDisplay } from "./score-display";
import { useMatchResult } from "./use-match-result";

export function MatchResult() {
  const result = useMatchResult();
  if (!result) {
    return null;
  }
  const { pelada, match, winner, isDraw, loser, nextMatch, handleNextMatch } =
    result;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6">
      <div className="w-full max-w-2xl">
        <ResultHeader isDraw={isDraw} winner={winner} pelada={pelada} />
        <ScoreDisplay match={match} winner={winner} />
        <Info
          isDraw={isDraw}
          winner={winner}
          loser={loser}
          match={match}
          pelada={pelada}
          nextMatch={nextMatch}
        />
        <QueueStatus pelada={pelada} nextMatch={nextMatch} winner={winner} />

        <ActionButton handleNextMatch={handleNextMatch} />
      </div>
    </div>
  );
}
