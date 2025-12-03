import z from "zod";
import { noteNumberSchema } from "../noteNumber/model";

export const noteRangeSchema = z
  .object({
    start: noteNumberSchema,
    end: noteNumberSchema,
  })
  .refine(({ start, end }) => start < end, {
    error: "end value should be greater than start value.",
  });
export type NoteRange = z.infer<typeof noteRangeSchema>;
