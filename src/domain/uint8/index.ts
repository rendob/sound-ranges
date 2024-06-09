import { Brand } from "../brand";
import { TypeAssertionError } from "../error/appError";
import { assertInt } from "../int";

const typeName = "UInt8";
export type UInt8 = Brand<number, typeof typeName>;

const MIN_VALUE = 0;
const MAX_VALUE = 255;

export function assertUInt8(v: number): asserts v is UInt8 {
  assertInt(v);

  const isInValidRange = MIN_VALUE <= v && v <= MAX_VALUE;
  if (!isInValidRange) {
    throw new TypeAssertionError(
      typeName,
      `${v} should be in [${MIN_VALUE}, ${MAX_VALUE}]`,
    );
  }
}

export const asUInt8 = (v: number): UInt8 => {
  assertUInt8(v);
  return v;
};
