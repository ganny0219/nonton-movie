-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "releasedTimestamp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "releasedTimestamp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "releasedTimestamp" INTEGER NOT NULL DEFAULT 0;
