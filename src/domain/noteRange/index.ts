import { TypeAssertionError } from "../error/appError";
import { NoteNumber, getNoteNames } from "../noteNumber";
import { Brand } from "../brand";
import { Int, asInt } from "../int";
import { PitchType } from "../noteNumber/pitchType";
import { exists } from "../../util/exists";

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

export const getSize = (noteRange: NoteRange): Int =>
  asInt(noteRange.max - noteRange.min + 1);

export const getRangeName = (
  noteRange: NoteRange | null,
  pitchType: PitchType,
): string => {
  if (!exists(noteRange)) return "-";

  const separator = "/";
  const min = getNoteNames(noteRange.min, pitchType).join(separator);
  const max = getNoteNames(noteRange.max, pitchType).join(separator);
  return `${min} 〜 ${max}`;
};

export const contains = (
  noteRange: NoteRange,
  noteNumber: NoteNumber,
): boolean => noteRange.min <= noteNumber && noteNumber <= noteRange.max;
