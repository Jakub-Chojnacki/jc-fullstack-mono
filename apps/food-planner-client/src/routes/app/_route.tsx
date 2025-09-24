import { createFileRoute, Outlet } from "@tanstack/react-router";

import MainLayout from "@layouts/MainLayout";

import ErrorView from "@/components/ErrorView";
import routeAuthGuard from "@/utils/routeAuthGuard";

export const Route = createFileRoute("/app/_route")({
  component: RouteComponent,
  beforeLoad: routeAuthGuard,
  errorComponent: ErrorView,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
