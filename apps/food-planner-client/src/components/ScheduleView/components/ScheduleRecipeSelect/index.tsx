import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, FormControl, FormField, FormItem, FormLabel, FormMessage, Popover, PopoverContent, PopoverTrigger } from "@jcmono/ui";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { FieldValues } from "react-hook-form";

import useGetRecipes from "@/queries/useGetRecipes";

import type { TScheduleRecipeSelectProps } from "./types";

function ScheduleRecipeSelect<T extends FieldValues>({
  control,
  name,
}: TScheduleRecipeSelectProps<T>) {
  const [commandOpen, setCommandOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const { data } = useGetRecipes({
    page: 1,
    take: 100,
  });

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
                        <CommandEmpty>No recipes found.</CommandEmpty>
                        <CommandGroup>
                          {data?.body?.data.map(recipe => (
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

export default ScheduleRecipeSelect;
