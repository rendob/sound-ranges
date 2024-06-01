import { useMemo } from "react";
import { InstrumentRepository } from "../../../domain/interface/repository/instrumentRepository";
import { useJotaiInstrumentRepository } from "../../../infrastructure/repository/jotaiInstrumentRepository";

export const useGetInstrumentsUseCase = () => {
  const repository = useJotaiInstrumentRepository();
  return useMemo(() => createGetInstrumentsUseCase(repository), [repository]);
};

export const createGetInstrumentsUseCase = (
  instrumentRepository: InstrumentRepository,
) => {
  return () => instrumentRepository.getAll();
};
