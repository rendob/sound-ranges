import { beforeAll, describe, expect, it } from "vitest";
import { Instrument, createInstrument, setIsSelected } from "../instrument";
import { InstrumentCategory } from "../instrument/instrumentCategory";
import { createNoteRange } from "../noteRange";
import { createRgbColor } from "../rgbColor";
import { InstrumentGroup, SelectionStatus, getInstrumentGroup } from ".";
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
  let instruments: Instrument[];
  beforeAll(() => {
    instruments = [
      anInstrument("piano", InstrumentCategory.PERCUSSION, true),
      anInstrument("violin", InstrumentCategory.STRINGS, true),
      anInstrument("horn", InstrumentCategory.BRASS, false),
      anInstrument("flute", InstrumentCategory.WOODWIND, false),
      anInstrument("piccolo", InstrumentCategory.WOODWIND, true),
      anInstrument("cello", InstrumentCategory.STRINGS, true),
    ];
  });

  it("Strings => Selected", () => {
    // given

    // when
    const result = getInstrumentGroup(instruments, InstrumentCategory.STRINGS);

    // then
    const expected: InstrumentGroup = {
      id: InstrumentCategory.STRINGS,
      selectionStatus: SelectionStatus.SELECTED,
      instrumentIds: [instruments[1].id, instruments[5].id],
    };
    expect(result).toStrictEqual(expected);
  });

  it("Brass => Unselected", () => {
    // given

    // when
    const result = getInstrumentGroup(instruments, InstrumentCategory.BRASS);

    // then
    const expected: InstrumentGroup = {
      id: InstrumentCategory.BRASS,
      selectionStatus: SelectionStatus.UNSELECTED,
      instrumentIds: [instruments[2].id],
    };
    expect(result).toStrictEqual(expected);
  });

  it("Woodwind => Mixed", () => {
    // given

    // when
    const result = getInstrumentGroup(instruments, InstrumentCategory.WOODWIND);

    // then
    const expected: InstrumentGroup = {
      id: InstrumentCategory.WOODWIND,
      selectionStatus: SelectionStatus.MIXED,
      instrumentIds: [instruments[3].id, instruments[4].id],
    };
    expect(result).toStrictEqual(expected);
  });
});
