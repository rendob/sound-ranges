/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useDisplayedInstruments } from "../../../infrastructure/zustand/shared/selector";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { clearKeyboardSelection } from "../../../infrastructure/zustand/keyboard/action";
import { SoundRangeItem } from "./soundRangeItem";
import { appDimen } from "../../style/appDimen";

const styles = {
  root: (width: number) =>
    css({
      width: width,
      flex: 1,
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

  return (
    <div onClick={handleClick} css={styles.root(width)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {displayedInstruments.map((instrument, index) => (
          <SoundRangeItem
            key={instrument.id}
            instrument={instrument}
            index={index}
          />
        ))}
      </svg>
    </div>
  );
};
