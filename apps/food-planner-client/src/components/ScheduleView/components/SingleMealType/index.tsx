import { EMealTypes } from "@jcmono/api-contract";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScheduleMealForm from "@/forms/ScheduleMealForm";
import useDeleteScheduledMeal from "@/queries/useDeleteScheduledMeal";
import useShoppingListFromMeal from "@/queries/useShoppingListFromMeal";

import ScheduledMealCard from "../ScheduledMealCard";

import { mealTypeColors } from "./const";

import type { MealCardProps } from "./types";

function SingleMealType({
  mealType,
  foundMeal,
  currentViewDay,
}: MealCardProps) {
  const [selectedMealType, setSelectedMealType] = useState<EMealTypes>(
    EMealTypes.BREAKFAST,
  );

  const [addMealDialogOpen, setAddMealDialogOpen] = useState(false);

  const { mutate: deleteMeal } = useDeleteScheduledMeal();

  const {
    mutate: createShoppingListFromMeal,
    isPending: isCreateShoppingListFromMealPending,
  } = useShoppingListFromMeal();

  const handleCreateShoppingList = (mealId: number): void => {
    createShoppingListFromMeal({ params: { id: mealId } });
  };

  const handleDeleteMeal = (mealId: number): void => {
    deleteMeal({ params: { id: mealId } });
  };

  const openAddMealDialog = (): void => {
    setSelectedMealType(mealType);
    setAddMealDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setSelectedMealType(EMealTypes.BREAKFAST);
    setAddMealDialogOpen(false);
  };

  const badgeStyles = `px-3 py-1.5 rounded-xl text-sm font-bold border ${
    mealTypeColors[mealType as EMealTypes]
    || "bg-gray-50 border-gray-200 text-gray-800"
  }`;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className={badgeStyles}>{mealType}</div>
          <div className="h-px bg-border flex-1"></div>
        </div>

        {foundMeal
          ? (
              <ScheduledMealCard
                foundMeal={foundMeal}
                handleDeleteMeal={handleDeleteMeal}
                handleCreateShoppingList={handleCreateShoppingList}
                isCreateShoppingListFromMealPending={
                  isCreateShoppingListFromMealPending
                }
              />
            )
          : (
              <Button
                variant="outline"
                className="w-full h-12 border-2 border-dashed text-base justify-center hover:border-primary hover:bg-primary/5 transition-all duration-200 group rounded-xl"
                onClick={openAddMealDialog}
              >
                <Plus className="h-5 w-5 mr-3" />
                {`Add ${mealType.toLowerCase()}`}
              </Button>
            )}
      </CardContent>
      {addMealDialogOpen && (
        <ScheduleMealForm
          initialSelectedDay={currentViewDay}
          initialMealType={selectedMealType}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </Card>
  );
}

export default SingleMealType;
