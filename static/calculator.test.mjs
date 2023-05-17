// @ts-check

import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { appendNumber } from "./calculator.mjs";

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

    });
  });
});
