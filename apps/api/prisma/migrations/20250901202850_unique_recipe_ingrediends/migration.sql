/*
  Warnings:

  - A unique constraint covering the columns `[recipeId,ingredientId]` on the table `RecipeIngredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,ingredientId,unit]` on the table `ShoppingListIngredient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_ingredientId_key" ON "RecipeIngredient"("recipeId", "ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingListIngredient_userId_ingredientId_unit_key" ON "ShoppingListIngredient"("userId", "ingredientId", "unit");
