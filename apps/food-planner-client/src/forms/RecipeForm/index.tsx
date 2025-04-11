import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useCreateRecipe from "@/queries/useCreateRecipe";
import useUpdateRecipe from "@/queries/useUpdateRecipe";

import IngredientSelect from "@/components/IngredientSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { RecipeFormSchema } from "./schema";
import { TRecipeFormProps } from "./types";

const RecipeForm = ({ initialData }: TRecipeFormProps) => {
  const { mutate } = useCreateRecipe();
  const { mutate: updateRecipe } = useUpdateRecipe();

  const form = useForm<z.infer<typeof RecipeFormSchema>>({
    resolver: zodResolver(RecipeFormSchema),
    defaultValues: initialData || {
      name: "",
      isGlobal: false,
      description: "",
      recipeIngredients: [],
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
          recipeIngredients: mappedIngredients,
        },
        params: { id: initialData.id },
      });
    } else {
      mutate({ body: values });
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

          <IngredientSelect />
          <Button type="submit" className="w-full">
            Save recipe
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RecipeForm;
