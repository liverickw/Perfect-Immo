import { z } from "zod";

const orderedSchema = z.object({
  order: z.coerce.number().int().nonnegative().optional(),
});

const linkSchema = z.string().trim().min(1);
const optionalUrlSchema = z.string().trim().optional().or(z.literal(""));

const statSchema = orderedSchema.extend({
  value: z.string().trim().min(1),
  label: z.string().trim().min(1),
});

const serviceCardSchema = orderedSchema.extend({
  icon: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
});

const projectCardSchema = orderedSchema.extend({
  tag: z.string().trim().min(1),
  name: z.string().trim().min(1),
  location: z.string().trim().min(1),
  featured: z.coerce.boolean().optional(),
});

const valueSchema = orderedSchema.extend({
  text: z.string().trim().min(1),
});

const aboutStatSchema = orderedSchema.extend({
  value: z.string().trim().min(1),
  label: z.string().trim().min(1),
  detail: z.string().trim().min(1),
});

const processStepSchema = orderedSchema.extend({
  number: z.string().trim().min(1),
  firstLine: z.string().trim().min(1),
  secondLine: z.string().trim().min(1),
});

const testimonialSchema = orderedSchema.extend({
  initials: z.string().trim().min(1),
  name: z.string().trim().min(1),
  role: z.string().trim().min(1),
  quote: z.string().trim().min(1),
});

const blogPostSchema = orderedSchema.extend({
  icon: z.string().trim().min(1),
  category: z.string().trim().min(1),
  title: z.string().trim().min(1),
  date: z.string().trim().min(1),
});

export const homepageContentSchema = z.object({
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  hero: z.object({
    badge: z.string().trim().min(1),
    eyebrow: z.string().trim().min(1),
    titlePrefix: z.string().trim().min(1),
    titleSuffix: z.string().trim().min(1),
    highlightedTitle: z.string().trim().min(1),
    description: z.string().trim().min(1),
    primaryCtaLabel: z.string().trim().min(1),
    primaryCtaHref: linkSchema,
    secondaryCtaLabel: z.string().trim().min(1),
    secondaryCtaHref: linkSchema,
    mediaUrl: optionalUrlSchema,
    mediaAlt: z.string().trim().optional(),
    stats: z.array(statSchema).default([]),
  }),
  whatsapp: z.object({
    href: linkSchema,
    label: z.string().trim().min(1),
    detail: z.string().trim().min(1),
  }),
  expertise: z.object({
    eyebrow: z.string().trim().min(1),
    titleLine1: z.string().trim().min(1),
    titleLine2: z.string().trim().min(1),
    description: z.string().trim().min(1),
    services: z.array(serviceCardSchema).default([]),
  }),
  portfolio: z.object({
    eyebrow: z.string().trim().min(1),
    titleLine1: z.string().trim().min(1),
    titleLine2: z.string().trim().min(1),
    ctaLabel: z.string().trim().min(1),
    ctaHref: linkSchema,
    projects: z.array(projectCardSchema).default([]),
  }),
  about: z.object({
    eyebrow: z.string().trim().min(1),
    titleLine1: z.string().trim().min(1),
    titleLine2: z.string().trim().min(1),
    highlightedTitle: z.string().trim().min(1),
    description: z.string().trim().min(1),
    values: z.array(valueSchema).default([]),
    stats: z.array(aboutStatSchema).default([]),
  }),
  process: z.object({
    eyebrow: z.string().trim().min(1),
    title: z.string().trim().min(1),
    steps: z.array(processStepSchema).default([]),
  }),
  testimonials: z.object({
    eyebrow: z.string().trim().min(1),
    title: z.string().trim().min(1),
    items: z.array(testimonialSchema).default([]),
  }),
  blog: z.object({
    eyebrow: z.string().trim().min(1),
    title: z.string().trim().min(1),
    posts: z.array(blogPostSchema).default([]),
  }),
  finalCta: z.object({
    eyebrow: z.string().trim().min(1),
    titleLine1: z.string().trim().min(1),
    titleLine2: z.string().trim().min(1),
    highlightedTitle: z.string().trim().min(1),
    description: z.string().trim().min(1),
    primaryCtaLabel: z.string().trim().min(1),
    primaryCtaHref: linkSchema,
    secondaryCtaLabel: z.string().trim().min(1),
    secondaryCtaHref: linkSchema,
  }),
});

export const homepageUpdateSchema = z.object({
  content: homepageContentSchema,
});

export type HomepageContentInput = z.infer<typeof homepageContentSchema>;
export type HomepageUpdateInput = z.infer<typeof homepageUpdateSchema>;
