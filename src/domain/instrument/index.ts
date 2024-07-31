import { NoteRange, contains } from "../noteRange";
import { NoteNumber } from "../noteNumber";
import { Brand } from "../brand";
import { InstrumentId, asInstrumentId } from "./instrumentId";
import { FilledString } from "../filledString";
import { TypeAssertionError } from "../error/appError";
import { SelectionStatus } from "./selectionStatus";
import { MidiProgramNumber } from "../midiProgramNumber";
import { exists } from "../../util/exists";

const typeName = "Instrument";
type InstrumentType = {
  readonly id: InstrumentId;
  readonly midiProgramNumber: MidiProgramNumber;
  readonly name: FilledString;
  readonly range: NoteRange | null;
  readonly selectionStatus: Exclude<
    SelectionStatus,
    typeof SelectionStatus.MIXED
  >;
};
export type Instrument = Brand<InstrumentType, typeof typeName>;

// ***** initialization *****

export const createInstrument = (
  midiProgramNumber: MidiProgramNumber,
  name: FilledString,
  range: NoteRange | null,
): Instrument =>
  asInstrument({
    id: asInstrumentId(String(midiProgramNumber)),
    midiProgramNumber,
    name,
    range,
    selectionStatus: SelectionStatus.SELECTED,
  });

// ***** assertion *****

function assertInstrument(v: InstrumentType): asserts v is Instrument {
  if (v.id !== asInstrumentId(String(v.midiProgramNumber))) {
    throw new TypeAssertionError(
      typeName,
      `id (${v.id}) should equals midiProgramNumber (${v.midiProgramNumber})!`,
    );
  }
}

const asInstrument = (v: InstrumentType): Instrument => {
  assertInstrument(v);
  return v;
};

// ***** method *****

export const getDisplayName = (instrument: Instrument): string =>
  `${instrument.midiProgramNumber}. ${instrument.name}`;

export const canPlay = (
  instrument: Instrument,
  noteNumber: NoteNumber,
): boolean =>
  exists(instrument.range) && contains(instrument.range, noteNumber);

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
