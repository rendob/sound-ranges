import { proxy, type Snapshot, useSnapshot } from "valtio";
import { asExists } from "@/_lib/utils/exists";
import { createInstruments } from "./data";
import type { Instrument, MidiProgramNumber } from "./model";
import { SelectionStatus } from "./selectionStatus";

type InstrumentStore = {
  instruments: Instrument[];
};

const store = proxy<InstrumentStore>({
  instruments: createInstruments(),
});

const getters = {
  getInstrument: (midiProgramNumber: MidiProgramNumber): Instrument =>
    asExists(
      store.instruments.find(
        (instrument) => instrument.midiProgramNumber === midiProgramNumber,
      ),
    ),
};

const hooks = {
  useInstrument: (midiProgramNumber: MidiProgramNumber): Snapshot<Instrument> =>
    asExists(
      useSnapshot(store).instruments.find(
        (instrument) => instrument.midiProgramNumber === midiProgramNumber,
      ),
    ),
};

const actions = {
  toggleSelection: (midiProgramNumber: MidiProgramNumber) => {
    const instrument = getters.getInstrument(midiProgramNumber);
    if (instrument.selectionStatus === SelectionStatus.SELECTED) {
      instrument.selectionStatus = SelectionStatus.UNSELECTED;
    } else {
      instrument.selectionStatus = SelectionStatus.SELECTED;
    }
  },
};

export const instrumentStore = {
  ...hooks,
  ...actions,
};
