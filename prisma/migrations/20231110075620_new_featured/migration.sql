/*
  Warnings:

  - You are about to drop the column `featured` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "featured";

-- CreateTable
CREATE TABLE "Featured" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Featured_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Featured_movieId_key" ON "Featured"("movieId");

-- AddForeignKey
ALTER TABLE "Featured" ADD CONSTRAINT "Featured_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
