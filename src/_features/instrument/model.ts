import z from "zod";
import { type LangCode, localizableSchema } from "@/_lib/i18n/i18n";
import { noteRangeSchema } from "../noteRange/model";
import { SelectionStatus, selectionStatusSchema } from "./selectionStatus";

const midiProgramNumberSchema = z
  .int()
  .min(1)
  .max(128)
  .brand("MidiProgramNumber");
export type MidiProgramNumber = z.infer<typeof midiProgramNumberSchema>;
export const asMidiProgramNumber = (value: number): MidiProgramNumber =>
  midiProgramNumberSchema.parse(value);

export const instrumentSchema = z.object({
  midiProgramNumber: midiProgramNumberSchema,
  name: localizableSchema(z.string()),
  range: noteRangeSchema.nullable(),
  selectionStatus: selectionStatusSchema.exclude([SelectionStatus.MIXED]),
});
export type Instrument = z.infer<typeof instrumentSchema>;

// methods

export const getDisplayName = (
  instrument: Instrument,
  langCode: LangCode,
): string => `${instrument.midiProgramNumber}. ${instrument.name[langCode]}`;
