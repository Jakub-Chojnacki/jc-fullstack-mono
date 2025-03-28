import { TRecipe } from "@jcmono/api-contract";
import { atom } from "jotai";

export const selectedDayAtom = atom<Date | null>(null);
export const selectedMealTypeAtom = atom<string>("Breakfast");
export const selectedRecipeAtom = atom<TRecipe | null>(null);
