import { proxy, type Snapshot, useSnapshot } from "valtio";
import { asExists } from "@/_lib/utils/exists";
import type { NoteNumber } from "../noteNumber/model";
import { createAllPianoKeys, type PianoKey } from "./model";

type PianoKeyState = {
  pianoKeys: PianoKey[];
};
const state = proxy<PianoKeyState>({
  pianoKeys: createAllPianoKeys(),
});

const getters = {
  getPianoKeys: (): PianoKey[] => state.pianoKeys,
};

const hooks = {
  usePianoKey: (noteNumber: NoteNumber): Snapshot<PianoKey> =>
    useSnapshot(state).pianoKeys[noteNumber],
};

const actions = {
  selectKey: (noteNumber: NoteNumber) => {
    const pianoKey = asExists(
      state.pianoKeys.find((pianoKey) => pianoKey.noteNumber === noteNumber),
    );
    pianoKey.isSelected = true;
  },

  clearSelection: () => {
    for (const pianoKey of state.pianoKeys) {
      pianoKey.isSelected = false;
    }
  },
};

export const pianoKeyStore = {
  ...getters,
  ...hooks,
  ...actions,
};
