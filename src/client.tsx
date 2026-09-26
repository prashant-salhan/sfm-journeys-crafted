import { StrictMode, startTransition } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

const router = getRouter();

startTransition(() => {
  const rootElement = document.getElementById("root");

  if (rootElement) {
    if (rootElement.hasChildNodes()) {
      hydrateRoot(
        rootElement,
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      );
    } else {
      createRoot(rootElement).render(
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      );
    }
  } else {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>
    );
  }
});
