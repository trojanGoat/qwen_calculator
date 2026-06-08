import { useEffect } from 'react';
import { playDTMF } from '@/utils/dtmf';

interface CalculatorActions {
  inputDigit: (d: string) => void;
  inputOperator: (op: string) => void;
  calculate: () => void;
  clear: () => void;
  clearEntry: () => void;
  backspace: () => void;
}

export function useKeyboard(actions: CalculatorActions): void {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key;

      if (key >= '0' && key <= '9') {
        e.preventDefault();
        playDTMF(key);
        actions.inputDigit(key);
        return;
      }

      switch (key) {
        case '+':
          e.preventDefault();
          actions.inputOperator('+');
          break;
        case '-':
          e.preventDefault();
          actions.inputOperator('-');
          break;
        case '*':
          e.preventDefault();
          actions.inputOperator('*');
          break;
        case '/':
          e.preventDefault();
          actions.inputOperator('/');
          break;
        case '=':
        case 'Enter':
          e.preventDefault();
          actions.calculate();
          break;
        case 'Escape':
          e.preventDefault();
          actions.clear();
          break;
        case 'Delete':
          e.preventDefault();
          actions.clearEntry();
          break;
        case 'Backspace':
          e.preventDefault();
          actions.backspace();
          break;
        case '.':
        case ',':
          e.preventDefault();
          actions.inputDigit('.');
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);
}
