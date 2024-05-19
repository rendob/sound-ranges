import { describe, expect, it } from "vitest";
import { Note } from "../note";
import { NoteRange } from ".";
import { ValidationError } from "../error/appError";

const createNoteRange = (min: number, max: number) => {
  return new NoteRange(new Note(min), new Note(max));
};

describe("initialization", () => {
  it.each([
    { min: 0, max: 0 },
    { min: 40, max: 80 },
  ])("min <= max: { min: $min, max: $max } => OK", ({ min, max }) => {
    // given

    // when
    const block = () => {
      createNoteRange(min, max);
    };

    // then
    expect(block).not.toThrow();
  });

  it.each([
    { min: 1, max: 0 },
    { min: 72, max: 25 },
  ])("min > max: { min: $min, max: $max } => Error", ({ min, max }) => {
    // given

    // when
    const block = () => {
      createNoteRange(min, max);
    };

    // then
    expect(block).toThrow(ValidationError);
  });
});

describe(NoteRange.prototype.isEqual, () => {
  it.each([
    { min1: 0, max1: 44, min2: 0, max2: 44, expected: true },
    { min1: 0, max1: 44, min2: 0, max2: 127, expected: false },
    { min1: 0, max1: 44, min2: 44, max2: 44, expected: false },
    { min1: 0, max1: 44, min2: 22, max2: 67, expected: false },
  ])(
    "[$min1, $max1] === [$min2, $max2] => $expected",
    ({ min1, max1, min2, max2, expected }) => {
      // given
      const sut = createNoteRange(min1, max1);
      const other = createNoteRange(min2, max2);

      // when
      const isEqual = sut.isEqual(other);

      // then
      expect(isEqual).toBe(expected);
    },
  );
});

describe(NoteRange.prototype.contains, () => {
  it.each([
    { min: 40, max: 82, noteNumber: 0, expected: false },
    { min: 40, max: 82, noteNumber: 39, expected: false },
    { min: 40, max: 82, noteNumber: 40, expected: true },
    { min: 40, max: 82, noteNumber: 66, expected: true },
    { min: 40, max: 82, noteNumber: 82, expected: true },
    { min: 40, max: 82, noteNumber: 83, expected: false },
    { min: 40, max: 82, noteNumber: 108, expected: false },
  ])(
    "$noteNumber in [$min, $max] => $expected",
    ({ min, max, noteNumber, expected }) => {
      // given
      const sut = createNoteRange(min, max);
      const note = new Note(noteNumber);

      // when
      const contains = sut.contains(note);

      // then
      expect(contains).toBe(expected);
    },
  );
});
