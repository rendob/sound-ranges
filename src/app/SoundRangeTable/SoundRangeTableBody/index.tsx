import { allMidiProgramNumbers } from "@/_features/instrument/midiProgramNumber";
import { allNoteNumbers } from "@/_features/noteNumber/model";
import { createTableBackground } from "./createTableBackground";
import { SoundRangeItem } from "./SoundRangeItem";

export const SoundRangeTableBody: React.FC = () => {
  return (
    <div
      className="h-full overflow-y-scroll pt-1"
      style={{
        width: `calc(var(--piano-key-width)*${allNoteNumbers.length})`,
        background: createTableBackground(),
      }}
    >
      {allMidiProgramNumbers.map((midiProgramNumber) => (
        <SoundRangeItem
          key={midiProgramNumber}
          midiProgramNumber={midiProgramNumber}
        />
      ))}
    </div>
  );
};
