import { useState, useCallback, useMemo } from 'react';
import { evaluate } from 'mathjs';

export interface HistoryEntry {
  id: number;
  expression: string;
  result: string;
}

export interface GraphConfig {
  expr: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

const defaultGraphConfig: GraphConfig = {
  expr: 'sin(x)',
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10,
};

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [graphConfig, setGraphConfig] = useState<GraphConfig>(defaultGraphConfig);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [pendingOp, setPendingOp] = useState<string | null>(null);
  const [pendingValue, setPendingValue] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);

  const nextId = useMemo(() => history.length + Date.now(), [history]);

  const safeEvaluate = useCallback((expr: string): string => {
    try {
      const result = evaluate(expr);
      if (typeof result === 'number') {
        if (!isFinite(result)) return 'Error';
        const rounded = parseFloat(result.toPrecision(12));
        return String(rounded);
      }
      return 'Error';
    } catch {
      return 'Error';
    }
  }, []);

  const addToHistory = useCallback((expr: string, result: string) => {
    setHistory(prev => [{ id: nextId, expression: expr, result }, ...prev].slice(0, 50));
  }, [nextId]);

  const inputDigit = useCallback((digit: string) => {
    if (isNewNumber) {
      setDisplay(digit === '.' ? '0.' : digit);
      setIsNewNumber(false);
    } else {
      if (digit === '.' && display.includes('.')) return;
      setDisplay(prev => prev === '0' && digit !== '.' ? digit : prev + digit);
    }
  }, [display, isNewNumber]);

  const inputOperator = useCallback((op: string) => {
    if (pendingOp && pendingValue !== null && !isNewNumber) {
      const result = safeEvaluate(`${pendingValue} ${pendingOp} ${display}`);
      if (result === 'Error') {
        setDisplay('Error');
        setExpression('');
        setPendingOp(null);
        setPendingValue(null);
        setIsNewNumber(true);
        return;
      }
      setPendingValue(parseFloat(result));
      setDisplay(result);
      setExpression(`${result} ${op}`);
      setPendingOp(op);
    } else {
      setPendingValue(parseFloat(display));
      setExpression(`${display} ${op}`);
      setPendingOp(op);
    }
    setIsNewNumber(true);
  }, [display, pendingOp, pendingValue, isNewNumber, safeEvaluate]);

  const calculate = useCallback(() => {
    if (pendingOp === null || pendingValue === null) return;
    const fullExpr = `${pendingValue} ${pendingOp} ${display}`;
    const result = safeEvaluate(fullExpr);
    setExpression(`${fullExpr} =`);
    addToHistory(fullExpr, result);
    setDisplay(result);
    setPendingOp(null);
    setPendingValue(null);
    setIsNewNumber(true);
  }, [display, pendingOp, pendingValue, safeEvaluate, addToHistory]);

  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setPendingOp(null);
    setPendingValue(null);
    setIsNewNumber(true);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay('0');
    setIsNewNumber(true);
  }, []);

  const backspace = useCallback(() => {
    setDisplay(prev => {
      if (prev.length <= 1 || prev === 'Error') {
        return '0';
      }
      return prev.slice(0, -1);
    });
  }, []);

  const applyFunction = useCallback((fn: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;
    let resultStr = '';
    const safeEval = (e: string) => safeEvaluate(e);

    switch (fn) {
      case 'sin': resultStr = safeEval(`sin(${val} * pi / 180)`); break;
      case 'cos': resultStr = safeEval(`cos(${val} * pi / 180)`); break;
      case 'tan':
        resultStr = Math.abs(val % 180 - 90) < 1e-9 ? 'Error' : safeEval(`tan(${val} * pi / 180)`);
        break;
      case 'sqrt':
        resultStr = val < 0 ? 'Error' : safeEval(`sqrt(${val})`);
        break;
      case 'log':
        resultStr = val <= 0 ? 'Error' : safeEval(`log(${val})`);
        break;
      case 'ln':
        resultStr = val <= 0 ? 'Error' : safeEval(`log(${val}, e)`);
        break;
      case 'x^2': resultStr = safeEval(`${val} ^ 2`); break;
      case 'x^3': resultStr = safeEval(`${val} ^ 3`); break;
      case '1/x':
        resultStr = val === 0 ? 'Error' : safeEval(`1 / ${val}`);
        break;
      case 'abs': resultStr = safeEval(`abs(${val})`); break;
      case 'exp': resultStr = safeEval(`e ^ ${val}`); break;
      case 'pi': resultStr = safeEval('pi'); break;
      case 'e': resultStr = safeEval('e'); break;
      case 'fact':
        resultStr = val < 0 || !Number.isInteger(val) ? 'Error' : safeEval(`factorial(${val})`);
        break;
      default: return;
    }
    if (resultStr === 'Error') {
      setDisplay('Error');
    } else {
      addToHistory(`${fn}(${val})`, resultStr);
      setDisplay(resultStr);
    }
    setIsNewNumber(true);
  }, [display, safeEvaluate, addToHistory]);

  const inputPower = useCallback(() => {
    inputOperator('^');
  }, [inputOperator]);

  const inputPercent = useCallback(() => {
    if (pendingValue !== null && pendingOp) {
      const result = safeEvaluate(`${pendingValue} / 100 * ${display}`);
      setDisplay(result === 'Error' ? 'Error' : result);
      setIsNewNumber(true);
    } else {
      const result = safeEvaluate(`${display} / 100`);
      setDisplay(result);
      setIsNewNumber(true);
    }
  }, [display, pendingValue, pendingOp, safeEvaluate]);

  const updateGraphConfig = useCallback((updates: Partial<GraphConfig>) => {
    setGraphConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const useFromHistory = useCallback((entry: HistoryEntry) => {
    setDisplay(entry.result);
    setExpression(entry.expression);
    setIsNewNumber(true);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const toggleShowHistory = useCallback(() => {
    setShowHistory(prev => {
      if (!prev) setHistoryIndex(0);
      return !prev;
    });
  }, []);

  const cycleHistory = useCallback((dir: 'up' | 'down') => {
    setHistoryIndex(prev => {
      if (history.length === 0) return 0;
      if (dir === 'up') {
        return prev > 0 ? prev - 1 : 0;
      }
      return prev < history.length - 1 ? prev + 1 : history.length - 1;
    });
  }, [history.length]);

  const currentHistoryEntry = history.length > 0 && historyIndex >= 0 && historyIndex < history.length
    ? history[historyIndex]
    : null;

  return {
    display,
    expression,
    history,
    graphConfig,
    showAdvanced,
    setShowAdvanced,
    inputDigit,
    inputOperator,
    inputPower,
    inputPercent,
    calculate,
    clear,
    clearEntry,
    backspace,
    applyFunction,
    updateGraphConfig,
    useFromHistory,
    clearHistory,
    showHistory,
    showHistoryIndex: historyIndex,
    currentHistoryEntry,
    toggleShowHistory,
    cycleHistory,
  };
}
