import { twMerge } from "tailwind-merge";
import {
  getNoteNames,
  isAccidental,
  isC,
  type NoteNumber,
} from "@/_features/noteNumber/model";
import { pitchTypeStore } from "@/_features/pitchType/store";

type Props = { noteNumber: NoteNumber };

export const PianoKeyItem: React.FC<Props> = ({ noteNumber }) => {
  const pitchType = pitchTypeStore.usePitchType();

  return (
    <div
      className={twMerge(
        "h-12 w-(--piano-key-width) shrink-0 border-[0.5px] border-piano-border",
        "flex items-end justify-center",
        isAccidental(noteNumber) ? "bg-piano-black" : "bg-piano-white",
      )}
    >
      {isC(noteNumber) && (
        <span className="text-[9px] text-piano-label">
          {getNoteNames(noteNumber, pitchType)}
        </span>
      )}
    </div>
  );
};
