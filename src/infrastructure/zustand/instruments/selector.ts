import { Instrument } from "../../../domain/instrument";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { SelectionStatus } from "../../../domain/instrument/selectionStatus";
import { InstrumentGroup } from "../../../domain/instrumentGroup";
import { getAllItems } from "../../../util/normalize";
import { useAppStore } from "../appStore";
import { InstrumentsState } from "./state";

const selectInstruments = (state: InstrumentsState): Instrument[] =>
  getAllItems(state.instruments);

export const selectSelectedInstruments = (
  state: InstrumentsState,
): Instrument[] =>
  selectInstruments(state).filter(
    (instrument) => instrument.selectionStatus === SelectionStatus.SELECTED,
  );

const selectInstrument = (id: InstrumentId) => (state: InstrumentsState) =>
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

export const useInstrument = (id: InstrumentId) =>
  useAppStore(selectInstrument(id));

export const useInstrumentGroupSelectionStatus = (
  instrumentGroup: InstrumentGroup,
) => useAppStore(selectInstrumentGroupSelectionStatus(instrumentGroup));

export const useAllSelectionStatus = () =>
  useAppStore(selectAllSelectionStatus);
