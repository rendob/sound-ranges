import { useTranslation } from "react-i18next";
import { Select } from "@/_components/Select";
import { type LangCode, langCodes } from "@/_lib/i18n/i18n";

export const LanguageSelect: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    i18n.changeLanguage(e.target.value as LangCode);
  };

  return (
    <div className="flex items-center justify-between gap-2 p-1">
      <span>{t("settings.languageLabel")}:</span>

      <Select value={i18n.language} onChange={handleChange}>
        {langCodes.map((langCode) => (
          <option key={langCode} value={langCode}>
            {t("language", { lng: langCode })}
          </option>
        ))}
      </Select>
    </div>
  );
};
