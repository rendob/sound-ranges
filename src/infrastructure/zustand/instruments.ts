import { create } from "zustand";
import { Instrument, setIsSelected } from "../../domain/instrument";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";
import { InstrumentId } from "../../domain/instrument/instrumentId";
import { createInstruments } from "../source/instrumentData";
import {
  InstrumentGroup,
  SelectionStatus,
  getSelectionStatus,
  groupByCategory,
} from "../../domain/instrumentService";
import {
  Normalized,
  normalize,
  updateItem,
  updateItems,
} from "../../util/normalize";

type State = {
  groups: Normalized<InstrumentCategory, InstrumentGroup>;
  instruments: Normalized<InstrumentId, Instrument>;
};

type Actions = {
  toggleInstrumentSelection: (id: InstrumentId) => void;
  toggleInstrumentGroupSelection: (category: InstrumentCategory) => void;
};

const createInitialState = (): State => {
  const instruments = createInstruments();
  const instrumentGroups = groupByCategory(instruments);
  return {
    groups: normalize(instrumentGroups),
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
      const instrumentGroup = state.groups.byId[category];
      const shouldSelect =
        selectGroupSelectionStatus(category)(state) !==
        SelectionStatus.SELECTED;

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

export const selectInstrument = (id: InstrumentId) => (state: State) =>
  state.instruments.byId[id];

export const selectInstrumentGroup =
  (category: InstrumentCategory) => (state: State) =>
    state.groups.byId[category];

export const selectGroupSelectionStatus =
  (category: InstrumentCategory) =>
  (state: State): SelectionStatus => {
    const group = state.groups.byId[category];
    const instruments = group.instrumentIds.map(
      (id) => state.instruments.byId[id],
    );
    return getSelectionStatus(instruments);
  };
