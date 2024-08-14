import { css } from "@emotion/react";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { clearKeyboardSelection } from "../../../infrastructure/zustand/keyboard/action";
import { SoundRangeItem } from "./soundRangeItem";
import { useInstrumentIds } from "../../../infrastructure/zustand/instruments/selector";
import { appColor } from "../../style/appColor";
import { appDimen } from "../../style/appDimen";

const getTableBackground = () => {
  const borderColor = `${appColor.border}40`;
  const borderWidth = 1;
  const leftBoundary = borderWidth / 2;
  const rightBoundary = appDimen.keyboardKeyWidth - borderWidth / 2;
  return `
    repeating-linear-gradient(
      to right,
      ${borderColor},
      ${borderColor} ${leftBoundary}px,
      transparent ${leftBoundary}px,
      transparent ${rightBoundary}px,
      ${borderColor} ${rightBoundary}px,
      ${borderColor} ${appDimen.keyboardKeyWidth}px
    )
  `.trim();
};

const styles = {
  root: (width: number) =>
    css({
      background: getTableBackground(),
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
