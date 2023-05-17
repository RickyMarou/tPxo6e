// @ts-check

/**
 * @typedef {"+"|"/"|"*"|"-"|"="} Operator
 */

/**
 * The state of the calculator
 * @typedef {Object} CalculatorState
 * @property {string|undefined} [firstOperand]
 * @property {string|undefined} [secondOperand]
 * @property {Operator|undefined} [operator]
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
  if (firstOperand && operator && secondOperand) {
    return secondOperand;
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

/**
 * @param {{
 *  state: CalculatorState
 *  operator: Operator
 * }} param0
 * @returns {CalculatorState}
 */
export function setOperator({
  state: { firstOperand, secondOperand, operator },
  operator: newOperator,
}) {
  let newState;

  if (operator || operator === "=") {
    newState = calculate({ firstOperand, secondOperand, operator });
  } else {
    newState = {
      firstOperand,
      secondOperand,
      operator,
    };
  }

  newState.operator = newOperator;
  return newState;
}

/**
 * @param {CalculatorState} state
 * @returns {CalculatorState}
 */
export function calculate(state) {
  const firstOperand = parseFloat(state.firstOperand || "0");
  const secondOperand = parseFloat(state.secondOperand || "0");

  if (Number.isNaN(firstOperand) || Number.isNaN(secondOperand)) {
    return state;
  }

  switch (state.operator) {
    case "+":
      return {
        firstOperand: (firstOperand + secondOperand).toString(),
      };
    case "-":
      return {
        firstOperand: (firstOperand - secondOperand).toString(),
      };
    case "*":
      return {
        firstOperand: (firstOperand * secondOperand).toString(),
      };
    case "/":
      return {
        firstOperand: (firstOperand / secondOperand).toString(),
      };
    default:
      return state;
  }
}
