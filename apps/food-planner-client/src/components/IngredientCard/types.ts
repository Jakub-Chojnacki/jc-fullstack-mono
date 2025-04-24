import type { TRecipeGetOne } from "@jcmono/api-contract";

export type TIngredientCardProps = {
  ingredient: NonNullable<TRecipeGetOne["recipeIngredients"]>[number];
};
