// @ts-check

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  appendNumber,
  display,
  deleteNumber,
  appendDecimalSeparator,
  setOperator,
  calculate,
} from "./calculator.mjs";

describe("calculator.mjs", { concurrency: true }, () => {
  describe("appendNumber", { concurrency: true }, () => {
    describe(
      "when operator and secondOperand are undefined",
      { concurrency: true },
      () => {
        test("replaces undefined with the first input for the first operand", () => {
          const newState = appendNumber({
            state: {},
            numberStr: "1",
          });

          assert.deepStrictEqual(newState, {
            firstOperand: "1",
            secondOperand: undefined,
            operator: undefined,
          });
        });

        test("replaces '0' with the first input for the first operand", () => {
          const newState = appendNumber({
            state: { firstOperand: "0" },
            numberStr: "1",
          });

          assert.deepStrictEqual(newState, {
            firstOperand: "1",
            secondOperand: undefined,
            operator: undefined,
          });
        });

        test("appends number to the first operand", () => {
          const newState = appendNumber({
            state: {
              firstOperand: "1",
            },
            numberStr: "2",
          });

          assert.deepStrictEqual(newState, {
            firstOperand: "12",
            secondOperand: undefined,
            operator: undefined,
          });
        });
      }
    );

    describe("when operator is defined", { concurrency: true }, () => {
      test("appends number to the second operand if the operator is defined", () => {
        const newState = appendNumber({
          state: {
            firstOperand: "12",
            operator: "+",
          },
          numberStr: "1",
        });

        assert.deepStrictEqual(newState, {
          firstOperand: "12",
          secondOperand: "1",
          operator: "+",
        });

        const lastState = appendNumber({ state: newState, numberStr: "2" });

        assert.deepStrictEqual(lastState, {
          firstOperand: "12",
          secondOperand: "12",
          operator: "+",
        });
      });

      test("replaces '0' with the first input for the second operand", () => {
        const newState = appendNumber({
          state: {
            firstOperand: "1",
            secondOperand: "0",
            operator: "+",
          },
          numberStr: "1",
        });

        assert.deepStrictEqual(newState, {
          firstOperand: "1",
          secondOperand: "1",
          operator: "+",
        });
      });
    });
  });

  describe("appendDecimalSeparator", { concurrency: true }, () => {
    describe(
      "when operator and secondOperand are undefined",
      { concurrency: true },
      () => {
        test("if the firstOperand is 0 or undefined, it should now be '0,'", () => {
          const newState = appendDecimalSeparator({});
          assert.deepStrictEqual(newState, {
            firstOperand: "0,",
            secondOperand: undefined,
            operator: undefined,
          });

          assert.deepStrictEqual(
            appendDecimalSeparator({ firstOperand: "0" }),
            {
              firstOperand: "0,",
              secondOperand: undefined,
              operator: undefined,
            }
          );
        });

        test("adds a ',' to the first operand", () => {
          const newState = appendDecimalSeparator({ firstOperand: "123" });
          assert.deepStrictEqual(newState, {
            firstOperand: "123,",
            secondOperand: undefined,
            operator: undefined,
          });
        });

        test("does not add a ',' to the first operand if already contains one", () => {
          const newState = appendDecimalSeparator({ firstOperand: "123," });
          assert.deepStrictEqual(newState, {
            firstOperand: "123,",
            secondOperand: undefined,
            operator: undefined,
          });
        });
      }
    );

    describe("when operator is defined", { concurrency: true }, () => {
      test("if the secondOperand is 0 or undefined, it should now be '0,'", () => {
        const newState = appendDecimalSeparator({
          firstOperand: "123",
          operator: "+",
        });
        assert.deepStrictEqual(newState, {
          firstOperand: "123",
          secondOperand: "0,",
          operator: "+",
        });

        assert.deepStrictEqual(
          appendDecimalSeparator({
            firstOperand: "123",
            operator: "*",
            secondOperand: "0",
          }),
          {
            firstOperand: "123",
            secondOperand: "0,",
            operator: "*",
          }
        );
      });

      test("adds a ',' to the second operand", () => {
        const newState = appendDecimalSeparator({
          firstOperand: "123",
          secondOperand: "123",
          operator: "*",
        });
        assert.deepStrictEqual(newState, {
          firstOperand: "123",
          secondOperand: "123,",
          operator: "*",
        });
      });

      test("does not add a ',' to secondOperand if already contains one", () => {
        const newState = appendDecimalSeparator({
          firstOperand: "123",
          operator: "*",
          secondOperand: "123,",
        });
        assert.deepStrictEqual(newState, {
          firstOperand: "123",
          secondOperand: "123,",
          operator: "*",
        });
      });
    });
  });

  describe("display", { concurrency: true }, () => {
    test("returns '0' if firstOperand, secondOperand and operator are undefined", () => {
      assert.strictEqual(display({}), "0");
    });

    test("returns the first operand if the operator is undefined", () => {
      assert.strictEqual(display({ firstOperand: "123" }), "123");
      assert.strictEqual(
        display({ firstOperand: "123", secondOperand: "456" }),
        "123"
      );
    });

    test("returns the first operand if the first operand and the operator are defined, but the second operand is not", () => {
      assert.strictEqual(
        display({ firstOperand: "123", operator: "+" }),
        "123"
      );
      assert.strictEqual(
        display({
          firstOperand: "123",
          operator: "+",
          secondOperand: undefined,
        }),
        "123"
      );
    });

    test("returns the second operand if the first operand, the operator and second operand are defined", () => {
      assert.strictEqual(
        display({ firstOperand: "123", operator: "+", secondOperand: "0" }),
        "0"
      );
      assert.strictEqual(
        display({ firstOperand: "123", operator: "+", secondOperand: "2" }),
        "2"
      );
    });
  });

  describe("deleteNumber", { concurrency: true }, () => {
    describe("when the operator is undefined", { concurrency: true }, () => {
      test("when the first operand has more than one character, it deletes the last character", () => {
        assert.deepEqual(deleteNumber({ firstOperand: "123" }), {
          firstOperand: "12",
          secondOperand: undefined,
          operator: undefined,
        });

        assert.deepEqual(
          deleteNumber({ firstOperand: "123", secondOperand: "23" }),
          {
            firstOperand: "12",
            secondOperand: "23",
            operator: undefined,
          }
        );
      });

      test("when the first operand has a single character, it sets it to undefined", () => {
        assert.deepEqual(deleteNumber({ firstOperand: "2" }), {
          firstOperand: undefined,
          secondOperand: undefined,
          operator: undefined,
        });

        assert.deepEqual(
          deleteNumber({ firstOperand: "2", secondOperand: "23" }),
          {
            firstOperand: undefined,
            secondOperand: "23",
            operator: undefined,
          }
        );
      });
    });

    describe("when the operator is defined", { concurrency: true }, () => {
      test("when the second operand has more than one character, it deletes the last character", () => {
        assert.deepEqual(
          deleteNumber({
            firstOperand: "123",
            secondOperand: "456",
            operator: "+",
          }),
          {
            firstOperand: "123",
            secondOperand: "45",
            operator: "+",
          }
        );
      });

      test("when the second operand has a single character, it sets it to undefined", () => {
        assert.deepEqual(
          deleteNumber({
            firstOperand: "1",
            secondOperand: "2",
            operator: "+",
          }),
          {
            firstOperand: "1",
            secondOperand: undefined,
            operator: "+",
          }
        );
      });
    });
  });

  describe("calculate", { concurrency: true }, () => {
    test("puts the result of the calculation in the first operand and resets secondOperand and operator", () => {
      assert.deepStrictEqual(
        calculate({ firstOperand: "1", secondOperand: "1", operator: "+" }),
        { firstOperand: "2" }
      );
    });

    describe(
      "Integers within Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER",
      { concurrency: true },
      () => {
        test("addition", () => {
          assert.deepStrictEqual(
            calculate({ firstOperand: "1", secondOperand: "1", operator: "+" }),
            { firstOperand: "2" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "-1",
              secondOperand: "1",
              operator: "+",
            }),
            { firstOperand: "0" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "-1",
              secondOperand: "-1",
              operator: "+",
            }),
            { firstOperand: "-2" }
          );
        });

        test("subtraction", () => {
          assert.deepStrictEqual(
            calculate({ firstOperand: "1", secondOperand: "1", operator: "-" }),
            { firstOperand: "0" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "1",
              secondOperand: "-1",
              operator: "-",
            }),
            { firstOperand: "2" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "-1",
              secondOperand: "1",
              operator: "-",
            }),
            { firstOperand: "-2" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "-1",
              secondOperand: "-1",
              operator: "-",
            }),
            { firstOperand: "0" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "Infinity",
              secondOperand: "1",
              operator: "-",
            }),
            { firstOperand: "Infinity" }
          );
        });

        test("multiplication", () => {
          assert.deepStrictEqual(
            calculate({ firstOperand: "1", secondOperand: "1", operator: "*" }),
            { firstOperand: "1" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "2",
              secondOperand: "2",
              operator: "*",
            }),
            { firstOperand: "4" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "-1",
              secondOperand: "1",
              operator: "*",
            }),
            { firstOperand: "-1" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "-1",
              secondOperand: "-1",
              operator: "*",
            }),
            { firstOperand: "1" }
          );
        });

        test("division", () => {
          assert.deepStrictEqual(
            calculate({ firstOperand: "1", secondOperand: "1", operator: "/" }),
            { firstOperand: "1" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "4",
              secondOperand: "2",
              operator: "/",
            }),
            { firstOperand: "2" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "-4",
              secondOperand: "2",
              operator: "/",
            }),
            { firstOperand: "-2" }
          );

          assert.deepStrictEqual(
            calculate({
              firstOperand: "-4",
              secondOperand: "-2",
              operator: "/",
            }),
            { firstOperand: "2" }
          );
        });
      }
    );

    describe("works with Infinity", { concurrency: true }, () => {
      test("addition", () => {
        assert.deepStrictEqual(
          calculate({
            firstOperand: "Infinity",
            secondOperand: "1",
            operator: "+",
          }),
          { firstOperand: "Infinity" }
        );
      });

      test("subtraction", () => {
        assert.deepStrictEqual(
          calculate({
            firstOperand: "Infinity",
            secondOperand: "1",
            operator: "-",
          }),
          { firstOperand: "Infinity" }
        );
      });

      test("multiplication", () => {
        assert.deepStrictEqual(
          calculate({
            firstOperand: "Infinity",
            secondOperand: "2",
            operator: "*",
          }),
          { firstOperand: "Infinity" }
        );
      });

      test("division", () => {
        assert.deepStrictEqual(
          calculate({
            firstOperand: "Infinity",
            secondOperand: "2",
            operator: "/",
          }),
          { firstOperand: "Infinity" }
        );

        assert.deepStrictEqual(
          calculate({
            firstOperand: "Infinity",
            secondOperand: "0",
            operator: "/",
          }),
          { firstOperand: "Infinity" }
        );
      });
    });

    describe("Floating point numbers", { concurrency: true }, () => {
      test("addition", () => {
        assert.deepStrictEqual(
          calculate({
            firstOperand: "1",
            secondOperand: "0,02",
            operator: "+",
          }),
          { firstOperand: "1,02" }
        );
      });

      test("subtraction", () => {
        assert.deepStrictEqual(
          calculate({
            firstOperand: "1",
            secondOperand: "0,02",
            operator: "-",
          }),
          { firstOperand: "0,98" }
        );
      });

      test("multiplication", () => {
        assert.deepStrictEqual(
          calculate({
            firstOperand: "2",
            secondOperand: "0,02",
            operator: "*",
          }),
          { firstOperand: "0,04" }
        );
      });

      test("division", () => {
        assert.deepStrictEqual(
          calculate({
            firstOperand: "0,02",
            secondOperand: "2",
            operator: "/",
          }),
          { firstOperand: "0,01" }
        );
      });
    });
  });

  describe("setOperator", { concurrency: true }, () => {
    test("defaults firstOperand to 0 if it's not defined", () => {
      assert.deepStrictEqual(setOperator({ state: {}, operator: "+" }), {
        firstOperand: "0",
        secondOperand: undefined,
        operator: "+",
      });

      assert.deepStrictEqual(setOperator({ state: {}, operator: "=" }), {
        firstOperand: "0",
        secondOperand: undefined,
        operator: "=",
      });
    });

    test("calculates the result if there is a pre-existing operator", () => {
      assert.deepStrictEqual(
        setOperator({
          state: { firstOperand: "1", secondOperand: "1", operator: "+" },
          operator: "+",
        }),
        {
          firstOperand: "2",
          operator: "+",
        }
      );
    });
  });
});

describe("integration", { concurrency: true }, () => {
  /**
   * @type {import('./calculator.mjs').CalculatorState}
   */
  let state = {};

  test("allows setting an initial negative operand", () => {
    state = {};
    state = setOperator({ state, operator: "-" });
    assert.deepEqual(display(state), "0");

    state = appendNumber({ state, numberStr: "4" });
    assert.deepEqual(display(state), "4");

    state = setOperator({ state, operator: "=" });
    assert.deepEqual(display(state), "-4");
  });

  test("inputting only operators should not break the calculator", () => {
    state = {};
    state = setOperator({ state, operator: "/" });
    assert.deepEqual(display(state), "0");
    state = setOperator({ state, operator: "*" });
    assert.deepEqual(display(state), "0");

    state = setOperator({ state, operator: "+" });
    state = appendNumber({ state, numberStr: "1" });
    assert.deepEqual(display(state), "1");
    state = setOperator({ state, operator: "-" });
    assert.deepEqual(display(state), "1");
    state = setOperator({ state, operator: "*" });
    assert.deepEqual(display(state), "1");
    state = setOperator({ state, operator: "/" });
    assert.deepEqual(display(state), "1");
    state = setOperator({ state, operator: "+" });
    assert.deepEqual(display(state), "1");

    state = appendNumber({ state, numberStr: "2" });
    assert.deepEqual(display(state), "2");
    state = setOperator({ state, operator: "=" });
    assert.deepEqual(display(state), "3");
  });

  test("adds two positive integers and use the equal operator", () => {
    state = {};
    state = appendNumber({ state, numberStr: "1" });
    state = appendNumber({ state, numberStr: "2" });
    state = appendNumber({ state, numberStr: "3" });
    assert.deepEqual(display(state), "123");

    state = setOperator({ state, operator: "+" });
    assert.deepEqual(display(state), "123");

    state = appendNumber({ state, numberStr: "2" });
    assert.deepEqual(state, {
      firstOperand: "123",
      secondOperand: "2",
      operator: "+",
    });
    assert.deepEqual(display(state), "2");

    state = setOperator({ state, operator: "=" });
    assert.deepEqual(display(state), "125");
  });

  test("does multiples operations in a row on integers", () => {
    //  ((((5 + 1) / 2) - 6) * 2) + 6 = 0
    state = {};

    state = appendNumber({ state, numberStr: "5" });
    assert.deepEqual(display(state), "5");

    state = setOperator({ state, operator: "+" });
    assert.deepEqual(display(state), "5");

    state = appendNumber({ state, numberStr: "1" });
    assert.deepEqual(display(state), "1");

    state = setOperator({ state, operator: "/" });
    assert.deepEqual(display(state), "6");

    state = appendNumber({ state, numberStr: "2" });
    assert.deepEqual(display(state), "2");

    state = setOperator({ state, operator: "-" });
    assert.deepEqual(display(state), "3");

    state = appendNumber({ state, numberStr: "6" });
    assert.deepEqual(display(state), "6");

    state = setOperator({ state, operator: "*" });
    assert.deepEqual(display(state), "-3");

    state = appendNumber({ state, numberStr: "2" });
    assert.deepEqual(display(state), "2");

    state = setOperator({ state, operator: "+" });
    assert.deepEqual(display(state), "-6");

    state = appendNumber({ state, numberStr: "6" });
    assert.deepEqual(display(state), "6");

    state = setOperator({ state, operator: "=" });
    assert.deepEqual(display(state), "0");
  });

  test("0/0 shows 'Not a number' and consecutive operations keep showing 'Not a number'", () => {
    state = {};
    state = setOperator({ state, operator: "/" });
    state = appendNumber({ state, numberStr: "0" });
    state = setOperator({ state, operator: "+" });
    assert.deepEqual(display(state), "Not a number");

    state = appendNumber({ state, numberStr: "1" });
    assert.deepEqual(display(state), "1");

    state = setOperator({ state, operator: "=" });
    assert.deepEqual(display(state), "Not a number");
  });

  test("delete number does not delete a number when the calculator an operator is selected or a result is displayed", () => {
    state = {};
    state = appendNumber({ state, numberStr: "1" });
    state = appendNumber({ state, numberStr: "2" });
    state = appendNumber({ state, numberStr: "3" });
    assert.deepEqual(display(state), "123");
    state = setOperator({ state, operator: "+" });
    assert.deepEqual(display(state), "123");
    state = deleteNumber(state);
    assert.deepEqual(display(state), "123");

    state = appendNumber({ state, numberStr: "4" });
    state = appendNumber({ state, numberStr: "5" });
    state = appendNumber({ state, numberStr: "6" });
    assert.deepEqual(display(state), "456");

    state = deleteNumber(state);
    assert.deepEqual(display(state), "45");

    state = setOperator({ state, operator: "=" });
    assert.deepEqual(display(state), "168");
    state = deleteNumber(state);
    assert.deepEqual(display(state), "168");
  });

  test("alternating between 1 and the = operator should always display 1", () => {
    state = {};
    state = appendNumber({ state, numberStr: "1" });
    assert.deepEqual(display(state), "1");

    state = setOperator({ state, operator: "=" });
    assert.deepEqual(display(state), "1");

    state = appendNumber({ state, numberStr: "1" });
    assert.deepEqual(display(state), "1");

    state = setOperator({ state, operator: "=" });
    assert.deepEqual(display(state), "1");

    state = appendNumber({ state, numberStr: "1" });
    assert.deepEqual(display(state), "1");

    state = setOperator({ state, operator: "=" });
    assert.deepEqual(display(state), "1");
  });
});
