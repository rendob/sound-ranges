import z from "zod";
import { exists } from "@/_lib/utils/exists";
import { getNoteNames, noteNumberSchema } from "../noteNumber/model";
import type { PitchType } from "../pitchType/model";

export const noteRangeSchema = z
  .object({
    start: noteNumberSchema,
    end: noteNumberSchema,
  })
  .refine(({ start, end }) => start < end, {
    error: "end value should be greater than start value.",
  });
export type NoteRange = z.infer<typeof noteRangeSchema>;

// methods

export const getLength = (noteRange: NoteRange): number =>
  noteRange.end - noteRange.start + 1;

export const getRangeName = (
  noteRange: NoteRange | null,
  pitchType: PitchType,
): string => {
  if (!exists(noteRange)) return "-";

  const separator = "/";
  const start = getNoteNames(noteRange.start, pitchType).join(separator);
  const end = getNoteNames(noteRange.end, pitchType).join(separator);
  return `${start} 〜 ${end}`;
};
