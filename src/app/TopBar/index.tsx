import { useTranslation } from "react-i18next";

export const TopBar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="flex items-center border-border border-b">
      <span className="flex-1 p-2 font-bold">{t("title")}</span>
    </header>
  );
};
