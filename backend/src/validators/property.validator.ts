import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(2),
  location: z.string().trim().min(2),
  price: z.coerce.number().nonnegative(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().int().nonnegative().optional(),
  area: z.coerce.number().nonnegative().optional(),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  status: z.string().trim().min(1).optional(),
});

export const updatePropertySchema = propertySchema.partial();

export type PropertyInput = z.infer<typeof propertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
