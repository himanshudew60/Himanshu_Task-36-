import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WorkoutProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
    <AuthContextProvider>
      <WorkoutProvider>
        <App />
      </WorkoutProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
