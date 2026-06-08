import { Delete } from 'lucide-react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'accent' | 'danger';
  span?: number;
  icon?: React.ReactNode;
}

export function CalcButton({ label, onClick, variant = 'default', span = 1, icon }: ButtonProps) {
  const base = 'flex items-center justify-center rounded-xl font-medium transition-all duration-150 active:scale-95 select-none h-14 text-base';

  const variants = {
    default: 'bg-secondary text-foreground hover:bg-accent',
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    accent: 'bg-muted text-primary hover:bg-accent',
    danger: 'bg-destructive/20 text-destructive hover:bg-destructive/30',
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${span > 1 ? `col-span-${span}` : ''}`}
    >
      {icon || label}
    </button>
  );
}

interface ButtonGridProps {
  onDigit: (d: string) => void;
  onOperator: (op: string) => void;
  onPower: () => void;
  onPercent: () => void;
  onCalculate: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onBackspace: () => void;
  onFunction: (fn: string) => void;
  showAdvanced: boolean;
}

export function ButtonGrid({
  onDigit,
  onOperator,
  onPower,
  onPercent,
  onCalculate,
  onClear,
  onClearEntry,
  onBackspace,
  onFunction,
  showAdvanced,
}: ButtonGridProps) {
  return (
    <div className="flex flex-col gap-2">
      {showAdvanced && (
        <div className="grid grid-cols-4 gap-2 mb-1">
          <CalcButton label="sin" onClick={() => onFunction('sin')} variant="accent" />
          <CalcButton label="cos" onClick={() => onFunction('cos')} variant="accent" />
          <CalcButton label="tan" onClick={() => onFunction('tan')} variant="accent" />
          <CalcButton label="log" onClick={() => onFunction('log')} variant="accent" />
          <CalcButton label="ln" onClick={() => onFunction('ln')} variant="accent" />
          <CalcButton label="√" onClick={() => onFunction('sqrt')} variant="accent" />
          <CalcButton label="x²" onClick={() => onFunction('x^2')} variant="accent" />
          <CalcButton label="x³" onClick={() => onFunction('x^3')} variant="accent" />
          <CalcButton label="xⁿ" onClick={onPower} variant="accent" />
          <CalcButton label="1/x" onClick={() => onFunction('1/x')} variant="accent" />
          <CalcButton label="|x|" onClick={() => onFunction('abs')} variant="accent" />
          <CalcButton label="n!" onClick={() => onFunction('fact')} variant="accent" />
          <CalcButton label="π" onClick={() => onFunction('pi')} variant="accent" />
          <CalcButton label="e" onClick={() => onFunction('e')} variant="accent" />
          <CalcButton label="eˣ" onClick={() => onFunction('exp')} variant="accent" />
          <CalcButton label="%" onClick={onPercent} variant="accent" />
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        <CalcButton label="C" onClick={onClear} variant="danger" />
        <CalcButton label="CE" onClick={onClearEntry} variant="danger" />
        <CalcButton label="⌫" onClick={onBackspace} variant="danger" icon={<Delete className="w-5 h-5" />} />
        <CalcButton label="÷" onClick={() => onOperator('/')} variant="primary" />

        <CalcButton label="7" onClick={() => onDigit('7')} />
        <CalcButton label="8" onClick={() => onDigit('8')} />
        <CalcButton label="9" onClick={() => onDigit('9')} />
        <CalcButton label="×" onClick={() => onOperator('*')} variant="primary" />

        <CalcButton label="4" onClick={() => onDigit('4')} />
        <CalcButton label="5" onClick={() => onDigit('5')} />
        <CalcButton label="6" onClick={() => onDigit('6')} />
        <CalcButton label="-" onClick={() => onOperator('-')} variant="primary" />

        <CalcButton label="1" onClick={() => onDigit('1')} />
        <CalcButton label="2" onClick={() => onDigit('2')} />
        <CalcButton label="3" onClick={() => onDigit('3')} />
        <CalcButton label="+" onClick={() => onOperator('+')} variant="primary" />

        <CalcButton label="0" onClick={() => onDigit('0')} span={2} />
        <CalcButton label="." onClick={() => onDigit('.')} />
        <CalcButton label="=" onClick={onCalculate} variant="primary" />
      </div>
    </div>
  );
}
