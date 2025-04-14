import { createFileRoute } from "@tanstack/react-router";

import ScheduleView from "@/components/ScheduleView";

export const Route = createFileRoute("/app/_route/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ScheduleView />;
}
