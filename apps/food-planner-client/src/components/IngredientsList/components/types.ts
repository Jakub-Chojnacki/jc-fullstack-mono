import type { TIngredient } from "@jcmono/api-contract";

export type TIngredientCardProps = {
  ingredient: TIngredient;
  handleDelete?: (id: number) => void;
  className?: string;
};
