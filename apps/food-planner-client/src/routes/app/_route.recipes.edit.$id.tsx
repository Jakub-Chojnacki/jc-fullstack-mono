import apiClient from "@/api-client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import RecipeForm from "@/forms/RecipeForm";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_route/recipes/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/app/recipes/edit/$id" });
  const { id } = Route.useParams();

  const { data } = apiClient.recipes.getOne.useQuery([{ id }], {
    params: { id },
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
