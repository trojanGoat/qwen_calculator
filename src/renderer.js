const display = document.getElementById('display');
const buttons = document.querySelectorAll('#buttons button');
const historyDiv = document.getElementById('history');
const advancedToggle = document.getElementById('advanced-toggle');
const advancedButtons = document.getElementById('advanced-buttons');

let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecond = false;
let history = [];

function updateDisplay(value) {
  display.textContent = value;
}

function updateHistory() {
  historyDiv.textContent = history.join('\n');
}

function applyAdvanced(fn) {
  const val = parseFloat(displayValue);
  if (!isNaN(val)) {
    let result;
    switch (fn) {
      case 'sin': result = Math.sin(val); break;
      case 'cos': result = Math.cos(val); break;
      case 'tan': result = Math.tan(val); break;
      case 'sqrt': result = val >= 0 ? Math.sqrt(val) : NaN; break;
      default: return;
    }
    displayValue = isNaN(result) ? 'Error' : String(result);
    updateDisplay(displayValue);
    history.unshift(displayValue);
    updateHistory();
  }
}

function calculate() {
  if (firstOperand === null || operator === null) return;
  const second = parseFloat(displayValue);
  let result;
  switch (operator) {
    case '+': result = firstOperand + second; break;
    case '-': result = firstOperand - second; break;
    case '*': result = firstOperand * second; break;
    case '/': result = second !== 0 ? firstOperand / second : NaN; break;
    default: return;
  }
  displayValue = isNaN(result) || !isFinite(result) ? 'Error' : String(result);
  updateDisplay(displayValue);
  history.unshift(displayValue);
  updateHistory();
  firstOperand = null;
  operator = null;
  waitingForSecond = false;
  displayValue = '0';
}

function drawGraph() {
  const ctx = document.getElementById('graph').getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = {
    labels: [],
    datasets: [{
      label: 'sin(x)',
      data: [],
      borderColor: '#00ff00',
      fill: false,
    }],
  };
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 2 * Math.PI;
    const y = Math.sin(x);
    data.labels.push(i);
    data.datasets[0].data.push(y);
  }
  new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  });
}

// Initialize button listeners
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.textContent.trim();
    if (value === '') return;
    if (value >= '0' && value <= '9' || value === '.') {
      if (waitingForSecond) {
        displayValue = value;
        waitingForSecond = false;
      } else {
        displayValue = displayValue === '0' ? value : displayValue + value;
      }
      updateDisplay(displayValue);
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
      } else if (operator) {
        calculate();
        firstOperand = parseFloat(displayValue);
      } else {
        firstOperand = parseFloat(displayValue);
      }
      operator = value;
      waitingForSecond = true;
      displayValue = '0';
    } else if (value === '=') {
      calculate();
    }
  });
});

// Advanced toggle
advancedToggle.addEventListener('change', () => {
  advancedButtons.classList.toggle('hidden', !advancedToggle.checked);
  if (advancedToggle.checked) {
    drawGraph();
  }
});\n\n// Clear history button\nconst clearHistoryBtn = document.getElementById('clear-history');\nclearHistoryBtn.addEventListener('click', () => {\n  history = [];\n  updateDisplay('0');\n  updateHistory();\n});\n\n// Initialize
updateDisplay(displayValue);
drawGraph();