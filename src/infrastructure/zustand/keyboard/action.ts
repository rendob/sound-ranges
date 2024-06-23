import { setIsSelected } from "../../../domain/keyboardKey";
import { KeyboardKeyId } from "../../../domain/keyboardKey/keyboardKeyId";
import { updateItem, updateItems } from "../../../util/normalize";
import { createAction } from "../appStore";

export const setKeyboardSelection = (id: KeyboardKeyId, isSelected: boolean) =>
  createAction((state) => {
    return {
      ...state,
      keys: updateItem(state.keys, id, (item) =>
        setIsSelected(item, isSelected),
      ),
    };
  });

export const clearKeyboardSelection = () =>
  createAction((state) => {
    return {
      ...state,
      keys: updateItems(state.keys, state.keys.allIds, (item) =>
        item.isSelected ? setIsSelected(item, false) : item,
      ),
    };
  });
