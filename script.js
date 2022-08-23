//Display screen
const displayScreen = document.querySelector('.screen-content');

//Button classes
const numBtnClassName = 'number-button';
const operatorBtnClassName = 'operator';
const addBtnClassName = 'add-button';
const subtractBtnClassName = 'subtract-button';
const multiplyBtnClassName = 'multiply-button';
const divideBtnClassName = 'divide-button';
const equalsBtnClassName = 'equals-button';
const dotBtnClassName = 'dot-button';

let accumulator = 0;
let currentOperator = null;

function add(num1) {
  accumulator += num1
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

function operate(operatorName, num1) {
  switch (operatorName) {
    case addBtnClassName: add(num1); break;
    case subtractBtnClassName: subtract(num1, num2); break;
    case multiplyBtnClassName: multiply(num1, num2); break;
    case divideBtnClassName: divide(num1, num2); break;
    case equalsBtnClassName:
      if (currentOperator === 'add') {
        add(num1);
      }
      displayScreen.textContent = accumulator;
      accumulator = 0;
      break;
  }
}

//Get the grid container
const buttonContainer = document.querySelector('.buttons-container');

//Get the grid object
// const gridComputedStyle = window.getComputedStyle(buttonContainer);

// // get number of grid rows
// const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
// // get number of grid columns
// const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

let number = 7;
const rowSize = 4;
const colSize = 4;

//Create the buttons as grid items
for (let rowCount = 0; rowCount < rowSize; rowCount++) {
  for (let colCount = 0; colCount < colSize; colCount++) {
    const gridItem = document.createElement('button');
    if (colCount === 3) {
      switch (rowCount) {
        case 0: gridItem.textContent = '+';
          gridItem.classList.add(operatorBtnClassName);
          gridItem.classList.add(addBtnClassName);
          number = 4; break;

        case 1: gridItem.textContent = '-';
          gridItem.classList.add(operatorBtnClassName);
          gridItem.classList.add(subtractBtnClassName);
          number = 1; break;

        case 2: gridItem.textContent = 'x';
          gridItem.classList.add(operatorBtnClassName);
          gridItem.classList.add(multiplyBtnClassName);
          number = 0; break;

        case 3: gridItem.textContent = '÷';
          gridItem.classList.add(operatorBtnClassName);
          gridItem.classList.add(divideBtnClassName);
          break;
      }
    } else {
      if (rowCount === 3) {
        switch (colCount) {
          case 0: gridItem.textContent = `${number}`;
            gridItem.classList.add(numBtnClassName);
            break;

          case 1: gridItem.textContent = '.';
            gridItem.classList.add(dotBtnClassName); break;

          case 2: gridItem.textContent = '=';
            gridItem.classList.add(operatorBtnClassName);
            gridItem.classList.add(equalsBtnClassName);
            break;
        }
      } else {
        gridItem.textContent = `${number}`;
        gridItem.classList.add(numBtnClassName);
        number++;
      }
    }
    buttonContainer.appendChild(gridItem);
  }
}

// Number buttons
const numBtnArray = document.querySelectorAll('.number-button');

for (let i = 0; i < numBtnArray.length; i++) {
  numBtnArray[i].addEventListener('click', () => {
    if (currentOperator === 'add' || currentOperator === 'subtract' ||
      currentOperator === 'multiply' || currentOperator === 'divide') {
      displayScreen.textContent = '';
    }
    displayScreen.textContent += numBtnArray[i].textContent;
  });
}


//Operator buttons
const operatorBtnArray = document.querySelectorAll('button.operator');

for (let i = 0; i < operatorBtnArray.length; i++) {
  operatorBtnArray[i].addEventListener('click', () => {
    if (operatorBtnArray[i].classList.contains(addBtnClassName)) {
      currentOperator = 'add';
      operate(addBtnClassName, Number(displayScreen.textContent));
    } else if (operatorBtnArray[i].classList.contains(subtractBtnClassName)) {
      currentOperator = 'subtract';
      operate(subtractBtnClassName, Number(displayScreen.textContent));
    } else if (operatorBtnArray[i].classList.contains(multiplyBtnClassName)) {
      currentOperator = 'multiply';
      operate(multiplyBtnClassName, Number(displayScreen.textContent));
    } else if (operatorBtnArray[i].classList.contains(divideBtnClassName)) {
      currentOperator = 'divide';
      operate(divideBtnClassName, Number(displayScreen.textContent));
    } else if (operatorBtnArray[i].classList.contains(equalsBtnClassName)) {
      operate(equalsBtnClassName, Number(displayScreen.textContent));
    }
  });
}
