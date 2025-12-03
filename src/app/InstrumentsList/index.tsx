import { twMerge } from "tailwind-merge";

type Props = {
  isOpen: boolean;
};

export const InstrumentsList: React.FC<Props> = ({ isOpen }) => {
  return (
    <aside
      className={twMerge(
        "absolute top-10 h-[calc(100vh-40px)] max-w-80 border-border border-t border-r bg-base",
        "starting:-translate-x-full transition-[display,translate] transition-discrete",
        isOpen ? "translate-x-0" : "-translate-x-full hidden",
      )}
    >
      <p>Instruments List</p>
    </aside>
  );
};
