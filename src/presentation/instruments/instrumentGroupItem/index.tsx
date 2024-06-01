import { useToggleInstrumentGroupSelectionUseCase } from "../../../application/useCase/toggleInstrumentGroupSelection";
import {
  InstrumentGroup,
  SelectionStatus,
} from "../../../domain/instrumentService";
import { InstrumentItem } from "../instrumentItem";

type Props = { instrumentGroup: InstrumentGroup };

export const InstrumentGroupItem = ({ instrumentGroup }: Props) => {
  const toggleInstrumentGroupSelection =
    useToggleInstrumentGroupSelectionUseCase();

  const handleSelectionChange = () =>
    toggleInstrumentGroupSelection(instrumentGroup.category);

  return (
    <div>
      <hr />
      <div style={{ display: "flex" }}>
        <input
          type="checkbox"
          checked={instrumentGroup.selectionStatus === SelectionStatus.SELECTED}
          onChange={handleSelectionChange}
        />
        <p>
          {instrumentGroup.category} {instrumentGroup.selectionStatus}
        </p>
      </div>
      {instrumentGroup.instruments.map((instrument) => (
        <InstrumentItem key={instrument.id} instrument={instrument} />
      ))}
    </div>
  );
};
