import React from "react";
import { createRoot } from "react-dom/client";
import RouterComponent from "../Router";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterComponent />
  </React.StrictMode>
);
