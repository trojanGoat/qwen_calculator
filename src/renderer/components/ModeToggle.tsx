import { Calculator } from 'lucide-react';

interface ModeToggleProps {
  showAdvanced: boolean;
  onToggle: () => void;
}

export function ModeToggle({ showAdvanced, onToggle }: ModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
        showAdvanced
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-muted-foreground hover:text-foreground'
      }`}
    >
      <Calculator className="w-4 h-4" />
      {showAdvanced ? 'Scientific' : 'Standard'}
    </button>
  );
}
