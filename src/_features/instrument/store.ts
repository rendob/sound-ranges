import { proxy, type Snapshot, useSnapshot } from "valtio";
import { asExists } from "@/_lib/utils/exists";
import { createInstruments } from "./data";
import {
  getSelectionStatus,
  type Instrument,
  type MidiProgramNumber,
} from "./model";
import { SelectionStatus } from "./selectionStatus";

type InstrumentStore = {
  instruments: Instrument[];
};

const store = proxy<InstrumentStore>({
  instruments: createInstruments(),
});

const hooks = {
  useInstrument: (midiProgramNumber: MidiProgramNumber): Snapshot<Instrument> =>
    asExists(
      useSnapshot(store).instruments.find(
        (instrument) => instrument.midiProgramNumber === midiProgramNumber,
      ),
    ),

  useGroupSelectionStatus: (
    midiProgramNumbers: MidiProgramNumber[],
  ): Snapshot<SelectionStatus> => {
    const instruments = useSnapshot(store).instruments.filter((instrument) =>
      midiProgramNumbers.includes(instrument.midiProgramNumber),
    );
    return getSelectionStatus(instruments);
  },
};

const actions = {
  toggleSelection: (midiProgramNumber: MidiProgramNumber) => {
    const instrument = asExists(
      store.instruments.find(
        (instrument) => instrument.midiProgramNumber === midiProgramNumber,
      ),
    );

    if (instrument.selectionStatus === SelectionStatus.SELECTED) {
      instrument.selectionStatus = SelectionStatus.UNSELECTED;
    } else {
      instrument.selectionStatus = SelectionStatus.SELECTED;
    }
  },

  toggleGroupSelection: (midiProgramNumbers: MidiProgramNumber[]) => {
    const instruments = store.instruments.filter((instrument) =>
      midiProgramNumbers.includes(instrument.midiProgramNumber),
    );
    const selectionStatus = getSelectionStatus(instruments);
    const nextSelectionStatus =
      selectionStatus === SelectionStatus.SELECTED
        ? SelectionStatus.UNSELECTED
        : SelectionStatus.SELECTED;

    for (const instrument of instruments) {
      instrument.selectionStatus = nextSelectionStatus;
    }
  },
};

export const instrumentStore = {
  ...hooks,
  ...actions,
};
