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
      <label className="text-xs" style={{ color: 'rgba(57, 255, 20, 0.6)' }}>{label}</label>
      <input
        type="number"
        step="1"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        className={`w-${width} retro-input text-sm`}
      />
    </div>
  );

  return (
    <div className="oscilloscope p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#39FF14' }}>
          <BarChart3 className="w-4 h-4" />
          Graph
        </div>
        <button
          onClick={() => setShowAxisControls(!showAxisControls)}
          className="transition-colors"
          style={{ color: 'rgba(57, 255, 20, 0.5)' }}
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm" style={{ color: '#39FF14' }}>f(x) =</span>
        <input
          type="text"
          value={config.expr}
          onChange={e => onUpdate({ expr: e.target.value })}
          className="flex-1 retro-input text-sm"
          placeholder="sin(x)"
        />
      </div>

      {showAxisControls && (
        <div className="grid grid-cols-4 gap-3 mb-3 p-3 rounded-lg" style={{ background: 'rgba(57, 255, 20, 0.05)' }}>
          {axisInput('X min', config.xMin, v => onUpdate({ xMin: v }))}
          {axisInput('X max', config.xMax, v => onUpdate({ xMax: v }))}
          {axisInput('Y min', config.yMin, v => onUpdate({ yMin: v }))}
          {axisInput('Y max', config.yMax, v => onUpdate({ yMax: v }))}
        </div>
      )}

      <div className="h-48">
        {isError ? (
          <div className="h-full flex items-center justify-center text-sm" style={{ color: 'rgba(57, 255, 20, 0.5)' }}>
            Could not parse expression
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(57, 255, 20, 0.1)" />
              <XAxis
                type="number"
                dataKey="x"
                stroke="rgba(57, 255, 20, 0.4)"
                fontSize={11}
                domain={[config.xMin, config.xMax]}
                tickCount={8}
                tick={{ fill: 'rgba(57, 255, 20, 0.5)' }}
              />
              <YAxis
                type="number"
                dataKey="y"
                stroke="rgba(57, 255, 20, 0.4)"
                fontSize={11}
                domain={[yMin, yMax]}
                tick={{ fill: 'rgba(57, 255, 20, 0.5)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0D1F0D',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: "'Share Tech Mono', monospace",
                }}
                labelStyle={{ color: 'rgba(57, 255, 20, 0.6)' }}
                itemStyle={{ color: '#39FF14' }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#39FF14"
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
