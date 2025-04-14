import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";

import useGetRecipes from "@/queries/useGetRecipes";

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import type { TRecipeSelectProps } from "./types";

function RecipeSelect<T extends FieldValues>({
  control,
  name,
}: TRecipeSelectProps<T>) {
  const [commandOpen, setCommandOpen] = useState(false);

  const { data } = useGetRecipes();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Recipe</FormLabel>
          <FormControl>
            <div className="grid gap-4 ">
              <div className="space-y-2">
                <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={commandOpen}
                      className="w-full justify-between"
                    >
                      {field.value ? field.value.name : "Select a recipe..."}
                      <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search recipes..." />
                      <CommandList>
                        <CommandEmpty>No recipes found.</CommandEmpty>
                        <CommandGroup>
                          {data?.body.map(recipe => (
                            <CommandItem
                              key={recipe.id}
                              value={recipe.name}
                              onSelect={() => {
                                field.onChange(recipe);
                                setCommandOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span>{recipe.name}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RecipeSelect;
