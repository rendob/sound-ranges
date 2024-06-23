import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import { SelectionStatus } from "../../../domain/instrumentGroup";
import { toggleInstrumentGroupSelection } from "../../../infrastructure/zustand/instruments/action";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { InstrumentItem } from "../instrumentItem";
import { useInstrumentGroup } from "../../../infrastructure/zustand/instruments/selector";

type Props = { category: InstrumentCategory };

export const InstrumentGroupItem = ({ category }: Props) => {
  const instrumentGroup = useInstrumentGroup(category);

  const handleSelectionChange = () =>
    dispatch(toggleInstrumentGroupSelection(category));

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
          {instrumentGroup.id} {instrumentGroup.selectionStatus}
        </p>
      </div>
      {instrumentGroup.instrumentIds.map((id) => (
        <InstrumentItem key={id} id={id} />
      ))}
    </div>
  );
};
