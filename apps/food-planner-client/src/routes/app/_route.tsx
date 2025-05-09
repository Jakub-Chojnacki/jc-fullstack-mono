import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

import MainLayout from "@layouts/MainLayout";

import routeAuthGuard from "@/utils/routeAuthGuard";

export const Route = createFileRoute("/app/_route")({
  component: RouteComponent,
  loader: routeAuthGuard,
  errorComponent: () => <Navigate to="/signin" />,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
