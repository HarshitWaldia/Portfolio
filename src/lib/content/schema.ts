import { z } from "zod";

export const blogFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  github: z.string().url().optional(),
  live: z.string().url().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  badge: z.string().optional(),
  category: z.string().optional(),
  brandHue: z.number().or(z.string().transform(Number)).optional(),
  image1: z.string().optional(),
  image2: z.string().optional(),
});

export const experienceFrontmatterSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(["full-time", "part-time", "internship", "freelance", "open-source"]).default("full-time"),
  tags: z.array(z.string()).default([]),
  current: z.boolean().default(false),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type ExperienceFrontmatter = z.infer<typeof experienceFrontmatterSchema>;
