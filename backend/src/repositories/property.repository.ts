import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const propertyRepository = {
  findAll() {
    return prisma.property.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" } });
  },

  findById(id: string) {
    return prisma.property.findFirst({ where: { id, deletedAt: null } });
  },

  create(data: Prisma.PropertyCreateInput) {
    return prisma.property.create({ data });
  },

  update(id: string, data: Prisma.PropertyUpdateInput) {
    return prisma.property.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.property.update({ where: { id }, data: { deletedAt: new Date(), status: "ARCHIVED" } });
  },
};
