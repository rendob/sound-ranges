import { Instrument, canPlayAll } from "../../../domain/instrument";
import { exists } from "../../../util/exists";
import { useAppStore } from "../appStore";
import { selectSelectedInstruments } from "../instruments/selector";
import { InstrumentsState } from "../instruments/state";
import { selectSelectedNoteRange } from "../keyboard/selector";
import { KeyboardState } from "../keyboard/state";

const selectDisplayedInstruments = (
  state: InstrumentsState & KeyboardState,
): Instrument[] => {
  const selectedNoteRange = selectSelectedNoteRange(state);
  const selectedInstruments = selectSelectedInstruments(state);

  if (!exists(selectedNoteRange)) {
    return selectedInstruments;
  }

  return selectedInstruments.filter((instrument) =>
    canPlayAll(instrument, selectedNoteRange),
  );
};

// ***** selector hooks *****

export const useDisplayedInstruments = () =>
  useAppStore(selectDisplayedInstruments);
