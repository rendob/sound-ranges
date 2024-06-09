import { describe, expect, it } from "vitest";
import { Instrument, createInstrument, setIsSelected } from "../instrument";
import { InstrumentCategory } from "../instrument/instrumentCategory";
import { createNoteRange } from "../noteRange";
import { createRgbColor } from "../rgbColor";
import {
  InstrumentGroup,
  SelectionStatus,
  getInstrumentGroup,
  groupByCategory,
} from ".";
import { asNoteNumber } from "../noteNumber";
import { asUInt8 } from "../uint8";
import { asFilledString } from "../filledString";

const anInstrument = (
  name: string,
  category: InstrumentCategory,
  isSelected: boolean,
): Instrument => {
  const instrument = createInstrument(
    asFilledString(name),
    category,
    createNoteRange(asNoteNumber(0), asNoteNumber(127)),
    createRgbColor(asUInt8(0), asUInt8(0), asUInt8(0)),
  );
  return setIsSelected(instrument, isSelected);
};

describe(getInstrumentGroup, () => {
  it("Success Case", () => {
    // given
    const input = [
      anInstrument("piano", InstrumentCategory.PERCUSSION, true),
      anInstrument("violin", InstrumentCategory.STRINGS, true),
      anInstrument("horn", InstrumentCategory.BRASS, false),
      anInstrument("flute", InstrumentCategory.WOODWIND, false),
      anInstrument("piccolo", InstrumentCategory.WOODWIND, true),
      anInstrument("cello", InstrumentCategory.STRINGS, true),
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
    const input = [
      anInstrument("piano", InstrumentCategory.PERCUSSION, true),
      anInstrument("violin", InstrumentCategory.STRINGS, true),
      anInstrument("horn", InstrumentCategory.BRASS, false),
      anInstrument("flute", InstrumentCategory.WOODWIND, false),
      anInstrument("piccolo", InstrumentCategory.WOODWIND, true),
      anInstrument("cello", InstrumentCategory.STRINGS, true),
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
