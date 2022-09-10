/*Global variables*/
//Holds the current operator
let currentOperator = null;

//Flag to check if user can input
let userInputStateActive = true;

//Holds the last calculation result
let prevResult = null;

//Holds the sequence of number inputs
let inputNumbers = [];

//Holds the screen character limit
const SCREEN_CHAR_LIMIT = 11;

//Class names assigned to buttons
const numBtnClassName = 'number-button';
const operatorBtnClassName = 'operator';
const addBtnClassName = 'add-button';
const subtractBtnClassName = 'subtract-button';
const multiplyBtnClassName = 'multiply-button';
const divideBtnClassName = 'divide-button';
const equalsBtnClassName = 'equals-button';
const dotBtnClassName = 'dot-button';
const mouseHoverClassName = 'mouse-hover-active';
const keyboardHoverClassName = 'keyboard-hover-active';
const clearBtnClassName = 'clear-button';

//Get display screen and set to default value
const displayScreen = document.querySelector('.screen-content');
displayScreen.textContent = '0';

//Create calculator buttons grid
const buttonContainer = document.querySelector('.buttons-container');
createCalculatorButtons();

// Get number buttons
const numBtnArray = document.querySelectorAll('.number-button');

//Add listeners to all number buttons
for (let i = 0; i < numBtnArray.length; i++) {
  numBtnArray[i].addEventListener('click', () => {
    displayScreen.style.fontSize = '80px';
    //Check for previous user input
    if (userInputStateActive) {
      //Clear any previous calculation result
      if (prevResult != null) {
        if (numBtnArray[i].textContent === '.') {
          displayScreen.textContent = '0';
        } else {
          displayScreen.textContent = '';
        }
        prevResult = null;
      }
      if (numBtnArray[i].textContent === '.') {
        displayScreen.textContent = '0';
      } else {
        displayScreen.textContent = '';
      }
      userInputStateActive = false;
    }
    if (displayScreen.textContent.length < SCREEN_CHAR_LIMIT) {
      if (numBtnArray[i].textContent === '.') {
        if (displayScreen.textContent.includes('.')) {
          return;
        }
      }
      //Append number to screen value
      displayScreen.textContent += numBtnArray[i].textContent;
    }
  });
}

/*Keyboard events*/
document.addEventListener('keypress', (event) => {
  //Check if number key is pressed
  if (isNaN(event.key) === false || event.key === '.') {
    displayScreen.style.fontSize = '80px';
    //Get clicked number key
    let numberButtons = document.querySelectorAll('.' + numBtnClassName);
    let clickedButton = Array.from(numberButtons).find(element => element.textContent === event.key);

    triggerButtonAnimation(clickedButton);

    // //Check for previous user input
    // if (userInputStateActive) {
    //   displayScreen.textContent = '';
    //   userInputStateActive = false;
    // }
    // if (displayScreen.textContent.length < SCREEN_CHAR_LIMIT) {
    //   //Append number to screen value
    //   displayScreen.textContent += event.key;
    // }
    // //Clear any previous calculation result
    // if (prevResult) {
    //   prevResult = null;
    // }
    //Check for previous user input
    if (userInputStateActive) {
      //Clear any previous calculation result
      if (prevResult != null) {
        if (event.key === '.') {
          displayScreen.textContent = '0';
        } else {
          displayScreen.textContent = '';
        }
        prevResult = null;
      }
      if (event.key === '.') {
        displayScreen.textContent = '0';
      } else {
        displayScreen.textContent = '';
      }
      userInputStateActive = false;
    }
    if (displayScreen.textContent.length < SCREEN_CHAR_LIMIT) {
      if (event.key === '.') {
        if (displayScreen.textContent.includes('.')) {
          return;
        }
      }
      //Append number to screen value
      displayScreen.textContent += event.key;
    }
  }
  //Check if operator key is pressed
  else {
    //Get clicked operator key
    let operatorButtons = document.querySelectorAll('.' + operatorBtnClassName);
    let operatorButtonsArray = Array.from(operatorButtons);
    let clickedButton;
    switch (event.key) {
      case '+': clickedButton = operatorButtonsArray
        .find(element => element.textContent === '+');
        break;
      case '-': clickedButton = operatorButtonsArray
        .find(element => element.textContent === '-');
        break;
      case 'X':
      case '*':
      case 'x': clickedButton = operatorButtonsArray
        .find(element => element.textContent === 'x');
        break;
      case '/': clickedButton = operatorButtonsArray
        .find(element => element.textContent === '÷');
        break;
      case 'Enter':
      case '=': clickedButton = operatorButtonsArray
        .find(element => element.textContent === '=');
        break;
      default: return;
    }
    triggerButtonAnimation(clickedButton);
    if (prevResult) {
      inputNumbers.push(prevResult); //Append previous result to array of inputs
      prevResult = null;
    }
    //Trigger operation
    switch (event.key) {
      case '+':
        //Check if any pending operation is to be performed to update the display
        if (currentOperator != null && currentOperator != 'add') {
          executePrevOperation(addBtnClassName);
        } else {
          if (currentOperator != 'add') {
            currentOperator = 'add';
          }
          operate(addBtnClassName, Number(displayScreen.textContent));
        }
        break;
      case '-':
        if (currentOperator != null && currentOperator != 'subtract') {
          executePrevOperation(subtractBtnClassName);
        } else {
          if (currentOperator != 'subtract') {
            currentOperator = 'subtract';
          }
          operate(subtractBtnClassName, Number(displayScreen.textContent));
        }
        break;
      case '*':
      case 'X':
      case 'x':
        if (currentOperator != null && currentOperator != 'multiply') {
          executePrevOperation(multiplyBtnClassName);
        } else {
          if (currentOperator != 'multiply') {
            currentOperator = 'multiply';
          }
          operate(multiplyBtnClassName, Number(displayScreen.textContent));
        }
        break;
      case '/':
        if (currentOperator != null && currentOperator != 'divide') {
          executePrevOperation(divideBtnClassName);
        } else {
          if (currentOperator != 'divide') {
            currentOperator = 'divide';
          }
          operate(divideBtnClassName, Number(displayScreen.textContent));
        }
        break;
      case 'Enter':
      case '=':
        operate(equalsBtnClassName, Number(displayScreen.textContent));
        break;
    }
  }
}, false);

//Escape keyboard key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    //Get clicked number key
    let clearButton = document.querySelector('.clear-button');
    triggerButtonAnimation(clearButton);
    clearAndReset();
  }
}, false);



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
        executePrevOperation();
        setOperator(addBtnClassName);
      } else {
        if (currentOperator != 'add') {
          currentOperator = 'add';
        }
        operate(addBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(subtractBtnClassName)) {
      if (currentOperator != null && currentOperator != 'subtract') {
        executePrevOperation();
        setOperator(subtractBtnClassName);
      } else {
        if (currentOperator != 'subtract') {
          currentOperator = 'subtract';
        }
        operate(subtractBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(multiplyBtnClassName)) {
      if (currentOperator != null && currentOperator != 'multiply') {
        executePrevOperation();
        setOperator(multiplyBtnClassName);
      } else {
        if (currentOperator != 'multiply') {
          currentOperator = 'multiply';
        }
        operate(multiplyBtnClassName, Number(displayScreen.textContent));
      }
    } else if (operatorBtnArray[i].classList.contains(divideBtnClassName)) {
      if (currentOperator != null && currentOperator != 'divide') {
        executePrevOperation();
        setOperator(divideBtnClassName);
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

//Triggers the hover and active animations of the button
function triggerButtonAnimation(button) {
  //Trigger animation
  button.classList.add(keyboardHoverClassName);
  button.classList.remove(mouseHoverClassName);
  setTimeout(() => {
    button.classList.add(mouseHoverClassName);
    button.classList.remove(keyboardHoverClassName);
  }, 150)
}

//Creates a very specific calculator buttons grid
function createCalculatorButtons() {
  let buttonTextValue = 7;
  //Create the buttons as grid items
  for (let rowCount = 0; rowCount < 4; rowCount++) {
    for (let colCount = 0; colCount < 4; colCount++) {
      const gridItem = document.createElement('button');
      if (colCount === 3) {
        switch (rowCount) {
          case 0: gridItem.textContent = '+';
            gridItem.classList.add(operatorBtnClassName);
            gridItem.classList.add(addBtnClassName);
            gridItem.classList.add(mouseHoverClassName);
            buttonTextValue = 4; break;

          case 1: gridItem.textContent = '-';
            gridItem.classList.add(operatorBtnClassName);
            gridItem.classList.add(subtractBtnClassName);
            gridItem.classList.add(mouseHoverClassName);
            buttonTextValue = 1; break;

          case 2: gridItem.textContent = 'x';
            gridItem.classList.add(operatorBtnClassName);
            gridItem.classList.add(multiplyBtnClassName);
            gridItem.classList.add(mouseHoverClassName);
            buttonTextValue = 0; break;

          case 3: gridItem.textContent = '÷';
            gridItem.classList.add(operatorBtnClassName);
            gridItem.classList.add(divideBtnClassName);
            gridItem.classList.add(mouseHoverClassName);
            break;
        }
      } else {
        if (rowCount === 3) {
          switch (colCount) {
            case 0: gridItem.textContent = `${buttonTextValue}`;
              gridItem.classList.add(numBtnClassName);
              gridItem.classList.add(mouseHoverClassName);
              break;

            case 1: gridItem.textContent = '.';
              gridItem.classList.add(dotBtnClassName);
              gridItem.classList.add(numBtnClassName);
              gridItem.classList.add(mouseHoverClassName);
              break;

            case 2: gridItem.textContent = '=';
              gridItem.classList.add(operatorBtnClassName);
              gridItem.classList.add(equalsBtnClassName);
              gridItem.classList.add(mouseHoverClassName);
              break;
          }
        } else {
          gridItem.textContent = `${buttonTextValue}`;
          gridItem.classList.add(numBtnClassName);
          gridItem.classList.add(mouseHoverClassName);
          buttonTextValue++;
        }
      }
      buttonContainer.appendChild(gridItem);
    }
  }

  //All Clear button
  const clearBtn = document.createElement('button');
  clearBtn.classList.add(clearBtnClassName);
  clearBtn.classList.add(mouseHoverClassName);
  clearBtn.textContent = 'AC';
  clearBtn.addEventListener('click', clearAndReset);
  buttonContainer.appendChild(clearBtn);
}

//Clear and reset calculator
function clearAndReset() {
  displayScreen.style.fontSize = '80px';
  displayScreen.textContent = '0';
  userInputStateActive = true;
  currentOperator = null;
  inputNumbers = [];
}

//Executes the previous operation
function executePrevOperation() {
  switch (currentOperator) {
    case 'add': operate(addBtnClassName, Number(displayScreen.textContent)); break;
    case 'subtract': operate(subtractBtnClassName, Number(displayScreen.textContent)); break;
    case 'multiply': operate(multiplyBtnClassName, Number(displayScreen.textContent)); break;
    case 'divide': operate(divideBtnClassName, Number(displayScreen.textContent)); break;
  }
}

//Sets the operator based on the given name
function setOperator(operatorBtnClassName) {
  switch (operatorBtnClassName) {
    case addBtnClassName: currentOperator = 'add'; break;
    case subtractBtnClassName: currentOperator = 'subtract'; break;
    case multiplyBtnClassName: currentOperator = 'multiply'; break;
    case divideBtnClassName: currentOperator = 'divide'; break;
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
        showFinalResult(value);
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

//Round the result accurately
function roundResult(result) {
  let resultString = result.toString();
  let resultLength = resultString.length;
  if (resultLength > SCREEN_CHAR_LIMIT) {
    let rounder;
    if (resultString.includes('.')) {
      // rounder = Math.pow(10, 6);
      let decimalPosition = resultString.indexOf('.');
      let numberBeforeDecimal = resultString.substring(0, decimalPosition);

      if (numberBeforeDecimal.length > SCREEN_CHAR_LIMIT) {
        rounder = Math.pow(10, numberBeforeDecimal.length - SCREEN_CHAR_LIMIT);
        result = Math.round(Number(numberBeforeDecimal) / rounder);
      } else if (numberBeforeDecimal.length === SCREEN_CHAR_LIMIT) {
        result = Math.round(result);
      } else {
        rounder = Math.pow(10, SCREEN_CHAR_LIMIT - numberBeforeDecimal.length);
        result = Math.round(result * rounder) / rounder;
      }
    } else {
      result = result / Math.pow(10, resultLength - 1);
      rounder = Math.pow(10, 9);
      result = Math.round(result * rounder) / rounder;
    }
  }
  return result;
}

function add(value) {
  //Add input number to array
  inputNumbers.push(value);

  //Check if it is a chaining operation involving more than 2 numbers
  if (inputNumbers.length >= 2) {
    let result = inputNumbers.reduce((previousValue, currentValue) => previousValue + currentValue);
    displayScreen.textContent = roundResult(result);

    //Make the result the first element of the array
    inputNumbers = [];
    inputNumbers.push(Number(displayScreen.textContent));
  }
}

function subtract(value) {
  //Add input number to array
  inputNumbers.push(value);

  //Check if it is a chaining operation involving more than 2 numbers
  if (inputNumbers.length >= 2) {
    let result = inputNumbers.reduce((previousValue, currentValue) => previousValue - currentValue);
    displayScreen.textContent = roundResult(result);

    //Make the result the first element of the array
    inputNumbers = [];
    inputNumbers.push(Number(displayScreen.textContent));
  }
}

function multiply(value) {
  //Add input number to array
  inputNumbers.push(value);

  //Check if it is a chaining operation involving more than 2 numbers
  if (inputNumbers.length >= 2) {
    let result = inputNumbers.reduce((previousValue, currentValue) => previousValue * currentValue);
    displayScreen.textContent = roundResult(result);

    //Make the result the first element of the array
    inputNumbers = [];
    inputNumbers.push(Number(displayScreen.textContent));
  }
}

function divide(divisor) {
  //if divisor is zero then do nothing
  if (!divisor) {
    displayScreen.style.fontSize = '40px';
    displayScreen.textContent = 'To infinity and beyond!';
    return;
  }
  //Add input number to array
  inputNumbers.push(divisor);

  //Check if it is a chaining operation involving more than 2 numbers
  if (inputNumbers.length >= 2) {
    let result = inputNumbers.reduce((previousValue, currentValue) => previousValue / currentValue);
    displayScreen.textContent = roundResult(result);

    //Make the result the first element of the array
    inputNumbers = [];
    inputNumbers.push(Number(displayScreen.textContent));
  }
}