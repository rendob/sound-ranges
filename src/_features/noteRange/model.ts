import z from "zod";
import { exists } from "@/_lib/utils/exists";
import type { WithKey } from "@/_lib/utils/withKey";
import { getNoteNames, noteNumberSchema } from "../noteNumber/model";
import type { PitchType } from "../pitchType/model";

export const noteRangeSchema = z
  .object({
    start: noteNumberSchema,
    end: noteNumberSchema,
  })
  .refine(({ start, end }) => start <= end, {
    error: "start value cannot be greater than end value.",
  });
export type NoteRange = z.infer<typeof noteRangeSchema>;

export const asNoteRange = (
  value: WithKey<NoteRange, number | null | undefined>,
): NoteRange | null => {
  const parseResult = noteRangeSchema.safeParse(value);
  if (parseResult.success) {
    return parseResult.data;
  } else {
    return null;
  }
};

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
