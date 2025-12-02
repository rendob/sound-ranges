import { useTranslation } from "react-i18next";
import { InstrumentsButton } from "./InstrumentsButton";
import { SettingsButton } from "./SettingsButton";

export const TopBar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="flex items-center border-border border-b">
      <InstrumentsButton />

      <span className="flex-1 p-2 font-bold">{t("title")}</span>

      <SettingsButton />
    </header>
  );
};
