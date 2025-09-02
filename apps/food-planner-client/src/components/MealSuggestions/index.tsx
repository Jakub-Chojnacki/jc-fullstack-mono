import { MealTypes } from "@jcmono/api-contract";
import { Button, Card, CardContent } from "@jcmono/ui";
import { ChefHat, Loader2, RefreshCw, Sparkles } from "lucide-react";

import type { MealSuggestionsProps } from "./types";

function MealSuggestions({
  suggestions,
  isLoading,
  onSelectSuggestion,
  onRefreshSuggestions,
  isRefreshing = false,
  selectedRecipeId,
}: MealSuggestionsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 animate-in fade-in duration-200">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">
          Finding delicious suggestions...
        </span>
      </div>
    );
  }

  if (!suggestions.length) {
    return (
      <div className="text-center py-8 animate-in fade-in duration-200">
        <ChefHat className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          No suggestions found for this meal type.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Suggested for you</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRefreshSuggestions}
          disabled={isRefreshing}
          className="h-8 px-2"
        >
          <RefreshCw
            className={`h-3 w-3 transition-transform duration-200 ${isRefreshing ? "animate-spin" : "hover:rotate-180"}`}
          />
        </Button>
      </div>

      <div className="grid gap-2">
        {suggestions.map((suggestion, index) => {
          const isSelected = selectedRecipeId === suggestion.id;
          return (
            <Card
              key={suggestion.id}
              className={`cursor-pointer transition-all duration-200 animate-in slide-in-from-left-4 ${
                isSelected
                  ? "border-primary border-2 bg-primary/10 shadow-md scale-[1.02]"
                  : "border-dashed hover:border-primary hover:bg-primary/5 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              }`}
              style={{ animationDelay: `${index * 100}ms`, animationDuration: "300ms" }}
              onClick={() => onSelectSuggestion(suggestion)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {suggestion.name}
                    </h4>
                    {suggestion.description && (
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {suggestion.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    {suggestion.mealTypes
                      .sort((a, b) => MealTypes.indexOf(a) - MealTypes.indexOf(b))
                      .map(mealType => (
                        <span
                          key={mealType}
                          className="px-1.5 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                        >
                          {mealType}
                        </span>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default MealSuggestions;
