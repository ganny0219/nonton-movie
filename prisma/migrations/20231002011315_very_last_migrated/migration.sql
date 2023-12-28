/*
  Warnings:

  - You are about to drop the column `episode` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `sequence` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sequence` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "episode",
ADD COLUMN     "sequence" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "sequence" INTEGER NOT NULL;
