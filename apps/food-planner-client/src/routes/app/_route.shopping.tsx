import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_route/shopping")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/_route/shopping"!</div>;
}
