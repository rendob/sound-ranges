import z from "zod";
import type { WithKey } from "@/_lib/utils/withKey";
import { allNoteNumbers, noteNumberSchema } from "../noteNumber/model";

const pianoKeySchema = z.object({
  noteNumber: noteNumberSchema,
  isSelected: z.boolean(),
});
export type PianoKey = z.infer<typeof pianoKeySchema>;

export const createAllPianoKeys = (): PianoKey[] =>
  allNoteNumbers.map((noteNumber) =>
    pianoKeySchema.parse({
      noteNumber,
      isSelected: false,
    } satisfies WithKey<PianoKey>),
  );
