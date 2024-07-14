export const PitchType = {
  YAMAHA: { name: "Yamaha", minOctave: -2 },
  ROLAND: { name: "Roland", minOctave: -1 },
} as const;
export type PitchType = (typeof PitchType)[keyof typeof PitchType];
