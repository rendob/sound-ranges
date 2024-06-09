import { describe, expect, it } from "vitest";
import { assertInt } from ".";
import { TypeAssertionError } from "../error/appError";

describe(assertInt, () => {
  it.each([
    { v: -32 },
    { v: -1 },
    { v: 0 },
    { v: 293.0 },
    { v: Number.MAX_VALUE },
    { v: Number.MAX_SAFE_INTEGER },
    { v: Number.MIN_SAFE_INTEGER },
  ])("引数が整数: $v => OK", ({ v }) => {
    // given

    // when
    const block = () => {
      assertInt(v);
    };

    // then
    expect(block).not.toThrow();
  });

  it.each([
    { v: -3.14 },
    { v: 0.4201 },
    { v: 5910.021 },
    { v: Number.MIN_VALUE },
    { v: Number.EPSILON },
  ])("引数が小数: $v => Error", ({ v }) => {
    // given

    // when
    const block = () => {
      assertInt(v);
    };

    // then
    expect(block).toThrow(TypeAssertionError);
  });

  it.each([
    { v: Number.NaN },
    { v: Number.POSITIVE_INFINITY },
    { v: Number.NEGATIVE_INFINITY },
  ])("引数が特殊な数値: $v => Error", ({ v }) => {
    // given

    // when
    const block = () => {
      assertInt(v);
    };

    // then
    expect(block).toThrow(TypeAssertionError);
  });
});
