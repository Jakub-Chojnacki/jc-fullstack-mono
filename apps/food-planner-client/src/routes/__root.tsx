import { ThemeProvider } from "@components/ThemeProvider";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({ component: RootComponent });

function RootComponent() {
  return (
    <ThemeProvider>
      <Outlet />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}
