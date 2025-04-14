import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { routeTree } from "./routeTree.gen";
import "./index.css";

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  type Register = {
    router: typeof router;
  };
}

export type SinglePath = keyof (typeof router)["routesByPath"];

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
