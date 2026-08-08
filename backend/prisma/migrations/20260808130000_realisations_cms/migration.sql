ALTER TABLE "Realisation"
ADD COLUMN "category" TEXT,
ADD COLUMN "categoryLabel" TEXT,
ADD COLUMN "year" INTEGER,
ADD COLUMN "surface" TEXT,
ADD COLUMN "surfaceValue" DOUBLE PRECISION,
ADD COLUMN "levels" TEXT,
ADD COLUMN "budget" TEXT,
ADD COLUMN "result" TEXT,
ADD COLUMN "color" TEXT,
ADD COLUMN "technicalTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "RealisationMetric" (
  "id" TEXT NOT NULL,
  "realisationId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "RealisationMetric_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "RealisationMetric" ADD CONSTRAINT "RealisationMetric_realisationId_fkey" FOREIGN KEY ("realisationId") REFERENCES "Realisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
