import {
  selectInstrument,
  useInstrumentsStore,
} from "../../../infrastructure/zustand/instruments";
import { InstrumentId } from "../../../domain/instrument/instrumentId";

type Props = { id: InstrumentId };

export const InstrumentItem = ({ id }: Props) => {
  const instrument = useInstrumentsStore(selectInstrument(id));
  const toggleInstrumentSelection = useInstrumentsStore(
    (state) => state.toggleInstrumentSelection,
  );

  const handleSelectionChange = () => toggleInstrumentSelection(id);

  return (
    <div style={{ display: "flex", paddingLeft: "16px" }}>
      <input
        type="checkbox"
        checked={instrument.isSelected}
        onChange={handleSelectionChange}
      />
      <p>
        {instrument.name} {String(instrument.isSelected)}
      </p>
    </div>
  );
};
