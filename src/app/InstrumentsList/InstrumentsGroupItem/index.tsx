import { instrumentStore } from "@/_features/instrument/store";
import type { InstrumentGroup } from "@/_features/instrumentGroup/model";
import { localize } from "@/_lib/i18n/localize";
import { InstrumentItem } from "../InstrumentItem";
import { ListItem } from "../ListItem";

type Props = { instrumentGroup: InstrumentGroup };

export const InstrumentsGroupItem: React.FC<Props> = ({ instrumentGroup }) => {
  const selectionStatus =
    instrumentStore.useGroupSelectionStatus(instrumentGroup);

  const handleClick: React.MouseEventHandler = () => {
    instrumentStore.toggleGroupSelection(instrumentGroup);
  };

  return (
    <div>
      <ListItem
        className="sticky top-0 pl-4"
        selectionStatus={selectionStatus}
        onClick={handleClick}
      >
        {localize(instrumentGroup.name)}
      </ListItem>

      {instrumentGroup.midiProgramNumbers.map((midiProgramNumber) => (
        <InstrumentItem
          key={midiProgramNumber}
          midiProgramNumber={midiProgramNumber}
        />
      ))}
    </div>
  );
};
