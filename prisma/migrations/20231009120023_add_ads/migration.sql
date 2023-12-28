-- CreateEnum
CREATE TYPE "AdsType" AS ENUM ('full', 'half');

-- CreateTable
CREATE TABLE "Ads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "AdsType" NOT NULL DEFAULT 'full',

    CONSTRAINT "Ads_pkey" PRIMARY KEY ("id")
);
