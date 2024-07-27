import { describe, expect, it } from "vitest";
import { assertMidiProgramNumber } from ".";
import { TypeAssertionError } from "../error/appError";

describe(assertMidiProgramNumber, () => {
  it.each([{ v: 1 }, { v: 60 }, { v: 128 }])(
    "引数が1~128の整数: $v => OK",
    ({ v }) => {
      // given

      // when
      const block = () => {
        assertMidiProgramNumber(v);
      };

      // then
      expect(block).not.toThrow();
    },
  );

  it.each([{ v: -100 }, { v: 0 }, { v: 129 }, { v: 300 }])(
    "引数の値が範囲外: $v => Error",
    ({ v }) => {
      // given

      // when
      const block = () => {
        assertMidiProgramNumber(v);
      };

      // then
      expect(block).toThrow(TypeAssertionError);
    },
  );

  it.each([
    { v: 0.1 },
    { v: 99.9 },
    { v: Number.POSITIVE_INFINITY },
    { v: Number.NaN },
  ])("引数が整数でない: $v => Error", ({ v }) => {
    // given

    // when
    const block = () => {
      assertMidiProgramNumber(v);
    };

    // then
    expect(block).toThrow(TypeAssertionError);
  });
});
