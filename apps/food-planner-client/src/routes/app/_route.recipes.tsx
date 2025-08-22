import { createFileRoute } from "@tanstack/react-router";

import RecipesList from "@/components/RecipesList";

export const Route = createFileRoute("/app/_route/recipes")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RecipesList />;
}
