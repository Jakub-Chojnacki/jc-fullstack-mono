import type { TRecipeGetOne } from "@jcmono/api-contract";

export type TIngredientCardProps = {
  ingredient: TRecipeGetOne["recipeIngredients"][number];
};
