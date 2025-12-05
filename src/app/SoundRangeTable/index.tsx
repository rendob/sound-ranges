import { SoundRangeTableBody } from "./SoundRangeTableBody";
import { SoundRangeTableHeader } from "./SoundRangeTableHeader";

export const SoundRangeTable: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col overflow-x-scroll">
      <SoundRangeTableHeader />

      <SoundRangeTableBody />
    </div>
  );
};
