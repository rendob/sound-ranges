/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { useKeyboardKeyIds } from "../../infrastructure/zustand/keyboard/selector";
import { KeyboardKeyItem } from "./keyboardKeyItem";
import { dispatch } from "../../infrastructure/zustand/appStore";
import { clearKeyboardSelection } from "../../infrastructure/zustand/keyboard/action";
import { allNoteNumbers } from "../../domain/noteNumber";
import { appDimen } from "../style/appDimen";

const styles = {
  root: css({
    flex: 1,
    overflow: "scroll",
  }),
};

export const Keyboard = () => {
  const keyboardKeyIds = useKeyboardKeyIds();

  const keyboardWidth = appDimen.keyboardKeyWidth * allNoteNumbers.length;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!e.shiftKey) {
      dispatch(clearKeyboardSelection());
    }
  };

  return (
    <div css={styles.root}>
      <svg
        width={keyboardWidth}
        height={appDimen.keyboardHeight}
        viewBox={`0 0 ${keyboardWidth} ${appDimen.keyboardHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={handleMouseDown}
      >
        {keyboardKeyIds.map((id) => (
          <KeyboardKeyItem key={id} id={id} />
        ))}
      </svg>
    </div>
  );
};
