-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT false;
