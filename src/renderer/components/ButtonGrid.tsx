import { Delete } from 'lucide-react';
import { playDTMF } from '@/utils/dtmf';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'danger' | 'scientific';
  span?: number;
  icon?: React.ReactNode;
}

export function CalcButton({ label, onClick, variant = 'default', span = 1, icon }: ButtonProps) {
  const base = 'flex items-center justify-center retro-btn select-none h-14 text-base';

  const variants = {
    default: '',
    operator: 'retro-btn-op',
    danger: 'retro-btn-red',
    scientific: 'retro-btn-sci',
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
          <CalcButton label="sin" onClick={() => onFunction('sin')} variant="scientific" />
          <CalcButton label="cos" onClick={() => onFunction('cos')} variant="scientific" />
          <CalcButton label="tan" onClick={() => onFunction('tan')} variant="scientific" />
          <CalcButton label="log" onClick={() => onFunction('log')} variant="scientific" />
          <CalcButton label="ln" onClick={() => onFunction('ln')} variant="scientific" />
          <CalcButton label="√" onClick={() => onFunction('sqrt')} variant="scientific" />
          <CalcButton label="x²" onClick={() => onFunction('x^2')} variant="scientific" />
          <CalcButton label="x³" onClick={() => onFunction('x^3')} variant="scientific" />
          <CalcButton label="xⁿ" onClick={onPower} variant="scientific" />
          <CalcButton label="1/x" onClick={() => onFunction('1/x')} variant="scientific" />
          <CalcButton label="|x|" onClick={() => onFunction('abs')} variant="scientific" />
          <CalcButton label="n!" onClick={() => onFunction('fact')} variant="scientific" />
          <CalcButton label="π" onClick={() => onFunction('pi')} variant="scientific" />
          <CalcButton label="e" onClick={() => onFunction('e')} variant="scientific" />
          <CalcButton label="eˣ" onClick={() => onFunction('exp')} variant="scientific" />
          <CalcButton label="%" onClick={onPercent} variant="scientific" />
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        <CalcButton label="C" onClick={onClear} variant="danger" />
        <CalcButton label="CE" onClick={onClearEntry} variant="danger" />
        <CalcButton label="⌫" onClick={onBackspace} variant="danger" icon={<Delete className="w-5 h-5" />} />
        <CalcButton label="÷" onClick={() => onOperator('/')} variant="operator" />

        <CalcButton label="7" onClick={() => { playDTMF('7'); onDigit('7'); }} />
        <CalcButton label="8" onClick={() => { playDTMF('8'); onDigit('8'); }} />
        <CalcButton label="9" onClick={() => { playDTMF('9'); onDigit('9'); }} />
        <CalcButton label="×" onClick={() => onOperator('*')} variant="operator" />

        <CalcButton label="4" onClick={() => { playDTMF('4'); onDigit('4'); }} />
        <CalcButton label="5" onClick={() => { playDTMF('5'); onDigit('5'); }} />
        <CalcButton label="6" onClick={() => { playDTMF('6'); onDigit('6'); }} />
        <CalcButton label="-" onClick={() => onOperator('-')} variant="operator" />

        <CalcButton label="1" onClick={() => { playDTMF('1'); onDigit('1'); }} />
        <CalcButton label="2" onClick={() => { playDTMF('2'); onDigit('2'); }} />
        <CalcButton label="3" onClick={() => { playDTMF('3'); onDigit('3'); }} />
        <CalcButton label="+" onClick={() => onOperator('+')} variant="operator" />

        <CalcButton label="0" onClick={() => { playDTMF('0'); onDigit('0'); }} span={2} />
        <CalcButton label="." onClick={() => onDigit('.')} />
        <CalcButton label="=" onClick={onCalculate} variant="operator" />
      </div>
    </div>
  );
}
