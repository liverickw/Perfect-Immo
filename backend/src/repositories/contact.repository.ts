import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const contactRepository = {
  findAll() {
    return prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  },

  create(data: Prisma.ContactCreateInput) {
    return prisma.contact.create({ data });
  },
};
