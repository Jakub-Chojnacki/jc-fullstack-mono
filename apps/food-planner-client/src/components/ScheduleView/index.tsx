import { EMealTypes } from "@jcmono/api-contract";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, NotebookPen, Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScheduleMealForm from "@/forms/ScheduleMealForm";
import useDaysOfWeek from "@/hooks/useDaysOfWeek";
import useDeleteScheduledMeal from "@/queries/useDeleteScheduledMeal";
import useGetScheduledMeals from "@/queries/useGetScheduledMeals";

import HeaderWithIcon from "../HeaderWithIcon";

import { mealTypes } from "./const";

function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<EMealTypes>(
    EMealTypes.BREAKFAST,
  );

  const [addMealDialogOpen, setAddMealDialogOpen] = useState(false);

  const { daysOfWeek, startDate, endDate, previousWeek, nextWeek }
    = useDaysOfWeek();

  const { data } = useGetScheduledMeals({
    query: {
      startDate,
      endDate,
    },
  });

  const { mutate } = useDeleteScheduledMeal();

  const openAddMealDialog = (day: Date, mealType: EMealTypes): void => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setAddMealDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setSelectedDay(null);
    setSelectedMealType(EMealTypes.BREAKFAST);
    setAddMealDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col justify-between items-center mb-8 lg:flex-row ">
        <HeaderWithIcon icon={NotebookPen} title="Meal Schedule" />

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium px-2">
            {format(startDate, "MMM d")}
            {" "}
            -
            {format(endDate, "MMM d, yyyy")}
          </span>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-7 gap-4">
        {daysOfWeek.map(day => (
          <Card key={day.toString()} className="overflow-hidden">
            <CardHeader className="p-3 bg-muted">
              <CardTitle className="text-center text-sm">
                {format(day, "EEEE")}
              </CardTitle>
              <CardDescription className="text-center font-medium">
                {format(day, "MMM d")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              {mealTypes.map((mealType) => {
                const foundMeal = data?.body.find(
                  meal =>
                    meal.mealType === mealType
                    && meal.scheduledAt === day.toISOString(),
                );

                return (
                  <div key={mealType} className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">
                      {mealType}
                    </div>
                    {foundMeal
                      ? (
                          <div className="p-2 border rounded-md bg-card relative group">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">
                                  {foundMeal.recipe.name}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute top-1 right-1"
                                onClick={() =>
                                  mutate({ params: { id: foundMeal.id } })}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )
                      : (
                          <Button
                            variant="outline"
                            className="w-full h-10 border-dashed text-xs justify-start"
                            onClick={() =>
                              openAddMealDialog(day, mealType as EMealTypes)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                            {" "}
                            {mealType}
                          </Button>
                        )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}

        {/* Condition is there to force a re-render */}
        {addMealDialogOpen && (
          <ScheduleMealForm
            addMealDialogOpen={addMealDialogOpen}
            initialSelectedDay={selectedDay}
            initialMealType={selectedMealType}
            handleCloseDialog={handleCloseDialog}
          />
        )}
      </div>
    </div>
  );
}

export default ScheduleView;
