import z from "zod";

export const selectionStatusSchema = z.enum([
  "SELECTED",
  "MIXED",
  "UNSELECTED",
]);
export type SelectionStatus = z.infer<typeof selectionStatusSchema>;
export const SelectionStatus = selectionStatusSchema.enum;

// methods

export const getNextStatus = (
  currentStatus: SelectionStatus,
): Exclude<SelectionStatus, "MIXED"> => {
  return currentStatus === SelectionStatus.SELECTED
    ? SelectionStatus.UNSELECTED
    : SelectionStatus.SELECTED;
};
