import { assert, describe, expect, it } from "vitest";
import { InstrumentCategory } from "./instrumentCategory";
import { canPlay, canPlayAll, createInstrument, setIsSelected } from ".";
import { TypeAssertionError } from "../error/appError";
import { RgbColor, createRgbColor } from "../rgbColor";
import { asNoteNumber, assertNoteNumber } from "../noteNumber";
import { asUInt8 } from "../uint8";
import { createNoteRange } from "../noteRange";
import { asFilledString } from "../filledString";

const createTestInstrument = ({
  name = "xxx",
  category = InstrumentCategory.BRASS,
  min = 0,
  max = 127,
  color = createRgbColor(asUInt8(0), asUInt8(0), asUInt8(0)),
}: {
  name?: string;
  category?: InstrumentCategory;
  min?: number;
  max?: number;
  color?: RgbColor;
} = {}) =>
  createInstrument(
    asFilledString(name),
    category,
    createNoteRange(asNoteNumber(min), asNoteNumber(max)),
    color,
  );

describe(createInstrument, () => {
  it.each([{ name: "violin" }, { name: "piano" }])(
    "名前が空でない: $name => OK",
    ({ name }) => {
      // given

      // when
      const block = () => {
        createTestInstrument({ name });
      };

      // then
      expect(block).not.toThrow();
    },
  );

  it("名前が空 => Error", () => {
    // given

    // when
    const block = () => {
      createTestInstrument({ name: "" });
    };

    // then
    expect(block).toThrow(TypeAssertionError);
  });
});

describe("initialization", () => {
  it("初期化時は非選択状態", () => {
    // given

    // when
    const sut = createTestInstrument();

    // then
    expect(sut.isSelected).toBe(false);
  });
});

describe(canPlay, () => {
  it.each([
    { min: 40, max: 99, noteNumber: 10, expected: false },
    { min: 40, max: 99, noteNumber: 39, expected: false },
    { min: 40, max: 99, noteNumber: 40, expected: true },
    { min: 40, max: 99, noteNumber: 68, expected: true },
    { min: 40, max: 99, noteNumber: 99, expected: true },
    { min: 40, max: 99, noteNumber: 100, expected: false },
    { min: 40, max: 99, noteNumber: 127, expected: false },
  ])(
    "[$min, $max] can play $noteNumber => $expected",
    ({ min, max, noteNumber, expected }) => {
      // given
      const sut = createTestInstrument({ min, max });
      assertNoteNumber(noteNumber);

      // when
      const result = canPlay(sut, noteNumber);

      // then
      expect(result).toBe(expected);
    },
  );
});

describe(canPlayAll, () => {
  it.each([
    { min: 40, max: 99, range: [0, 20], expected: false },
    { min: 40, max: 99, range: [30, 60], expected: false },
    { min: 40, max: 99, range: [40, 52], expected: true },
    { min: 40, max: 99, range: [52, 74], expected: true },
    { min: 40, max: 99, range: [74, 99], expected: true },
    { min: 40, max: 99, range: [80, 100], expected: false },
    { min: 40, max: 99, range: [108, 111], expected: false },
    { min: 40, max: 99, range: [0, 111], expected: false },
  ])(
    "[$min, $max] can play $range => $expected",
    ({ min, max, range, expected }) => {
      // given
      const sut = createTestInstrument({ min, max });
      const noteRange = createNoteRange(
        asNoteNumber(range[0]),
        asNoteNumber(range[1]),
      );

      // when
      const result = canPlayAll(sut, noteRange);

      // then
      expect(result).toBe(expected);
    },
  );
});

describe(setIsSelected, () => {
  it.each([
    { isSelected: false, expected: false },
    { isSelected: true, expected: true },
  ])(
    "非選択状態で実行: set $isSelected => $expected",
    ({ isSelected, expected }) => {
      // given
      const sut = createTestInstrument();
      assert(!sut.isSelected, "非選択状態のはず");

      // when
      const result = setIsSelected(sut, isSelected);

      // then
      expect(result.isSelected).toBe(expected);
    },
  );

  it.each([
    { isSelected: false, expected: false },
    { isSelected: true, expected: true },
  ])(
    "選択状態で実行: set $isSelected => $expected",
    ({ isSelected, expected }) => {
      // given
      const sut = setIsSelected(createTestInstrument(), true);
      assert(sut.isSelected, "選択状態のはず");

      // when
      const result = setIsSelected(sut, isSelected);

      // then
      expect(result.isSelected).toBe(expected);
    },
  );
});
