import { useToggleInstrumentSelectionUseCase } from "../../../application/useCase/toggleInstrumentSelection";
import { Instrument } from "../../../domain/instrument";

type Props = { instrument: Instrument };

export const InstrumentItem = ({ instrument }: Props) => {
  const toggleInstrumentSelection = useToggleInstrumentSelectionUseCase();

  const handleSelectionChange = () => toggleInstrumentSelection(instrument.id);

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
