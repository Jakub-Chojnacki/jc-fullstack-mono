import { createFileRoute } from "@tanstack/react-router";

import ShoppingList from "@/components/ShoppingList";

export const Route = createFileRoute("/app/_route/shopping")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShoppingList />;
}
