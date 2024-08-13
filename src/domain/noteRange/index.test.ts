import { describe, expect, it } from "vitest";
import { contains, createNoteRange, getRangeName, getSize } from ".";
import { TypeAssertionError } from "../error/appError";
import { asNoteNumber, assertNoteNumber } from "../noteNumber";
import { PitchType } from "../noteNumber/pitchType";

describe(createNoteRange, () => {
  it.each([
    { min: 0, max: 0 },
    { min: 40, max: 80 },
  ])("min <= max: { min: $min, max: $max } => OK", ({ min, max }) => {
    // given
    assertNoteNumber(min);
    assertNoteNumber(max);

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
    assertNoteNumber(min);
    assertNoteNumber(max);

    // when
    const block = () => {
      createNoteRange(min, max);
    };

    // then
    expect(block).toThrow(TypeAssertionError);
  });
});

describe(getSize, () => {
  it.each([
    { min: 0, max: 0, expected: 1 },
    { min: 13, max: 79, expected: 67 },
    { min: 40, max: 80, expected: 41 },
  ])("{ min: $min, max: $max } => $expected", ({ min, max, expected }) => {
    // given
    const sut = createNoteRange(asNoteNumber(min), asNoteNumber(max));

    // when
    const result = getSize(sut);

    // then
    expect(result).toBe(expected);
  });
});

describe(getRangeName, () => {
  it.each([
    { min: 0, max: 60, expected: "C-2 〜 C3" },
    { min: 58, max: 113, expected: "A♯2/B♭2 〜 F7" },
  ])("ヤマハの場合: $min ~ $max => $expected", ({ min, max, expected }) => {
    // given
    const sut = createNoteRange(asNoteNumber(min), asNoteNumber(max));

    // when
    const noteNames = getRangeName(sut, PitchType.YAMAHA);

    // then
    expect(noteNames).toBe(expected);
  });

  it.each([
    { min: 0, max: 60, expected: "C-1 〜 C4" },
    { min: 58, max: 113, expected: "A♯3/B♭3 〜 F8" },
  ])("ローランドの場合: $min ~ $max => $expected", ({ min, max, expected }) => {
    // given
    const sut = createNoteRange(asNoteNumber(min), asNoteNumber(max));

    // when
    const noteNames = getRangeName(sut, PitchType.ROLAND);

    // then
    expect(noteNames).toBe(expected);
  });

  it("noteRange == null => -", () => {
    // given
    const sut = null;

    // when
    const noteNames = getRangeName(sut, PitchType.YAMAHA);

    // then
    expect(noteNames).toBe("-");
  });
});

describe(contains, () => {
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
      const sut = createNoteRange(asNoteNumber(min), asNoteNumber(max));
      assertNoteNumber(noteNumber);

      // when
      const result = contains(sut, noteNumber);

      // then
      expect(result).toBe(expected);
    },
  );
});
