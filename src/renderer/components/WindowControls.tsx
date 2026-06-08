import { Minimize, Maximize, X } from 'lucide-react';

declare global {
  interface Window {
    electronAPI: {
      minimizeWindow: () => void;
      closeWindow: () => void;
      toggleMaximize: () => void;
    };
  }
}

export function WindowControls() {
  return (
    <div className="flex items-center gap-1.5 -webkit-app-region-no-drag">
      <button
        onClick={() => window.electronAPI.minimizeWindow()}
        className="win-btn win-btn-min"
        title="Minimize"
      >
        <Minimize className="w-3 h-3" />
      </button>
      <button
        onClick={() => window.electronAPI.toggleMaximize()}
        className="win-btn win-btn-max"
        title="Maximize"
      >
        <Maximize className="w-3 h-3" />
      </button>
      <button
        onClick={() => window.electronAPI.closeWindow()}
        className="win-btn win-btn-close"
        title="Close"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
