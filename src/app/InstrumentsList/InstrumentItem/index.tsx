import {
  getDisplayName,
  type MidiProgramNumber,
} from "@/_features/instrument/model";
import { instrumentStore } from "@/_features/instrument/store";
import { ListItem } from "../ListItem";

type Props = { midiProgramNumber: MidiProgramNumber };

export const InstrumentItem: React.FC<Props> = ({ midiProgramNumber }) => {
  const instrument = instrumentStore.useInstrument(midiProgramNumber);

  return (
    <ListItem
      className="pl-7"
      label={getDisplayName(instrument)}
      selectionStatus={instrument.selectionStatus}
      onClick={() => {}}
    />
  );
};
