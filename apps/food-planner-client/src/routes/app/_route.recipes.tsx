import { createFileRoute } from "@tanstack/react-router";

import RecipesTable from "@/components/RecipesTable";

export const Route = createFileRoute("/app/_route/recipes")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RecipesTable />;
}
