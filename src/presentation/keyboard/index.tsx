import React from "react";
import { useKeyboardKeyIds } from "../../infrastructure/zustand/keyboard/selector";
import { KeyboardKeyItem } from "./keyboardKeyItem";
import { dispatch } from "../../infrastructure/zustand/appStore";
import { clearKeyboardSelection } from "../../infrastructure/zustand/keyboard/action";

export const Keyboard = () => {
  const keyboardKeyIds = useKeyboardKeyIds();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!e.shiftKey) {
      dispatch(clearKeyboardSelection());
    }
  };

  return (
    <div onMouseDown={handleMouseDown}>
      {keyboardKeyIds.map((id) => (
        <KeyboardKeyItem key={id} id={id} />
      ))}
    </div>
  );
};
