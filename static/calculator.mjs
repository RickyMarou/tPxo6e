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
 * @returns {CalculatorState}
 */
export function appendDecimalSeparator({
  firstOperand,
  secondOperand,
  operator,
}) {
  const newState = {
    firstOperand,
    secondOperand,
    operator,
  };

  if (firstOperand && operator) {
    if (secondOperand === "0" || !secondOperand) {
      newState.secondOperand = "0,";
    } else if (!secondOperand.includes(",")) {
      newState.secondOperand += ",";
    }
    return newState;
  }

  if (firstOperand === "0" || !firstOperand) {
    newState.firstOperand = "0,";
  } else if (!firstOperand.includes(",")) {
    newState.firstOperand += ",";
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

  if (operator && !secondOperand) {
    beep();
    return newState;
  }

  if (firstOperand && operator && secondOperand) {
    if (secondOperand.length > 1) {
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
  /**
   * @type CalculatorState
   */
  let newState = { firstOperand, secondOperand, operator };

  if ((operator && secondOperand) || operator === "=") {
    newState = calculate({
      firstOperand: firstOperand ?? "0",
      secondOperand,
      operator,
    });
  } else {
    newState = {
      firstOperand: firstOperand ?? "0",
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
  const firstOperand = parseFloat(state.firstOperand?.replace(",", ".") || "0");
  const secondOperand = parseFloat(
    state.secondOperand?.replace(",", ".") || "0"
  );

  if (Number.isNaN(firstOperand) || Number.isNaN(secondOperand)) {
    return { firstOperand: "Not a number" };
  }

  switch (state.operator) {
    case "+":
      return {
        firstOperand: format(firstOperand + secondOperand),
      };
    case "-":
      return {
        firstOperand: format(firstOperand - secondOperand),
      };
    case "*":
      return {
        firstOperand: format(firstOperand * secondOperand),
      };
    case "/":
      return {
        firstOperand: format(firstOperand / secondOperand),
      };
    default:
      return state;
  }

  function format(number) {
    if (number === Infinity) {
      return "Infinity";
    }

    if (Number.isNaN(number)) {
      return "Not a number";
    }

    const formattedNumber = new Intl.NumberFormat("de")
      .format(number)
      .replace(/\./g, "");

    if (formattedNumber.length > 29) {
      return new Intl.NumberFormat("de", { notation: "scientific" })
        .format(number)
        .replace(/\./g, "");
    }

    return formattedNumber;
  }
}

function beep() {
  if (typeof window === "undefined") {
    console.log("BEEP");
    return;
  }

  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 400;
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(function () {
    oscillator.stop();
  }, 100);
}
