/*
  Warnings:

  - Added the required column `bannerUrl` to the `Ads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ads" ADD COLUMN     "bannerUrl" TEXT NOT NULL;
