import { asFilledString } from "../../domain/filledString";
import { Instrument, createInstrument } from "../../domain/instrument";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";
import { asNoteNumber } from "../../domain/noteNumber";
import { createNoteRange } from "../../domain/noteRange";

const create = (
  name: string,
  category: InstrumentCategory,
  range: [number, number],
): Instrument =>
  createInstrument(
    asFilledString(name),
    category,
    createNoteRange(asNoteNumber(range[0]), asNoteNumber(range[1])),
  );

// TODO: データが合っているか確認
export const createInstruments = (): Instrument[] => [
  create("Piano", InstrumentCategory.KEYBOARD, [21, 108]),
  create("Celesta", InstrumentCategory.KEYBOARD, [60, 108]),
  create("Organ", InstrumentCategory.KEYBOARD, [36, 96]),
  create("Accordion", InstrumentCategory.KEYBOARD, [53, 89]),
  create("Harp", InstrumentCategory.STRINGS, [23, 103]),
  create("Violin", InstrumentCategory.STRINGS, [55, 96]),
  create("Viola", InstrumentCategory.STRINGS, [48, 84]),
  create("Cello", InstrumentCategory.STRINGS, [36, 72]),
  create("Bass", InstrumentCategory.STRINGS, [28, 55]),
  create("Guitar", InstrumentCategory.STRINGS, [40, 84]),
  create("Bass Guitar", InstrumentCategory.STRINGS, [28, 55]),
  create("Trumpet", InstrumentCategory.BRASS, [58, 94]),
  create("Horn", InstrumentCategory.BRASS, [41, 77]),
  create("Trombone", InstrumentCategory.BRASS, [34, 75]),
  create("Tuba", InstrumentCategory.BRASS, [29, 55]),
  create("Piccolo", InstrumentCategory.WOODWIND, [74, 108]),
  create("Flute", InstrumentCategory.WOODWIND, [60, 96]),
  create("Oboe", InstrumentCategory.WOODWIND, [58, 91]),
  create("Clarinet", InstrumentCategory.WOODWIND, [50, 91]),
  create("Harmonica", InstrumentCategory.WOODWIND, [60, 84]),
  create("Timpani", InstrumentCategory.PERCUSSION, [36, 57]),
  create("Glockenspiel", InstrumentCategory.PERCUSSION, [72, 108]),
  create("Vibraphone", InstrumentCategory.PERCUSSION, [53, 89]),
  create("Marimba", InstrumentCategory.PERCUSSION, [48, 84]),
  create("Chorus", InstrumentCategory.OTHER, [48, 79]),
];
