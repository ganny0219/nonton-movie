/*
  Warnings:

  - The `vote` column on the `Episode` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vote` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vote` column on the `Season` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "vote",
ADD COLUMN     "vote" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "views" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "vote",
ADD COLUMN     "vote" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "views" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "vote",
ADD COLUMN     "vote" TEXT[] DEFAULT ARRAY[]::TEXT[];
