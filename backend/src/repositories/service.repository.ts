import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const serviceRepository = {
  findAll() {
    return prisma.service.findMany({
      where: { deletedAt: null },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
  },

  findById(id: string) {
    return prisma.service.findFirst({ where: { id, deletedAt: null } });
  },

  create(data: Prisma.ServiceCreateInput) {
    return prisma.service.create({ data });
  },

  update(id: string, data: Prisma.ServiceUpdateInput) {
    return prisma.service.update({ where: { id }, data });
  },

  softDelete(id: string) {
    return prisma.service.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
