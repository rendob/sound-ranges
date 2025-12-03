import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { asExists } from "./_lib/utils/exists";
import { App } from "./app";
import "./_lib/i18n/i18n";
import "./index.css";
import { soundPlayer } from "./_components/soundPlayer";

document.addEventListener("mouseup", () => {
  soundPlayer.stopPlaying();
});

const root = asExists(document.getElementById("root"));
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
