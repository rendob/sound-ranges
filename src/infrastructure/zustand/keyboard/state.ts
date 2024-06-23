import { KeyboardKey, createKeyboardKey } from "../../../domain/keyboardKey";
import { KeyboardKeyId } from "../../../domain/keyboardKey/keyboardKeyId";
import { allNoteNumbers } from "../../../domain/noteNumber";
import { Normalized, normalize } from "../../../util/normalize";

export type KeyboardState = {
  keys: Normalized<KeyboardKeyId, KeyboardKey>;
};

export const initialKeyboardState: KeyboardState = {
  keys: normalize(allNoteNumbers.map(createKeyboardKey)),
};
