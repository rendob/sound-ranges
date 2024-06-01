import { useMemo } from "react";
import { InstrumentRepository } from "../../../domain/interface/repository/instrumentRepository";
import { useJotaiInstrumentRepository } from "../../../infrastructure/repository/jotaiInstrumentRepository";

export const useToggleInstrumentSelectionUseCase = () => {
  const repository = useJotaiInstrumentRepository();
  return useMemo(
    () => createToggleInstrumentSelectionUseCase(repository),
    [repository],
  );
};

export const createToggleInstrumentSelectionUseCase = (
  instrumentRepository: InstrumentRepository,
) => {
  return (instrumentId: string) => {
    const instrument = instrumentRepository.findById(instrumentId);
    const newInstrument = instrument.selectionUpdated(!instrument.isSelected);
    instrumentRepository.save(newInstrument);
  };
};
