import { getDisplayName, Instrument } from "../../../../domain/instrument";
import { allNoteNumbers } from "../../../../domain/noteNumber";
import { getRangeName, getSize } from "../../../../domain/noteRange";
import { usePitchType } from "../../../../infrastructure/zustand/config/selector";
import { exists } from "../../../../util/exists";
import { appColor } from "../../../style/appColor";
import { appDimen } from "../../../style/appDimen";

const itemMarginVertical = 4;
const itemContentHeight =
  appDimen.soundRangeItemHeight - 2 * itemMarginVertical;
const getY = (index: number) =>
  appDimen.soundRangeItemHeight * index + itemMarginVertical;
const getBaselineY = (index: number) => getY(index) + itemContentHeight * 0.8;

type Props = { instrument: Instrument; index: number };

export const SoundRangeItem = ({ instrument, index }: Props) => {
  const pitchType = usePitchType();

  if (!exists(instrument.range))
    return <EmptyRangeItem instrument={instrument} index={index} />;

  const x = instrument.range.min * appDimen.keyboardKeyWidth;
  const width = getSize(instrument.range) * appDimen.keyboardKeyWidth;
  const centerX = x + width / 2;
  const y = getY(index);
  const label = `${getDisplayName(instrument)} ${getRangeName(instrument.range, pitchType)}`;

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
        y={getBaselineY(index)}
        fill={appColor.onPrimary}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
};

const EmptyRangeItem = ({ instrument, index }: Props) => {
  const centerX = (allNoteNumbers.length * appDimen.keyboardKeyWidth) / 2;
  const label = `${getDisplayName(instrument)} -`;
  return (
    <text
      x={centerX}
      y={getBaselineY(index)}
      fill={appColor.onPrimary}
      textAnchor="middle"
    >
      {label}
    </text>
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
