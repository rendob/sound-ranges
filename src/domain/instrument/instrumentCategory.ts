export const InstrumentCategory = {
  STRINGS: "Strings",
  BRASS: "Brass",
  WOODWIND: "Woodwind",
  PERCUSSION: "Percussion",
} as const;
export type InstrumentCategory =
  (typeof InstrumentCategory)[keyof typeof InstrumentCategory];
