# CloudCannon Migration Audit

## Project

- SSG: Astro, static output.
- Astro content config: `src/content.config.ts` with `glob()` loaders.
- Package manager: npm with `package-lock.json`.
- Node: `.nvmrc` requests 22; local verification used Node 24.14.1, which satisfies Astro's Node requirement.
- CSS: Tailwind 4 through `@tailwindcss/vite`.
- Framework islands: none found; templates are Astro components.
- Visual editing package: `@cloudcannon/editable-regions`.

## Collections

| Collection | Path | Usage | URL |
| --- | --- | --- | --- |
| `pages` | `src/content/pages` | Page-builder entries for current routes and future CMS pages | `/[slug]/` |
| `events` | `src/content/events` | Data-like event cards rendered on pages | Disabled |
| `announcements` | `src/content/announcements` | Announcement cards/body rendered on listing blocks | Disabled |
| `faqs` | `src/content/faqs` | FAQ accordion items rendered on listing blocks | Disabled |
| `runThaCityEvents` | `src/content/run-tha-city-events` | Run Tha City event cards | Disabled |
| `sponsors` | `src/content/sponsors` | Sponsor data, no current rendered listing route | Disabled |

## Data Files

| File | Purpose |
| --- | --- |
| `src/data/site.json` | Shared site metadata and service areas |
| `src/data/navigation.json` | Header navigation |
| `src/data/footer.json` | Footer copy, columns, social links, credit |
| `src/data/practice-schedule.json` | Practice schedule and training arrays |

## Static Page Classification

All major `.astro` pages had 2+ visible content sections and were classified as page-builder candidates.

| Page file | Distinct sections | Recommended pattern | Implemented |
| --- | --- | --- | --- |
| `src/pages/index.astro` | hero, intro, features, events, promos, areas, CTA | Page builder | `src/content/pages/index.md` |
| `src/pages/about.astro` | hero, story, mission, values, programs, coach, vision | Page builder | `src/content/pages/about.md` |
| `src/pages/contact.astro` | hero, registration form, contact form, contact info, volunteer | Page builder | `src/content/pages/contact.md` |
| `src/pages/events.astro` | hero, event list, past results CTA, registration CTA | Page builder | `src/content/pages/events.md` |
| `src/pages/announcements.astro` | hero, announcement listing | Page builder | `src/content/pages/announcements.md` |
| `src/pages/faq.astro` | hero, FAQ listing, CTA | Page builder | `src/content/pages/faq.md` |
| `src/pages/practices.astro` | hero, schedule, CTA | Page builder | `src/content/pages/practices.md` |
| `src/pages/juneteenth-5k.astro` | hero, about, highlights, CTA | Page builder | `src/content/pages/juneteenth-5k.md` |
| `src/pages/run-tha-city-517.astro` | hero, story, features, runs, CTA | Page builder | `src/content/pages/run-tha-city-517.md` |

## Routing

- Dedicated routes remain for the current public URLs.
- Each dedicated route fetches its matching entry from `pages`.
- `src/pages/[...slug].astro` supports future CMS-created pages and excludes current dedicated route IDs to avoid duplicate output routes.

## Sectioning

- Total pages: 9.
- Hardcoded page conversions: 9.
- Distinct collections after migration: 6.
- Thresholds tripped: 1/3, so a single-pass migration is reasonable.
