import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@jcmono/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import RecipeForm from "@/forms/RecipeForm";

export const Route = createFileRoute("/app/_route/recipes/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/app/recipes/add" });

  return (
    <Dialog open onOpenChange={() => navigate({ to: "/app/recipes" })}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a recipe</DialogTitle>
        </DialogHeader>
        <RecipeForm />
      </DialogContent>
    </Dialog>
  );
}
