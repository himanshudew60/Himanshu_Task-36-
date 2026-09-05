import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WorkoutProvider } from "./context/WorkoutContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorkoutProvider>
      <App />
    </WorkoutProvider>
  </StrictMode>
);