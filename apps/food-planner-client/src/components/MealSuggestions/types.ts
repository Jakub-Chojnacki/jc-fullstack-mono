import type { TRecipe } from "@jcmono/api-contract";

export type MealSuggestionsProps = {
  suggestions: TRecipe[];
  isLoading: boolean;
  onSelectSuggestion: (recipe: TRecipe) => void;
  onRefreshSuggestions: () => void;
  isRefreshing?: boolean;
  selectedRecipeId?: number;
};
