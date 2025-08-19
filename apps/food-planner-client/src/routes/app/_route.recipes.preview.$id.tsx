import { Dialog, DialogContent } from "@jcmono/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import RecipePreview from "@/components/RecipePreview";

export const Route = createFileRoute("/app/_route/recipes/preview/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/app/recipes/preview/$id" });
  const { id } = Route.useParams();

  return (
    <Dialog open onOpenChange={() => navigate({ to: "/app/recipes" })}>
      <DialogContent>
        <RecipePreview id={id} />
      </DialogContent>
    </Dialog>
  );
}
