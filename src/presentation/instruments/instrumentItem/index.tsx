import { toggleInstrumentSelection } from "../../../infrastructure/zustand/instruments/action";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { useInstrument } from "../../../infrastructure/zustand/instruments/selector";

type Props = { id: InstrumentId };

export const InstrumentItem = ({ id }: Props) => {
  const instrument = useInstrument(id);

  const handleSelectionChange = () => dispatch(toggleInstrumentSelection(id));

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
