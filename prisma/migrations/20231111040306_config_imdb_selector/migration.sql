-- CreateTable
CREATE TABLE "ImdbSelector" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "rated" TEXT,
    "poster" TEXT,
    "genre" TEXT,
    "cast" TEXT,
    "released" TEXT,
    "country" TEXT,
    "language" TEXT,
    "runtime" TEXT,
    "plot" TEXT,
    "year" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImdbSelector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImdbSelector_name_key" ON "ImdbSelector"("name");
