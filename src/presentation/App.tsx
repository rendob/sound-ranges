/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Instruments } from "./instruments";
import { Keyboard } from "./keyboard";
import { AppBar } from "./appBar";
import { Fragment } from "react";
import { useShouldShowInstruments } from "../infrastructure/zustand/uiState/selector";

const style = css({
  display: "flex",
});

function App() {
  const shouldShowInstruments = useShouldShowInstruments();

  return (
    <Fragment>
      <AppBar />
      <div css={style}>
        {shouldShowInstruments && <Instruments />}
        <Keyboard />
      </div>
    </Fragment>
  );
}

export default App;
