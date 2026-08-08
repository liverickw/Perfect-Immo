ALTER TABLE "Service"
ADD COLUMN "tabId" TEXT,
ADD COLUMN "tabLabel" TEXT,
ADD COLUMN "eyebrow" TEXT,
ADD COLUMN "heroTitle" TEXT,
ADD COLUMN "heroHighlight" TEXT,
ADD COLUMN "featuredLabel" TEXT,
ADD COLUMN "featuredTitle" TEXT,
ADD COLUMN "featuredCtaLabel" TEXT,
ADD COLUMN "featuredCtaHref" TEXT,
ADD COLUMN "processTitle" TEXT,
ADD COLUMN "faqTitle" TEXT,
ADD COLUMN "ctaTitle" TEXT,
ADD COLUMN "ctaSubtitle" TEXT,
ADD COLUMN "ctaLabel" TEXT,
ADD COLUMN "ctaHref" TEXT,
ADD COLUMN "pricingNote" TEXT,
ADD COLUMN "priceTableHeaders" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "showTestimonials" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "showEngagements" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX "Service_tabId_key" ON "Service"("tabId");

CREATE TABLE "ServiceCard" (
  "id" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "icon" TEXT,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ServiceCard_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ServiceFeature" (
  "id" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ServiceFeature_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ServiceProcessStep" (
  "id" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "number" TEXT NOT NULL,
  "firstLine" TEXT NOT NULL,
  "secondLine" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ServiceProcessStep_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ServiceFaq" (
  "id" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ServiceFaq_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ServicePricingPlan" (
  "id" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "price" TEXT NOT NULL,
  "note" TEXT,
  "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ServicePricingPlan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ServicePricingRow" (
  "id" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "item" TEXT NOT NULL,
  "price" TEXT NOT NULL,
  "duration" TEXT NOT NULL,
  "highlighted" BOOLEAN NOT NULL DEFAULT false,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ServicePricingRow_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ServiceTestimonial" (
  "id" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "quote" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ServiceTestimonial_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ServiceEngagement" (
  "id" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "icon" TEXT,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ServiceEngagement_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "ServiceCard" ADD CONSTRAINT "ServiceCard_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ServiceFeature" ADD CONSTRAINT "ServiceFeature_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ServiceProcessStep" ADD CONSTRAINT "ServiceProcessStep_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ServiceFaq" ADD CONSTRAINT "ServiceFaq_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ServicePricingPlan" ADD CONSTRAINT "ServicePricingPlan_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ServicePricingRow" ADD CONSTRAINT "ServicePricingRow_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ServiceTestimonial" ADD CONSTRAINT "ServiceTestimonial_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ServiceEngagement" ADD CONSTRAINT "ServiceEngagement_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
