import React from "react";
import ReactDOM from "react-dom/client";
import App from "./presentation/App.tsx";
import "./index.css";
import { soundPlayer } from "./presentation/common/soundPlayer.ts";

document.addEventListener("mouseup", () => {
  soundPlayer.stopPlaying();
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
