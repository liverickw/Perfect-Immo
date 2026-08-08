import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { HOMEPAGE_SETTING_KEY } from "../homepage/default-homepage";

export const homepageRepository = {
  findSetting() {
    return prisma.setting.findUnique({ where: { key: HOMEPAGE_SETTING_KEY } });
  },

  upsertSetting(value: Prisma.InputJsonValue) {
    return prisma.setting.upsert({
      where: { key: HOMEPAGE_SETTING_KEY },
      create: { key: HOMEPAGE_SETTING_KEY, value },
      update: { value },
    });
  },

  createAuditLog(data: Prisma.AuditLogCreateInput) {
    return prisma.auditLog.create({ data });
  },
};
