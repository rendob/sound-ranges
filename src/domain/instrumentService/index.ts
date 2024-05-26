import { Instrument } from "../instrument";
import { InstrumentCategory } from "../instrument/instrumentCategory";

export const SelectionStatus = {
  SELECTED: "Selected",
  MIXED: "Mixed",
  UNSELECTED: "Unselected",
} as const;
export type SelectionStatus =
  (typeof SelectionStatus)[keyof typeof SelectionStatus];

export type InstrumentGroup = {
  category: InstrumentCategory;
  selectionStatus: SelectionStatus;
  instruments: Instrument[];
};

export const getInstrumentGroup = (
  instruments: Instrument[],
  category: InstrumentCategory,
): InstrumentGroup => {
  const filteredInstruments = instruments.filter(
    (instrument) => instrument.category === category,
  );

  return {
    category,
    selectionStatus: getSelectionStatus(filteredInstruments),
    instruments: filteredInstruments,
  };
};

export const groupByCategory = (
  instruments: Instrument[],
): InstrumentGroup[] => {
  const categories: InstrumentCategory[] = Object.values(InstrumentCategory);
  return categories.map((category) =>
    getInstrumentGroup(instruments, category),
  );
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
