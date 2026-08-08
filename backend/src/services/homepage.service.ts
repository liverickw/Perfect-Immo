import type { Prisma } from "@prisma/client";
import { defaultHomepageContent } from "../homepage/default-homepage";
import { homepageRepository } from "../repositories/homepage.repository";
import {
  homepageContentSchema,
  type HomepageContentInput,
} from "../validators/homepage.validator";

type HomepageStore = {
  draft?: HomepageContentInput;
  published?: HomepageContentInput;
  updatedAt?: string;
};

function cloneDefaultContent() {
  return structuredClone(defaultHomepageContent) as HomepageContentInput;
}

function parseContent(value: unknown) {
  const result = homepageContentSchema.safeParse(value);
  return result.success ? result.data : null;
}

function parseStore(value: unknown): HomepageStore {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const raw = value as Record<string, unknown>;
  const draft = parseContent(raw.draft);
  const published = parseContent(raw.published);

  if (!draft && !published) {
    const legacyContent = parseContent(value);
    return legacyContent ? { draft: legacyContent, published: legacyContent } : {};
  }

  return {
    draft: draft || published || undefined,
    published: published || undefined,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : undefined,
  };
}

function toJson(value: HomepageStore): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

export const homepageService = {
  async getPublished() {
    const setting = await homepageRepository.findSetting();
    const store = parseStore(setting?.value);
    return store.published || cloneDefaultContent();
  },

  async getAdminContent() {
    const setting = await homepageRepository.findSetting();
    const store = parseStore(setting?.value);
    const fallback = cloneDefaultContent();

    return {
      draft: store.draft || store.published || fallback,
      published: store.published || null,
      updatedAt: store.updatedAt || setting?.updatedAt?.toISOString() || null,
    };
  },

  async save(content: HomepageContentInput, userId?: string) {
    const setting = await homepageRepository.findSetting();
    const existing = parseStore(setting?.value);
    const nextStore: HomepageStore = {
      draft: content,
      published: content.status === "PUBLISHED" ? content : existing.published,
      updatedAt: new Date().toISOString(),
    };

    const saved = await homepageRepository.upsertSetting(toJson(nextStore));

    await homepageRepository.createAuditLog({
      action: content.status === "PUBLISHED" ? "PUBLISH_HOMEPAGE" : "SAVE_HOMEPAGE_DRAFT",
      entity: "Homepage",
      entityId: saved.id,
      userId,
      metadata: { status: content.status },
    });

    return {
      draft: nextStore.draft,
      published: nextStore.published || null,
      updatedAt: nextStore.updatedAt,
    };
  },
};
