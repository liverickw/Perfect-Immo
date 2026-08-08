import { z } from "zod";

const slugSchema = z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const optionalUrlSchema = z.string().trim().url().optional().or(z.literal(""));
const optionalString = z.string().trim().optional().or(z.literal(""));
const orderSchema = z.coerce.number().int().nonnegative().optional();

const cardSchema = z.object({
  icon: optionalString,
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)).optional(),
  displayOrder: orderSchema,
});

const featureSchema = z.object({
  text: z.string().trim().min(1),
  displayOrder: orderSchema,
});

const processStepSchema = z.object({
  number: z.string().trim().min(1),
  firstLine: z.string().trim().min(1),
  secondLine: z.string().trim().min(1),
  displayOrder: orderSchema,
});

const faqSchema = z.object({
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
  displayOrder: orderSchema,
});

const pricingPlanSchema = z.object({
  name: z.string().trim().min(1),
  price: z.string().trim().min(1),
  note: optionalString,
  features: z.array(z.string().trim().min(1)).optional(),
  featured: z.coerce.boolean().optional(),
  displayOrder: orderSchema,
});

const pricingRowSchema = z.object({
  item: z.string().trim().min(1),
  price: z.string().trim().min(1),
  duration: z.string().trim().min(1),
  highlighted: z.coerce.boolean().optional(),
  displayOrder: orderSchema,
});

const testimonialSchema = z.object({
  quote: z.string().trim().min(1),
  name: z.string().trim().min(1),
  role: z.string().trim().min(1),
  displayOrder: orderSchema,
});

const engagementSchema = z.object({
  icon: optionalString,
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  displayOrder: orderSchema,
});

export const serviceSchema = z.object({
  title: z.string().trim().min(2),
  slug: slugSchema,
  description: z.string().trim().min(2),
  longDescription: optionalString,
  category: optionalString,
  tabId: optionalString,
  tabLabel: optionalString,
  eyebrow: optionalString,
  heroTitle: optionalString,
  heroHighlight: optionalString,
  featuredLabel: optionalString,
  featuredTitle: optionalString,
  featuredCtaLabel: optionalString,
  featuredCtaHref: optionalString,
  processTitle: optionalString,
  faqTitle: optionalString,
  ctaTitle: optionalString,
  ctaSubtitle: optionalString,
  ctaLabel: optionalString,
  ctaHref: optionalString,
  pricingNote: optionalString,
  priceTableHeaders: z.array(z.string().trim().min(1)).optional(),
  showTestimonials: z.coerce.boolean().optional(),
  showEngagements: z.coerce.boolean().optional(),
  icon: optionalString,
  imageUrl: optionalUrlSchema,
  gallery: z.array(z.string().trim().url()).optional(),
  displayOrder: orderSchema,
  published: z.coerce.boolean().optional(),
  metaTitle: optionalString,
  metaDescription: optionalString,
  cards: z.array(cardSchema).optional(),
  features: z.array(featureSchema).optional(),
  processSteps: z.array(processStepSchema).optional(),
  faqs: z.array(faqSchema).optional(),
  pricingPlans: z.array(pricingPlanSchema).optional(),
  pricingRows: z.array(pricingRowSchema).optional(),
  testimonials: z.array(testimonialSchema).optional(),
  engagements: z.array(engagementSchema).optional(),
});

export const updateServiceSchema = serviceSchema.partial();

export const servicePageSettingsSchema = z.object({
  hero: z.object({
    eyebrow: z.string().trim().min(1),
    titleBeforeHighlight: z.string().trim().min(1),
    highlightedTitle: z.string().trim().min(1),
    titleAfterHighlight: z.string().trim().min(1),
    description: z.string().trim().min(1),
  }),
  stats: z.array(z.object({
    value: z.string().trim().min(1),
    label: z.string().trim().min(1),
    displayOrder: orderSchema,
  })).default([]),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type ServicePageSettingsInput = z.infer<typeof servicePageSettingsSchema>;
