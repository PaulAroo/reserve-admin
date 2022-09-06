import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/auth-context";
import { DarkModeContextProvider } from "./context/darkModeContext";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </AuthContextProvider>
);
