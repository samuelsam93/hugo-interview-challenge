/*
  Warnings:

  - You are about to drop the column `policy_holder` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "policy_holder",
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- DropTable
DROP TABLE "Person";
