/*
  Warnings:

  - The `vehicles` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "vehicles",
ADD COLUMN     "vehicles" JSONB[];

-- DropTable
DROP TABLE "Vehicle";
