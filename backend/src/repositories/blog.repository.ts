import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const blogRepository = {
  findAll() {
    return prisma.blog.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" } });
  },

  findById(id: string) {
    return prisma.blog.findFirst({ where: { id, deletedAt: null } });
  },

  findBySlug(slug: string) {
    return prisma.blog.findFirst({ where: { slug, deletedAt: null } });
  },

  create(data: Prisma.BlogCreateInput) {
    return prisma.blog.create({ data });
  },

  update(id: string, data: Prisma.BlogUpdateInput) {
    return prisma.blog.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.blog.update({ where: { id }, data: { deletedAt: new Date(), status: "ARCHIVED", published: false } });
  },
};
