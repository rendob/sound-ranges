import { PitchType } from "../../../domain/noteNumber/pitchType";
import { useAppStore } from "../appStore";
import { ConfigState } from "./state";

const selectPitchType = (state: ConfigState): PitchType => state.pitchType;

// ***** selector hooks *****

export const usePitchType = () => useAppStore(selectPitchType);
