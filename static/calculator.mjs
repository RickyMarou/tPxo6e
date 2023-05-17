// @ts-check

/**
 * The state of the calculator
 * @typedef {Object} CalculatorState
 * @property {string|undefined} [firstOperand]
 * @property {string|undefined} [secondOperand]
 * @property {"+"|"/"|"*"|"-"|undefined} [operator]
 */

/**
 * @param {{
 *  state: CalculatorState
 *  numberStr: string
 * }} param0
 * @returns {CalculatorState}
 */
export function appendNumber({ state, numberStr }) {
  const { firstOperand, secondOperand, operator } = state;
  const newState = {
    firstOperand,
    secondOperand,
    operator,
  };

  if (firstOperand && operator) {
    if (secondOperand === "0" || !secondOperand) {
      newState.secondOperand = numberStr;
    } else {
      newState.secondOperand += numberStr;
    }
    return newState;
  }

  if (firstOperand === "0" || !firstOperand) {
    newState.firstOperand = numberStr;
  } else {
    newState.firstOperand += numberStr;
  }
  return newState;
}

/**
 * @param {CalculatorState} state
 * @returns {string}
 */
export function display({ firstOperand, secondOperand, operator }) {
  if (firstOperand && operator) {
    return secondOperand || "0";
  }

  return firstOperand || "0";
}

/**
 * @param {CalculatorState} state
 * @returns {CalculatorState}
 */
export function deleteNumber({ firstOperand, secondOperand, operator }) {
  const newState = {
    firstOperand,
    secondOperand,
    operator,
  };

  if (operator) {
    if (secondOperand && secondOperand.length > 1) {
      newState.secondOperand = secondOperand.slice(0, -1);
    } else {
      newState.secondOperand = undefined;
    }

    return newState;
  }

  if (firstOperand && firstOperand.length > 1) {
    newState.firstOperand = firstOperand.slice(0, -1);
  } else {
    newState.firstOperand = undefined;
  }
  return newState;
}
