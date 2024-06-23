import { describe, expect, it } from "vitest";
import { contains, createNoteRange } from ".";
import { TypeAssertionError } from "../error/appError";
import { asNoteNumber, assertNoteNumber } from "../noteNumber";

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
