import type { TRecipe } from "@jcmono/api-contract";

export type TRecipeCardProps = {
  recipe: TRecipe;
  onPreview?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  className?: string;
};
