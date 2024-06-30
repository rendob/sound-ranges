export const SelectionStatus = {
  SELECTED: "Selected",
  MIXED: "Mixed",
  UNSELECTED: "Unselected",
} as const;

export type SelectionStatus =
  (typeof SelectionStatus)[keyof typeof SelectionStatus];
