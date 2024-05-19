import { assert, describe, expect, it } from "vitest";
import { InstrumentCategory } from "./instrumentCategory";
import { Instrument } from ".";
import { NoteRange } from "../noteRange";
import { Note } from "../note";
import { ValidationError } from "../error/appError";

const createInstrument = ({
  name = "xxx",
  category = InstrumentCategory.BRASS,
  min = 0,
  max = 127,
}: {
  name?: string;
  category?: InstrumentCategory;
  min?: number;
  max?: number;
} = {}) => {
  return Instrument.new(
    name,
    category,
    new NoteRange(new Note(min), new Note(max)),
  );
};

describe("initialization", () => {
  it.each([{ name: "violin" }, { name: "piano" }])(
    "名前が空でない: $name => OK",
    ({ name }) => {
      // given

      // when
      const block = () => {
        createInstrument({ name });
      };

      // then
      expect(block).not.toThrow();
    },
  );

  it("名前が空 => Error", () => {
    // given

    // when
    const block = () => {
      createInstrument({ name: "" });
    };

    // then
    expect(block).toThrow(ValidationError);
  });

  it("初期化時は非選択状態", () => {
    // given

    // when
    const sut = createInstrument();

    // then
    expect(sut.isSelected).toBe(false);
  });
});

describe(Instrument.prototype.canPlay, () => {
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
      const sut = createInstrument({ min, max });
      const note = new Note(noteNumber);

      // when
      const canPlay = sut.canPlay(note);

      // then
      expect(canPlay).toBe(expected);
    },
  );
});

describe(Instrument.prototype.canPlayAll, () => {
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
      const sut = createInstrument({ min, max });
      const noteRange = new NoteRange(new Note(range[0]), new Note(range[1]));

      // when
      const canPlayAll = sut.canPlayAll(noteRange);

      // then
      expect(canPlayAll).toBe(expected);
    },
  );
});

describe(Instrument.prototype.selectionUpdated, () => {
  it.each([
    { isSelected: false, expected: false },
    { isSelected: true, expected: true },
  ])(
    "非選択状態で実行: set $isSelected => $expected",
    ({ isSelected, expected }) => {
      // given
      const sut = createInstrument();
      assert(!sut.isSelected, "非選択状態のはず");

      // when
      const result = sut.selectionUpdated(isSelected);

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
      const sut = createInstrument().selectionUpdated(true);
      assert(sut.isSelected, "選択状態のはず");

      // when
      const result = sut.selectionUpdated(isSelected);

      // then
      expect(result.isSelected).toBe(expected);
    },
  );
});
