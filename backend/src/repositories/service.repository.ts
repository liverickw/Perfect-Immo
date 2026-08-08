import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import type { ServiceInput, UpdateServiceInput } from "../validators/service.validator";

const serviceInclude = {
  cards: { orderBy: [{ displayOrder: "asc" }, { title: "asc" }] },
  features: { orderBy: [{ displayOrder: "asc" }] },
  processSteps: { orderBy: [{ displayOrder: "asc" }] },
  faqs: { orderBy: [{ displayOrder: "asc" }] },
  pricingPlans: { orderBy: [{ displayOrder: "asc" }] },
  pricingRows: { orderBy: [{ displayOrder: "asc" }] },
  testimonials: { orderBy: [{ displayOrder: "asc" }] },
  engagements: { orderBy: [{ displayOrder: "asc" }] },
} satisfies Prisma.ServiceInclude;

function nestedCreate(data: ServiceInput) {
  return {
    cards: data.cards?.length ? { create: data.cards } : undefined,
    features: data.features?.length ? { create: data.features } : undefined,
    processSteps: data.processSteps?.length ? { create: data.processSteps } : undefined,
    faqs: data.faqs?.length ? { create: data.faqs } : undefined,
    pricingPlans: data.pricingPlans?.length ? { create: data.pricingPlans } : undefined,
    pricingRows: data.pricingRows?.length ? { create: data.pricingRows } : undefined,
    testimonials: data.testimonials?.length ? { create: data.testimonials } : undefined,
    engagements: data.engagements?.length ? { create: data.engagements } : undefined,
  };
}

function baseData(data: ServiceInput | UpdateServiceInput) {
  const {
    cards: _cards,
    features: _features,
    processSteps: _processSteps,
    faqs: _faqs,
    pricingPlans: _pricingPlans,
    pricingRows: _pricingRows,
    testimonials: _testimonials,
    engagements: _engagements,
    ...rest
  } = data;

  return rest;
}

function nestedUpdate(data: UpdateServiceInput) {
  return {
    cards: data.cards ? { deleteMany: {}, create: data.cards } : undefined,
    features: data.features ? { deleteMany: {}, create: data.features } : undefined,
    processSteps: data.processSteps ? { deleteMany: {}, create: data.processSteps } : undefined,
    faqs: data.faqs ? { deleteMany: {}, create: data.faqs } : undefined,
    pricingPlans: data.pricingPlans ? { deleteMany: {}, create: data.pricingPlans } : undefined,
    pricingRows: data.pricingRows ? { deleteMany: {}, create: data.pricingRows } : undefined,
    testimonials: data.testimonials ? { deleteMany: {}, create: data.testimonials } : undefined,
    engagements: data.engagements ? { deleteMany: {}, create: data.engagements } : undefined,
  };
}

export const serviceRepository = {
  findAll({ includeDrafts = false } = {}) {
    return prisma.service.findMany({
      where: {
        deletedAt: null,
        ...(includeDrafts ? {} : { published: true }),
      },
      include: serviceInclude,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
  },

  findById(id: string, { includeDrafts = false } = {}) {
    return prisma.service.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(includeDrafts ? {} : { published: true }),
      },
      include: serviceInclude,
    });
  },

  findBySlug(slug: string, { includeDrafts = false } = {}) {
    return prisma.service.findFirst({
      where: {
        slug,
        deletedAt: null,
        ...(includeDrafts ? {} : { published: true }),
      },
      include: serviceInclude,
    });
  },

  create(data: ServiceInput) {
    const createData = {
      ...baseData(data),
      gallery: data.gallery ?? [],
      priceTableHeaders: data.priceTableHeaders ?? [],
      ...nestedCreate(data),
    } as Prisma.ServiceCreateInput;

    return prisma.service.create({
      data: createData,
      include: serviceInclude,
    });
  },

  update(id: string, data: UpdateServiceInput) {
    const updateData = {
      ...baseData(data),
      ...nestedUpdate(data),
    } as Prisma.ServiceUpdateInput;

    return prisma.service.update({
      where: { id },
      data: updateData,
      include: serviceInclude,
    });
  },

  softDelete(id: string) {
    return prisma.service.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
