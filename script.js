'use strict';

let firstOperand = '';
let secondOperand = '';
let currentResult = '';
let previousOperator = '';
let currentOperator = '';

// Query Selector
const previousCalculationDisplay = document.querySelector(
  '[data-previous-cal]'
);
const currentCalculationDisplay = document.querySelector('[data-current-cal]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const percentageButton = document.querySelector('[data-percent]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operation]');
const decimalButton = document.querySelector('[data-decimal');
const equalButton = document.querySelector('[data-equal]');

//Event Listener

window.addEventListener('keydown', keyboardInput);

window.addEventListener('keydown', e => console.log(e.key));

numberButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    appendNum(btn.textContent);
  })
);

operatorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    secondOperand = currentCalculationDisplay.textContent;
    setOperation(btn.textContent);
  });
});

clearButton.addEventListener('click', clear);

equalButton.addEventListener('click', equal);

decimalButton.addEventListener('click', decimal);

deleteButton.addEventListener('click', del);

percentageButton.addEventListener('click', percentage);

// function

function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNum(e.key);
  if (e.key === '.') decimal();
  if (e.key === '=' || e.key === 'Enter') equal();
  if (e.key === 'Backspace') del();
  if (e.key === 'Escape') clear();
  if (
    e.key === '+' ||
    e.key === '-' ||
    e.key === '*' ||
    e.key === 'x' ||
    e.key === '/'
  )
    setOperation(convertOperator(e.key));
}

function convertOperator(opInput) {
  if (opInput === '+') return '+';
  if (opInput === '-') return '-';
  if (opInput === '*' || opInput === 'x') return 'x';
  if (opInput === '/') return '÷';
}

function appendNum(num) {
  currentCalculationDisplay.textContent += num;
}

function decimal() {
  if (currentCalculationDisplay.textContent === '') {
    currentCalculationDisplay.textContent = '0.';
  } else if (currentCalculationDisplay.textContent.includes('.')) return;
  else {
    currentCalculationDisplay.textContent += '.';
  }
}

function del() {
  currentCalculationDisplay.textContent = currentCalculationDisplay.textContent
    .toString()
    .slice(0, -1);
}

function clear() {
  previousCalculationDisplay.textContent = '';
  resetCurrentDisplay();
  firstOperand = null;
  secondOperand = null;
  previousOperator = null;
  currentOperator = null;
}

function percentage() {}

function setOperation(operator) {
  if (!secondOperand) return;
  if (!firstOperand) {
    console.log(operator);
    previousOperator = operator.trim();
    firstOperand = secondOperand;
    previousCalculationDisplay.textContent = `${secondOperand}${previousOperator}`;
    resetCurrentDisplay();
  } else if (firstOperand && secondOperand && previousOperator) {
    currentOperator = operator.trim();
    const result = calculate();
    previousCalculationDisplay.textContent = `${calculate()}${currentOperator}`;
    previousOperator = currentOperator;
    firstOperand = result;
  } else {
    currentCalculationDisplay.textContent = 'something is wrong';
  }
}

function resetCurrentDisplay() {
  currentCalculationDisplay.textContent = '';
}

function calculate() {
  firstOperand = parseFloat(firstOperand);
  secondOperand = parseFloat(secondOperand);
  resetCurrentDisplay();
  return roundResult(operate(previousOperator, firstOperand, secondOperand));
}

function operate(op, a, b) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case 'x':
      return a * b;
    case '÷':
      return a / b;
  }
}

function equal() {
  if (!firstOperand) return;
  secondOperand = currentCalculationDisplay.textContent;
  const result = calculate();
  clear();
  currentCalculationDisplay.textContent = `${result}`;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}
