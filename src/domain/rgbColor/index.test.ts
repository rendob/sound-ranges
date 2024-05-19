import { describe, expect, it } from "vitest";
import { RgbColor } from ".";
import { ValidationError } from "../error/appError";

describe("initialization", () => {
  it.each([
    { red: 0, green: 0, blue: 0 },
    { red: 200, green: 127, blue: 39 },
    { red: 255, green: 255, blue: 255 },
  ])(
    "引数が0~255の整数: { red: $red, green: $green, blue: $blue } => OK",
    ({ red, green, blue }) => {
      // given

      // when
      const block = () => {
        new RgbColor(red, green, blue);
      };

      // then
      expect(block).not.toThrow();
    },
  );

  it.each([
    { red: 0.3, green: 0, blue: 0 },
    { red: 200.8, green: 127.2, blue: 39 },
    { red: 25.5, green: 25.5, blue: 25.5 },
  ])(
    "引数が小数: { red: $red, green: $green, blue: $blue } => Error",
    ({ red, green, blue }) => {
      // given

      // when
      const block = () => {
        new RgbColor(red, green, blue);
      };

      // then
      expect(block).toThrow(ValidationError);
    },
  );

  it.each([
    { red: 0, green: 0, blue: -1 },
    { red: 200, green: 256, blue: 39 },
    { red: 510, green: -20, blue: 68 },
  ])(
    "引数の値が範囲外: { red: $red, green: $green, blue: $blue } => Error",
    ({ red, green, blue }) => {
      // given

      // when
      const block = () => {
        new RgbColor(red, green, blue);
      };

      // then
      expect(block).toThrow(ValidationError);
    },
  );
});

describe("colorCode", () => {
  it.each([
    { red: 0, green: 0, blue: 0, expected: "#000000" },
    { red: 36, green: 104, blue: 160, expected: "#2468a0" },
    { red: 255, green: 255, blue: 255, expected: "#ffffff" },
  ])(
    "{ red: $red, green: $green, blue: $blue } => $expected",
    ({ red, green, blue, expected }) => {
      // given
      const sut = new RgbColor(red, green, blue);

      // when
      const colorCode = sut.colorCode;

      // then
      expect(colorCode).toBe(expected);
    },
  );
});

describe(RgbColor.prototype.isEqual, () => {
  it.each([
    { rgb1: [0, 0, 0], rgb2: [0, 0, 0], expected: true },
    { rgb1: [0, 0, 0], rgb2: [0, 0, 24], expected: false },
    { rgb1: [0, 0, 0], rgb2: [0, 47, 0], expected: false },
    { rgb1: [0, 0, 0], rgb2: [108, 0, 0], expected: false },
    { rgb1: [0, 0, 0], rgb2: [0, 47, 24], expected: false },
    { rgb1: [0, 0, 0], rgb2: [108, 47, 24], expected: false },
  ])("$rgb1 === $rgb2 => $expected", ({ rgb1, rgb2, expected }) => {
    // given
    const sut = new RgbColor(rgb1[0], rgb1[1], rgb1[2]);
    const other = new RgbColor(rgb2[0], rgb2[1], rgb2[2]);

    // when
    const isEqual = sut.isEqual(other);

    // then
    expect(isEqual).toBe(expected);
  });
});
