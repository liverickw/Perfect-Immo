import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const blogRepository = {
  findAll() {
    return prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  },

  findById(id: string) {
    return prisma.blog.findUnique({ where: { id } });
  },

  findBySlug(slug: string) {
    return prisma.blog.findUnique({ where: { slug } });
  },

  create(data: Prisma.BlogCreateInput) {
    return prisma.blog.create({ data });
  },

  update(id: string, data: Prisma.BlogUpdateInput) {
    return prisma.blog.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.blog.delete({ where: { id } });
  },
};
