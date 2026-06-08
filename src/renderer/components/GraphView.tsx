import { useMemo, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { generateGraphData, autoFitYRange } from '@/utils/graphData';
import { BarChart3, Settings2 } from 'lucide-react';
import { GraphConfig } from '@/hooks/useCalculator';

interface GraphViewProps {
  config: GraphConfig;
  onUpdate: (updates: Partial<GraphConfig>) => void;
}

export function GraphView({ config, onUpdate }: GraphViewProps) {
  const [showAxisControls, setShowAxisControls] = useState(false);

  const data = useMemo(
    () => generateGraphData(config.expr, config.xMin, config.xMax),
    [config.expr, config.xMin, config.xMax]
  );

  const [autoYMin, autoYMax] = useMemo(
    () => autoFitYRange(data),
    [data]
  );

  const yMin = config.yMin < config.yMax ? config.yMin : autoYMin;
  const yMax = config.yMax > config.yMin ? config.yMax : autoYMax;

  const isError = data.every(d => isNaN(d.y));

  const axisInput = (
    label: string,
    value: number,
    onChange: (v: number) => void,
    width = 28
  ) => (
    <div className="flex flex-col gap-0.5">
      <label className="text-muted-foreground text-xs">{label}</label>
      <input
        type="number"
        step="1"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        className={`w-${width} bg-background text-foreground rounded-lg px-2 py-1 text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary`}
      />
    </div>
  );

  return (
    <div className="bg-card rounded-xl p-4 shadow-lg mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          <BarChart3 className="w-4 h-4" />
          Graph
        </div>
        <button
          onClick={() => setShowAxisControls(!showAxisControls)}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-muted-foreground text-sm">f(x) =</span>
        <input
          type="text"
          value={config.expr}
          onChange={e => onUpdate({ expr: e.target.value })}
          className="flex-1 bg-background text-foreground rounded-lg px-3 py-1.5 text-sm font-mono border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="sin(x)"
        />
      </div>

      {showAxisControls && (
        <div className="grid grid-cols-4 gap-3 mb-3 p-3 bg-secondary/30 rounded-lg">
          {axisInput('X min', config.xMin, v => onUpdate({ xMin: v }))}
          {axisInput('X max', config.xMax, v => onUpdate({ xMax: v }))}
          {axisInput('Y min', config.yMin, v => onUpdate({ yMin: v }))}
          {axisInput('Y max', config.yMax, v => onUpdate({ yMax: v }))}
        </div>
      )}

      <div className="h-48">
        {isError ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            Could not parse expression
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                type="number"
                dataKey="x"
                stroke="#94a3b8"
                fontSize={11}
                domain={[config.xMin, config.xMax]}
                tickCount={8}
              />
              <YAxis
                type="number"
                dataKey="y"
                stroke="#94a3b8"
                fontSize={11}
                domain={[yMin, yMax]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
