DO $$ BEGIN
  CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ContactStatus" AS ENUM ('UNREAD', 'READ', 'ARCHIVED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ReplyStatus" AS ENUM ('PENDING', 'REPLIED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "active" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

ALTER TABLE "User"
  ALTER COLUMN "role" DROP DEFAULT;

ALTER TABLE "User"
  ALTER COLUMN "role" TYPE "Role"
  USING CASE
    WHEN "role" = 'SUPER_ADMIN' THEN 'SUPER_ADMIN'::"Role"
    WHEN "role" = 'EDITOR' THEN 'EDITOR'::"Role"
    ELSE 'ADMIN'::"Role"
  END;

ALTER TABLE "User"
  ALTER COLUMN "role" SET DEFAULT 'ADMIN';

ALTER TABLE "Property"
  ADD COLUMN IF NOT EXISTS "slug" TEXT,
  ADD COLUMN IF NOT EXISTS "longDescription" TEXT,
  ADD COLUMN IF NOT EXISTS "gallery" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS "published" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "metaTitle" TEXT,
  ADD COLUMN IF NOT EXISTS "metaDescription" TEXT,
  ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

ALTER TABLE "Project"
  ADD COLUMN IF NOT EXISTS "slug" TEXT,
  ADD COLUMN IF NOT EXISTS "longDescription" TEXT,
  ADD COLUMN IF NOT EXISTS "gallery" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
  ADD COLUMN IF NOT EXISTS "published" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "metaTitle" TEXT,
  ADD COLUMN IF NOT EXISTS "metaDescription" TEXT,
  ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

ALTER TABLE "Blog"
  ADD COLUMN IF NOT EXISTS "excerpt" TEXT,
  ADD COLUMN IF NOT EXISTS "category" TEXT,
  ADD COLUMN IF NOT EXISTS "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
  ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "scheduledAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "metaTitle" TEXT,
  ADD COLUMN IF NOT EXISTS "metaDescription" TEXT,
  ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

ALTER TABLE "Contact"
  ADD COLUMN IF NOT EXISTS "status" "ContactStatus" NOT NULL DEFAULT 'UNREAD',
  ADD COLUMN IF NOT EXISTS "replyStatus" "ReplyStatus" NOT NULL DEFAULT 'PENDING',
  ADD COLUMN IF NOT EXISTS "readAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "archivedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX IF NOT EXISTS "Property_slug_key" ON "Property"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key" ON "Project"("slug");

CREATE TABLE IF NOT EXISTS "Service" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "longDescription" TEXT,
  "category" TEXT,
  "icon" TEXT,
  "imageUrl" TEXT,
  "gallery" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "deletedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Realisation" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "client" TEXT,
  "location" TEXT,
  "completionDate" TIMESTAMP(3),
  "imageUrl" TEXT,
  "gallery" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "description" TEXT NOT NULL,
  "servicesUsed" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "published" BOOLEAN NOT NULL DEFAULT false,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "deletedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Realisation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "MediaAsset" (
  "id" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "publicId" TEXT NOT NULL,
  "folder" TEXT,
  "fileName" TEXT,
  "mimeType" TEXT,
  "size" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Setting" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AuditLog" (
  "id" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "entity" TEXT,
  "entityId" TEXT,
  "userId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Service_slug_key" ON "Service"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Realisation_slug_key" ON "Realisation"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "MediaAsset_publicId_key" ON "MediaAsset"("publicId");
CREATE UNIQUE INDEX IF NOT EXISTS "Setting_key_key" ON "Setting"("key");
