import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const propertyRepository = {
  findAll() {
    return prisma.property.findMany({ orderBy: { createdAt: "desc" } });
  },

  findById(id: string) {
    return prisma.property.findUnique({ where: { id } });
  },

  create(data: Prisma.PropertyCreateInput) {
    return prisma.property.create({ data });
  },

  update(id: string, data: Prisma.PropertyUpdateInput) {
    return prisma.property.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.property.delete({ where: { id } });
  },
};
