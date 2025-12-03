import { createInstruments } from "@/_features/instrument/data";
import {
  getDisplayName,
  type MidiProgramNumber,
} from "@/_features/instrument/model";

type Props = { midiProgramNumber: MidiProgramNumber };

const instruments = createInstruments();

export const InstrumentItem: React.FC<Props> = ({ midiProgramNumber }) => {
  const instrument = instruments[midiProgramNumber - 1];

  return <p className="pl-7">{getDisplayName(instrument)}</p>;
};
