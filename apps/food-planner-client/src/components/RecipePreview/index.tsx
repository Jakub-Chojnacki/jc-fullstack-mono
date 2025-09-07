import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@jcmono/ui";
import { Globe, Lock } from "lucide-react";

import useGetOneRecipe from "@/queries/useGetOneRecipe";

import RecipeIngredientCard from "./components/RecipeIngredientCard";

import type { TRecipePreviewProps } from "./types";

function RecipePreview({ id }: TRecipePreviewProps) {
  const { data, isError } = useGetOneRecipe({ id: +id, withIngredients: true });

  if (!data && isError) {
    return <div>Recipe not found!</div>;
  }

  if (data) {
    const { name, description, isGlobal, recipeIngredients, imageUrl } = data.body;

    return (
      <Card className="w-full  overflow-hidden transition-all hover:shadow-md border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            {isGlobal
              ? (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                  >
                    <Globe className="h-3 w-3" />
                    Public
                  </Badge>
                )
              : (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                  >
                    <Lock className="h-3 w-3" />
                    Private
                  </Badge>
                )}
          </div>
          <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-40 w-full overflow-hidden rounded-md bg-muted">
            <img
              src={imageUrl ?? "https://placehold.co/320x160/e2e8f0/a1a1aa?text=Recipe+Image"}
              alt={`${name} recipe`}
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
          <div className="my-4 flex flex-col gap-2">
            <h3 className="font-bold">Ingredients:</h3>
            {recipeIngredients?.map(ingredient => (
              <RecipeIngredientCard key={ingredient.id} ingredient={ingredient} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default RecipePreview;
