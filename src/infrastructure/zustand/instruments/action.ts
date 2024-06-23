import { setIsSelected } from "../../../domain/instrument";
import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { SelectionStatus } from "../../../domain/instrumentGroup";
import { updateItem, updateItems } from "../../../util/normalize";
import { createAction } from "../appStore";
import { selectInstrumentGroup } from "./selector";

export const toggleInstrumentSelection = (id: InstrumentId) =>
  createAction((state) => {
    return {
      ...state,
      instruments: updateItem(state.instruments, id, (item) =>
        setIsSelected(item, !item.isSelected),
      ),
    };
  });

export const toggleInstrumentGroupSelection = (category: InstrumentCategory) =>
  createAction((state) => {
    const instrumentGroup = selectInstrumentGroup(category)(state);
    const shouldSelect =
      instrumentGroup.selectionStatus !== SelectionStatus.SELECTED;

    return {
      ...state,
      instruments: updateItems(
        state.instruments,
        instrumentGroup.instrumentIds,
        (item) => setIsSelected(item, shouldSelect),
      ),
    };
  });
