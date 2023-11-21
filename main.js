const displayInput = document.querySelector("#calculator-input");
// console.log(displayInput);

const allButton = document.querySelector(".calculator-keys");
// console.log(allButton);

const clearButton = document.querySelector(".clear")
// console.log(clearButton);


let displayValue = "0";
let firstValue = null;
let operator = null;
let secondValue = false;

updateDisplay();

function updateDisplay() {
  displayInput.value = displayValue
}

allButton.addEventListener("click", function (e) {
  const element = e.target;
  if (!element.matches("button"))
    return;

  if (element.classList.contains("operator")) {
    // console.log("operator", element.value);
    handleOperator(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("decimal")) {
    // console.log("decimal", element.value);
    inputDecimal();
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    clear();
    updateDisplay();

    // console.log("clear", element.value);
    return;
  }

  // console.log(element.value);

  inputNumber(element.value);
  updateDisplay();
});

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && secondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  }
  else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = `${parseFloat(result.toFixed(8))}`;
    firstValue = result;
  }
  secondValue = true;
  operator = nextOperator;

  console.log(displayValue, firstValue, operator, secondValue);
}
function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  }
  else if (operator === "-") {
    return first - second;
  }
  else if (operator === "*") {
    return first * second;

  } else if (operator === "/") {
    return first / second;
  }
  return second;
}

function inputNumber(num) {
  if (secondValue) {
    displayValue = num;
    secondValue = false;
  }
  else {
    displayValue = displayValue === "0" ? num :
      displayValue + num;
  }
  console.log(displayValue, firstValue, operator, secondValue);
}

function inputDecimal() {
  if (!displayValue.includes("."))
    displayValue += "."
}

function clear() {
  displayValue = "0"
}


