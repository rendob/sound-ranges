/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Instruments } from "./instruments";
import { Keyboard } from "./keyboard";

const style = css({
  display: "flex",
});

function App() {
  return (
    <div css={style}>
      <Instruments />
      <Keyboard />
    </div>
  );
}

export default App;
