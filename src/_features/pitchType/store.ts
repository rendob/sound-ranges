import { proxy, type Snapshot, useSnapshot } from "valtio";
import { PitchType } from "./model";

type PitchTypeState = {
  pitchType: PitchType;
};
const state = proxy<PitchTypeState>({
  pitchType: PitchType.YAMAHA,
});

const hooks = {
  usePitchType: (): Snapshot<PitchType> => useSnapshot(state).pitchType,
};

const actions = {
  changePitchType: (newPitchType: PitchType) => {
    state.pitchType = newPitchType;
  },
};

export const pitchTypeStore = {
  ...hooks,
  ...actions,
};
