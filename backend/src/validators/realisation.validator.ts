import { z } from "zod";

const slugSchema = z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const optionalString = z.string().trim().optional().or(z.literal(""));
const optionalUrl = z.string().trim().url().optional().or(z.literal(""));
const orderSchema = z.coerce.number().int().nonnegative().optional();

const metricSchema = z.object({
  label: z.string().trim().min(1),
  value: z.string().trim().min(1),
  displayOrder: orderSchema,
});

export const realisationSchema = z.object({
  title: z.string().trim().min(2),
  slug: slugSchema,
  category: optionalString,
  categoryLabel: optionalString,
  year: z.coerce.number().int().min(1900).max(2100).optional(),
  client: optionalString,
  location: optionalString,
  completionDate: z.coerce.date().optional(),
  imageUrl: optionalUrl,
  gallery: z.array(z.string().trim().url()).optional(),
  description: z.string().trim().min(2),
  surface: optionalString,
  surfaceValue: z.coerce.number().nonnegative().optional(),
  levels: optionalString,
  budget: optionalString,
  result: optionalString,
  color: optionalString,
  servicesUsed: z.array(z.string().trim().min(1)).optional(),
  technicalTags: z.array(z.string().trim().min(1)).optional(),
  features: z.array(z.string().trim().min(1)).optional(),
  metrics: z.array(metricSchema).optional(),
  displayOrder: orderSchema,
  published: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
  metaTitle: optionalString,
  metaDescription: optionalString,
});

export const updateRealisationSchema = realisationSchema.partial();

export type RealisationInput = z.infer<typeof realisationSchema>;
export type UpdateRealisationInput = z.infer<typeof updateRealisationSchema>;
