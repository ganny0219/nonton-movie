/*
  Warnings:

  - You are about to drop the column `cast` on the `ImdbSelector` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ImdbSelector` table. All the data in the column will be lost.
  - Added the required column `actorArray` to the `ImdbSelector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorAs` to the `ImdbSelector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorImage` to the `ImdbSelector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorName` to the `ImdbSelector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `ImdbSelector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episodeArray` to the `ImdbSelector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episodeTitle` to the `ImdbSelector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainTitle` to the `ImdbSelector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writer` to the `ImdbSelector` table without a default value. This is not possible if the table is not empty.
  - Made the column `rated` on table `ImdbSelector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `poster` on table `ImdbSelector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genre` on table `ImdbSelector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `released` on table `ImdbSelector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `ImdbSelector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `language` on table `ImdbSelector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `runtime` on table `ImdbSelector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plot` on table `ImdbSelector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `ImdbSelector` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ImdbSelector" DROP COLUMN "cast",
DROP COLUMN "title",
ADD COLUMN     "actorArray" TEXT NOT NULL,
ADD COLUMN     "actorAs" TEXT NOT NULL,
ADD COLUMN     "actorImage" TEXT NOT NULL,
ADD COLUMN     "actorName" TEXT NOT NULL,
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "episodeArray" TEXT NOT NULL,
ADD COLUMN     "episodeTitle" TEXT NOT NULL,
ADD COLUMN     "mainTitle" TEXT NOT NULL,
ADD COLUMN     "writer" TEXT NOT NULL,
ALTER COLUMN "rated" SET NOT NULL,
ALTER COLUMN "poster" SET NOT NULL,
ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "released" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "language" SET NOT NULL,
ALTER COLUMN "runtime" SET NOT NULL,
ALTER COLUMN "plot" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL;
