/*
  Warnings:

  - You are about to alter the column `totalRating` on the `Episode` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `totalRating` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `totalRating` on the `Season` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "rating" SET DEFAULT '10',
ALTER COLUMN "rating" SET DATA TYPE TEXT,
ALTER COLUMN "totalRating" SET DEFAULT 0,
ALTER COLUMN "totalRating" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "rating" SET DEFAULT '10',
ALTER COLUMN "rating" SET DATA TYPE TEXT,
ALTER COLUMN "totalRating" SET DEFAULT 0,
ALTER COLUMN "totalRating" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "rating" SET DEFAULT '10',
ALTER COLUMN "rating" SET DATA TYPE TEXT,
ALTER COLUMN "totalRating" SET DEFAULT 0,
ALTER COLUMN "totalRating" SET DATA TYPE INTEGER;
