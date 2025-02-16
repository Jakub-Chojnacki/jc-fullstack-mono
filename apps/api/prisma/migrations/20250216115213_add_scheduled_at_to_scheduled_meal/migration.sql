/*
  Warnings:

  - Added the required column `scheduledAt` to the `scheduled_meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scheduled_meals" ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "mealType" DROP NOT NULL;
