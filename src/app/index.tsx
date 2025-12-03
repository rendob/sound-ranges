import { useTranslation } from "react-i18next";
import { SoundRangeTable } from "./SoundRangeTable";
import { TopBar } from "./TopBar";

export const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="flex h-screen select-none flex-col">
      <title>{t("title")}</title>

      <TopBar />

      <SoundRangeTable />
    </main>
  );
};
