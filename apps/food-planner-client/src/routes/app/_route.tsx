import { createFileRoute, Outlet } from "@tanstack/react-router";

import MainLayout from "@/layouts/MainLayout";
import routeAuthGuard from "@/utils/routeAuthGuard";

export const Route = createFileRoute("/app/_route")({
  component: RouteComponent,
  loader: routeAuthGuard,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
