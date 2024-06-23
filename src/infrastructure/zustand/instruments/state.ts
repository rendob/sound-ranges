import { Instrument } from "../../../domain/instrument";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { Normalized, normalize } from "../../../util/normalize";
import { createInstruments } from "../../source/instrumentData";

export type InstrumentsState = {
  instruments: Normalized<InstrumentId, Instrument>;
};

export const initialInstrumentsState: InstrumentsState = {
  instruments: normalize(createInstruments()),
};
