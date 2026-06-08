interface ModeToggleProps {
  showAdvanced: boolean;
  onToggle: () => void;
}

export function ModeToggle({ showAdvanced, onToggle }: ModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`retro-mode-toggle -webkit-app-region-no-drag ${showAdvanced ? 'mode-sci' : 'mode-std'}`}
      title={showAdvanced ? 'Switch to Standard' : 'Switch to Scientific'}
    >
      {showAdvanced ? '∑' : 'S'}
    </button>
  );
}
