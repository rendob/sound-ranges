import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import { SelectionStatus } from "../../../domain/instrumentService";
import {
  selectGroupSelectionStatus,
  selectInstrumentGroup,
  useInstrumentsStore,
} from "../../../infrastructure/zustand/instruments";
import { InstrumentItem } from "../instrumentItem";

type Props = { category: InstrumentCategory };

export const InstrumentGroupItem = ({ category }: Props) => {
  const instrumentGroup = useInstrumentsStore(selectInstrumentGroup(category));
  const selectionStatus = useInstrumentsStore(
    selectGroupSelectionStatus(category),
  );

  const toggleInstrumentGroupSelection = useInstrumentsStore(
    (state) => state.toggleInstrumentGroupSelection,
  );

  const handleSelectionChange = () => toggleInstrumentGroupSelection(category);

  return (
    <div>
      <hr />
      <div style={{ display: "flex" }}>
        <input
          type="checkbox"
          checked={selectionStatus === SelectionStatus.SELECTED}
          onChange={handleSelectionChange}
        />
        <p>
          {instrumentGroup.id} {selectionStatus}
        </p>
      </div>
      {instrumentGroup.instrumentIds.map((id) => (
        <InstrumentItem key={id} id={id} />
      ))}
    </div>
  );
};
