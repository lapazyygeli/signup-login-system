import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./App.tsx";

const container = document.getElementById("root");
const root: Root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
