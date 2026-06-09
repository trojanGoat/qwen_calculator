import { useCalculator } from '@/hooks/useCalculator';
import { useKeyboard } from '@/hooks/useKeyboard';
import { Display } from '@/components/Display';
import { ButtonGrid } from '@/components/ButtonGrid';
import { HistoryPanel } from '@/components/HistoryPanel';
import { GraphView } from '@/components/GraphView';
import { ModeToggle } from '@/components/ModeToggle';
import { WindowControls } from '@/components/WindowControls';

export default function App() {
  const calc = useCalculator();
  useKeyboard({
    inputDigit: calc.inputDigit,
    inputOperator: calc.inputOperator,
    calculate: calc.calculate,
    clear: calc.clear,
    clearEntry: calc.clearEntry,
    backspace: calc.backspace,
  });

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-background-alt">
      <div className="w-full max-w-md">
        <div className="calc-body">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-3">
              <div className="drag-region-branding" />
              <div className="branding">
                <span className="branding-sound"></span>
                RetroCalc
              </div>
            </div>
            <div className="flex items-center gap-3 -webkit-app-region-no-drag">
              <WindowControls />
              <ModeToggle
                showAdvanced={calc.showAdvanced}
                onToggle={() => calc.setShowAdvanced(!calc.showAdvanced)}
              />
            </div>
          </div>

          <Display
            value={calc.display}
            expression={calc.expression}
            showHistory={calc.showHistory}
            historyIndex={calc.showHistoryIndex}
            historyLength={calc.history.length}
            currentEntry={calc.currentHistoryEntry}
            onToggleHistory={calc.toggleShowHistory}
            onCycleUp={() => calc.cycleHistory('up')}
            onCycleDown={() => calc.cycleHistory('down')}
          />
          <ButtonGrid
            onDigit={calc.inputDigit}
            onOperator={calc.inputOperator}
            onPower={calc.inputPower}
            onPercent={calc.inputPercent}
            onCalculate={calc.calculate}
            onClear={calc.clear}
            onClearEntry={calc.clearEntry}
            onBackspace={calc.backspace}
            onFunction={calc.applyFunction}
            showAdvanced={calc.showAdvanced}
          />
        </div>

        {calc.showAdvanced && (
          <GraphView
            config={calc.graphConfig}
            onUpdate={calc.updateGraphConfig}
          />
        )}

        <HistoryPanel
          history={calc.history}
          onSelect={calc.useFromHistory}
          onClear={calc.clearHistory}
        />
      </div>
    </div>
  );
}
