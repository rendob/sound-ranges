import z from "zod";

export const selectionStatusSchema = z.enum([
  "SELECTED",
  "MIXED",
  "UNSELECTED",
]);
export type SelectionStatus = z.infer<typeof selectionStatusSchema>;
export const SelectionStatus = selectionStatusSchema.enum;
