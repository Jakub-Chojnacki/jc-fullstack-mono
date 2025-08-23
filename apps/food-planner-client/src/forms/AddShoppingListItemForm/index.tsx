import { zodResolver } from "@hookform/resolvers/zod";
import { QuantityUnit } from "@jcmono/api-contract";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Form, FormControl, FormField, FormItem, FormLabel, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@jcmono/ui";
import { ChevronsUpDown } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import useCreateShoppingListIngredient from "@queries/useCreateShoppingListIngredient";
import useGetIngredients from "@queries/useGetIngredients";

import { AddShoppingListItemFormSchema } from "./schema";

function AddShoppingListItemForm() {
  const { data } = useGetIngredients();

  const ingredients
    = useMemo(() => data?.body?.map(ingredient => ({
      label: ingredient.name,
      value: ingredient.id,
    })) || [], [data]);

  const { mutate } = useCreateShoppingListIngredient();

  const form = useForm<z.infer<typeof AddShoppingListItemFormSchema>>({
    resolver: zodResolver(AddShoppingListItemFormSchema),
    defaultValues: { ingredientId: undefined, amount: 0, unit: "GRAMS" },
  });

  const { control, setValue } = form;

  const onSubmit = (values: z.infer<typeof AddShoppingListItemFormSchema>): void => {
    mutate({ body: { ...values, isDone: false, isDeleted: false } });
    form.reset();
  };

  const handleSelectIngredient = (ingredientId: string): void =>
    setValue("ingredientId", +ingredientId);

  const ingredientId = form.watch("ingredientId");

  return (
    <Card className="my-4">
      <CardHeader className="pb-3">
        <CardTitle>Add Item</CardTitle>
        <CardDescription>Add a custom item to your shopping list</CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 flex-col md:items-end md:flex-row">
            <Popover>
              <FormField
                control={control}
                name="ingredientId"
                render={() => (
                  <div className="w-full">
                    <FormItem>
                      <FormLabel className="pb-2">Ingredient</FormLabel>

                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {ingredientId
                            ? ingredients?.find(
                              ingredient =>
                                ingredient.value === ingredientId,
                            )?.label
                            : "Select ingredient..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ingredients..." />
                          <CommandList>
                            <CommandEmpty>No ingredients found.</CommandEmpty>
                            <CommandGroup>
                              {ingredients?.map(ingredient => (
                                <CommandItem
                                  key={ingredient.value}
                                  value={String(ingredient.value)}
                                  onSelect={handleSelectIngredient}

                                >

                                  {ingredient.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </FormItem>
                  </div>

                )}
              />
            </Popover>

            <FormField
              control={control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={e =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : 0,
                        )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {QuantityUnit.map(unit => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">
              + Add
            </Button>

          </form>
        </Form>
      </CardContent>
    </Card>

  );
}

export default AddShoppingListItemForm;
