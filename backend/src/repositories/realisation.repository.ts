import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const realisationRepository = {
  findAll() {
    return prisma.realisation.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: string) {
    return prisma.realisation.findFirst({ where: { id, deletedAt: null } });
  },

  create(data: Prisma.RealisationCreateInput) {
    return prisma.realisation.create({ data });
  },

  update(id: string, data: Prisma.RealisationUpdateInput) {
    return prisma.realisation.update({ where: { id }, data });
  },

  softDelete(id: string) {
    return prisma.realisation.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
