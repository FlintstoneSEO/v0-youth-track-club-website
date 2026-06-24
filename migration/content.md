# Content Migration Notes

## Page Content

Created `src/content/pages` and extracted the current static page copy into page-builder entries:

- `index.md`
- `about.md`
- `contact.md`
- `events.md`
- `announcements.md`
- `faq.md`
- `practices.md`
- `juneteenth-5k.md`
- `run-tha-city-517.md`

Each entry includes:

- `_schema: page_builder`
- `title`
- `description`
- `content_blocks`

## Existing Collections

Existing event, announcement, FAQ, Run Tha City event, and sponsor files remain flat Markdown content collections. Listing blocks render these collections and use `@file[...]` editables for inline edits to the source entries.

## YAML Normalization

HTML-rich `content` fields use folded block scalars (`>-`) so colons, apostrophes, and HTML tags round-trip cleanly through YAML.

## Field Completeness

Every block includes all fields required by its Zod schema and CloudCannon structure value. Empty fields are represented as empty strings or arrays where appropriate.
