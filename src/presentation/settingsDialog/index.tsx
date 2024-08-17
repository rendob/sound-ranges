import { css } from "@emotion/react";
import { appColor } from "../style/appColor";
import { PitchType } from "../../domain/noteNumber/pitchType";
import { asNoteNumber, getNoteNames } from "../../domain/noteNumber";
import React from "react";
import { dispatch } from "../../infrastructure/zustand/appStore";
import { setPitchType } from "../../infrastructure/zustand/config/action";
import { assertExists } from "../../util/exists";
import { usePitchType } from "../../infrastructure/zustand/config/selector";
import { useShouldShowSettings } from "../../infrastructure/zustand/uiState/selector";
import { useTranslation } from "react-i18next";
import { LangCode, langCodes } from "../../i18n/configs";

const styles = {
  root: (shouldShowDialog: boolean) =>
    css({
      backgroundColor: appColor.background,
      border: `1px solid ${appColor.border}`,
      display: shouldShowDialog ? "block" : "none",
      opacity: shouldShowDialog ? 1 : 0,
      padding: "4px",
      position: "absolute",
      right: "4px",
      top: "4px",
      transitionBehavior: "allow-discrete",
      transitionDuration: "0.2s",
      transitionProperty: "display,opacity",
      zIndex: 100,

      "@starting-style": {
        opacity: 0,
      },
    }),
  row: css({
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "4px",
  }),
  label: css({
    marginRight: "8px",
  }),
  selector: css({
    cursor: "pointer",
  }),
};

export const SettingsDialog = () => {
  const shouldShowSettings = useShouldShowSettings();

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div css={styles.root(shouldShowSettings)} onClick={onClick}>
      <PitchTypeSelector />
      <LanguageSelector />
    </div>
  );
};

const PitchTypeSelector = () => {
  const { t } = useTranslation();
  const currentPitchType = usePitchType();

  const pitchTypes = Object.values(PitchType);
  const middleC = asNoteNumber(60);
  const getPitchTypeLabel = (pitchType: PitchType) =>
    `${getNoteNames(middleC, pitchType)[0]} (${pitchType.name})`;

  const handlePitchTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    const pitchType = pitchTypes.find((item) => item.name === e.target.value);
    assertExists(pitchType);
    dispatch(setPitchType(pitchType));
  };

  return (
    <div css={styles.row}>
      <span css={styles.label}>{t("settings.pitchTypeLabel")}:</span>
      <select
        value={currentPitchType.name}
        onChange={handlePitchTypeChange}
        css={styles.selector}
      >
        {pitchTypes.map((pitchType) => (
          <option key={pitchType.name} value={pitchType.name}>
            {getPitchTypeLabel(pitchType)}
          </option>
        ))}
      </select>
    </div>
  );
};

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const getText = (code: LangCode): string => {
    switch (code) {
      case "en":
        return "English";
      case "ja":
        return "日本語";
    }
  };

  const handleLanguageChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    i18n.changeLanguage(e.target.value as LangCode);
  };

  return (
    <div css={styles.row}>
      <span css={styles.label}>{t("settings.languageLabel")}:</span>
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        css={styles.selector}
      >
        {langCodes.map((langCode) => (
          <option key={langCode} value={langCode}>
            {getText(langCode)}
          </option>
        ))}
      </select>
    </div>
  );
};
