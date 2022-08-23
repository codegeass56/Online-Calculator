//Global variables
let accumulator = 0;
let currentOperator = null;
let userInputStateActive = true;
let prevResult = null;

//Button class variables
const numBtnClassName = 'number-button';
const operatorBtnClassName = 'operator';
const addBtnClassName = 'add-button';
const subtractBtnClassName = 'subtract-button';
const multiplyBtnClassName = 'multiply-button';
const divideBtnClassName = 'divide-button';
const equalsBtnClassName = 'equals-button';
const dotBtnClassName = 'dot-button';

//Get display screen
const displayScreen = document.querySelector('.screen-content');
displayScreen.textContent = '0';

//Create calculator grid
const buttonContainer = document.querySelector('.buttons-container');
createCalculatorGrid(4, 4, buttonContainer);

// Add listeners to number buttons
const numBtnArray = document.querySelectorAll('.number-button');

for (let i = 0; i < numBtnArray.length; i++) {
  numBtnArray[i].addEventListener('click', () => {
    if (userInputStateActive) {
      displayScreen.textContent = '';
      userInputStateActive = false;
    }
    displayScreen.textContent += numBtnArray[i].textContent;
    prevResult = null;
  });
}

//Add listeners to operator buttons
const operatorBtnArray = document.querySelectorAll('button.operator');

for (let i = 0; i < operatorBtnArray.length; i++) {
  operatorBtnArray[i].addEventListener('click', () => {
    if (prevResult) {
      accumulator = prevResult;
      prevResult = null;
    }

    if (operatorBtnArray[i].classList.contains(addBtnClassName)) {
      if (currentOperator != null && currentOperator != 'add') {
        executePrevOperation(addBtnClassName);
      } else {
        currentOperator = 'add';
        operate(addBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(subtractBtnClassName)) {
      if (currentOperator != null && currentOperator != 'subtract') {
        executePrevOperation(subtractBtnClassName);
      } else {
        currentOperator = 'subtract';
        operate(subtractBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(multiplyBtnClassName)) {
      if (currentOperator != null && currentOperator != 'multiply') {
        executePrevOperation(multiplyBtnClassName);
      } else {
        currentOperator = 'multiply';
        operate(multiplyBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(divideBtnClassName)) {
      if (currentOperator != null && currentOperator != 'divide') {
        executePrevOperation(divideBtnClassName);
      } else {
        currentOperator = 'divide';
        operate(divideBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(equalsBtnClassName)) {
      operate(equalsBtnClassName, Number(displayScreen.textContent));
    }
  });
}

function add(value) {
  accumulator += value;
  displayScreen.textContent = accumulator;
}

function subtract(value) {
  accumulator -= value;
  displayScreen.textContent = accumulator;
}

function multiply(value) {
  accumulator *= value;
  displayScreen.textContent = accumulator;
}

function divide(divisor) {
  if (divisor === 0) {
    accumulator = 0;
  } else {
    accumulator /= divisor;
  }

  displayScreen.textContent = accumulator;
}

//Perform operation on value
function operate(operatorName, value) {
  if (userInputStateActive === false) {
    //Check operator name based on class
    switch (operatorName) {
      case addBtnClassName:
        add(value);
        userInputStateActive = true; //Expect user input after operation
        break;

      case subtractBtnClassName:
        subtract(value);
        userInputStateActive = true;
        break;

      case multiplyBtnClassName:
        multiply(value);
        userInputStateActive = true;
        break;

      case divideBtnClassName:
        divide(value);
        userInputStateActive = true;
        break;

      //Finalize result if equals
      case equalsBtnClassName:
        if (currentOperator === 'add') {
          add(value);
          showFinalResult();
        } else if (currentOperator === 'subtract') {
          subtract(value);
          showFinalResult();
        } else if (currentOperator === 'multiply') {
          multiply(value);
          showFinalResult();
        } else if (currentOperator === 'divide') {
          divide(value);
          showFinalResult();
        }
        break;
    }
  }
}

//Reset variables and show final result
function showFinalResult() {
  displayScreen.textContent = accumulator;
  userInputStateActive = true;
  prevResult = accumulator;
  accumulator = 0;
  currentOperator = null;
}

//Function to execute previous operation and set the next operation
function executePrevOperation(nextOperation) {
  let value = displayScreen.textContent;
  switch (currentOperator) {
    case 'add': operate(addBtnClassName, Number(displayScreen.textContent)); break;
    case 'subtract': operate(subtractBtnClassName, Number(displayScreen.textContent)); break;
    case 'multiply': operate(multiplyBtnClassName, Number(displayScreen.textContent)); break;
    case 'divide': operate(divideBtnClassName, Number(displayScreen.textContent)); break;
  }

  //Set the next operation
  switch (nextOperation) {
    case addBtnClassName: currentOperator = 'add'; break;
    case subtractBtnClassName: currentOperator = 'subtract'; break;
    case multiplyBtnClassName: currentOperator = 'multiply'; break;
    case divideBtnClassName: currentOperator = 'divide'; break;
  }
}

function createCalculatorGrid(rowSize, colSize, gridContainer) {
  let buttonTextValue = 7;
  //Create the buttons as grid items
  for (let rowCount = 0; rowCount < rowSize; rowCount++) {
    for (let colCount = 0; colCount < colSize; colCount++) {
      const gridItem = document.createElement('button');
      if (colCount === 3) {
        switch (rowCount) {
          case 0: gridItem.textContent = '+';
            gridItem.classList.add(operatorBtnClassName);
            gridItem.classList.add(addBtnClassName);
            buttonTextValue = 4; break;

          case 1: gridItem.textContent = '-';
            gridItem.classList.add(operatorBtnClassName);
            gridItem.classList.add(subtractBtnClassName);
            buttonTextValue = 1; break;

          case 2: gridItem.textContent = 'x';
            gridItem.classList.add(operatorBtnClassName);
            gridItem.classList.add(multiplyBtnClassName);
            buttonTextValue = 0; break;

          case 3: gridItem.textContent = '÷';
            gridItem.classList.add(operatorBtnClassName);
            gridItem.classList.add(divideBtnClassName);
            break;
        }
      } else {
        if (rowCount === 3) {
          switch (colCount) {
            case 0: gridItem.textContent = `${buttonTextValue}`;
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
          gridItem.textContent = `${buttonTextValue}`;
          gridItem.classList.add(numBtnClassName);
          buttonTextValue++;
        }
      }
      gridContainer.appendChild(gridItem);
    }
  }
}