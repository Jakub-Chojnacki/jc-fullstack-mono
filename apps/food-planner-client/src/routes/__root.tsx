import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@components/ThemeProvider";

export const Route = createRootRoute({ component: RootComponent });

function RootComponent() {
  return (
    <ThemeProvider>
      <Outlet />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}
