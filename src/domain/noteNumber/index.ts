import { Brand } from "../brand";
import { TypeAssertionError } from "../error/appError";
import { Int, asInt, assertInt } from "../int";
import { PitchType } from "./pitchType";

// ***** type *****

const typeName = "NoteNumber";
export type NoteNumber = Brand<number, typeof typeName>;

// ***** const *****

const MIN_NOTE_NUMBER = 0;
const MAX_NOTE_NUMBER = 127;
const ACCIDENTAL_PITCH_NUMBERS = [1, 3, 6, 8, 10];
const PITCH_NAMES = [
  ["C"],
  ["C♯", "D♭"],
  ["D"],
  ["D♯", "E♭"],
  ["E"],
  ["F"],
  ["F♯", "G♭"],
  ["G"],
  ["G♯", "A♭"],
  ["A"],
  ["A♯", "B♭"],
  ["B"],
];

// ***** assertion *****

export function assertNoteNumber(v: number): asserts v is NoteNumber {
  assertInt(v);

  const isInValidRange = MIN_NOTE_NUMBER <= v && v <= MAX_NOTE_NUMBER;
  if (!isInValidRange) {
    throw new TypeAssertionError(
      typeName,
      `${v} should be in [${MIN_NOTE_NUMBER}, ${MAX_NOTE_NUMBER}]!`,
    );
  }
}

export const asNoteNumber = (v: number): NoteNumber => {
  assertNoteNumber(v);
  return v;
};

// ***** method *****

export const isAccidental = (noteNumber: NoteNumber): boolean =>
  ACCIDENTAL_PITCH_NUMBERS.includes(getPitchNumber(noteNumber));

export const getNoteNames = (
  noteNumber: NoteNumber,
  pitchType: PitchType,
): string[] => {
  const pitchNames = PITCH_NAMES[getPitchNumber(noteNumber)];
  const octave = pitchType.minOctave + Math.floor(noteNumber / 12);
  return pitchNames.map((pitchName) => `${pitchName}${octave}`);
};

const getPitchNumber = (noteNumber: NoteNumber): Int => asInt(noteNumber % 12);

// ***** service *****

export const allNoteNumbers = new Array(MAX_NOTE_NUMBER - MIN_NOTE_NUMBER + 1)
  .fill(0)
  .map((_, index) => asNoteNumber(index));
