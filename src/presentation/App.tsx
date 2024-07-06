/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Instruments } from "./instruments";
import { Keyboard } from "./keyboard";
import { AppBar } from "./appBar";
import { Fragment, useState } from "react";

const style = css({
  display: "flex",
});

function App() {
  const [shouldShowInstruments, setShouldShowInstruments] = useState(false);

  const handleInstrumentsMenuClick = () => {
    setShouldShowInstruments(!shouldShowInstruments);
  };

  return (
    <Fragment>
      <AppBar onInstrumentsMenuClick={handleInstrumentsMenuClick} />
      <div css={style}>
        {shouldShowInstruments && <Instruments />}
        <Keyboard />
      </div>
    </Fragment>
  );
}

export default App;
