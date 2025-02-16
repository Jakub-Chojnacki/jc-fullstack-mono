-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- AlterTable
ALTER TABLE "ShoppingListIngredient" ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "scheduled_meals" ADD COLUMN     "mealType" "MealType" NOT NULL DEFAULT 'DINNER';
