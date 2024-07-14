/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { useKeyboardKeyIds } from "../../../infrastructure/zustand/keyboard/selector";
import { KeyboardKeyItem } from "./keyboardKeyItem";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { clearKeyboardSelection } from "../../../infrastructure/zustand/keyboard/action";
import { appDimen } from "../../style/appDimen";

const styles = {
  root: (width: number) =>
    css({
      width: width,
      height: appDimen.keyboardHeight,
      position: "sticky",
      top: "0",
    }),
};

type Props = {
  width: number;
};

export const SoundRangeTableHeader = ({ width }: Props) => {
  const keyboardKeyIds = useKeyboardKeyIds();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!e.shiftKey) {
      dispatch(clearKeyboardSelection());
    }
  };

  return (
    <div css={styles.root(width)}>
      <svg
        width={width}
        height={appDimen.keyboardHeight}
        viewBox={`0 0 ${width} ${appDimen.keyboardHeight}`}
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
