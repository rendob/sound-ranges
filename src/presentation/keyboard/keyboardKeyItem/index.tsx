import React from "react";
import { KeyboardKeyId } from "../../../domain/keyboardKey/keyboardKeyId";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import {
  clearKeyboardSelection,
  selectKeyboardKey,
} from "../../../infrastructure/zustand/keyboard/action";
import { useKeyboardKey } from "../../../infrastructure/zustand/keyboard/selector";

type Props = { id: KeyboardKeyId };

export const KeyboardKeyItem = ({ id }: Props) => {
  const keyboardKey = useKeyboardKey(id);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!e.shiftKey) {
      dispatch(clearKeyboardSelection());
    }
    dispatch(selectKeyboardKey(id));
    e.stopPropagation();
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    // left click
    if (e.buttons === 1) {
      dispatch(selectKeyboardKey(id));
    }
  };

  return (
    <p onMouseDown={handleMouseDown} onMouseEnter={handleMouseEnter}>
      {keyboardKey.noteNumber} {String(keyboardKey.isSelected)}
    </p>
  );
};
