-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "totalRating" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "totalRating" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "totalRating" DECIMAL(65,30) NOT NULL DEFAULT 0;
