import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { createInstruments } from "@/_features/instrument/data";
import { getDisplayName } from "@/_features/instrument/model";

const instruments = createInstruments();

type Props = {
  isOpen: boolean;
};

export const InstrumentsList: React.FC<Props> = ({ isOpen }) => {
  const { i18n } = useTranslation();

  return (
    <aside
      className={twMerge(
        "absolute top-10 h-[calc(100vh-40px)] max-w-80 overflow-y-scroll border-border border-t border-r bg-base",
        "starting:-translate-x-full transition-[display,translate] transition-discrete",
        isOpen ? "translate-x-0" : "-translate-x-full hidden",
      )}
    >
      {instruments.map((instrument) => (
        <p key={instrument.midiProgramNumber}>
          {getDisplayName(instrument, i18n.language)}
        </p>
      ))}
    </aside>
  );
};
