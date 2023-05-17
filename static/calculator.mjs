// @ts-check

/**
 * The state of the calculator
 * @typedef {Object} CalculatorState
 * @property {string|undefined} firstOperand
 * @property {string|undefined} secondOperand
 * @property {"+"|"/"|"*"|"-"|undefined} operator
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
