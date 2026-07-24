import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().min(2),
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().trim().min(2),
  excerpt: z.string().trim().optional(),
  category: z.string().trim().optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  published: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
  publishedAt: z.coerce.date().optional(),
  scheduledAt: z.coerce.date().optional(),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
});

export const updateBlogSchema = blogSchema.partial();

export type BlogInput = z.infer<typeof blogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
