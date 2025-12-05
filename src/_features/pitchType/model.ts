import { asNoteNumber, getNoteNames } from "../noteNumber/model";

export const PitchType = {
  YAMAHA: { name: "Yamaha", minOctave: -2 },
  ROLAND: { name: "Roland", minOctave: -1 },
} as const;
export type PitchType = (typeof PitchType)[keyof typeof PitchType];

// methods

export const getLabelForMiddleC = (pitchType: PitchType): string => {
  const middleC = asNoteNumber(60);
  return `${getNoteNames(middleC, pitchType)[0]} (${pitchType.name})`;
};
