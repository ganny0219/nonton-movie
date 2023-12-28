/*
  Warnings:

  - Added the required column `sequence` to the `Ads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ads" ADD COLUMN     "sequence" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "updatedAt" DROP DEFAULT;
