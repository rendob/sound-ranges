import type { InstrumentGroup } from "@/_features/instrumentGroup/model";
import { localize } from "@/_lib/i18n/localize";
import { InstrumentItem } from "../InstrumentItem";

type Props = { instrumentGroup: InstrumentGroup };

export const InstrumentsGroupItem: React.FC<Props> = ({ instrumentGroup }) => {
  return (
    <>
      <p className="pl-4">{localize(instrumentGroup.name)}</p>

      {instrumentGroup.midiProgramNumbers.map((midiProgramNumber) => (
        <InstrumentItem
          key={midiProgramNumber}
          midiProgramNumber={midiProgramNumber}
        />
      ))}
    </>
  );
};
