import { SelectionStatus } from "@/_features/instrument/selectionStatus";
import type { InstrumentGroup } from "@/_features/instrumentGroup/model";
import { localize } from "@/_lib/i18n/localize";
import { InstrumentItem } from "../InstrumentItem";
import { ListItem } from "../ListItem";

type Props = { instrumentGroup: InstrumentGroup };

export const InstrumentsGroupItem: React.FC<Props> = ({ instrumentGroup }) => {
  return (
    <div>
      <ListItem
        className="sticky top-0 pl-4"
        label={localize(instrumentGroup.name)}
        selectionStatus={SelectionStatus.MIXED}
        onClick={() => {}}
      />

      {instrumentGroup.midiProgramNumbers.map((midiProgramNumber) => (
        <InstrumentItem
          key={midiProgramNumber}
          midiProgramNumber={midiProgramNumber}
        />
      ))}
    </div>
  );
};
