import { createFileRoute } from "@tanstack/react-router";

import LandingPage from "@/layouts/LandingPage";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPage />;
}
