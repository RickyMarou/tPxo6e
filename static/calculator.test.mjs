import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { appendNumber } from "./calculator.mjs";

describe("calculator.mjs", { concurrency: true }, () => {
  describe("appendNumber", { concurrency: true }, () => {
    test("replaces the initial 0 with the first input for the first operand", () => {
      const newState = appendNumber({
        state: {
          firstOperand: "0",
          secondOperand: "0",
          operator: undefined,
        },
        numberStr: "1",
      });
      assert.strictEqual(newState.firstOperand, "1");
      assert.strictEqual(newState.secondOperand, "0");
      assert.strictEqual(newState.operator, undefined);
    });

    test("appends number to the first operand if the operator is undefined", () => {
      const newState = appendNumber({
        state: {
          firstOperand: "1",
          secondOperand: "0",
          operator: undefined,
        },
        numberStr: "2",
      });

      assert.strictEqual(newState.firstOperand, "12");
      assert.strictEqual(newState.secondOperand, "0");
      assert.strictEqual(newState.operator, undefined);
    });

    test("appends number to the second operand if the operator is defined", () => {
      const newState = appendNumber({
        state: {
          firstOperand: "12",
          secondOperand: "0",
          operator: "+",
        },
        numberStr: "1",
      });

      assert.strictEqual(newState.firstOperand, "12");
      assert.strictEqual(newState.secondOperand, "1");
      assert.strictEqual(newState.operator, "+");
    });
  });
});
