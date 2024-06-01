import { atom, useAtom } from "jotai";
import { createInstruments } from "../source/instrumentData";
import { InstrumentRepository } from "../../domain/interface/repository/instrumentRepository";
import { useMemo } from "react";
import { Instrument } from "../../domain/instrument";
import { assertExists } from "../../util/exists";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";

const instrumentAtoms = createInstruments().map((instrument) =>
  atom(instrument),
);
const instrumentsAtom = atom((get) => instrumentAtoms.map(get));
const setInstrumentAtom = atom(null, (get, set, instrument: Instrument) => {
  const instrumentAtom = instrumentAtoms.find(
    (item) => get(item).id === instrument.id,
  );
  assertExists(instrumentAtom);
  set(instrumentAtom, instrument);
});

export const useJotaiInstrumentRepository = (): InstrumentRepository => {
  const [instruments] = useAtom(instrumentsAtom);
  const [, setInstrument] = useAtom(setInstrumentAtom);
  return useMemo(
    () => createJotaiInstrumentRepository(instruments, setInstrument),
    [instruments, setInstrument],
  );
};

export const createJotaiInstrumentRepository = (
  currentInstruments: Instrument[],
  setInstrument: (instrument: Instrument) => void,
): InstrumentRepository => ({
  getAll(): Instrument[] {
    return currentInstruments;
  },

  findById(id: string): Instrument {
    const instrument = currentInstruments.find(
      (instrument) => instrument.id === id,
    );
    assertExists(instrument);
    return instrument;
  },

  findByCategory(category: InstrumentCategory): Instrument[] {
    return currentInstruments.filter(
      (instrument) => instrument.category === category,
    );
  },

  save(instrument: Instrument) {
    setInstrument(instrument);
  },
});
