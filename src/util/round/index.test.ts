import { describe, expect, it } from "vitest";
import { round } from ".";

describe(round, () => {
  it.each([
    { value: 1349.253, place: 1000, expected: 1000 },
    { value: 1349.253, place: 100, expected: 1300 },
    { value: 1349.253, place: 10, expected: 1350 },
    { value: 1349.253, place: 1, expected: 1349 },
    { value: 1349.253, place: 0.1, expected: 1349.3 },
    { value: 1349.253, place: 0.01, expected: 1349.25 },
  ])(
    "round off $value to the $place => $expected",
    ({ value, place, expected }) => {
      // given

      // when
      const result = round(value, place);

      // then
      expect(result).toBeCloseTo(expected, 5);
    },
  );
});
