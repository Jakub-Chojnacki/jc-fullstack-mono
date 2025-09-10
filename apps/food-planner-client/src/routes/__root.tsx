import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@components/ThemeProvider";

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [{ title: "MealSelect" }],
    links: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <ThemeProvider>
        <Outlet />
        <Toaster position="top-right" />
      </ThemeProvider>
    </>
  );
}
