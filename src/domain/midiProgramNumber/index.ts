import { Brand } from "../brand";
import { TypeAssertionError } from "../error/appError";
import { assertInt, Int } from "../int";

// ***** type *****

const typeName = "MidiProgramNumber";
export type MidiProgramNumber = Brand<Int, typeof typeName>;

// **** const *****

const MIN = 1;
const MAX = 128;

// ***** assertion *****

export function assertMidiProgramNumber(
  v: number,
): asserts v is MidiProgramNumber {
  assertInt(v);

  const isInValidRange = MIN <= v && v <= MAX;
  if (!isInValidRange) {
    throw new TypeAssertionError(
      typeName,
      `${v} should be in [${MIN}, ${MAX}]!`,
    );
  }
}

export const asMidiProgramNumber = (v: number): MidiProgramNumber => {
  assertMidiProgramNumber(v);
  return v;
};
