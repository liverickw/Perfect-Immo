import { z } from "zod";

export const realisationSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  client: z.string().trim().optional(),
  location: z.string().trim().optional(),
  completionDate: z.coerce.date().optional(),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  gallery: z.array(z.string().trim().url()).optional(),
  description: z.string().trim().min(2),
  servicesUsed: z.array(z.string().trim().min(1)).optional(),
  published: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
});

export const updateRealisationSchema = realisationSchema.partial();

export type RealisationInput = z.infer<typeof realisationSchema>;
export type UpdateRealisationInput = z.infer<typeof updateRealisationSchema>;
