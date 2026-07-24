import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  description: z.string().trim().min(2),
  longDescription: z.string().trim().optional(),
  location: z.string().trim().min(2),
  price: z.coerce.number().nonnegative(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().int().nonnegative().optional(),
  area: z.coerce.number().nonnegative().optional(),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  gallery: z.array(z.string().trim().url()).optional(),
  status: z.string().trim().min(1).optional(),
  published: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
});

export const updatePropertySchema = propertySchema.partial();

export type PropertyInput = z.infer<typeof propertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
