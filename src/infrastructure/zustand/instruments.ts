import { create } from "zustand";
import { Instrument, setIsSelected } from "../../domain/instrument";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";
import { InstrumentId } from "../../domain/instrument/instrumentId";
import { createInstruments } from "../source/instrumentData";
import {
  InstrumentGroup,
  SelectionStatus,
  getInstrumentGroup,
} from "../../domain/instrumentService";
import {
  Normalized,
  normalize,
  updateItem,
  updateItems,
} from "../../util/normalize";

type State = {
  instruments: Normalized<InstrumentId, Instrument>;
};

type Actions = {
  toggleInstrumentSelection: (id: InstrumentId) => void;
  toggleInstrumentGroupSelection: (category: InstrumentCategory) => void;
};

const createInitialState = (): State => {
  const instruments = createInstruments();
  return {
    instruments: normalize(instruments),
  };
};

export const useInstrumentsStore = create<State & Actions>((set) => ({
  ...createInitialState(),
  toggleInstrumentSelection: (id) =>
    set((state) => {
      const instrument = state.instruments.byId[id];
      const newInstrument = setIsSelected(instrument, !instrument.isSelected);
      return {
        ...state,
        instruments: updateItem(state.instruments, id, newInstrument),
      };
    }),
  toggleInstrumentGroupSelection: (category) =>
    set((state) => {
      const instrumentGroup = selectInstrumentGroup(category)(state);
      const shouldSelect =
        instrumentGroup.selectionStatus !== SelectionStatus.SELECTED;

      return {
        ...state,
        instruments: updateItems(
          state.instruments,
          instrumentGroup.instrumentIds,
          (item) => setIsSelected(item, shouldSelect),
        ),
      };
    }),
}));

// ***** selectors *****

export const selectInstruments = (state: State): Instrument[] =>
  state.instruments.allIds.map((id) => state.instruments.byId[id]);

export const selectInstrument = (id: InstrumentId) => (state: State) =>
  state.instruments.byId[id];

export const selectInstrumentGroup =
  (category: InstrumentCategory) =>
  (state: State): InstrumentGroup => {
    const instruments = selectInstruments(state);
    return getInstrumentGroup(instruments, category);
  };
