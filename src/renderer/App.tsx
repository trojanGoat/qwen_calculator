import { useCalculator } from '@/hooks/useCalculator';
import { Display } from '@/components/Display';
import { ButtonGrid } from '@/components/ButtonGrid';
import { HistoryPanel } from '@/components/HistoryPanel';
import { GraphView } from '@/components/GraphView';
import { ModeToggle } from '@/components/ModeToggle';

export default function App() {
  const calc = useCalculator();

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Calculator</h1>
          <ModeToggle
            showAdvanced={calc.showAdvanced}
            onToggle={() => calc.setShowAdvanced(!calc.showAdvanced)}
          />
        </div>

        <Display value={calc.display} expression={calc.expression} />
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
