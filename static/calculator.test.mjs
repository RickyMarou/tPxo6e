import { mock, test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { appendNumber, popNumber, state, _mockState } from "./calculator.mjs";

describe("calculator.mjs", () => {
  describe("_mockState", () => {
    test("mocks the state", () => {
      const mockStateData = {
        firstOperand: "123",
        secondOperand: "234",
        operator: "+",
      };
      _mockState(mockStateData);

      assert.deepEqual(state, mockStateData);
    });
  });

  describe("appendNumber", () => {
    beforeEach(() => {
      console.log("before test");
      _mockState({
        firstOperand: "0",
        secondOperand: "0",
        operator: undefined,
      });
    });

    test("replaces the initial 0 with the first input for the first operand", () => {
      assert.strictEqual(state.operator, undefined);
      assert.strictEqual(state.secondOperand, "0");

      appendNumber("1");
      assert.strictEqual(state.firstOperand, "1");
    });

    test("append number to the first operand if the operator is undefined", () => {
      _mockState({
        firstOperand: "123",
        secondOperand: "0",
      });
    });
  });
});
