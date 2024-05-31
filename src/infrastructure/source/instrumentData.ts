import { Instrument } from "../../domain/instrument";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";
import { Note } from "../../domain/note";
import { NoteRange } from "../../domain/noteRange";
import { RgbColor } from "../../domain/rgbColor";

const createInstrument = (
  name: string,
  category: InstrumentCategory,
  range: [number, number],
  color: [number, number, number],
): Instrument =>
  Instrument.new(
    name,
    category,
    new NoteRange(new Note(range[0]), new Note(range[1])),
    new RgbColor(...color),
  );

// TODO: データが合っているか確認
export const createInstruments = (): Instrument[] => [
  createInstrument(
    "Piano",
    InstrumentCategory.PERCUSSION,
    [21, 108],
    [0, 0, 255],
  ),
  createInstrument("Harp", InstrumentCategory.STRINGS, [23, 103], [0, 0, 0]),
  createInstrument("Violin", InstrumentCategory.STRINGS, [55, 96], [0, 0, 0]),
  createInstrument("Viola", InstrumentCategory.STRINGS, [48, 84], [0, 0, 0]),
  createInstrument("Cello", InstrumentCategory.STRINGS, [36, 72], [0, 0, 0]),
  createInstrument("Bass", InstrumentCategory.STRINGS, [28, 55], [0, 0, 0]),
  createInstrument("Trumpet", InstrumentCategory.BRASS, [58, 94], [0, 0, 0]),
];
