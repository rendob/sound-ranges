import { exists } from "../../util/exists";
import { Brand } from "../brand";
import { TypeAssertionError } from "../error/appError";
import { NoteNumber, isAccidental } from "../noteNumber";
import { NoteRange, createNoteRange } from "../noteRange";
import { KeyboardKeyId, asKeyboardKeyId } from "./keyboardKeyId";

const typeName = "KeyboardKey";
type KeyboardKeyType = {
  readonly id: KeyboardKeyId;
  readonly noteNumber: NoteNumber;
  readonly isSelected: boolean;
};
export type KeyboardKey = Brand<KeyboardKeyType, typeof typeName>;

// ***** initialization *****

export const createKeyboardKey = (noteNumber: NoteNumber): KeyboardKey =>
  asKeyboardKey({
    id: asKeyboardKeyId(String(noteNumber)),
    noteNumber,
    isSelected: false,
  });

// ***** assertion *****

function assertKeyboardKey(v: KeyboardKeyType): asserts v is KeyboardKey {
  if (v.id !== String(v.noteNumber)) {
    throw new TypeAssertionError(
      typeName,
      `id (${v.id}) should equals stringified noteNumber (${v.noteNumber})!`,
    );
  }
}

const asKeyboardKey = (v: KeyboardKeyType): KeyboardKey => {
  assertKeyboardKey(v);
  return v;
};

// ***** method *****

export const isBlackKey = (key: KeyboardKey): boolean =>
  isAccidental(key.noteNumber);

export const setIsSelected = (
  key: KeyboardKey,
  isSelected: boolean,
): KeyboardKey =>
  asKeyboardKey({
    ...key,
    isSelected,
  });

// ***** service *****

export const getSelectedNoteRange = (
  orderedKeys: KeyboardKey[],
): NoteRange | null => {
  const min = orderedKeys.find((key) => key.isSelected);
  const max = orderedKeys.findLast((key) => key.isSelected);

  if (!exists(min) || !exists(max)) return null;

  return createNoteRange(min.noteNumber, max.noteNumber);
};
