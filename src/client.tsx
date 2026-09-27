import { startTransition } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

startTransition(() => {
  const rootElement = document.getElementById("root");

  if (rootElement && rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, <StartClient />);
  } else if (rootElement) {
    createRoot(rootElement).render(<StartClient />);
  } else {
    hydrateRoot(document, <StartClient />);
  }
});
