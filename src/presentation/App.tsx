import { css } from "@emotion/react";
import { AppBar } from "./appBar";
import { SoundRangeTable } from "./soundRangeTable";
import { appColor } from "./style/appColor";
import { dispatch } from "../infrastructure/zustand/appStore";
import { closeSettings } from "../infrastructure/zustand/uiState/action";
import { SettingsDialog } from "./settingsDialog";
import { Instruments } from "./instruments";

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
    position: "relative",
  }),
};

function App() {
  const handleClick = () => {
    dispatch(closeSettings());
  };

  return (
    <div onClick={handleClick} css={styles.root}>
      <AppBar />

      <div css={styles.content}>
        <Instruments />
        <SoundRangeTable />
      </div>

      <SettingsDialog />
    </div>
  );
}

export default App;
