import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { asExists } from "./_lib/utils/exists";

const root = asExists(document.getElementById("root"));
createRoot(root).render(<StrictMode>App</StrictMode>);
