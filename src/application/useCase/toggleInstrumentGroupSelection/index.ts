import { useMemo } from "react";
import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import {
  SelectionStatus,
  getInstrumentGroup,
} from "../../../domain/instrumentService";
import { InstrumentRepository } from "../../../domain/interface/repository/instrumentRepository";
import { useJotaiInstrumentRepository } from "../../../infrastructure/repository/jotaiInstrumentRepository";
import { setIsSelected } from "../../../domain/instrument";

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
      const newInstrument = setIsSelected(instrument, shouldSelect);
      instrumentRepository.save(newInstrument);
    });
  };
};
