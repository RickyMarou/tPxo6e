import {
  appendNumber,
  display,
  deleteNumber,
  appendDecimalSeparator,
  setOperator,
} from "./calculator.mjs";

const displayContent = document.getElementById("display-content");
const resetButton = document.getElementById("reset");
const decimalSeparatorButton = document.getElementById("decimal-separator");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");

let state = {
  firstOperand: undefined,
  secondOperand: undefined,
  operator: undefined,
};

updateDisplay();

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (event) => {
    handleNumberInput(event.target.innerText);
  });
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (event) => {
    handleOperator(event.target.dataset.operator);
  });
});

resetButton.addEventListener("click", () => {
  state = {};
  updateDisplay();
});

decimalSeparatorButton.addEventListener("click", () => {
  state = appendDecimalSeparator(state);
  updateDisplay();
});

function handleNumberInput(numberStr) {
  state = appendNumber({ state, numberStr });
  updateDisplay();
}

function updateDisplay() {
  displayContent.innerText = display(state);
  adjustDisplaySize();
}

function handleDelete() {
  state = deleteNumber(state);
  updateDisplay();
}

function handleOperator(operator) {
  state = setOperator({ state, operator });
  updateDisplay();
}

function adjustDisplaySize() {
  const contentLength = displayContent.innerText.length;
  if (contentLength <= 8) {
    displayContent.style.removeProperty("font-size");
    return;
  }

  const overflowingCharacterCount = contentLength - 8;
  const fontSize = Math.max(0.3, 1 - overflowingCharacterCount * 0.07);

  displayContent.style.fontSize = `${fontSize}em`;
}

function findElementFromKey(key) {
  const buttons = Array.from(document.querySelectorAll("[data-keys]"));
  return buttons.find((button) => {
    const keys = button.dataset.keys?.split(" ");
    return keys?.includes(key);
  });
}

document.addEventListener("keydown", (keyboardEvent) => {
  const { key } = keyboardEvent;
  findElementFromKey(key)?.classList.add("active");
  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      handleNumberInput(key);
      break;
    case "Backspace":
    case "Delete":
      handleDelete();
      break;
    case "Enter":
    case "=":
      handleOperator("=");
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      handleOperator(key);
      break;
    case "c":
    case "Escape":
      state = {};
      updateDisplay();
      break;
    case ",":
    case ".":
      state = appendDecimalSeparator(state);
      updateDisplay();
      break;
    default:
      console.log(`pressed ${key}`);
      break;
  }
});

document.addEventListener("keyup", (keyboardEvent) => {
  const { key } = keyboardEvent;
  findElementFromKey(key)?.classList.remove("active");
});
