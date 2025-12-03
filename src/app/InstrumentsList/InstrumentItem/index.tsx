import {
  getDisplayName,
  type MidiProgramNumber,
} from "@/_features/instrument/model";
import { instrumentStore } from "@/_features/instrument/store";

type Props = { midiProgramNumber: MidiProgramNumber };

export const InstrumentItem: React.FC<Props> = ({ midiProgramNumber }) => {
  const instrument = instrumentStore.useInstrument(midiProgramNumber);

  return <p className="pl-7">{getDisplayName(instrument)}</p>;
};
