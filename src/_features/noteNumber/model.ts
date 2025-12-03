import z from "zod";
import type { PitchType } from "../pitchType/model";

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

export const noteNumberSchema = z
  .int()
  .min(MIN_NOTE_NUMBER)
  .max(MAX_NOTE_NUMBER)
  .brand("NoteNumber");
export type NoteNumber = z.infer<typeof noteNumberSchema>;
export const asNoteNumber = (value: number): NoteNumber =>
  noteNumberSchema.parse(value);

export const allNoteNumbers: NoteNumber[] = Array.from(
  { length: MAX_NOTE_NUMBER - MIN_NOTE_NUMBER + 1 },
  (_, index) => asNoteNumber(MIN_NOTE_NUMBER + index),
);

// methods

export const isC = (noteNumber: NoteNumber): boolean =>
  getPitchNumber(noteNumber) === 0;

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

export const getFrequency = (noteNumber: NoteNumber): number => {
  const middleA = {
    noteNumber: asNoteNumber(69),
    frequency: 440,
  } as const;
  const exponent = (noteNumber - middleA.noteNumber) / 12;
  const frequency = middleA.frequency * 2 ** exponent;
  return frequency;
};

const getPitchNumber = (noteNumber: NoteNumber): number => noteNumber % 12;
