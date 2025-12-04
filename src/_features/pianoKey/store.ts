import { proxy, type Snapshot, useSnapshot } from "valtio";
import { asExists } from "@/_lib/utils/exists";
import type { NoteNumber } from "../noteNumber/model";
import { createAllPianoKeys, type PianoKey } from "./model";

type PianoKeyStore = {
  pianoKeys: PianoKey[];
};

const store = proxy<PianoKeyStore>({
  pianoKeys: createAllPianoKeys(),
});

const getters = {
  getPianoKeys: (): PianoKey[] => store.pianoKeys,
};

const hooks = {
  usePianoKey: (noteNumber: NoteNumber): Snapshot<PianoKey> =>
    useSnapshot(store).pianoKeys[noteNumber],
};

const actions = {
  selectKey: (noteNumber: NoteNumber) => {
    const pianoKey = asExists(
      store.pianoKeys.find((pianoKey) => pianoKey.noteNumber === noteNumber),
    );
    pianoKey.isSelected = true;
  },

  clearSelection: () => {
    for (const pianoKey of store.pianoKeys) {
      pianoKey.isSelected = false;
    }
  },
};

export const pianoKeyStore = {
  ...getters,
  ...hooks,
  ...actions,
};
