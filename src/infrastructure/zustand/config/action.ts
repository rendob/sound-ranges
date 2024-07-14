import { PitchType } from "../../../domain/noteNumber/pitchType";
import { createAction } from "../appStore";

export const setPitchType = (pitchType: PitchType) =>
  createAction((state) => {
    return {
      ...state,
      pitchType,
    };
  });
