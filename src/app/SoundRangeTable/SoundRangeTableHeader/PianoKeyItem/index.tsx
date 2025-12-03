import { twMerge } from "tailwind-merge";
import {
  getNoteNames,
  isAccidental,
  isC,
  type NoteNumber,
} from "@/_features/noteNumber/model";
import { PitchType } from "@/_features/noteNumber/pitchType";

type Props = { noteNumber: NoteNumber };

export const PianoKeyItem: React.FC<Props> = ({ noteNumber }) => {
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
          {getNoteNames(noteNumber, PitchType.YAMAHA)}
        </span>
      )}
    </div>
  );
};
