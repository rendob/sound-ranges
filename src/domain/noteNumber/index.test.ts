import { describe, expect, it } from "vitest";
import {
  asNoteNumber,
  assertNoteNumber,
  getFrequency,
  getNoteNames,
  isAccidental,
  isC,
} from ".";
import { TypeAssertionError } from "../error/appError";
import { PitchType } from "./pitchType";

describe(assertNoteNumber, () => {
  it.each([{ v: 0 }, { v: 60 }, { v: 127 }])(
    "引数が0~127の整数: $v => OK",
    ({ v }) => {
      // given

      // when
      const block = () => {
        assertNoteNumber(v);
      };

      // then
      expect(block).not.toThrow();
    },
  );

  it.each([{ v: -100 }, { v: -1 }, { v: 128 }, { v: 300 }])(
    "引数の値が範囲外: $v => Error",
    ({ v }) => {
      // given

      // when
      const block = () => {
        assertNoteNumber(v);
      };

      // then
      expect(block).toThrow(TypeAssertionError);
    },
  );

  it.each([
    { v: 0.1 },
    { v: 99.9 },
    { v: Number.POSITIVE_INFINITY },
    { v: Number.NaN },
  ])("引数が整数でない: $v => Error", ({ v }) => {
    // given

    // when
    const block = () => {
      assertNoteNumber(v);
    };

    // then
    expect(block).toThrow(TypeAssertionError);
  });
});

describe(isC, () => {
  it.each([
    { noteNumber: 0, pitchName: "C", expected: true },
    { noteNumber: 60, pitchName: "C", expected: true },
    { noteNumber: 28, pitchName: "E", expected: false },
    { noteNumber: 55, pitchName: "G", expected: false },
    { noteNumber: 83, pitchName: "B", expected: false },
    { noteNumber: 1, pitchName: "C♯/D♭", expected: false },
    { noteNumber: 30, pitchName: "E♯/F♭", expected: false },
    { noteNumber: 44, pitchName: "G♯/A♭", expected: false },
    { noteNumber: 58, pitchName: "A♯/B♭", expected: false },
  ])("$pitchName => $expected", ({ noteNumber, expected }) => {
    // given
    const sut = asNoteNumber(noteNumber);

    // when
    const result = isC(sut);

    // then
    expect(result).toBe(expected);
  });
});

describe(isAccidental, () => {
  it.each([
    { noteNumber: 1, pitchName: "C♯/D♭" },
    { noteNumber: 15, pitchName: "D♯/E♭" },
    { noteNumber: 30, pitchName: "E♯/F♭" },
    { noteNumber: 44, pitchName: "G♯/A♭" },
    { noteNumber: 58, pitchName: "A♯/B♭" },
  ])("派生音: $pitchName => true", ({ noteNumber }) => {
    // given
    const sut = asNoteNumber(noteNumber);

    // when
    const result = isAccidental(sut);

    // then
    expect(result).toBe(true);
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
    const sut = asNoteNumber(noteNumber);

    // when
    const result = isAccidental(sut);

    // then
    expect(result).toBe(false);
  });
});

describe(getNoteNames, () => {
  it.each([
    { noteNumber: 0, expected: ["C-2"] },
    { noteNumber: 58, expected: ["A♯2", "B♭2"] },
    { noteNumber: 75, expected: ["D♯4", "E♭4"] },
    { noteNumber: 113, expected: ["F7"] },
  ])("ヤマハの場合: $noteNumber => $expected", ({ noteNumber, expected }) => {
    // given
    const sut = asNoteNumber(noteNumber);

    // when
    const noteNames = getNoteNames(sut, PitchType.YAMAHA);

    // then
    expect(noteNames).toStrictEqual(expected);
  });

  it.each([
    { noteNumber: 0, expected: ["C-1"] },
    { noteNumber: 58, expected: ["A♯3", "B♭3"] },
    { noteNumber: 75, expected: ["D♯5", "E♭5"] },
    { noteNumber: 113, expected: ["F8"] },
  ])(
    "ローランドの場合: $noteNumber => $expected",
    ({ noteNumber, expected }) => {
      // given
      const sut = asNoteNumber(noteNumber);

      // when
      const noteNames = getNoteNames(sut, PitchType.ROLAND);

      // then
      expect(noteNames).toStrictEqual(expected);
    },
  );
});

describe(getFrequency, () => {
  it.each([
    { noteNumber: 0, expected: 8.2 },
    { noteNumber: 34, expected: 58.3 },
    { noteNumber: 60, expected: 261.6 },
    { noteNumber: 69, expected: 440.0 },
    { noteNumber: 123, expected: 9956.1 },
  ])("frequency of $noteNumber => $expected", ({ noteNumber, expected }) => {
    // given
    const sut = asNoteNumber(noteNumber);

    // when
    const result = getFrequency(sut);

    // then
    expect(result).toBeCloseTo(expected);
  });
});
