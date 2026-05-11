import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import "./styles/globals.css";
import "./index.css";
import App from "./App.tsx";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
