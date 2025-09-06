// src/main.tsx
// Нормалізація стилів
import "modern-normalize";
// Глобальні стилі (додатково)
import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
