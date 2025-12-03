import { proxy, type Snapshot, useSnapshot } from "valtio";
import { PitchType } from "./model";

type PitchTypeStore = {
  pitchType: PitchType;
};

const store = proxy<PitchTypeStore>({
  pitchType: PitchType.YAMAHA,
});

const hooks = {
  usePitchType: (): Snapshot<PitchType> => useSnapshot(store).pitchType,
};

const actions = {
  changePitchType: (newPitchType: PitchType) => {
    store.pitchType = newPitchType;
  },
};

export const pitchTypeStore = {
  ...hooks,
  ...actions,
};
