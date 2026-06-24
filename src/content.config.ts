import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    event_date: z.coerce.date(),
    start_time: z.string().default(""),
    location: z.string().default(""),
    event_type: z.enum(["meet", "practice", "community", "fundraiser", "other"]).default("meet"),
    is_featured: z.boolean().default(false),
    registration_url: z.string().default(""),
    is_published: z.boolean().default(true),
  }),
});

const announcements = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/announcements" }),
  schema: z.object({
    title: z.string(),
    priority: z.enum(["urgent", "high", "normal", "low"]).default("normal"),
    published_at: z.coerce.date(),
    is_published: z.boolean().default(true),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(["general", "registration", "practices", "meets", "equipment", "other"]).default("general"),
    sort_order: z.number().default(0),
    is_published: z.boolean().default(true),
  }),
});

const runThaCityEvents = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/run-tha-city-events" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    event_date: z.coerce.date(),
    start_time: z.string().default(""),
    location: z.string().default(""),
    meeting_point: z.string().default(""),
    distance: z.string().default(""),
    difficulty: z.enum(["all_levels", "beginner", "intermediate", "advanced"]).default("all_levels"),
    event_type: z.enum(["group_run", "race", "community", "other"]).default("group_run"),
    is_featured: z.boolean().default(false),
    is_published: z.boolean().default(true),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sponsors" }),
  schema: z.object({
    name: z.string(),
    website: z.string().default(""),
    logo: z.string().default(""),
    level: z.enum(["partner", "gold", "silver", "bronze", "community"]).default("community"),
    is_published: z.boolean().default(true),
  }),
});

export const collections = {
  events,
  announcements,
  faqs,
  runThaCityEvents,
  sponsors,
};
