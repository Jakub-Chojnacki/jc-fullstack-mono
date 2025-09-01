import { QuantityUnit } from "@jcmono/api-contract";
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@jcmono/ui";
import { Check, ChevronsUpDown, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import type { TRecipeFormInput } from "@/forms/RecipeForm/schema";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { cn } from "@/lib/utils";
import useGetIngredients from "@/queries/useGetIngredients";

function IngredientSelect() {
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

  const { debouncedSearchTerm, handleSearchChange } = useDebouncedSearch({
    delay: 300,
  });

  const { data, isLoading } = useGetIngredients({
    page: 1,
    take: 100,
    search: debouncedSearchTerm,
  });
  const { control, formState } = useFormContext<TRecipeFormInput>();
  const listRef = useRef<HTMLDivElement>(null);

  const { append, fields, update, remove } = useFieldArray({
    control,
    name: "recipeIngredients",
  });

  const ingredients
    = data?.body?.data?.map(ingredient => ({
      label: ingredient.name,
      value: ingredient.id,
    })) || [];

  const showErrorMessageForField = (
    index: number,
    field: keyof TRecipeFormInput["recipeIngredients"][0],
  ): string | null => formState?.errors?.recipeIngredients?.[index]?.[field]?.message || null;

  return (
    <div className="flex flex-col gap-2 items-center">
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex flex-row gap-2 items-center" key={field.id}>
            <Popover
              open={openPopoverIndex === index}
              onOpenChange={(open) => {
                setOpenPopoverIndex(open ? index : null);
                if (!open) {
                  handleSearchChange("");
                }
              }}
            >
              <FormField
                control={control}
                name={`recipeIngredients.${index}.amount`}
                render={() => (
                  <FormItem>
                    <FormLabel>Ingredient</FormLabel>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-[200px] justify-between"
                      >
                        {field.ingredientId
                          ? ingredients?.find(
                            ingredient =>
                              ingredient.value === field.ingredientId,
                          )?.label
                          : "Select ingredient..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[200px] p-0">
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Search ingredients..."
                          onValueChange={handleSearchChange}
                        />
                        <CommandList
                          ref={listRef}
                          style={{ maxHeight: "200px" }}
                          onWheel={(e) => {
                            // Ensure wheel events are handled by the scrollable element
                            const target = e.currentTarget;
                            if (target.scrollHeight > target.clientHeight) {
                              e.stopPropagation();
                            }
                          }}
                        >
                          <CommandEmpty>
                            {isLoading ? "Searching..." : "No ingredients found."}
                          </CommandEmpty>
                          <CommandGroup>
                            {ingredients.map(ingredient => (
                              <CommandItem
                                key={ingredient.value}
                                value={ingredient.label}
                                onSelect={() => {
                                  update(index, {
                                    ...field,
                                    ingredientId: ingredient.value,
                                  });
                                  setOpenPopoverIndex(null);
                                  handleSearchChange("");
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.ingredientId === ingredient.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {ingredient.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </FormItem>
                )}
              />
            </Popover>
            <div className="flex flex-row items-center gap-2">
              <FormField
                control={control}
                name={`recipeIngredients.${index}.amount`}
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
                name={`recipeIngredients.${index}.unit`}
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

              <Button
                variant="destructive"
                className="self-end"
                type="button"
                onClick={() => remove(index)}
              >
                <Trash />
              </Button>
            </div>
          </div>
          <FormMessage>
            {showErrorMessageForField(index, "ingredientId")
              || showErrorMessageForField(index, "amount")
              || showErrorMessageForField(index, "unit")}
          </FormMessage>
        </div>
      ))}
      <Button
        className="my-4 mr-auto"
        type="button"
        variant="ghost"
        onClick={() =>
          append({
            unit: QuantityUnit[0],
            amount: 0,
            ingredientId: null,
          })}
      >
        + Add ingredient
      </Button>
    </div>
  );
}

export default IngredientSelect;
