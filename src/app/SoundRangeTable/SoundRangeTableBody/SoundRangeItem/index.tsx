import type { JSX } from "react";
import { twMerge } from "tailwind-merge";
import type { MidiProgramNumber } from "@/_features/instrument/midiProgramNumber";
import { getDisplayName } from "@/_features/instrument/model";
import { SelectionStatus } from "@/_features/instrument/selectionStatus";
import { instrumentStore } from "@/_features/instrument/store";
import { getLength, getRangeName } from "@/_features/noteRange/model";
import { pitchTypeStore } from "@/_features/pitchType/store";
import { exists } from "@/_lib/utils/exists";

type Props = { midiProgramNumber: MidiProgramNumber };

export const SoundRangeItem: React.FC<Props> = ({ midiProgramNumber }) => {
  const instrument = instrumentStore.useInstrument(midiProgramNumber);
  const pitchType = pitchTypeStore.usePitchType();

  const isShown = instrument.selectionStatus === SelectionStatus.SELECTED;

  return (
    <div
      className={twMerge(
        "relative items-center justify-center gap-2 whitespace-nowrap",
        isShown ? "mb-2 flex h-8 opacity-100" : "mb-0 hidden h-0 opacity-0",
        "starting:h-0 starting:opacity-0 transition-all transition-discrete",
        exists(instrument.range) && "bg-primary",
      )}
      style={
        exists(instrument.range)
          ? {
              left: `calc(var(--piano-key-width)*${instrument.range.start})`,
              width: `calc(var(--piano-key-width)*${getLength(instrument.range)})`,
            }
          : undefined
      }
    >
      <span>{getDisplayName(instrument)}</span>

      <span>
        {renderWithSuperscripts(getRangeName(instrument.range, pitchType))}
      </span>
    </div>
  );
};

const renderWithSuperscripts = (text: string): JSX.Element => {
  return (
    <>
      {text.split(/([♯♭])/g).map((part, index) => {
        if (index % 2 === 0) {
          // キャプチャされていない部分
          return part;
        } else {
          // キャプチャされた部分
          return (
            <sup key={String(index)} className="font-music text-sm">
              {part}
            </sup>
          );
        }
      })}
    </>
  );
};
