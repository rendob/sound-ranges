import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";
import { InstrumentGroupItem } from "./instrumentGroupItem";

export const Instruments = () => {
  const categories = Object.values(InstrumentCategory);

  return (
    <div>
      {categories.map((category) => (
        <InstrumentGroupItem key={category} category={category} />
      ))}
    </div>
  );
};
