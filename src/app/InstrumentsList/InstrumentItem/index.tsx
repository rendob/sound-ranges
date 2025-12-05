import type { MidiProgramNumber } from "@/_features/instrument/midiProgramNumber";
import { getDisplayName } from "@/_features/instrument/model";
import { instrumentStore } from "@/_features/instrument/store";
import { chunkWord } from "@/_lib/utils/chunkWord";
import { ListItem } from "../ListItem";

type Props = { midiProgramNumber: MidiProgramNumber };

export const InstrumentItem: React.FC<Props> = ({ midiProgramNumber }) => {
  const instrument = instrumentStore.useInstrument(midiProgramNumber);

  const chunkedDisplayName = chunkWord(getDisplayName(instrument), [
    " ",
    "・",
  ]).map((chunk) => (
    <span key={chunk} className="inline-block whitespace-pre-wrap">
      {chunk}
    </span>
  ));

  const handleClick: React.MouseEventHandler = () => {
    instrumentStore.toggleSelection(midiProgramNumber);
  };

  return (
    <ListItem
      className="pl-7"
      selectionStatus={instrument.selectionStatus}
      onClick={handleClick}
    >
      {chunkedDisplayName}
    </ListItem>
  );
};
