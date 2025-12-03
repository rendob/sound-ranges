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

const hooks = {
  usePianoKey: (noteNumber: NoteNumber): Snapshot<PianoKey> =>
    asExists(
      useSnapshot(store).pianoKeys.find(
        (pianoKey) => pianoKey.noteNumber === noteNumber,
      ),
    ),
};

export const pianoKeyStore = {
  ...hooks,
};
