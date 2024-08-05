import { css } from "@emotion/react";
import { useDisplayedInstruments } from "../../../infrastructure/zustand/shared/selector";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { clearKeyboardSelection } from "../../../infrastructure/zustand/keyboard/action";
import { SoundRangeItem } from "./soundRangeItem";
import { appDimen } from "../../style/appDimen";

const styles = {
  root: (width: number) =>
    css({
      flex: 1,
      position: "relative",
      width: width,
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
  const displayedInstruments = useDisplayedInstruments();
  const height = appDimen.soundRangeItemHeight * displayedInstruments.length;

  const handleClick = () => {
    dispatch(clearKeyboardSelection());
  };

  const items = displayedInstruments
    .map((instrument, index) => (
      <SoundRangeItem
        key={instrument.id}
        instrument={instrument}
        index={index}
      />
    ))
    .reverse();

  return (
    <div onClick={handleClick} css={styles.root(width)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {items}
      </svg>

      <div css={styles.copyright}>© 2024-2024 RendoB</div>
    </div>
  );
};
