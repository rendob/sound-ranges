import { describe, expect, it } from "vitest";
import { Instrument } from "../instrument";
import { InstrumentCategory } from "../instrument/instrumentCategory";
import { Note } from "../note";
import { NoteRange } from "../noteRange";
import { RgbColor } from "../rgbColor";
import {
  InstrumentGroup,
  SelectionStatus,
  getInstrumentGroup,
  groupByCategory,
} from ".";

const createInstrument = (
  name: string,
  category: InstrumentCategory,
  isSelected: boolean,
): Instrument => {
  const instrument = Instrument.new(
    name,
    category,
    new NoteRange(new Note(0), new Note(127)),
    new RgbColor(0, 0, 0),
  ).selectionUpdated(isSelected);
  return instrument;
};

describe(getInstrumentGroup, () => {
  it("Success Case", () => {
    // given
    const input: Instrument[] = [
      createInstrument("piano", InstrumentCategory.PERCUSSION, true),
      createInstrument("violin", InstrumentCategory.STRINGS, true),
      createInstrument("horn", InstrumentCategory.BRASS, false),
      createInstrument("flute", InstrumentCategory.WOODWIND, false),
      createInstrument("piccolo", InstrumentCategory.WOODWIND, true),
      createInstrument("cello", InstrumentCategory.STRINGS, true),
    ];

    // when
    const output = getInstrumentGroup(input, InstrumentCategory.STRINGS);

    // then
    const expected: InstrumentGroup = {
      category: InstrumentCategory.STRINGS,
      selectionStatus: SelectionStatus.SELECTED,
      instruments: [input[1], input[5]],
    };
    expect(output).toStrictEqual(expected);
  });
});

describe(groupByCategory, () => {
  it("Success Case", () => {
    // given
    const input: Instrument[] = [
      createInstrument("piano", InstrumentCategory.PERCUSSION, true),
      createInstrument("violin", InstrumentCategory.STRINGS, true),
      createInstrument("horn", InstrumentCategory.BRASS, false),
      createInstrument("flute", InstrumentCategory.WOODWIND, false),
      createInstrument("piccolo", InstrumentCategory.WOODWIND, true),
      createInstrument("cello", InstrumentCategory.STRINGS, true),
    ];

    // when
    const output = groupByCategory(input);

    // then
    const expected: InstrumentGroup[] = [
      {
        category: InstrumentCategory.STRINGS,
        selectionStatus: SelectionStatus.SELECTED,
        instruments: [input[1], input[5]],
      },
      {
        category: InstrumentCategory.BRASS,
        selectionStatus: SelectionStatus.UNSELECTED,
        instruments: [input[2]],
      },
      {
        category: InstrumentCategory.WOODWIND,
        selectionStatus: SelectionStatus.MIXED,
        instruments: [input[3], input[4]],
      },
      {
        category: InstrumentCategory.PERCUSSION,
        selectionStatus: SelectionStatus.SELECTED,
        instruments: [input[0]],
      },
    ];
    expect(output).toStrictEqual(expected);
  });
});
