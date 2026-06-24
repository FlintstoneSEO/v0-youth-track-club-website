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

const linkSchema = z.object({
  label: z.string().default(""),
  url: z.string().default(""),
  style: z.enum(["primary", "accent", "light", "outline", "success", "red"]).default("primary"),
});

const cardSchema = z.object({
  title: z.string().default(""),
  description: z.string().default(""),
  icon: z.string().default(""),
  meta: z.string().default(""),
  links: z.array(linkSchema).default([]),
});

const contentBlock = z.discriminatedUnion("_type", [
  z.object({
    _type: z.literal("hero"),
    eyebrow: z.string().default(""),
    title: z.string().default(""),
    subtitle: z.string().default(""),
    description: z.string().default(""),
    image: z.string().default(""),
    logo: z.string().default(""),
    tone: z.enum(["primary", "success", "dark", "light"]).default("primary"),
    actions: z.array(linkSchema).default([]),
  }),
  z.object({
    _type: z.literal("text_section"),
    eyebrow: z.string().default(""),
    title: z.string().default(""),
    content: z.string().default(""),
    align: z.enum(["left", "center"]).default("center"),
    tone: z.enum(["default", "muted", "primary", "dark", "success", "light"]).default("default"),
    actions: z.array(linkSchema).default([]),
  }),
  z.object({
    _type: z.literal("card_grid"),
    eyebrow: z.string().default(""),
    title: z.string().default(""),
    subtitle: z.string().default(""),
    tone: z.enum(["default", "muted", "primary", "dark", "success"]).default("default"),
    columns: z.enum(["2", "3", "4"]).default("3"),
    cards: z.array(cardSchema).default([]),
  }),
  z.object({
    _type: z.literal("collection_list"),
    title: z.string().default(""),
    subtitle: z.string().default(""),
    collection: z.enum(["events", "announcements", "faqs", "runThaCityEvents"]).default("events"),
    limit: z.number().default(0),
    tone: z.enum(["default", "muted", "dark", "light"]).default("default"),
    empty_text: z.string().default(""),
    actions: z.array(linkSchema).default([]),
  }),
  z.object({
    _type: z.literal("practice_schedule"),
    title: z.string().default(""),
    subtitle: z.string().default(""),
  }),
  z.object({
    _type: z.literal("area_served"),
    eyebrow: z.string().default(""),
    title: z.string().default(""),
    subtitle: z.string().default(""),
  }),
  z.object({
    _type: z.literal("contact_forms"),
    registration_title: z.string().default(""),
    registration_description: z.string().default(""),
    contact_title: z.string().default(""),
    contact_description: z.string().default(""),
    volunteer_title: z.string().default(""),
    volunteer_description: z.string().default(""),
  }),
]);

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    _schema: z.literal("page_builder").default("page_builder"),
    title: z.string(),
    description: z.string().default(""),
    content_blocks: z.array(contentBlock).default([]),
  }),
});

export const collections = {
  pages,
  events,
  announcements,
  faqs,
  runThaCityEvents,
  sponsors,
};
