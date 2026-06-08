import { HistoryEntry } from '@/hooks/useCalculator';

interface DisplayProps {
  value: string;
  expression: string;
  showHistory: boolean;
  historyIndex: number;
  historyLength: number;
  currentEntry: HistoryEntry | null;
  onToggleHistory: () => void;
  onCycleUp: () => void;
  onCycleDown: () => void;
}

export function Display({
  value,
  expression,
  showHistory,
  historyIndex,
  historyLength,
  currentEntry,
  onToggleHistory,
  onCycleUp,
  onCycleDown,
}: DisplayProps) {
  const fontSize = value.length > 12 ? 'text-3xl' : value.length > 8 ? 'text-4xl' : 'text-5xl';

  return (
    <div className="led-display mb-4 relative">
      <button
        onClick={onToggleHistory}
        className="led-h-btn"
        title="Toggle History"
      >
        H
      </button>

      {showHistory && historyLength > 0 ? (
        <div className="led-history-view">
          <div className="led-text-dim text-xs text-center mb-2">
            HISTORY {historyIndex + 1}/{historyLength}
          </div>
          <div className="led-text-dim text-right text-sm truncate">
            {currentEntry?.expression}
          </div>
          <div className={`${fontSize} font-led text-right tracking-tight led-text truncate`}>
            {currentEntry?.result}
          </div>
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={onCycleUp}
              disabled={historyIndex === 0}
              className="led-nav-btn"
            >
              ▲
            </button>
            <button
              onClick={() => {}}
              className="led-text-dim text-xs opacity-50"
            >
              ◀
            </button>
            <button
              onClick={onCycleDown}
              disabled={historyIndex >= historyLength - 1}
              className="led-nav-btn"
            >
              ▼
            </button>
          </div>
        </div>
      ) : showHistory && historyLength === 0 ? (
        <div className="led-text-dim text-center text-sm py-8">
          NO HISTORY
        </div>
      ) : (
        <>
          {expression && (
            <div className="led-text-dim text-sm text-right h-6 truncate">
              {expression}
            </div>
          )}
          <div className={`${fontSize} font-led text-right tracking-tight led-text truncate`}>
            {value}
          </div>
        </>
      )}
    </div>
  );
}
