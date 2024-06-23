import { Instrument } from "../../../domain/instrument";
import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import {
  InstrumentGroup,
  getInstrumentGroup,
} from "../../../domain/instrumentGroup";
import { getAllItems } from "../../../util/normalize";
import { useAppStore } from "../appStore";
import { InstrumentsState } from "./state";

const selectInstruments = (state: InstrumentsState): Instrument[] =>
  getAllItems(state.instruments);

const selectInstrument = (id: InstrumentId) => (state: InstrumentsState) =>
  state.instruments.byId[id];

export const selectInstrumentGroup =
  (category: InstrumentCategory) =>
  (state: InstrumentsState): InstrumentGroup => {
    const instruments = selectInstruments(state);
    return getInstrumentGroup(instruments, category);
  };

// ***** selector hooks *****

export const useInstrument = (id: InstrumentId) =>
  useAppStore(selectInstrument(id));

export const useInstrumentGroup = (category: InstrumentCategory) =>
  useAppStore(selectInstrumentGroup(category));
