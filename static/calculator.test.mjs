// @ts-check

import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { appendNumber, display } from "./calculator.mjs";

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

    test("returns 0 if the first operand and the operator are defined, but the second operand is not", () => {
      assert.strictEqual(display({ firstOperand: "123", operator: "+" }), "0");
      assert.strictEqual(
        display({
          firstOperand: "123",
          operator: "+",
          secondOperand: undefined,
        }),
        "0"
      );
    });

    test("returns the second operand if the first operand and the operator are defined", () => {
      assert.strictEqual(
        display({ firstOperand: "123", operator: "+", secondOperand: "2" }),
        "2"
      );
    });
  });
});
