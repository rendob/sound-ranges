import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { asExists } from "./_lib/utils/exists";
import { App } from "./app";
import "./index.css";

const root = asExists(document.getElementById("root"));
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
