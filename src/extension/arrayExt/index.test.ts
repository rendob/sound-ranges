import { describe, expect, it } from "vitest";

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
