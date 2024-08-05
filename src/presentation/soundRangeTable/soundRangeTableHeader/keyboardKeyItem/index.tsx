import { css } from "@emotion/react";
import React from "react";
import { KeyboardKeyId } from "../../../../domain/keyboardKey/keyboardKeyId";
import { dispatch } from "../../../../infrastructure/zustand/appStore";
import {
  clearKeyboardSelection,
  selectKeyboardKey,
} from "../../../../infrastructure/zustand/keyboard/action";
import { useKeyboardKey } from "../../../../infrastructure/zustand/keyboard/selector";
import { appDimen } from "../../../style/appDimen";
import { appColor } from "../../../style/appColor";
import { isBlackKey } from "../../../../domain/keyboardKey";
import { getNoteNames, isC } from "../../../../domain/noteNumber";
import { usePitchType } from "../../../../infrastructure/zustand/config/selector";
import { soundPlayer } from "../../../common/soundPlayer";

const styles = {
  root: css({
    cursor: "pointer",
  }),
};

type Props = { id: KeyboardKeyId };

export const KeyboardKeyItem = ({ id }: Props) => {
  const keyboardKey = useKeyboardKey(id);
  const pitchType = usePitchType();

  const x = keyboardKey.noteNumber * appDimen.keyboardKeyWidth;
  const color = (
    isBlackKey(keyboardKey) ? appColor.keyboard.black : appColor.keyboard.white
  )(keyboardKey.isSelected);
  const hasLabel = isC(keyboardKey.noteNumber);
  const label = getNoteNames(keyboardKey.noteNumber, pitchType)[0];

  const pressKey = () => {
    dispatch(selectKeyboardKey(id));
    soundPlayer.playNote(keyboardKey.noteNumber);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!e.shiftKey) {
      dispatch(clearKeyboardSelection());
    }
    pressKey();
    e.stopPropagation();
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    // left click
    if (e.buttons === 1) {
      pressKey();
    }
  };

  return (
    <g
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      css={styles.root}
    >
      <rect
        x={x}
        y="0"
        width={appDimen.keyboardKeyWidth}
        height={appDimen.keyboardHeight}
        fill={color}
        stroke="black"
      />

      {hasLabel && <KeyLabel label={label} keyX={x} />}
    </g>
  );
};

type KeyLabelProps = {
  label: string;
  keyX: number;
};

const KeyLabel = ({ label, keyX }: KeyLabelProps) => {
  const centerX = keyX + appDimen.keyboardKeyWidth / 2;
  const baselineY = appDimen.keyboardHeight * 0.9;
  const fontSize = appDimen.keyboardKeyWidth * 0.5;

  return (
    <text
      x={centerX}
      y={baselineY}
      fill="black"
      fontSize={fontSize}
      textAnchor="middle"
    >
      {label}
    </text>
  );
};
