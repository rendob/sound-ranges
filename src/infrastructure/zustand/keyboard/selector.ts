import { KeyboardKey, getSelectedNoteRange } from "../../../domain/keyboardKey";
import { KeyboardKeyId } from "../../../domain/keyboardKey/keyboardKeyId";
import { NoteRange } from "../../../domain/noteRange";
import { getAllItems } from "../../../util/normalize";
import { useAppStore } from "../appStore";
import { KeyboardState } from "./state";

const selectKeyboardKeyIds = (state: KeyboardState): KeyboardKeyId[] =>
  state.keys.allIds;

const selectKeyboardKeys = (state: KeyboardState): KeyboardKey[] =>
  getAllItems(state.keys);

const selectKeyboardKey = (id: KeyboardKeyId) => (state: KeyboardState) =>
  state.keys.byId[id];

const selectSelectedNoteRange = (state: KeyboardState): NoteRange | null => {
  const keys = selectKeyboardKeys(state);
  return getSelectedNoteRange(keys);
};

// ***** selector hooks *****

export const useKeyboardKeyIds = () => useAppStore(selectKeyboardKeyIds);

export const useKeyboardKey = (id: KeyboardKeyId) =>
  useAppStore(selectKeyboardKey(id));

export const useSelectedNoteRange = () => useAppStore(selectSelectedNoteRange);
