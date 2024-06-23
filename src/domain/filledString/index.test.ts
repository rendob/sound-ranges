import { describe, expect, it } from "vitest";
import { assertFilledString } from ".";
import { TypeAssertionError } from "../error/appError";

describe(assertFilledString, () => {
  it.each([{ v: "abc" }, { v: "あいう" }, { v: " " }])(
    "引数が空でない: $v => OK",
    ({ v }) => {
      // given

      // when
      const block = () => {
        assertFilledString(v);
      };

      // then
      expect(block).not.toThrow();
    },
  );

  it.each([{ v: "" }])("引数が空: $v => Error", ({ v }) => {
    // given

    // when
    const block = () => {
      assertFilledString(v);
    };

    // then
    expect(block).toThrow(TypeAssertionError);
  });
});
