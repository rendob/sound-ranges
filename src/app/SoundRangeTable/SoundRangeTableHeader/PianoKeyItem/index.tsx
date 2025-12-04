import { twMerge } from "tailwind-merge";
import {
  getNoteNames,
  isAccidental,
  isC,
  type NoteNumber,
} from "@/_features/noteNumber/model";
import { pianoKeyStore } from "@/_features/pianoKey/store";
import { pitchTypeStore } from "@/_features/pitchType/store";
import { soundPlayer } from "../../../../_components/soundPlayer";

type Props = { noteNumber: NoteNumber };

export const PianoKeyItem: React.FC<Props> = ({ noteNumber }) => {
  const pitchType = pitchTypeStore.usePitchType();
  const pianoKey = pianoKeyStore.usePianoKey(noteNumber);

  const selectKey = () => {
    pianoKeyStore.selectKey(noteNumber);
    soundPlayer.playNote(noteNumber);
  };

  const handleMouseDown: React.MouseEventHandler = (e) => {
    if (!e.shiftKey) {
      pianoKeyStore.clearSelection();
    }
    selectKey();
  };

  const handleMouseEnter: React.MouseEventHandler = (e) => {
    // left click
    if (e.buttons === 1) {
      selectKey();
    }
  };

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      if (!e.shiftKey) {
        pianoKeyStore.clearSelection();
      }
      selectKey();
    }
  };

  const handleKeyUp: React.KeyboardEventHandler = () => {
    soundPlayer.stopPlaying();
  };

  return (
    <button
      className={twMerge(
        "h-12 w-(--piano-key-width) shrink-0 cursor-pointer border-[0.5px] border-piano-border",
        "flex items-end justify-center",
        isAccidental(noteNumber)
          ? pianoKey.isSelected
            ? "bg-piano-black-selected"
            : "bg-piano-black"
          : pianoKey.isSelected
            ? "bg-piano-white-selected"
            : "bg-piano-white",
      )}
      type="button"
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {isC(noteNumber) && (
        <span className="text-[9px] text-piano-label">
          {getNoteNames(noteNumber, pitchType)}
        </span>
      )}
    </button>
  );
};
