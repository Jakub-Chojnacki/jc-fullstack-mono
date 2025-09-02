import { zodResolver } from "@hookform/resolvers/zod";
import { EMealTypes } from "@jcmono/api-contract";
import { Button, Checkbox, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@jcmono/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import IngredientSelect from "@/forms/RecipeForm/components/IngredientSelect";
import useCreateRecipe from "@/queries/useCreateRecipe";
import useUpdateRecipe from "@/queries/useUpdateRecipe";

import { RecipeFormSchema } from "./schema";

import type { TRecipeFormProps } from "./types";

function RecipeForm({ initialData }: TRecipeFormProps) {
  const { mutate } = useCreateRecipe();
  const { mutate: updateRecipe } = useUpdateRecipe();

  const form = useForm<z.infer<typeof RecipeFormSchema>>({
    resolver: zodResolver(RecipeFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      isGlobal: initialData?.isGlobal || false,
      description: initialData?.description || "",
      recipeIngredients: initialData?.recipeIngredients || [],
      mealTypes: initialData?.mealTypes || [],
    },
  });

  const onSubmit = (values: z.infer<typeof RecipeFormSchema>) => {
    if (initialData) {
      const mappedIngredients = values.recipeIngredients.map((ingredient) => {
        return {
          ...ingredient,
          id: typeof ingredient.id === "number" ? ingredient.id : undefined,
          ingredientId: ingredient.ingredientId,
          amount: ingredient.amount,
          unit: ingredient.unit,
        };
      });

      updateRecipe({
        body: {
          ...values,
          mealTypes: values.mealTypes || [],
          recipeIngredients: mappedIngredients,
        },
        params: { id: initialData.id },
      });
    }
    else {
      mutate({
        body: {
          ...values,
          mealTypes: values.mealTypes || [],
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isGlobal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormLabel>Should the recipe be public?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mealTypes"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Meal Types</FormLabel>
                  <p className="text-sm text-muted-foreground mt-1">
                    These are suggested meal types. Your recipe will be available for all meals when scheduling.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[EMealTypes.BREAKFAST, EMealTypes.LUNCH, EMealTypes.DINNER, EMealTypes.SNACK].map(mealType => (
                    <FormField
                      key={mealType}
                      control={form.control}
                      name="mealTypes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={mealType}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(mealType)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), mealType])
                                    : field.onChange(
                                        field.value?.filter(
                                          value => value !== mealType,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {String(mealType).charAt(0).toUpperCase() + String(mealType).slice(1).toLowerCase()}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <IngredientSelect />
          <Button type="submit" className="w-full">
            Save recipe
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RecipeForm;
