import { PitchType } from "../../../domain/noteNumber/pitchType";

export type ConfigState = {
  pitchType: PitchType;
};

export const initialConfigState: ConfigState = {
  pitchType: PitchType.YAMAHA,
};
