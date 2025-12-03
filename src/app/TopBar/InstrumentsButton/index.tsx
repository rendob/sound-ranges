import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SvgButton } from "@/_components/SvgButton";
import { InstrumentsList } from "@/app/InstrumentsList";

export const InstrumentsButton: React.FC = () => {
  const { t } = useTranslation();
  const [isInstrumentsListOpen, setIsInstrumentsListOpen] = useState(false);

  const handleClick: React.MouseEventHandler = () => {
    setIsInstrumentsListOpen((prev) => !prev);
  };

  return (
    <>
      <SvgButton
        className={isInstrumentsListOpen ? "bg-white/30" : undefined}
        label={t("instruments.label")}
        onClick={handleClick}
      >
        <path d="M16.7006 20.7919C15.8672 20.7919 15.1589 20.5003 14.5756 19.9169C13.9922 19.3336 13.7006 18.6253 13.7006 17.7919C13.7006 16.9586 13.9922 16.2503 14.5756 15.6669C15.1589 15.0836 15.8672 14.7919 16.7006 14.7919C16.8839 14.7919 17.0589 14.8044 17.2256 14.8294C17.3922 14.8544 17.5506 14.9086 17.7006 14.9919V6.79193H22.7006V8.79193H19.7006V17.7919C19.7006 18.6253 19.4089 19.3336 18.8256 19.9169C18.2422 20.5003 17.5339 20.7919 16.7006 20.7919ZM3.70056 16.7919V14.7919H11.7006V16.7919H3.70056ZM3.70056 12.7919V10.7919H15.7006V12.7919H3.70056ZM3.70056 8.79193V6.79193H15.7006V8.79193H3.70056Z" />
      </SvgButton>

      <InstrumentsList isOpen={isInstrumentsListOpen} />
    </>
  );
};
