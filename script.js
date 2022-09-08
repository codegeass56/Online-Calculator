/*Global variables*/
//Holds the current operator
let currentOperator = null;

//Flag to check if user can input
let userInputStateActive = true;

//Holds the last calculation result
let prevResult = null;

//Holds the sequence of number inputs
let inputNumbers = [];

//Class names assigned to buttons
const numBtnClassName = 'number-button';
const operatorBtnClassName = 'operator';
const addBtnClassName = 'add-button';
const subtractBtnClassName = 'subtract-button';
const multiplyBtnClassName = 'multiply-button';
const divideBtnClassName = 'divide-button';
const equalsBtnClassName = 'equals-button';
const dotBtnClassName = 'dot-button';

//Get display screen and set to default value
const displayScreen = document.querySelector('.screen-content');
displayScreen.textContent = '0';

//Create calculator buttons grid
const buttonContainer = document.querySelector('.buttons-container');
createCalculatorGrid(4, 4, buttonContainer);

// Get number buttons
const numBtnArray = document.querySelectorAll('.number-button');

//Add listeners to all number buttons
for (let i = 0; i < numBtnArray.length; i++) {
  numBtnArray[i].addEventListener('click', () => {
    //Check for previous user input
    if (userInputStateActive) {
      displayScreen.textContent = '';
      userInputStateActive = false;
    }
    //Append number to screen value
    displayScreen.textContent += numBtnArray[i].textContent;

    //Clear any previous calculation result
    if (prevResult) {
      prevResult = null;
    }
  });
}

//Get operator buttons
const operatorBtnArray = document.querySelectorAll('.operator');

//Add listeners to all operator buttons
for (let i = 0; i < operatorBtnArray.length; i++) {
  operatorBtnArray[i].addEventListener('click', () => {
    //Check if operation is to be performed on a previous result
    if (prevResult) {
      inputNumbers.push(prevResult); //Append previous result to array of inputs
      prevResult = null;
    }

    if (operatorBtnArray[i].classList.contains(addBtnClassName)) {
      //Check if any pending operation is to be performed to update the display
      if (currentOperator != null && currentOperator != 'add') {
        executePrevOperation(addBtnClassName);
      } else {
        if (currentOperator != 'add') {
          currentOperator = 'add';
        }
        operate(addBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(subtractBtnClassName)) {
      if (currentOperator != null && currentOperator != 'subtract') {
        executePrevOperation(subtractBtnClassName);
      } else {
        if (currentOperator != 'subtract') {
          currentOperator = 'subtract';
        }
        operate(subtractBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(multiplyBtnClassName)) {
      if (currentOperator != null && currentOperator != 'multiply') {
        executePrevOperation(multiplyBtnClassName);
      } else {
        if (currentOperator != 'multiply') {
          currentOperator = 'multiply';
        }
        operate(multiplyBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(divideBtnClassName)) {
      if (currentOperator != null && currentOperator != 'divide') {
        executePrevOperation(divideBtnClassName);
      } else {
        if (currentOperator != 'divide') {
          currentOperator = 'divide';
        }
        operate(divideBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(equalsBtnClassName)) {
      operate(equalsBtnClassName, Number(displayScreen.textContent));
    }
  });
}

//Creates a very specific calculator buttons grid
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
              gridItem.classList.add(dotBtnClassName);
              break;

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

function add(value) {
  //Add input number to array
  inputNumbers.push(value);

  //Check if it is a chaining operation involving more than 2 numbers
  if (inputNumbers.length >= 2) {
    displayScreen.textContent = inputNumbers.reduce((previousValue, currentValue) => previousValue + currentValue);
    inputNumbers = [];
    inputNumbers.push(displayScreen.textContent);
  }
}

function subtract(value) {
  //Add input number to array
  inputNumbers.push(value);

  //Check if it is a chaining operation involving more than 2 numbers
  if (inputNumbers.length >= 2) {
    displayScreen.textContent = inputNumbers.reduce((previousValue, currentValue) => previousValue - currentValue);
    inputNumbers = [];
    inputNumbers.push(displayScreen.textContent);
  }
}

function multiply(value) {
  //Add input number to array
  inputNumbers.push(value);

  //Check if it is a chaining operation involving more than 2 numbers
  if (inputNumbers.length >= 2) {
    displayScreen.textContent = inputNumbers.reduce((previousValue, currentValue) => previousValue * currentValue);
    inputNumbers = [];
    inputNumbers.push(displayScreen.textContent);
  }
}

function divide(divisor) {
  //if divisor is zero then do nothing
  if (!divisor) {
    displayScreen.textContent = 'Division by zero!';
    return;
  }
  //Add input number to array
  inputNumbers.push(divisor);

  //Check if it is a chaining operation involving more than 2 numbers
  if (inputNumbers.length >= 2) {
    displayScreen.textContent = Math.round(inputNumbers.reduce((previousValue, currentValue) => previousValue / currentValue));
    inputNumbers = [];
    inputNumbers.push(displayScreen.textContent);
  }
}

//Perform operation on value as per operator name
function operate(operatorName, value) {
  //Check for user input mode
  if (userInputStateActive === false) {
    switch (operatorName) {
      case addBtnClassName:
        add(value);
        userInputStateActive = true; //Enable user input after calculation
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

      //Finalize result if equals button is clicked
      case equalsBtnClassName:
        if (currentOperator === 'add') {
          showFinalResult(value);
        } else if (currentOperator === 'subtract') {
          showFinalResult(value);
        } else if (currentOperator === 'multiply') {
          showFinalResult(value);
        } else if (currentOperator === 'divide') {
          showFinalResult(value);
        }
        break;
    }
  }
}

//Calculate and show final results
function showFinalResult(lastInput) {
  switch (currentOperator) {
    case 'add': add(lastInput); break;
    case 'subtract': subtract(lastInput); break;
    case 'multiply': multiply(lastInput); break;
    case 'divide': divide(lastInput); break;
  }

  //Reset global variables
  prevResult = Number(displayScreen.textContent);
  userInputStateActive = true;
  currentOperator = null;
  inputNumbers = [];
}

//Executes the previous operation and sets the next operation
function executePrevOperation(nextOperationToBeSet) {
  //Execute previous operation
  switch (currentOperator) {
    case 'add': operate(addBtnClassName, Number(displayScreen.textContent)); break;
    case 'subtract': operate(subtractBtnClassName, Number(displayScreen.textContent)); break;
    case 'multiply': operate(multiplyBtnClassName, Number(displayScreen.textContent)); break;
    case 'divide': operate(divideBtnClassName, Number(displayScreen.textContent)); break;
  }

  //Set the next operation
  switch (nextOperationToBeSet) {
    case addBtnClassName: currentOperator = 'add'; break;
    case subtractBtnClassName: currentOperator = 'subtract'; break;
    case multiplyBtnClassName: currentOperator = 'multiply'; break;
    case divideBtnClassName: currentOperator = 'divide'; break;
  }
}