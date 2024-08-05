import { css } from "@emotion/react";
import { Instruments } from "./instruments";
import { AppBar } from "./appBar";
import {
  useShouldShowInstruments,
  useShouldShowSettings,
} from "../infrastructure/zustand/uiState/selector";
import { SoundRangeTable } from "./soundRangeTable";
import { appColor } from "./style/appColor";
import { dispatch } from "../infrastructure/zustand/appStore";
import { closeSettings } from "../infrastructure/zustand/uiState/action";
import { SettingsDialog } from "./settingsDialog";

const styles = {
  root: css({
    backgroundColor: appColor.background,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    userSelect: "none",
  }),
  content: css({
    display: "flex",
    flex: 1,
    overflowY: "hidden",
  }),
};

function App() {
  const shouldShowInstruments = useShouldShowInstruments();
  const shouldShowSettings = useShouldShowSettings();

  const handleClick = () => {
    dispatch(closeSettings());
  };

  return (
    <div onClick={handleClick} css={styles.root}>
      <AppBar />

      <div css={styles.content}>
        {shouldShowInstruments && <Instruments />}
        <SoundRangeTable />
      </div>

      {shouldShowSettings && <SettingsDialog />}
    </div>
  );
}

export default App;
