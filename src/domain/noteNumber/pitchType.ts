export const PitchType = {
  INTERNATIONAL: { name: "International", minOctave: -1 },
  YAMAHA: { name: "Yamaha", minOctave: -2 },
} as const;
export type PitchType = (typeof PitchType)[keyof typeof PitchType];
