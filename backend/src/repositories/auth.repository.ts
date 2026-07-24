import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const authRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findAll() {
    return prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      omit: { password: true },
    });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },

  update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  },
};
