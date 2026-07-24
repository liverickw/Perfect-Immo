import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  description: z.string().trim().min(2),
  longDescription: z.string().trim().optional(),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  gallery: z.array(z.string().trim().url()).optional(),
  category: z.string().trim().min(1).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  published: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
});

export const updateProjectSchema = projectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
