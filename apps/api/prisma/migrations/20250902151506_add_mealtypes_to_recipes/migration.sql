-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "mealTypes" "MealType"[] DEFAULT ARRAY['BREAKFAST', 'DINNER', 'LUNCH', 'SNACK']::"MealType"[];
