import { Brand } from "../brand";
import { UInt8, assertUInt8 } from "../uint8";

const typeName = "RgbColor";
type RgbColorType = {
  readonly red: UInt8;
  readonly green: UInt8;
  readonly blue: UInt8;
};
export type RgbColor = Brand<RgbColorType, typeof typeName>;

export const createRgbColor = (
  red: UInt8,
  green: UInt8,
  blue: UInt8,
): RgbColor => asRgbColor({ red, green, blue });

// ***** assertion *****

function assertRgbColor(v: RgbColorType): asserts v is RgbColor {
  assertUInt8(v.red);
  assertUInt8(v.green);
  assertUInt8(v.blue);
}

const asRgbColor = (v: RgbColorType): RgbColor => {
  assertRgbColor(v);
  return v;
};

// ***** method *****

export const getColorCode = (rgbColor: RgbColor) => {
  return (
    "#" +
    [rgbColor.red, rgbColor.green, rgbColor.blue]
      .map((colorValue) => colorValue.toString(16).padStart(2, "0"))
      .join("")
  );
};
