import { Instrument } from "../../../../domain/instrument";
import { getRangeName, getSize } from "../../../../domain/noteRange";
import { usePitchType } from "../../../../infrastructure/zustand/config/selector";
import { appColor } from "../../../style/appColor";
import { appDimen } from "../../../style/appDimen";

const itemMarginVertical = 4;
const itemContentHeight =
  appDimen.soundRangeItemHeight - 2 * itemMarginVertical;

type Props = { instrument: Instrument; index: number };

export const SoundRangeItem = ({ instrument, index }: Props) => {
  const pitchType = usePitchType();

  const x = instrument.range.min * appDimen.keyboardKeyWidth;
  const width = getSize(instrument.range) * appDimen.keyboardKeyWidth;
  const centerX = x + width / 2;
  const y = appDimen.soundRangeItemHeight * index + itemMarginVertical;
  const baselineY = y + itemContentHeight * 0.8;

  return (
    <g>
      <Guideline x={x} y={y} />

      <Guideline x={x + width} y={y} />

      <rect
        x={x}
        y={y}
        width={width}
        height={itemContentHeight}
        fill={appColor.primary}
      />

      <text
        x={centerX}
        y={baselineY}
        fill={appColor.onPrimary}
        textAnchor="middle"
      >
        {instrument.name} {getRangeName(instrument.range, pitchType)}
      </text>
    </g>
  );
};

type GuidelineProps = {
  x: number;
  y: number;
};

const Guideline = ({ x, y }: GuidelineProps) => {
  return (
    <line
      x1={x}
      y1={0}
      x2={x}
      y2={y}
      stroke={appColor.primary}
      strokeDasharray={4}
    />
  );
};
