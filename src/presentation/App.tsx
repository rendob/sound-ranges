/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Instruments } from "./instruments";
import { AppBar } from "./appBar";
import { useShouldShowInstruments } from "../infrastructure/zustand/uiState/selector";
import { SoundRangeTable } from "./soundRangeTable";
import { appColor } from "./style/appColor";
import { dispatch } from "../infrastructure/zustand/appStore";
import { closeSettings } from "../infrastructure/zustand/uiState/action";

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
    </div>
  );
}

export default App;
