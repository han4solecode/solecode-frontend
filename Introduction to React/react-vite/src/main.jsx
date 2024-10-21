import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import Belajar from "./components/Belajar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Belajar></Belajar>
  </StrictMode>
);
