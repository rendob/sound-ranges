import { canPlayAll } from "../../../domain/instrument";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { SelectionStatus } from "../../../domain/instrument/selectionStatus";
import { exists } from "../../../util/exists";
import { useAppStore } from "../appStore";
import { selectInstrument } from "../instruments/selector";
import { InstrumentsState } from "../instruments/state";
import { selectSelectedNoteRange } from "../keyboard/selector";
import { KeyboardState } from "../keyboard/state";

const selectIsDisplayed =
  (id: InstrumentId) =>
  (state: InstrumentsState & KeyboardState): boolean => {
    const instrument = selectInstrument(id)(state);
    const selectedNoteRange = selectSelectedNoteRange(state);

    const canPlay = exists(selectedNoteRange)
      ? canPlayAll(instrument, selectedNoteRange)
      : true;
    return canPlay && instrument.selectionStatus === SelectionStatus.SELECTED;
  };

// ***** selector hooks *****

export const useIsDisplayed = (id: InstrumentId) =>
  useAppStore(selectIsDisplayed(id));
