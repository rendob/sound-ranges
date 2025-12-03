import z from "zod";

const MIN_NOTE_NUMBER = 0;
const MAX_NOTE_NUMBER = 127;

export const noteNumberSchema = z
  .int()
  .min(MIN_NOTE_NUMBER)
  .max(MAX_NOTE_NUMBER)
  .brand("NoteNumber");
export type NoteNumber = z.infer<typeof noteNumberSchema>;
