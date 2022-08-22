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

//Get the grid container
const buttonContainer = document.querySelector('.buttons-container');

//Get the grid object
const gridComputedStyle = window.getComputedStyle(buttonContainer);

// // get number of grid rows
// const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
// // get number of grid columns
// const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

let number = 7;
//Create the buttons as grid items
for (let rowCount = 0; rowCount < 4; rowCount++) {
  for (let colCount = 0; colCount < 4; colCount++) {
    const gridItem = document.createElement('button');
    if (colCount === 3) {
      switch (rowCount) {
        case 0: gridItem.textContent = '+'; gridItem.classList.add('add-button'); number = 4; break;
        case 1: gridItem.textContent = '-'; gridItem.classList.add('subtract-button'); number = 1; break;
        case 2: gridItem.textContent = 'x'; gridItem.classList.add('multiply-button'); number = 0; break;
        case 3: gridItem.textContent = '÷'; gridItem.classList.add('divide-button'); break;
      }
    } else {
      if (rowCount === 3) {
        switch (colCount) {
          case 0: gridItem.textContent = `${number}`; gridItem.classList.add('number-button'); break;
          case 1: gridItem.textContent = 'Undo'; gridItem.classList.add('undo-button'); break;
          case 2: gridItem.textContent = 'Clear All'; gridItem.classList.add('clear-button'); break;
        }
      } else {
        gridItem.textContent = `${number}`;
        gridItem.classList.add('number-button');
        number++;
      }
    }
    buttonContainer.appendChild(gridItem);
  }
}