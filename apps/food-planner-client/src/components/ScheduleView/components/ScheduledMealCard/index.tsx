import { Button, Dialog, DialogContent, DialogTrigger } from "@jcmono/ui";
import { ShoppingBag, X } from "lucide-react";

import RecipePreview from "@/components/RecipePreview";

import type { ScheduledMealCardProps } from "./types";

function ScheduledMealCard({ foundMeal, handleCreateShoppingList, handleDeleteMeal, isCreateShoppingListFromMealPending }: ScheduledMealCardProps) {
  return (
    <div className="p-4 border rounded-xl bg-gradient-to-r from-card to-card/70 relative group hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground mb-1">
            {foundMeal.recipe.name}
          </h3>

          <Dialog>
            <DialogTrigger>
              <p className="text-sm text-muted-foreground">
                Click to view full recipe details
              </p>
            </DialogTrigger>
            <DialogContent>
              <RecipePreview id={foundMeal.recipeId} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            disabled={isCreateShoppingListFromMealPending}
            className="h-10 w-10 rounded-lg"
            onClick={() => handleCreateShoppingList(foundMeal.recipe.id)}
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg"
            onClick={() => handleDeleteMeal(foundMeal.id)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScheduledMealCard;
