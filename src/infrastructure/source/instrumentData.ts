import { asFilledString } from "../../domain/filledString";
import { Instrument, createInstrument } from "../../domain/instrument";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";
import { asNoteNumber } from "../../domain/noteNumber";
import { createNoteRange } from "../../domain/noteRange";
import { createRgbColor } from "../../domain/rgbColor";
import { asUInt8 } from "../../domain/uint8";

const create = (
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
  create("Piano", InstrumentCategory.KEYBOARD, [21, 108], [0, 0, 255]),
  create("Celesta", InstrumentCategory.KEYBOARD, [60, 108], [0, 0, 0]),
  create("Organ", InstrumentCategory.KEYBOARD, [36, 96], [0, 0, 0]),
  create("Accordion", InstrumentCategory.KEYBOARD, [53, 89], [0, 0, 0]),
  create("Harp", InstrumentCategory.STRINGS, [23, 103], [0, 0, 0]),
  create("Violin", InstrumentCategory.STRINGS, [55, 96], [0, 0, 0]),
  create("Viola", InstrumentCategory.STRINGS, [48, 84], [0, 0, 0]),
  create("Cello", InstrumentCategory.STRINGS, [36, 72], [0, 0, 0]),
  create("Bass", InstrumentCategory.STRINGS, [28, 55], [0, 0, 0]),
  create("Guitar", InstrumentCategory.STRINGS, [40, 84], [0, 0, 0]),
  create("Bass Guitar", InstrumentCategory.STRINGS, [28, 55], [0, 0, 0]),
  create("Trumpet", InstrumentCategory.BRASS, [58, 94], [0, 0, 0]),
  create("Horn", InstrumentCategory.BRASS, [41, 77], [0, 0, 0]),
  create("Trombone", InstrumentCategory.BRASS, [34, 75], [0, 0, 0]),
  create("Tuba", InstrumentCategory.BRASS, [29, 55], [0, 0, 0]),
  create("Piccolo", InstrumentCategory.WOODWIND, [74, 108], [0, 0, 0]),
  create("Flute", InstrumentCategory.WOODWIND, [60, 96], [0, 0, 0]),
  create("Oboe", InstrumentCategory.WOODWIND, [58, 91], [0, 0, 0]),
  create("Clarinet", InstrumentCategory.WOODWIND, [50, 91], [0, 0, 0]),
  create("Harmonica", InstrumentCategory.WOODWIND, [60, 84], [0, 0, 0]),
  create("Timpani", InstrumentCategory.PERCUSSION, [36, 57], [0, 0, 0]),
  create("Glockenspiel", InstrumentCategory.PERCUSSION, [72, 108], [0, 0, 0]),
  create("Vibraphone", InstrumentCategory.PERCUSSION, [53, 89], [0, 0, 0]),
  create("Marimba", InstrumentCategory.PERCUSSION, [48, 84], [0, 0, 0]),
  create("Chorus", InstrumentCategory.OTHER, [48, 79], [0, 0, 0]),
];
