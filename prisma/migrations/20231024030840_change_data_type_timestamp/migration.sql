-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "releasedTimestamp" SET DEFAULT '',
ALTER COLUMN "releasedTimestamp" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "releasedTimestamp" SET DEFAULT '',
ALTER COLUMN "releasedTimestamp" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "releasedTimestamp" SET DEFAULT '',
ALTER COLUMN "releasedTimestamp" SET DATA TYPE TEXT;
