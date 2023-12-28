-- CreateTable
CREATE TABLE "GoogleDrive" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "movieTitle" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "episode" INTEGER NOT NULL,

    CONSTRAINT "GoogleDrive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoogleDrive_googleId_key" ON "GoogleDrive"("googleId");
