import { evaluate } from 'mathjs';

export interface DataPoint {
  x: number;
  y: number;
}

export function generateGraphData(
  expr: string,
  xMin: number,
  xMax: number,
  steps = 500
): DataPoint[] {
  const points: DataPoint[] = [];
  const dx = (xMax - xMin) / steps;

  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    try {
      const y = evaluate(expr, { x });
      if (typeof y === 'number' && isFinite(y)) {
        points.push({ x: parseFloat(x.toFixed(6)), y: parseFloat(y.toFixed(6)) });
      } else {
        points.push({ x: parseFloat(x.toFixed(6)), y: NaN });
      }
    } catch {
      points.push({ x: parseFloat(x.toFixed(6)), y: NaN });
    }
  }
  return points;
}

export function autoFitYRange(data: DataPoint[]): [number, number] {
  const validYs = data.map(d => d.y).filter(y => !isNaN(y));
  if (validYs.length === 0) return [-10, 10];
  const min = Math.min(...validYs);
  const max = Math.max(...validYs);
  const padding = (max - min) * 0.1 || 1;
  return [min - padding, max + padding];
}
