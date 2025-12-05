import z from "zod";

const MIN_NUMBER = 1;
const MAX_NUMBER = 128;

export const midiProgramNumberSchema = z
  .int()
  .min(MIN_NUMBER)
  .max(MAX_NUMBER)
  .brand("MidiProgramNumber");
export type MidiProgramNumber = z.infer<typeof midiProgramNumberSchema>;
export const asMidiProgramNumber = (value: number): MidiProgramNumber =>
  midiProgramNumberSchema.parse(value);

export const allMidiProgramNumbers = Array.from(
  { length: MAX_NUMBER - MIN_NUMBER + 1 },
  (_, index) => asMidiProgramNumber(MIN_NUMBER + index),
);
