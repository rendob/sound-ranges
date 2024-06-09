import { asFilledString } from "../../domain/filledString";
import { Instrument, createInstrument } from "../../domain/instrument";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";
import { asNoteNumber } from "../../domain/noteNumber";
import { createNoteRange } from "../../domain/noteRange";
import { createRgbColor } from "../../domain/rgbColor";
import { asUInt8 } from "../../domain/uint8";

const newInstrument = (
  name: string,
  category: InstrumentCategory,
  range: [number, number],
  color: [number, number, number],
): Instrument =>
  createInstrument(
    asFilledString(name),
    category,
    createNoteRange(asNoteNumber(range[0]), asNoteNumber(range[1])),
    createRgbColor(asUInt8(color[0]), asUInt8(color[1]), asUInt8(color[2])),
  );

// TODO: データが合っているか確認
export const createInstruments = (): Instrument[] => [
  newInstrument("Piano", InstrumentCategory.PERCUSSION, [21, 108], [0, 0, 255]),
  newInstrument("Harp", InstrumentCategory.STRINGS, [23, 103], [0, 0, 0]),
  newInstrument("Violin", InstrumentCategory.STRINGS, [55, 96], [0, 0, 0]),
  newInstrument("Viola", InstrumentCategory.STRINGS, [48, 84], [0, 0, 0]),
  newInstrument("Cello", InstrumentCategory.STRINGS, [36, 72], [0, 0, 0]),
  newInstrument("Bass", InstrumentCategory.STRINGS, [28, 55], [0, 0, 0]),
  newInstrument("Trumpet", InstrumentCategory.BRASS, [58, 94], [0, 0, 0]),
];
