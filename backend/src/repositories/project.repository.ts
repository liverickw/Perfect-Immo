import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const projectRepository = {
  findAll() {
    return prisma.project.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" } });
  },

  findById(id: string) {
    return prisma.project.findFirst({ where: { id, deletedAt: null } });
  },

  create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({ data });
  },

  update(id: string, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.project.update({ where: { id }, data: { deletedAt: new Date(), status: "ARCHIVED" } });
  },
};
