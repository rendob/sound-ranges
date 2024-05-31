import { InstrumentRepository } from "../../../domain/interface/repository/instrumentRepository";

export function createToggleInstrumentSelectionUseCase(
  instrumentRepository: InstrumentRepository,
) {
  return (instrumentId: string) => {
    const instrument = instrumentRepository.findById(instrumentId);
    const newInstrument = instrument.selectionUpdated(!instrument.isSelected);
    instrumentRepository.save(newInstrument);
  };
}
