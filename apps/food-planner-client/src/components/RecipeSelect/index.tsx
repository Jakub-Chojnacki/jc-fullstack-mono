import { format } from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import apiClient from "@/api-client";
import {
  selectedDayAtom,
  selectedMealTypeAtom,
  selectedRecipeAtom,
} from "@/atoms/schedule";

import { mealTypes } from "../ScheduleView/const";
import { Button } from "../ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "../ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { TRecipeSelectProps } from "./types";

const RecipeSelect = ({
  addMealDialogOpen,
  setAddMealDialogOpen,
}: TRecipeSelectProps) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const selectedDay = useAtomValue(selectedDayAtom);
  const [selectedMealType, setSelectedMealType] = useAtom(selectedMealTypeAtom);
  const [selectedRecipe, setSelectedRecipe] = useAtom(selectedRecipeAtom);

  const { data } = apiClient.recipes.getForUser.useQuery(["recipesUser"]);

  return (
    <Dialog open={addMealDialogOpen} onOpenChange={setAddMealDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Meal</DialogTitle>
          <DialogDescription>
            {selectedDay &&
              `Schedule a meal for ${format(selectedDay, "EEEE, MMMM d")}`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Meal Type</label>
            <Select
              value={selectedMealType}
              onValueChange={setSelectedMealType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Recipe</label>
            <Popover open={commandOpen} onOpenChange={setCommandOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={commandOpen}
                  className="w-full justify-between"
                >
                  {selectedRecipe ? selectedRecipe.name : "Select a recipe..."}
                  <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search recipes..." />
                  <CommandList>
                    <CommandEmpty>No recipes found.</CommandEmpty>
                    <CommandGroup>
                      {data?.body.map((recipe) => (
                        <CommandItem
                          key={recipe.id}
                          value={recipe.name}
                          onSelect={() => {
                            setSelectedRecipe(recipe);
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

        <DialogFooter>
          <Button variant="outline" onClick={() => setAddMealDialogOpen(false)}>
            Cancel
          </Button>
          {/* Add handling for saving schedule*/}
          <Button onClick={() => null} disabled={!selectedRecipe}> 
            Add to Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeSelect;
