import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

// Automatic auto-reload when a new deployment invalidates old chunk JS URLs
window.addEventListener(
  "error",
  (event) => {
    const target = event.target as HTMLElement | null;
    if (
      (target && target.tagName === "SCRIPT") ||
      (event.message && event.message.includes("MIME type"))
    ) {
      const key = "sfm_chunk_reload_timestamp";
      const lastReload = sessionStorage.getItem(key);
      const now = Date.now();
      if (!lastReload || now - Number(lastReload) > 10000) {
        sessionStorage.setItem(key, String(now));
        window.location.reload();
      }
    }
  },
  true
);

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
