import type { EMealTypes } from "@jcmono/api-contract";
import { Plus, ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useDeleteScheduledMeal from "@/queries/useDeleteScheduledMeal";
import useShoppingListFromMeal from "@/queries/useShoppingListFromMeal";

import { mealTypeColors } from "./const";

import type { MealCardProps } from "./types";

function MealCard({
  mealType,
  foundMeal,
  selectedDay,
  onAddMeal,
}: MealCardProps) {
  const { mutate: deleteMeal } = useDeleteScheduledMeal();

  const {
    mutate: createShoppingListFromMeal,
    isPending: isCreateShoppingListFromMealPending,
  } = useShoppingListFromMeal();

  const handleCreateShoppingList = (mealId: number): void => {
    createShoppingListFromMeal({ params: { id: mealId.toString() } });
  };

  const handleDeleteMeal = (mealId: number): void => {
    deleteMeal({ params: { id: mealId.toString() } });
  };

  const handleAddMeal = (): void => {
    onAddMeal(selectedDay, mealType as EMealTypes);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div
            className={`px-3 py-1.5 rounded-xl text-sm font-bold border ${
              mealTypeColors[mealType as EMealTypes]
              || "bg-gray-50 border-gray-200 text-gray-800"
            }`}
          >
            {mealType}
          </div>
          <div className="h-px bg-border flex-1"></div>
        </div>

        {foundMeal
          ? (
              <div className="p-4 border rounded-xl bg-gradient-to-r from-card to-card/70 relative group hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {foundMeal.recipe.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Click to view full recipe details
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isCreateShoppingListFromMealPending}
                      className="h-10 w-10 rounded-lg"
                      onClick={() => handleCreateShoppingList(foundMeal.id)}
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
            )
          : (
              <Button
                variant="outline"
                className="w-full h-12 border-2 border-dashed text-base justify-center hover:border-primary hover:bg-primary/5 transition-all duration-200 group rounded-xl"
                onClick={handleAddMeal}
              >
                <Plus className="h-5 w-5 mr-3" />
                {`Add ${mealType.toLowerCase()}`}
              </Button>
            )}
      </CardContent>
    </Card>
  );
}

export default MealCard;
