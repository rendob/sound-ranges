import { useTranslation } from "react-i18next";
import { Button, ButtonVariant } from "@/_components/Button";
import { TopBar } from "./TopBar";

export const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="flex h-screen select-none flex-col">
      <title>{t("title")}</title>

      <TopBar />

      <div className="space-x-2">
        <Button variant={ButtonVariant.FILLED}>Filled</Button>
        <Button variant={ButtonVariant.OUTLINED}>Outlined</Button>
        <Button variant={ButtonVariant.DESTRUCTIVE}>Destructive</Button>
      </div>
    </main>
  );
};
