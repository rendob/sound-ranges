import { useTranslation } from "react-i18next";
import { version } from "../../package.json";
import { SoundRangeTable } from "./SoundRangeTable";
import { TopBar } from "./TopBar";

export const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="flex h-screen select-none flex-col">
      <title>{t("title")}</title>
      <meta name="version" content={version} />

      <TopBar />

      <SoundRangeTable />
    </main>
  );
};
