import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const contactRepository = {
  findAll() {
    return prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  },

  findById(id: string) {
    return prisma.contact.findUnique({ where: { id } });
  },

  create(data: Prisma.ContactCreateInput) {
    return prisma.contact.create({ data });
  },

  update(id: string, data: Prisma.ContactUpdateInput) {
    return prisma.contact.update({ where: { id }, data });
  },
};
