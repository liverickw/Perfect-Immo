import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().min(2),
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().trim().min(2),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  published: z.coerce.boolean().optional(),
});

export const updateBlogSchema = blogSchema.partial();

export type BlogInput = z.infer<typeof blogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
