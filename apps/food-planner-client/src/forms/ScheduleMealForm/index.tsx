import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import RecipeSelect from "@/components/RecipeSelect";
import { mealTypes } from "@/components/ScheduleView/const";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateScheduledMeal from "@/queries/useCreateScheduledMeal";

import {
  ScheduleMealFormSchema,
  ScheduleMealFormSchemaWithRecipeId,
} from "./schema";
import type {
  TScheduleMealFormValues,
} from "./schema";

import type { TScheduleMealFormProps } from "./types";

function ScheduleMealForm({
  addMealDialogOpen,
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

  const handleCloseDialog = (): void => {
    form.reset();
    closeDialog();
  };

  const { mutate } = useCreateScheduledMeal();

  const onSubmit = (values: TScheduleMealFormValues): void => {
    if (!values.recipeId) {
      form.setError("recipeId", {
        type: "manual",
        message: "Please select a recipe",
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
    <Dialog open={addMealDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Meal</DialogTitle>
          <DialogDescription>
            {`Schedule a meal for ${format(form.watch("scheduledAt"), "EEEE, MMMM d")}`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="mealType"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meal Type</label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
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
                  </div>
                )}
              />

              <DatePicker<TScheduleMealFormValues>
                control={form.control}
                name="scheduledAt"
                label="Scheduled day"
              />

              <RecipeSelect<TScheduleMealFormValues>
                control={form.control}
                name="recipeId"
              />
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
