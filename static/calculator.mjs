/**
 * @property {string} firstOperand
 * @property {string} secondOperand
 * @property {string} secondOperand
 */
export const state = {
  firstOperand: "0",
  secondOperand: "0",
  operator: undefined,
};

/**
 * @description Handles inputting a new number in the calculator
 * @param {string} numberStr the number inputted by the user
 * @returns {string} what to show on the calculator display
 */
export function appendNumber(numberStr) {
  const { firstOperand, secondOperand, operator } = state;
  if (firstOperand && operator) {
    if (secondOperand === "0" || !secondOperand) {
      state.secondOperand = numberStr;
    } else {
      state.secondOperand += numberStr;
    }
    return state.secondOperand;
  }

  if (firstOperand === "0" || !firstOperand) {
    state.firstOperand = numberStr;
  } else {
    state.firstOperand += numberStr;
  }
  return state.firstOperand;
}

/**
 * @description Handles backspace key or the DEL button
 * @returns {string} what to show on the calculator display
 */
export function popNumber() {
  const { firstOperand, secondOperand, operator } = state;
  if (firstOperand && operator) {
    state.secondOperand = secondOperand.slice(0, -1);
    return state.secondOperand;
  }

  state.firstOperand = firstOperand.slice(0, -1);
  return state.firstOperand;
}

export function setOperand(number) {
  if (state.firstOperand && state.operator) {
    state.secondOperand = number;
    console.log(state);
    return;
  }

  state.firstOperand = number;
  console.log(state);
  return;
}

/**
 *
 * @param {*} operator
 * @returns returns what to display on the screen after setting the operator
 */
export function setOperator(operator) {
  const { operator: previousOperator, firstOperand, secondOperand } = state;
  if (previousOperator && firstOperand && secondOperand) {
    return calculate({ nextOperator: operator });
  }
  state.operator = operator;
  console.log(state);
  return "";
}

/**
 *
 * @returns what to display on the screen after executing the operation
 */
export function calculate({ nextOperator }) {
  const { operator, firstOperand, secondOperand } = state;
  console.log("calculating", state);
  // TODO: Case for no second operand and one operator (self operation)
  // TODO: Case for no second operand and no operator
  let result;
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      result = firstOperand / secondOperand;
      break;
  }

  state.firstOperand = result;
  state.secondOperand = undefined;
  state.operator = nextOperator;
  console.log("calculated", state);
  return result;
}

export function _mockState({ firstOperand, secondOperand, operator }) {
  if (typeof window !== "undefined" && typeof window.document !== "undefined") {
    throw new Error("This function is meant to be used in tests only");
  }

  if (firstOperand) {
    state.firstOperand = firstOperand;
  }
  if (secondOperand) {
    state.secondOperand = secondOperand;
  }
  if (operator) {
    state.operator = operator;
  }
}
