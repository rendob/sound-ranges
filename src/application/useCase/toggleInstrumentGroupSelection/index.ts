import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import {
  SelectionStatus,
  getInstrumentGroup,
} from "../../../domain/instrumentService";
import { InstrumentRepository } from "../../../domain/interface/repository/instrumentRepository";

export const createToggleInstrumentGroupSelectionUseCase = (
  instrumentRepository: InstrumentRepository,
) => {
  return (category: InstrumentCategory) => {
    const instrumentGroup = getInstrumentGroup(
      instrumentRepository.getAll(),
      category,
    );
    const shouldSelect =
      instrumentGroup.selectionStatus !== SelectionStatus.SELECTED;
    instrumentGroup.instruments.forEach((instrument) => {
      const newInstrument = instrument.selectionUpdated(shouldSelect);
      instrumentRepository.save(newInstrument);
    });
  };
};
