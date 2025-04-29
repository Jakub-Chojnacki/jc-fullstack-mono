import { IngredientWithAmountSchema } from "../RecipeForm/schema";

export const AddShoppingListItemFormSchema = IngredientWithAmountSchema.omit({ id: true });
