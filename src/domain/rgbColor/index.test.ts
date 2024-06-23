import { describe, expect, it } from "vitest";
import { createRgbColor, getColorCode } from ".";
import { assertUInt8 } from "../uint8";

describe(createRgbColor, () => {
  it.each([
    { red: 0, green: 0, blue: 0 },
    { red: 200, green: 127, blue: 39 },
    { red: 255, green: 255, blue: 255 },
  ])(
    "引数が0~255の整数: { red: $red, green: $green, blue: $blue } => OK",
    ({ red, green, blue }) => {
      // given
      assertUInt8(red);
      assertUInt8(green);
      assertUInt8(blue);

      // when
      const block = () => {
        createRgbColor(red, green, blue);
      };

      // then
      expect(block).not.toThrow();
    },
  );
});

describe(getColorCode, () => {
  it.each([
    { red: 0, green: 0, blue: 0, expected: "#000000" },
    { red: 36, green: 104, blue: 160, expected: "#2468a0" },
    { red: 255, green: 255, blue: 255, expected: "#ffffff" },
  ])(
    "{ red: $red, green: $green, blue: $blue } => $expected",
    ({ red, green, blue, expected }) => {
      // given
      assertUInt8(red);
      assertUInt8(green);
      assertUInt8(blue);
      const sut = createRgbColor(red, green, blue);

      // when
      const colorCode = getColorCode(sut);

      // then
      expect(colorCode).toBe(expected);
    },
  );
});
