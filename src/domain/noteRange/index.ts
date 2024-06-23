import { TypeAssertionError } from "../error/appError";
import { NoteNumber } from "../noteNumber";
import { Brand } from "../brand";

const typeName = "NoteRangeType";
type NoteRangeType = {
  readonly min: NoteNumber;
  readonly max: NoteNumber;
};
export type NoteRange = Brand<NoteRangeType, typeof typeName>;

export const createNoteRange = (min: NoteNumber, max: NoteNumber): NoteRange =>
  asNoteRange({ min, max });

// ***** assertion *****

function assertNoteRange(v: NoteRangeType): asserts v is NoteRange {
  if (v.min > v.max) {
    throw new TypeAssertionError(
      typeName,
      `${v.min} should not exceed ${v.max}!`,
    );
  }
}

const asNoteRange = (v: NoteRangeType): NoteRange => {
  assertNoteRange(v);
  return v;
};

// ***** method *****

export const contains = (
  noteRange: NoteRange,
  noteNumber: NoteNumber,
): boolean => noteRange.min <= noteNumber && noteNumber <= noteRange.max;
