/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { KeyboardKeyId } from "../../../domain/keyboardKey/keyboardKeyId";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import {
  clearKeyboardSelection,
  selectKeyboardKey,
} from "../../../infrastructure/zustand/keyboard/action";
import { useKeyboardKey } from "../../../infrastructure/zustand/keyboard/selector";
import { appDimen } from "../../style/appDimen";
import { appColor } from "../../style/appColor";
import { isBlackKey } from "../../../domain/keyboardKey";

const styles = {
  root: css({
    cursor: "pointer",
  }),
};

type Props = { id: KeyboardKeyId };

export const KeyboardKeyItem = ({ id }: Props) => {
  const keyboardKey = useKeyboardKey(id);

  const x = keyboardKey.noteNumber * appDimen.keyboardKeyWidth;
  const color = (
    isBlackKey(keyboardKey) ? appColor.keyboard.black : appColor.keyboard.white
  )(keyboardKey.isSelected);

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
    <rect
      x={x}
      y="0"
      width={appDimen.keyboardKeyWidth}
      height={appDimen.keyboardHeight}
      fill={color}
      stroke="black"
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      css={styles.root}
    />
  );
};
