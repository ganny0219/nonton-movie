/*
  Warnings:

  - You are about to drop the column `oldCountry` on the `Movie` table. All the data in the column will be lost.
  - Made the column `countryId` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "oldCountry",
ALTER COLUMN "countryId" SET NOT NULL;
