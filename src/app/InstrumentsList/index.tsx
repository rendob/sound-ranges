import { twMerge } from "tailwind-merge";
import { instrumentGroups } from "@/_features/instrumentGroup/data";
import { AllItem } from "./AllItem";
import { InstrumentsGroupItem } from "./InstrumentsGroupItem";

type Props = {
  isOpen: boolean;
};

export const InstrumentsList: React.FC<Props> = ({ isOpen }) => {
  return (
    <aside
      className={twMerge(
        "absolute top-10 z-10 flex h-[calc(100vh-40px)] max-w-[calc(var(--piano-key-width)*20)] flex-col border-border border-t border-r bg-base",
        "starting:-translate-x-full transition-[display,translate] transition-discrete",
        isOpen ? "translate-x-0" : "-translate-x-full hidden",
      )}
    >
      <AllItem />

      <div className="overflow-y-scroll">
        {instrumentGroups.map((instrumentGroup) => (
          <InstrumentsGroupItem
            key={instrumentGroup.name.en}
            instrumentGroup={instrumentGroup}
          />
        ))}
      </div>
    </aside>
  );
};
