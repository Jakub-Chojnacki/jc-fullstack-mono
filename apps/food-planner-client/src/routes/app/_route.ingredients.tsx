import { createFileRoute } from "@tanstack/react-router";

import IngredientsList from "@/components/IngredientsList";

export const Route = createFileRoute("/app/_route/ingredients")({
  component: RouteComponent,
});

function RouteComponent() {
  return <IngredientsList />;
}
