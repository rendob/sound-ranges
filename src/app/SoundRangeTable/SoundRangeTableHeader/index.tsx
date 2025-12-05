import { allNoteNumbers } from "@/_features/noteNumber/model";
import { PianoKeyItem } from "./PianoKeyItem";

export const SoundRangeTableHeader: React.FC = () => {
  return (
    <div className="flex">
      {allNoteNumbers.map((noteNumber) => (
        <PianoKeyItem key={noteNumber} noteNumber={noteNumber} />
      ))}
    </div>
  );
};
