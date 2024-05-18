import { describe, expect, it } from "vitest";
import { Note } from ".";
import { ValidationError } from "../error/appError";
import { PitchType } from "./pitchType";

describe("initialization", () => {
  it.each([{ noteNumber: 0 }, { noteNumber: 60 }, { noteNumber: 127 }])(
    "引数が0~127の整数: $noteNumber => OK",
    ({ noteNumber }) => {
      // given

      // when
      const block = () => {
        new Note(noteNumber);
      };

      // then
      expect(block).not.toThrow();
    },
  );

  it.each([{ noteNumber: 0.1 }, { noteNumber: 99.9 }])(
    "引数が整数でない: $noteNumber => Error",
    ({ noteNumber }) => {
      // given

      // when
      const block = () => {
        new Note(noteNumber);
      };

      // then
      expect(block).toThrow(ValidationError);
    },
  );

  it.each([
    { noteNumber: -100 },
    { noteNumber: -1 },
    { noteNumber: 128 },
    { noteNumber: 300 },
  ])("引数の値が範囲外: $noteNumber => Error", ({ noteNumber }) => {
    // given

    // when
    const block = () => {
      new Note(noteNumber);
    };

    // then
    expect(block).toThrow(ValidationError);
  });
});

describe("isAccidental", () => {
  it.each([
    { noteNumber: 1, pitchName: "C♯/D♭" },
    { noteNumber: 15, pitchName: "D♯/E♭" },
    { noteNumber: 30, pitchName: "E♯/F♭" },
    { noteNumber: 44, pitchName: "G♯/A♭" },
    { noteNumber: 58, pitchName: "A♯/B♭" },
  ])("派生音: $pitchName => true", ({ noteNumber }) => {
    // given
    const sut = new Note(noteNumber);

    // when
    const isAccidental = sut.isAccidental;

    // then
    expect(isAccidental).toBe(true);
  });

  it.each([
    { noteNumber: 0, pitchName: "C" },
    { noteNumber: 14, pitchName: "D" },
    { noteNumber: 28, pitchName: "E" },
    { noteNumber: 41, pitchName: "F" },
    { noteNumber: 55, pitchName: "G" },
    { noteNumber: 69, pitchName: "A" },
    { noteNumber: 83, pitchName: "B" },
  ])("幹音: $pitchName => false", ({ noteNumber }) => {
    // given
    const sut = new Note(noteNumber);

    // when
    const isAccidental = sut.isAccidental;

    // then
    expect(isAccidental).toBe(false);
  });
});

describe(Note.prototype.getNoteNames, () => {
  it.each([
    { noteNumber: 0, expected: ["C-2"] },
    { noteNumber: 58, expected: ["A♯2", "B♭2"] },
    { noteNumber: 75, expected: ["D♯4", "E♭4"] },
    { noteNumber: 113, expected: ["F7"] },
  ])("ヤマハの場合: $noteNumber => $expected", ({ noteNumber, expected }) => {
    // given
    const sut = new Note(noteNumber);

    // when
    const noteNames = sut.getNoteNames(PitchType.YAMAHA);

    // then
    expect(noteNames).toStrictEqual(expected);
  });

  it.each([
    { noteNumber: 0, expected: ["C-1"] },
    { noteNumber: 58, expected: ["A♯3", "B♭3"] },
    { noteNumber: 75, expected: ["D♯5", "E♭5"] },
    { noteNumber: 113, expected: ["F8"] },
  ])("国際式の場合: $noteNumber => $expected", ({ noteNumber, expected }) => {
    // given
    const sut = new Note(noteNumber);

    // when
    const noteNames = sut.getNoteNames(PitchType.INTERNATIONAL);

    // then
    expect(noteNames).toStrictEqual(expected);
  });
});

describe(Note.prototype.isEqual, () => {
  it.each([
    { noteNumber1: 14, noteNumber2: 14, expected: true },
    { noteNumber1: 32, noteNumber2: 23, expected: false },
  ])(
    "$noteNumber1 === $noteNumber2 => $expected",
    ({ noteNumber1, noteNumber2, expected }) => {
      // given
      const sut = new Note(noteNumber1);
      const other = new Note(noteNumber2);

      // when
      const isEqual = sut.isEqual(other);

      // then
      expect(isEqual).toBe(expected);
    },
  );
});
