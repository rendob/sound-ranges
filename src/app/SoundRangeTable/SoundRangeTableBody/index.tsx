import { allNoteNumbers } from "@/_features/noteNumber/model";
import { createTableBackground } from "./createTableBackground";

export const SoundRangeTableBody: React.FC = () => {
  return (
    <div
      className="h-full"
      style={{
        width: `calc(var(--piano-key-width)*${allNoteNumbers.length})`,
        background: createTableBackground(),
      }}
    ></div>
  );
};
