import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

import MainLayout from "@layouts/MainLayout";

import ErrorView from "@/components/ErrorView";
import routeAuthGuard from "@/utils/routeAuthGuard";

export const Route = createFileRoute("/app/_route")({
  component: RouteComponent,
  loader: async () => {
    const { user, error } = await routeAuthGuard();
    if (error === "network") {
      throw new Error("Network error: Failed to fetch session.");
    }
    if (!user) {
      return <Navigate to="/signin" />;
    }
    return user;
  },
  errorComponent: ErrorView,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
