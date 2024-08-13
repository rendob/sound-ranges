import { css } from "@emotion/react";
import { getDisplayName } from "../../../../domain/instrument";
import { allNoteNumbers } from "../../../../domain/noteNumber";
import { getRangeName, getSize } from "../../../../domain/noteRange";
import { usePitchType } from "../../../../infrastructure/zustand/config/selector";
import { exists } from "../../../../util/exists";
import { appColor } from "../../../style/appColor";
import { appDimen } from "../../../style/appDimen";
import { InstrumentId } from "../../../../domain/instrument/instrumentId";
import { useIsDisplayed } from "../../../../infrastructure/zustand/shared/selector";
import { useInstrument } from "../../../../infrastructure/zustand/instruments/selector";

const itemMarginVertical = 4;
const itemContentHeight =
  appDimen.soundRangeItemHeight - 2 * itemMarginVertical;

const styles = {
  root: (isShown: boolean) =>
    css({
      display: isShown ? "block" : "none",
      height: isShown ? itemContentHeight : 0,
      opacity: isShown ? 1 : 0,
      padding: `${isShown ? itemMarginVertical : 0}px 0`,
      transitionBehavior: "allow-discrete",
      transitionDuration: "0.2s",
      transitionProperty: "display,height,opacity,padding",

      "@starting-style": {
        height: 0,
        opacity: 0,
      },
    }),
  bar: (x: number, width: number, hasRange: boolean) =>
    css({
      alignItems: "center",
      backgroundColor: hasRange ? appColor.primary : undefined,
      display: "flex",
      height: itemContentHeight,
      justifyContent: "space-evenly",
      left: `${x}px`,
      position: "relative",
      textAlign: "center",
      width,
    }),
};

type Props = { instrumentId: InstrumentId };

export const SoundRangeItem = ({ instrumentId }: Props) => {
  const pitchType = usePitchType();
  const instrument = useInstrument(instrumentId);
  const isDisplayed = useIsDisplayed(instrumentId);
  const hasRange = exists(instrument.range);

  const x = (instrument.range?.min || 0) * appDimen.keyboardKeyWidth;
  const width =
    (hasRange ? getSize(instrument.range) : allNoteNumbers.length) *
    appDimen.keyboardKeyWidth;
  const label = `${getDisplayName(instrument)} ${getRangeName(instrument.range, pitchType)}`;

  return (
    <div css={styles.root(isDisplayed)}>
      <div css={styles.bar(x, width, hasRange)}>{label}</div>
    </div>
  );
};
