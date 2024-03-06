import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "modern-normalize/modern-normalize.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { router } from "./routes/router.js";

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)