import { describe, expect, it } from "vitest";
import { assertUInt8 } from ".";
import { TypeAssertionError } from "../error/appError";

describe(assertUInt8, () => {
  it.each([{ v: 0 }, { v: 128 }, { v: 255 }])(
    "引数が0~255の整数: $v => OK",
    ({ v }) => {
      // given

      // when
      const block = () => {
        assertUInt8(v);
      };

      // then
      expect(block).not.toThrow();
    },
  );

  it.each([{ v: -11 }, { v: -1 }, { v: 256 }, { v: 300 }])(
    "引数の値が範囲外: $v => Error",
    ({ v }) => {
      // given

      // when
      const block = () => {
        assertUInt8(v);
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
      assertUInt8(v);
    };

    // then
    expect(block).toThrow(TypeAssertionError);
  });
});
