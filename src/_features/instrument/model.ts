import z from "zod";
import { localizableSchema } from "@/_lib/i18n/i18n";
import { localize } from "@/_lib/i18n/localize";
import { noteRangeSchema } from "../noteRange/model";
import { midiProgramNumberSchema } from "./midiProgramNumber";
import { SelectionStatus, selectionStatusSchema } from "./selectionStatus";

export const instrumentSchema = z.object({
  midiProgramNumber: midiProgramNumberSchema,
  name: localizableSchema(z.string()),
  range: noteRangeSchema.nullable(),
  selectionStatus: selectionStatusSchema.exclude([SelectionStatus.MIXED]),
});
export type Instrument = z.infer<typeof instrumentSchema>;

// methods

export const getDisplayName = (instrument: Instrument): string =>
  `${instrument.midiProgramNumber}. ${localize(instrument.name)}`;

export const getSelectionStatus = (
  instruments: Readonly<Instrument[]>,
): SelectionStatus => {
  if (
    instruments.every(
      (instrument) => instrument.selectionStatus === SelectionStatus.SELECTED,
    )
  ) {
    return SelectionStatus.SELECTED;
  } else if (
    instruments.every(
      (instrument) => instrument.selectionStatus === SelectionStatus.UNSELECTED,
    )
  ) {
    return SelectionStatus.UNSELECTED;
  } else {
    return SelectionStatus.MIXED;
  }
};
