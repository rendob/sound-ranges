import { describe, expect, it } from "vitest";
import { assertExists } from ".";

describe(assertExists, () => {
  it.each([
    { v: 0 },
    { v: 28 },
    { v: Number.NaN },
    { v: true },
    { v: false },
    { v: "abc" },
    { v: "" },
    { v: { x: 1 } },
    { v: {} },
  ])("引数がNonNullable: $v => OK", ({ v }) => {
    // given

    // when
    const block = () => {
      assertExists(v);
    };

    // then
    expect(block).not.toThrow();
  });

  it.each([{ v: null }, { v: undefined }])(
    "引数がNullable: $v => Error",
    ({ v }) => {
      // given

      // when
      const block = () => {
        assertExists(v);
      };

      // then
      expect(block).toThrow();
    },
  );
});
