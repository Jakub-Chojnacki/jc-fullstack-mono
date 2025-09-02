import { zodResolver } from "@hookform/resolvers/zod";
import type { EMealTypes, TRecipe } from "@jcmono/api-contract";
import {
  Button,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@jcmono/ui";
import { endOfDay, format, isSameDay, startOfDay } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import MealSuggestions from "@/components/MealSuggestions/index.tsx";
import RecipeSelect from "@/components/ScheduleView/components/ScheduleRecipeSelect";
import { mealTypes } from "@/components/ScheduleView/const";
import { YEAR_MONTH_DAY_FORMAT } from "@/constants/dates";
import useCreateScheduledMeal from "@/queries/useCreateScheduledMeal";
import useGetMealSuggestions from "@/queries/useGetMealSuggestions";
import useGetScheduledMeals from "@/queries/useGetScheduledMeals";

import type {
  TScheduleMealFormValues,
} from "./schema";
import {
  ScheduleMealFormSchema,
  ScheduleMealFormSchemaWithRecipeId,
} from "./schema";

import type { TScheduleMealFormProps } from "./types";

function ScheduleMealForm({
  handleCloseDialog: closeDialog,
  initialMealType,
  initialSelectedDay,
}: TScheduleMealFormProps) {
  const form = useForm<TScheduleMealFormValues>({
    resolver: zodResolver(ScheduleMealFormSchema),
    defaultValues: {
      recipeId: null,
      scheduledAt: initialSelectedDay ?? new Date(),
      mealType: initialMealType ?? mealTypes[0],
    },
  });

  const currentMealType = form.watch("mealType");
  const selectedDate = form.watch("scheduledAt");

  const { data: scheduledMealsData } = useGetScheduledMeals({
    query: {
      startDate: startOfDay(selectedDate),
      endDate: endOfDay(selectedDate),
    },
  });

  const existingMeals = scheduledMealsData?.body || [];

  const {
    data: suggestionsData,
    isLoading: isSuggestionsLoading,
    refetch: refetchSuggestions,
    isFetching: isRefetchingSuggestions,
  } = useGetMealSuggestions(currentMealType as EMealTypes);

  const suggestions = suggestionsData?.body || [];

  const handleCloseDialog = (): void => {
    form.reset();
    closeDialog();
  };

  const { mutate } = useCreateScheduledMeal();

  const handleSelectSuggestion = (recipe: TRecipe) => {
    form.setValue("recipeId", { id: recipe.id, name: recipe.name });
  };

  // Clear selected recipe when meal type changes to show suggestions again
  useEffect(() => {
    const currentRecipeId = form.watch("recipeId");
    if (currentRecipeId) {
      form.setValue("recipeId", null);
    }
  }, [currentMealType, form]);

  const handleRefreshSuggestions = () => {
    refetchSuggestions();
  };

  const onSubmit = (values: TScheduleMealFormValues): void => {
    if (!values.recipeId) {
      form.setError("recipeId", {
        type: "manual",
        message: "Please select a recipe",
      });
      return;
    }

    const duplicateMeal = existingMeals.find(
      meal =>
        meal.mealType === values.mealType
        && isSameDay(new Date(meal.scheduledAt), values.scheduledAt),
    );

    if (duplicateMeal) {
      form.setError("mealType", {
        type: "manual",
        message: `A ${values.mealType.toLowerCase()} is already scheduled for this day`,
      });
      return;
    }

    const finalValues = ScheduleMealFormSchemaWithRecipeId.safeParse(values);

    if (!finalValues.success) {
      toast.error("Error scheduling a meal!");
      return;
    }

    mutate(
      {
        body: {
          ...finalValues.data,
          scheduledAt: new Date(finalValues.data.scheduledAt),
        },
      },
      {
        onSuccess: () => {
          handleCloseDialog();
        },
      },
    );
  };

  return (
    <Dialog open onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Meal</DialogTitle>
          <DialogDescription>
            {`Schedule a meal for ${format(form.watch("scheduledAt"), YEAR_MONTH_DAY_FORMAT)}`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="mealType"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meal Type</label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className={fieldState.error ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        {mealTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />

              <DatePicker<TScheduleMealFormValues>
                control={form.control}
                name="scheduledAt"
                label="Scheduled day"
              />

              <div className="space-y-2">
                <MealSuggestions
                  suggestions={suggestions}
                  isLoading={isSuggestionsLoading}
                  onSelectSuggestion={handleSelectSuggestion}
                  onRefreshSuggestions={handleRefreshSuggestions}
                  isRefreshing={isRefetchingSuggestions}
                  selectedRecipeId={form.watch("recipeId")?.id}
                />
              </div>

              <div className="space-y-2">
                <RecipeSelect<TScheduleMealFormValues>
                  control={form.control}
                  name="recipeId"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">Add to Schedule</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ScheduleMealForm;
