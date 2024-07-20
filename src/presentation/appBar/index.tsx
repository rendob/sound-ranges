/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { appColor } from "../style/appColor";
import { dispatch } from "../../infrastructure/zustand/appStore";
import { toggleShouldShowInstruments } from "../../infrastructure/zustand/uiState/action";
import {
  useShouldShowInstruments,
  useShouldShowSettings,
} from "../../infrastructure/zustand/uiState/selector";
import { Icon } from "../common/icon";
import { openSettings } from "../../infrastructure/zustand/uiState/action";
import { SettingsDialog } from "./settingsDialog";
import React from "react";

const styles = {
  root: css({
    alignItems: "center",
    borderBottom: `1px solid ${appColor.border}`,
    display: "flex",
    position: "sticky",
    top: 0,
    zIndex: 1,
  }),
  instrumentsMenuIcon: (isSelected: boolean) =>
    css({
      backgroundColor: isSelected ? appColor.selected(appColor.background) : "",
    }),
  title: css({
    flexGrow: 1,
    fontWeight: 700,
    padding: "8px",
  }),
};

export const AppBar = () => {
  const shouldShowSettings = useShouldShowSettings();

  return (
    <header css={styles.root}>
      <InstrumentsMenuIcon />

      <span css={styles.title}>Sound Ranges</span>

      <SettingsIcon />

      {shouldShowSettings && <SettingsDialog />}
    </header>
  );
};

const InstrumentsMenuIcon = () => {
  const shouldShowInstruments = useShouldShowInstruments();
  const handleClick = () => {
    dispatch(toggleShouldShowInstruments());
  };

  return (
    <Icon
      onClick={handleClick}
      css={styles.instrumentsMenuIcon(shouldShowInstruments)}
    >
      <path
        d="M16.7006 20.7919C15.8672 20.7919 15.1589 20.5003 14.5756 19.9169C13.9922 19.3336 13.7006 18.6253 13.7006 17.7919C13.7006 16.9586 13.9922 16.2503 14.5756 15.6669C15.1589 15.0836 15.8672 14.7919 16.7006 14.7919C16.8839 14.7919 17.0589 14.8044 17.2256 14.8294C17.3922 14.8544 17.5506 14.9086 17.7006 14.9919V6.79193H22.7006V8.79193H19.7006V17.7919C19.7006 18.6253 19.4089 19.3336 18.8256 19.9169C18.2422 20.5003 17.5339 20.7919 16.7006 20.7919ZM3.70056 16.7919V14.7919H11.7006V16.7919H3.70056ZM3.70056 12.7919V10.7919H15.7006V12.7919H3.70056ZM3.70056 8.79193V6.79193H15.7006V8.79193H3.70056Z"
        fill={appColor.onBackground}
      />
    </Icon>
  );
};

const SettingsIcon = () => {
  const handleClick = (e: React.MouseEvent) => {
    dispatch(openSettings());
    e.stopPropagation();
  };

  return (
    <Icon onClick={handleClick}>
      <path
        d="M9.33711 22.0913L8.93711 18.8913C8.72044 18.808 8.51628 18.708 8.32461 18.5913C8.13294 18.4747 7.94544 18.3497 7.76211 18.2163L4.78711 19.4663L2.03711 14.7163L4.61211 12.7663C4.59544 12.6497 4.58711 12.5372 4.58711 12.4288V11.7538C4.58711 11.6455 4.59544 11.533 4.61211 11.4163L2.03711 9.46634L4.78711 4.71634L7.76211 5.96634C7.94544 5.83301 8.13711 5.70801 8.33711 5.59134C8.53711 5.47467 8.73711 5.37467 8.93711 5.29134L9.33711 2.09134H14.8371L15.2371 5.29134C15.4538 5.37467 15.6579 5.47467 15.8496 5.59134C16.0413 5.70801 16.2288 5.83301 16.4121 5.96634L19.3871 4.71634L22.1371 9.46634L19.5621 11.4163C19.5788 11.533 19.5871 11.6455 19.5871 11.7538V12.4288C19.5871 12.5372 19.5704 12.6497 19.5371 12.7663L22.1121 14.7163L19.3621 19.4663L16.4121 18.2163C16.2288 18.3497 16.0371 18.4747 15.8371 18.5913C15.6371 18.708 15.4371 18.808 15.2371 18.8913L14.8371 22.0913H9.33711ZM11.0871 20.0913H13.0621L13.4121 17.4413C13.9288 17.308 14.4079 17.1122 14.8496 16.8538C15.2913 16.5955 15.6954 16.283 16.0621 15.9163L18.5371 16.9413L19.5121 15.2413L17.3621 13.6163C17.4454 13.383 17.5038 13.1372 17.5371 12.8788C17.5704 12.6205 17.5871 12.358 17.5871 12.0913C17.5871 11.8247 17.5704 11.5622 17.5371 11.3038C17.5038 11.0455 17.4454 10.7997 17.3621 10.5663L19.5121 8.94134L18.5371 7.24134L16.0621 8.29134C15.6954 7.90801 15.2913 7.58717 14.8496 7.32884C14.4079 7.07051 13.9288 6.87467 13.4121 6.74134L13.0871 4.09134H11.1121L10.7621 6.74134C10.2454 6.87467 9.76628 7.07051 9.32461 7.32884C8.88294 7.58717 8.47878 7.89967 8.11211 8.26634L5.63711 7.24134L4.66211 8.94134L6.81211 10.5413C6.72878 10.7913 6.67044 11.0413 6.63711 11.2913C6.60378 11.5413 6.58711 11.808 6.58711 12.0913C6.58711 12.358 6.60378 12.6163 6.63711 12.8663C6.67044 13.1163 6.72878 13.3663 6.81211 13.6163L4.66211 15.2413L5.63711 16.9413L8.11211 15.8913C8.47878 16.2747 8.88294 16.5955 9.32461 16.8538C9.76628 17.1122 10.2454 17.308 10.7621 17.4413L11.0871 20.0913ZM12.1371 15.5913C13.1038 15.5913 13.9288 15.2497 14.6121 14.5663C15.2954 13.883 15.6371 13.058 15.6371 12.0913C15.6371 11.1247 15.2954 10.2997 14.6121 9.61634C13.9288 8.93301 13.1038 8.59134 12.1371 8.59134C11.1538 8.59134 10.3246 8.93301 9.64961 9.61634C8.97461 10.2997 8.63711 11.1247 8.63711 12.0913C8.63711 13.058 8.97461 13.883 9.64961 14.5663C10.3246 15.2497 11.1538 15.5913 12.1371 15.5913Z"
        fill={appColor.onBackground}
      />
    </Icon>
  );
};
