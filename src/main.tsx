import React from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.js";

const queryClient = new QueryClient();

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)
  
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}