import { InstrumentCategory } from "./instrumentCategory";
import { NoteRange, contains } from "../noteRange";
import { RgbColor } from "../rgbColor";
import { NoteNumber } from "../noteNumber";
import { Brand } from "../brand";
import { InstrumentId, asInstrumentId } from "./instrumentId";
import { FilledString } from "../filledString";
import { TypeAssertionError } from "../error/appError";
import { SelectionStatus } from "./selectionStatus";

const typeName = "Instrument";
type InstrumentType = {
  readonly id: InstrumentId;
  readonly name: FilledString;
  readonly category: InstrumentCategory;
  readonly range: NoteRange;
  readonly color: RgbColor;
  readonly selectionStatus: Exclude<
    SelectionStatus,
    typeof SelectionStatus.MIXED
  >;
};
export type Instrument = Brand<InstrumentType, typeof typeName>;

// ***** initialization *****

export const createInstrument = (
  name: FilledString,
  category: InstrumentCategory,
  range: NoteRange,
  color: RgbColor,
): Instrument =>
  asInstrument({
    id: asInstrumentId(name),
    name,
    category,
    range,
    color,
    selectionStatus: SelectionStatus.UNSELECTED,
  });

// ***** assertion *****

function assertInstrument(v: InstrumentType): asserts v is Instrument {
  if (v.id !== v.name) {
    throw new TypeAssertionError(
      typeName,
      `id (${v.id}) should equals name (${v.name})!`,
    );
  }
}

const asInstrument = (v: InstrumentType): Instrument => {
  assertInstrument(v);
  return v;
};

// ***** method *****

export const canPlay = (
  instrument: Instrument,
  noteNumber: NoteNumber,
): boolean => contains(instrument.range, noteNumber);

export const canPlayAll = (
  instrument: Instrument,
  noteRange: NoteRange,
): boolean =>
  canPlay(instrument, noteRange.min) && canPlay(instrument, noteRange.max);

export const setSelectionStatus = (
  instrument: Instrument,
  selectionStatus: InstrumentType["selectionStatus"],
): Instrument =>
  asInstrument({
    ...instrument,
    selectionStatus,
  });
