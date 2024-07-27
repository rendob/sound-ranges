import { setSelectionStatus } from "../../../domain/instrument";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { SelectionStatus } from "../../../domain/instrument/selectionStatus";
import { InstrumentGroup } from "../../../domain/instrumentGroup";
import { updateItem, updateItems } from "../../../util/normalize";
import { createAction } from "../appStore";
import { selectInstrumentGroupSelectionStatus } from "./selector";

export const toggleInstrumentSelection = (id: InstrumentId) =>
  createAction((state) => {
    return {
      ...state,
      instruments: updateItem(state.instruments, id, (item) => {
        const selectionStatus =
          item.selectionStatus === SelectionStatus.SELECTED
            ? SelectionStatus.UNSELECTED
            : SelectionStatus.SELECTED;
        return setSelectionStatus(item, selectionStatus);
      }),
    };
  });

export const toggleInstrumentGroupSelection = (
  instrumentGroup: InstrumentGroup,
) =>
  createAction((state) => {
    const currentSelectionStatus =
      selectInstrumentGroupSelectionStatus(instrumentGroup)(state);
    const selectionStatus =
      currentSelectionStatus === SelectionStatus.SELECTED
        ? SelectionStatus.UNSELECTED
        : SelectionStatus.SELECTED;

    return {
      ...state,
      instruments: updateItems(
        state.instruments,
        instrumentGroup.instrumentIds,
        (item) => setSelectionStatus(item, selectionStatus),
      ),
    };
  });
