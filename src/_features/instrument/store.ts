import { proxy } from "valtio";
import { asExists } from "@/_lib/utils/exists";
import { createInstruments } from "./data";
import type { Instrument, MidiProgramNumber } from "./model";

type InstrumentStore = {
  instruments: Instrument[];
};

const store = proxy<InstrumentStore>({
  instruments: createInstruments(),
});

const hooks = {
  useInstrument: (midiProgramNumber: MidiProgramNumber): Instrument =>
    asExists(
      store.instruments.find(
        (instrument) => instrument.midiProgramNumber === midiProgramNumber,
      ),
    ),
};

export const instrumentStore = {
  ...hooks,
};
