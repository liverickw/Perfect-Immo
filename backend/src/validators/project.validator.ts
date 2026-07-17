import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(2),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  category: z.string().trim().min(1).optional(),
});

export const updateProjectSchema = projectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
