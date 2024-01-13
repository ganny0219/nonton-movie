/*
  Warnings:

  - You are about to drop the `Ads` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EdsType" AS ENUM ('full', 'half');

-- DropTable
DROP TABLE "Ads";

-- DropEnum
DROP TYPE "AdsType";

-- CreateTable
CREATE TABLE "Eds" (
    "id" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "type" "EdsType" NOT NULL DEFAULT 'full',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Eds_pkey" PRIMARY KEY ("id")
);
