/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Instruments } from "./instruments";
import { Keyboard } from "./keyboard";
import { AppBar } from "./appBar";
import { useShouldShowInstruments } from "../infrastructure/zustand/uiState/selector";

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  }),
  content: css({
    display: "flex",
    flex: 1,
    overflowY: "hidden",
  }),
};

function App() {
  const shouldShowInstruments = useShouldShowInstruments();

  return (
    <div css={styles.root}>
      <AppBar />
      <div css={styles.content}>
        {shouldShowInstruments && <Instruments />}
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
