import { Instrument } from "../instrument";
import { InstrumentCategory } from "../instrument/instrumentCategory";
import { InstrumentId } from "../instrument/instrumentId";
import { SelectionStatus } from "../instrument/selectionStatus";

export type InstrumentGroup = {
  id: InstrumentCategory;
  instrumentIds: InstrumentId[];
  selectionStatus: SelectionStatus;
};

export const getInstrumentGroup = (
  instruments: Instrument[],
  category: InstrumentCategory,
): InstrumentGroup => {
  const filteredInstruments = instruments.filter(
    (instrument) => instrument.category === category,
  );

  return {
    id: category,
    instrumentIds: filteredInstruments.map((instrument) => instrument.id),
    selectionStatus: getSelectionStatus(filteredInstruments),
  };
};

const getSelectionStatus = (instruments: Instrument[]): SelectionStatus => {
  if (
    instruments.every(
      (instrument) => instrument.selectionStatus === SelectionStatus.SELECTED,
    )
  ) {
    return SelectionStatus.SELECTED;
  } else if (
    instruments.some(
      (instrument) => instrument.selectionStatus === SelectionStatus.SELECTED,
    )
  ) {
    return SelectionStatus.MIXED;
  } else {
    return SelectionStatus.UNSELECTED;
  }
};
