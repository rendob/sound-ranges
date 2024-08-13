import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { SelectionStatus } from "../../../domain/instrument/selectionStatus";
import { InstrumentGroup } from "../../../domain/instrumentGroup";
import { useAppStore } from "../appStore";
import { InstrumentsState } from "./state";

const selectInstrumentIds = (state: InstrumentsState): InstrumentId[] =>
  state.instruments.allIds;

export const selectInstrument =
  (id: InstrumentId) => (state: InstrumentsState) =>
    state.instruments.byId[id];

const selectInstrumentGroupSelectionStatus =
  (instrumentGroup: InstrumentGroup) => (state: InstrumentsState) =>
    selectSelectionStatus(state, instrumentGroup.instrumentIds);

const selectAllSelectionStatus = (state: InstrumentsState): SelectionStatus =>
  selectSelectionStatus(state, state.instruments.allIds);

export const selectSelectionStatus = (
  state: InstrumentsState,
  instrumentIds: InstrumentId[],
): SelectionStatus => {
  const instruments = instrumentIds.map((id) => state.instruments.byId[id]);

  if (
    instruments.every(
      (instrument) => instrument.selectionStatus === SelectionStatus.SELECTED,
    )
  ) {
    return SelectionStatus.SELECTED;
  } else if (
    instruments.every(
      (instrument) => instrument.selectionStatus === SelectionStatus.UNSELECTED,
    )
  ) {
    return SelectionStatus.UNSELECTED;
  } else {
    return SelectionStatus.MIXED;
  }
};

// ***** selector hooks *****

export const useInstrumentIds = () => useAppStore(selectInstrumentIds);

export const useInstrument = (id: InstrumentId) =>
  useAppStore(selectInstrument(id));

export const useInstrumentGroupSelectionStatus = (
  instrumentGroup: InstrumentGroup,
) => useAppStore(selectInstrumentGroupSelectionStatus(instrumentGroup));

export const useAllSelectionStatus = () =>
  useAppStore(selectAllSelectionStatus);
