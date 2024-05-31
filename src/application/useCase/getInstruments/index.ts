import { InstrumentRepository } from "../../../domain/interface/repository/instrumentRepository";

export const createGetInstrumentsUseCase = (
  instrumentRepository: InstrumentRepository,
) => {
  return () => instrumentRepository.getAll();
};
