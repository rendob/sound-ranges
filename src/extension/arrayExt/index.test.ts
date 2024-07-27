import { describe, expect, it } from "vitest";
import { createArithmeticSequence } from ".";
import { assertInt } from "../../domain/int";

const array = [3, 53, 18, 90, 0, -4, 73, -1];

describe(Array.prototype.findLast, () => {
  it.each([
    {
      description: "負の数",
      predicate: (value: number) => value < 0,
      expected: -1,
    },
    {
      description: "偶数",
      predicate: (value: number) => value % 2 == 0,
      expected: -4,
    },
    {
      description: "3の倍数",
      predicate: (value: number) => value % 3 == 0,
      expected: 0,
    },
    {
      description: "偶数番目",
      predicate: (_: number, index: number) => index % 2 == 0,
      expected: 73,
    },
  ])("$description => $expected", ({ predicate, expected }) => {
    // given

    // when
    const result = array.findLast(predicate);

    // then
    expect(result).toBe(expected);
  });
});

describe(createArithmeticSequence, () => {
  it.each([
    { start: 0, end: 3, step: 1, expected: [0, 1, 2, 3] },
    { start: 0, end: 7, step: 2, expected: [0, 2, 4, 6] },
    { start: 12, end: 37, step: 5, expected: [12, 17, 22, 27, 32, 37] },
    { start: 12, end: -7, step: -5, expected: [12, 7, 2, -3] },
  ])(
    "start: $start, end: $end, step: $step => $expected",
    ({ start, end, step, expected }) => {
      // given
      assertInt(start);
      assertInt(end);
      assertInt(step);

      // when
      const result = createArithmeticSequence(start, end, step);

      // then
      expect(result).toStrictEqual(expected);
    },
  );
});
