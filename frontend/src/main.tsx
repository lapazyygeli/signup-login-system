import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/store.ts"

const container = document.getElementById("root");
const root: Root = createRoot(container!);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
