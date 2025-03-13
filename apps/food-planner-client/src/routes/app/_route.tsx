import MainLayout from "@/layouts/MainLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_route")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
