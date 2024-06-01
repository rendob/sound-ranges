import { useMemo } from "react";
import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import {
  SelectionStatus,
  getInstrumentGroup,
} from "../../../domain/instrumentService";
import { InstrumentRepository } from "../../../domain/interface/repository/instrumentRepository";
import { useJotaiInstrumentRepository } from "../../../infrastructure/repository/jotaiInstrumentRepository";

export const useToggleInstrumentGroupSelectionUseCase = () => {
  const repository = useJotaiInstrumentRepository();
  return useMemo(
    () => createToggleInstrumentGroupSelectionUseCase(repository),
    [repository],
  );
};

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
