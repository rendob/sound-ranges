import { atom, useAtom } from "jotai";
import { createInstruments } from "../source/instrumentData";
import { InstrumentRepository } from "../../domain/interface/repository/instrumentRepository";
import { useMemo } from "react";
import { Instrument } from "../../domain/instrument";
import { assertExists } from "../../util/exists";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";

const instrumentsAtom = atom(createInstruments());

export const useJotaiInstrumentRepository = (): InstrumentRepository => {
  const [instruments, setInstruments] = useAtom(instrumentsAtom);
  return useMemo(
    () => createJotaiInstrumentRepository(instruments, setInstruments),
    [instruments, setInstruments],
  );
};

export const createJotaiInstrumentRepository = (
  instruments: Instrument[],
  setInstruments: (instruments: Instrument[]) => void,
): InstrumentRepository => ({
  getAll(): Instrument[] {
    return instruments;
  },

  findById(id: string): Instrument {
    const instrument = instruments.find((instrument) => instrument.id === id);
    assertExists(instrument);
    return instrument;
  },

  findByCategory(category: InstrumentCategory): Instrument[] {
    return instruments.filter((instrument) => instrument.category === category);
  },

  save(instrument: Instrument) {
    const index = instruments.findIndex((item) => item.id === instrument.id);
    if (index === -1) throw new Error(`${instrument.id} not found!`);

    const newInstruments = [...instruments];
    newInstruments[index] = instrument;
    setInstruments(newInstruments);
  },
});
