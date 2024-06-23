import { Instrument } from "../instrument";
import { InstrumentCategory } from "../instrument/instrumentCategory";
import { InstrumentId } from "../instrument/instrumentId";

export const SelectionStatus = {
  SELECTED: "Selected",
  MIXED: "Mixed",
  UNSELECTED: "Unselected",
} as const;
export type SelectionStatus =
  (typeof SelectionStatus)[keyof typeof SelectionStatus];

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
  if (instruments.every((instrument) => instrument.isSelected)) {
    return SelectionStatus.SELECTED;
  } else if (instruments.some((instrument) => instrument.isSelected)) {
    return SelectionStatus.MIXED;
  } else {
    return SelectionStatus.UNSELECTED;
  }
};
