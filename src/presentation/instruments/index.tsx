import { useGetInstrumentsUseCase } from "../../application/useCase/getInstruments";
import { groupByCategory } from "../../domain/instrumentService";
import { InstrumentGroupItem } from "./instrumentGroupItem";

export const Instruments = () => {
  const getInstruments = useGetInstrumentsUseCase();

  const instruments = getInstruments();
  const instrumentGroups = groupByCategory(instruments);

  return (
    <div>
      {instrumentGroups.map((instrumentGroup) => (
        <InstrumentGroupItem
          key={instrumentGroup.category}
          instrumentGroup={instrumentGroup}
        />
      ))}
    </div>
  );
};
