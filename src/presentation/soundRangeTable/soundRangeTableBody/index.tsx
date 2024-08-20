import { css } from "@emotion/react";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { clearKeyboardSelection } from "../../../infrastructure/zustand/keyboard/action";
import { SoundRangeItem } from "./soundRangeItem";
import { useInstrumentIds } from "../../../infrastructure/zustand/instruments/selector";
import { appColor } from "../../style/appColor";
import { appDimen } from "../../style/appDimen";
import { asNoteNumber } from "../../../domain/noteNumber";
import { createArithmeticSequence } from "../../../extension/arrayExt";
import { asInt } from "../../../domain/int";
import { createKeyboardKey, isBlackKey } from "../../../domain/keyboardKey";

const createTableBackground = () => {
  const borderWidth = 1;
  const opacity = "10";

  const createBorderBackground = (x: number): string[] => {
    const borderColor = `${appColor.keyboard.black(false)}${opacity}`;
    return [`${borderColor} ${x}px`, `${borderColor} ${x + borderWidth}px`];
  };

  const createKeyBackground = (
    x: number,
    isBlack: boolean = false,
  ): string[] => {
    const width = appDimen.keyboardKeyWidth - borderWidth;
    const color = `${isBlack ? appColor.keyboard.black(false) : appColor.keyboard.white(false)}${opacity}`;
    return [`${color} ${x}px`, `${color} ${x + width}px`];
  };

  const octaveBackground = createArithmeticSequence(asInt(0), asInt(11))
    .map(asNoteNumber)
    .map(createKeyboardKey)
    .map((key) => [
      ...createBorderBackground(
        key.noteNumber * appDimen.keyboardKeyWidth - borderWidth / 2,
      ),
      ...createKeyBackground(
        key.noteNumber * appDimen.keyboardKeyWidth + borderWidth / 2,
        isBlackKey(key),
      ),
    ])
    .flat()
    .join(",");

  return `repeating-linear-gradient(to right, ${octaveBackground})`;
};

const styles = {
  root: (width: number) =>
    css({
      background: createTableBackground(),
      flex: 1,
      position: "relative",
      width: width,
    }),
  soundRangeBody: (width: number) =>
    css({
      width,
    }),
  copyright: css({
    bottom: 0,
    position: "absolute",
    right: 0,
    fontSize: "0.8rem",
  }),
};

type Props = {
  width: number;
};

export const SoundRangeTableBody = ({ width }: Props) => {
  const instrumentIds = useInstrumentIds();

  const handleClick = () => {
    dispatch(clearKeyboardSelection());
  };

  const items = instrumentIds.map((id) => (
    <SoundRangeItem key={id} instrumentId={id} />
  ));

  return (
    <div onClick={handleClick} css={styles.root(width)}>
      <div css={styles.soundRangeBody(width)}>{items}</div>

      <div css={styles.copyright}>© 2024-2024 RendoB</div>
    </div>
  );
};
