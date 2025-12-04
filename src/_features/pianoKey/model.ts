import z from "zod";
import type { WithKey } from "@/_lib/utils/withKey";
import { allNoteNumbers, noteNumberSchema } from "../noteNumber/model";
import { asNoteRange, type NoteRange } from "../noteRange/model";

const pianoKeySchema = z.object({
  noteNumber: noteNumberSchema,
  isSelected: z.boolean(),
});
export type PianoKey = z.infer<typeof pianoKeySchema>;

// methods

export const createAllPianoKeys = (): PianoKey[] =>
  allNoteNumbers.map((noteNumber) =>
    pianoKeySchema.parse({
      noteNumber,
      isSelected: false,
    } satisfies WithKey<PianoKey>),
  );

export const getSelectedRange = (pianoKeys: PianoKey[]): NoteRange | null => {
  const start = pianoKeys.find((pianoKey) => pianoKey.isSelected);
  const end = pianoKeys.findLast((pianoKey) => pianoKey.isSelected);
  return asNoteRange({
    start: start?.noteNumber,
    end: end?.noteNumber,
  });
};
