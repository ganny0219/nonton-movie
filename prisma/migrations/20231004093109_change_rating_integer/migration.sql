/*
  Warnings:

  - The `rating` column on the `Episode` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rating` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rating` column on the `Season` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[vote]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vote]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vote]` on the table `Season` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 10;

-- CreateIndex
CREATE UNIQUE INDEX "Episode_vote_key" ON "Episode"("vote");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_vote_key" ON "Movie"("vote");

-- CreateIndex
CREATE UNIQUE INDEX "Season_vote_key" ON "Season"("vote");
