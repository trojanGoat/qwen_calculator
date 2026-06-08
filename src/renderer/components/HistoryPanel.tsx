import { HistoryEntry } from '@/hooks/useCalculator';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
}

export function HistoryPanel({ history, onSelect, onClear }: HistoryPanelProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-card rounded-xl p-4 shadow-lg mt-4 max-h-60 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          <Clock className="w-4 h-4" />
          History
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors text-xs"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>
      <div className="overflow-y-auto flex-1 space-y-2">
        {history.map(entry => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className="w-full text-right p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
          >
            <div className="text-muted-foreground text-xs truncate">{entry.expression}</div>
            <div className="text-foreground font-medium">= {entry.result}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
