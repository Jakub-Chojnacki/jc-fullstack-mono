import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import RecipeForm from "@/forms/RecipeForm";
import useGetOneRecipe from "@/queries/useGetOneRecipe";

export const Route = createFileRoute("/app/_route/recipes/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/app/recipes/edit/$id" });
  const { id } = Route.useParams();

  const { data } = useGetOneRecipe({
    id: +id,
    withIngredients: true,
  });

  if (data) {
    return (
      <Dialog open onOpenChange={() => navigate({ to: "/app/recipes" })}>
        <DialogContent>
          <RecipeForm initialData={data.body} />
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
