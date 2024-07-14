import { setSelectionStatus } from "../../../domain/instrument";
import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { SelectionStatus } from "../../../domain/instrument/selectionStatus";
import { updateItem, updateItems } from "../../../util/normalize";
import { createAction } from "../appStore";
import { selectInstrumentGroup } from "./selector";

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

export const toggleInstrumentGroupSelection = (category: InstrumentCategory) =>
  createAction((state) => {
    const instrumentGroup = selectInstrumentGroup(category)(state);
    const selectionStatus =
      instrumentGroup.selectionStatus === SelectionStatus.SELECTED
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
