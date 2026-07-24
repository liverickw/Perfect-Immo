import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().min(2),
  longDescription: z.string().trim().optional(),
  category: z.string().trim().optional(),
  icon: z.string().trim().optional(),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  gallery: z.array(z.string().trim().url()).optional(),
  displayOrder: z.coerce.number().int().nonnegative().optional(),
  published: z.coerce.boolean().optional(),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
});

export const updateServiceSchema = serviceSchema.partial();

export type ServiceInput = z.infer<typeof serviceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
