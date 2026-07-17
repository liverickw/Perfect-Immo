import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email().toLowerCase(),
  phone: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(5),
});

export type ContactInput = z.infer<typeof contactSchema>;
