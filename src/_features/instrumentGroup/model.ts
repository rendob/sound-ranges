import z from "zod";
import { localizableSchema } from "@/_lib/i18n/i18n";
import { midiProgramNumberSchema } from "../instrument/midiProgramNumber";

export const instrumentGroupSchema = z.object({
  name: localizableSchema(z.string()),
  midiProgramNumbers: z.array(midiProgramNumberSchema).nonempty(),
});
export type InstrumentGroup = z.infer<typeof instrumentGroupSchema>;
