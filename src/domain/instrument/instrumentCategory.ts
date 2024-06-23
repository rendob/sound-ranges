export const InstrumentCategory = {
  KEYBOARD: "Keyboard",
  STRINGS: "Strings",
  BRASS: "Brass",
  WOODWIND: "Woodwind",
  PERCUSSION: "Percussion",
  OTHER: "Other",
} as const;
export type InstrumentCategory =
  (typeof InstrumentCategory)[keyof typeof InstrumentCategory];
