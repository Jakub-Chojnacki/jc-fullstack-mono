import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@jcmono/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import IngredientForm from "@/forms/IngredientForm";

export const Route = createFileRoute("/app/_route/ingredients/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/app/ingredients/add" });

  return (
    <Dialog open onOpenChange={() => navigate({ to: "/app/ingredients" })}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add ingredient</DialogTitle>
        </DialogHeader>
        <IngredientForm />
      </DialogContent>
    </Dialog>
  );
}
