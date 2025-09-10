import { Dialog, DialogContent } from "@jcmono/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import IngredientForm from "@/forms/IngredientForm";
import useGetOneIngredient from "@/queries/useGetOneIngredient";

export const Route = createFileRoute("/app/_route/ingredients/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/app/ingredients/edit/$id" });
  const { id } = Route.useParams();

  const { data } = useGetOneIngredient(+id);

  if (data) {
    return (
      <Dialog open onOpenChange={() => navigate({ to: "/app/ingredients" })}>
        <DialogContent className="overflow-y-auto max-h-[90dvh]">
          <IngredientForm initialData={data.body} />
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
