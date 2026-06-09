import { Power } from 'lucide-react';

export function PowerButton() {
  return (
    <button
      onClick={() => window.close()}
      className="power-btn -webkit-app-region-no-drag"
      title="Power Off"
    >
      <Power className="w-3.5 h-3.5" />
    </button>
  );
}
