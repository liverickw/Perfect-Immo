import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import type { RealisationInput, UpdateRealisationInput } from "../validators/realisation.validator";

const realisationInclude = {
  metrics: { orderBy: [{ displayOrder: "asc" }, { label: "asc" }] },
} satisfies Prisma.RealisationInclude;

function baseData(data: RealisationInput | UpdateRealisationInput) {
  const { metrics: _metrics, ...rest } = data;
  return rest;
}

function nestedCreate(data: RealisationInput) {
  return data.metrics?.length ? { metrics: { create: data.metrics } } : {};
}

function nestedUpdate(data: UpdateRealisationInput) {
  return data.metrics ? { metrics: { deleteMany: {}, create: data.metrics } } : {};
}

export const realisationRepository = {
  findAll({ includeDrafts = false } = {}) {
    return prisma.realisation.findMany({
      where: {
        deletedAt: null,
        ...(includeDrafts ? {} : { published: true }),
      },
      include: realisationInclude,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
  },

  findById(id: string, { includeDrafts = false } = {}) {
    return prisma.realisation.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(includeDrafts ? {} : { published: true }),
      },
      include: realisationInclude,
    });
  },

  findBySlug(slug: string, { includeDrafts = false } = {}) {
    return prisma.realisation.findFirst({
      where: {
        slug,
        deletedAt: null,
        ...(includeDrafts ? {} : { published: true }),
      },
      include: realisationInclude,
    });
  },

  create(data: RealisationInput) {
    const createData = {
      ...baseData(data),
      gallery: data.gallery ?? [],
      servicesUsed: data.servicesUsed ?? [],
      technicalTags: data.technicalTags ?? [],
      features: data.features ?? [],
      ...nestedCreate(data),
    } as Prisma.RealisationCreateInput;

    return prisma.realisation.create({ data: createData, include: realisationInclude });
  },

  update(id: string, data: UpdateRealisationInput) {
    const updateData = {
      ...baseData(data),
      ...nestedUpdate(data),
    } as Prisma.RealisationUpdateInput;

    return prisma.realisation.update({ where: { id }, data: updateData, include: realisationInclude });
  },

  softDelete(id: string) {
    return prisma.realisation.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
