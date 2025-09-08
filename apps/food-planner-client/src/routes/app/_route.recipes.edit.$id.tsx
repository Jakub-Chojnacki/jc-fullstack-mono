import { Dialog, DialogContent } from "@jcmono/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

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
        <DialogContent className="overflow-y-auto max-h-[90dvh]">
          <RecipeForm initialData={data.body} />
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
