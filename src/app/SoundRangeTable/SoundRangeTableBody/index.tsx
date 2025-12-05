import { allMidiProgramNumbers } from "@/_features/instrument/midiProgramNumber";
import { allNoteNumbers } from "@/_features/noteNumber/model";
import { pianoKeyStore } from "@/_features/pianoKey/store";
import { createTableBackground } from "./createTableBackground";
import { SoundRangeItem } from "./SoundRangeItem";

export const SoundRangeTableBody: React.FC = () => {
  const handleClick: React.MouseEventHandler = () => {
    pianoKeyStore.clearSelection();
  };

  return (
    <button
      className="flex h-full flex-col overflow-y-scroll pt-1"
      style={{
        width: `calc(var(--piano-key-width)*${allNoteNumbers.length})`,
        background: createTableBackground(),
      }}
      type="button"
      onClick={handleClick}
    >
      {allMidiProgramNumbers.map((midiProgramNumber) => (
        <SoundRangeItem
          key={midiProgramNumber}
          midiProgramNumber={midiProgramNumber}
        />
      ))}
    </button>
  );
};
