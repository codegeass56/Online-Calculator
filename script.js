function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(dividend, divisor) {
  if (divisor === 0) {
    return 0;
  }

  return dividend / divisor;
}

function operate(num1, num2) {
  return divide(num1, num2);
}