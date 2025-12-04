import { derive } from "derive-valtio";
import { proxy, type Snapshot, useSnapshot } from "valtio";
import { asExists, exists } from "@/_lib/utils/exists";
import type { InstrumentGroup } from "../instrumentGroup/model";
import { getSelectedRange } from "../pianoKey/model";
import { pianoKeyStore } from "../pianoKey/store";
import { createInstruments } from "./data";
import type { MidiProgramNumber } from "./midiProgramNumber";
import { canPlay, getSelectionStatus, type Instrument } from "./model";
import { getNextStatus, SelectionStatus } from "./selectionStatus";

type InstrumentStore = {
  instruments: Instrument[];
};

const store = proxy<InstrumentStore>({
  instruments: createInstruments(),
});

const derived = derive({
  isShowns: (get) => {
    const instruments = get(store).instruments;
    const pianoKeys = get(pianoKeyStore.getPianoKeys());

    const selectedRange = getSelectedRange(pianoKeys);

    return instruments.map(
      (instrument) =>
        instrument.selectionStatus === SelectionStatus.SELECTED &&
        (!exists(selectedRange) || canPlay(instrument, selectedRange)),
    );
  },
});

const hooks = {
  useInstrument: (midiProgramNumber: MidiProgramNumber): Snapshot<Instrument> =>
    useSnapshot(store).instruments[midiProgramNumber - 1],

  useIsShown: (midiProgramNumber: MidiProgramNumber): boolean => {
    return useSnapshot(derived).isShowns[midiProgramNumber - 1];
  },

  useGroupSelectionStatus: (
    instrumentGroup: InstrumentGroup,
  ): Snapshot<SelectionStatus> => {
    const instruments = useSnapshot(store).instruments.filter((instrument) =>
      instrumentGroup.midiProgramNumbers.includes(instrument.midiProgramNumber),
    );
    return getSelectionStatus(instruments);
  },

  useAllSelectionStatus: (): Snapshot<SelectionStatus> => {
    const instruments = useSnapshot(store).instruments;
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

  toggleGroupSelection: (instrumentGroup: InstrumentGroup) => {
    const instruments = store.instruments.filter((instrument) =>
      instrumentGroup.midiProgramNumbers.includes(instrument.midiProgramNumber),
    );
    const currentStatus = getSelectionStatus(instruments);
    const nextSelectionStatus = getNextStatus(currentStatus);

    for (const instrument of instruments) {
      instrument.selectionStatus = nextSelectionStatus;
    }
  },

  toggleAllSelection: () => {
    const currentStatus = getSelectionStatus(store.instruments);
    const nextSelectionStatus = getNextStatus(currentStatus);

    for (const instrument of store.instruments) {
      instrument.selectionStatus = nextSelectionStatus;
    }
  },
};

export const instrumentStore = {
  ...hooks,
  ...actions,
};
