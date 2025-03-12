import MainLayout from "@/layouts/MainLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div>Example child</div>
    </MainLayout>
  );
}
