# CloudCannon Visual Editing Census

## Infrastructure

| Check | Status | Notes |
| --- | --- | --- |
| `@cloudcannon/editable-regions` dependency | Present | `package.json` includes the package. |
| Astro integration | Present | `editableRegions()` is in `astro.config.mjs` integrations. |
| Component registration stub | Implemented | `src/cloudcannon/registerComponents.ts`. |
| Conditional editor import | Implemented | Loaded from `BaseLayout.astro` only when `window.inEditorMode` is true. |
| `src/icons/` directory | Implemented | Required by related CloudCannon/Astro tooling. |

## Section Census

| Page | Section | Treatment | Binding plan | Data completeness | Justification |
| --- | --- | --- | --- | --- | --- |
| All pages | Header logo/brand | data-file + source | Logo is static image; nav uses `@data[navigation].items`; CTA label source-editable in `Header.astro`. | Brand text and CTA label are template text; nav labels/URLs are in data. | Static logo asset remains developer-managed. |
| All pages | Desktop navigation | data-file + array | `data-prop="@data[navigation].items"` with nested `label`. | Labels/URLs in `src/data/navigation.json`. | — |
| All pages | Mobile navigation | data-file + array | `data-prop="@data[navigation].items"` with nested `label`. | Labels/URLs in `src/data/navigation.json`. | — |
| All pages | Footer identity/copy | data-file | `@data[footer].description`, `@data[footer].service_area_note`, `@data[site].email`, `@data[site].name`, `@data[site].founder`. | Most content in data; logo/brand fragment is static. | Static logo asset remains developer-managed. |
| All pages | Footer columns | data-file + array | `@data[footer].columns`; nested `heading`, `links`, `label`. | Column/link content in `src/data/footer.json`. | — |
| All pages | Footer social links | data-file + array | `@data[footer].social_links`; nested `label`. | Labels/URLs in data; icon is derived from label. | Icon choice derives from label and updates after save/rebuild. |
| Page-builder pages | Hero blocks | page-builder | `content_blocks[].hero` fields inside `src/content/pages/*.md`. | Hero text/images are stored with each page entry. | — |
| Homepage | Urgent announcement banner | collection file | `@file[/src/content/announcements/<id>.md].title`. | Announcement title/body in content files. | — |
| Homepage | Hero | source + image | Source text in `src/pages/index.astro`; images are static assets. | Hero copy is source-editable; static logo/hero image remain assets. | Image source is intentionally fixed branding/art direction. |
| Homepage | Intro/story | source | Source editables in `src/pages/index.astro`. | Copy/button label in template. | — |
| Homepage | Feature cards | source | Source editables inside static feature array output. | Static array lives in template. | Larger page-builder refactor deferred; current items are inline source-editable. |
| Homepage | Upcoming events | collection file | `@file[/src/content/events/<id>.md].*`. | Event fields in content collection. | — |
| Homepage | Run Tha City promo | source + image | Source editables in `src/pages/index.astro`; logo image static. | Copy/buttons in template. | — |
| Homepage | Juneteenth 5K promo | source | Source editables in `src/pages/index.astro`. | Copy/buttons in template. | — |
| Homepage | Areas served | data-file + array | `@data[site].area_served` with string-item editables. | Area list in `src/data/site.json`. | — |
| Homepage | Final CTA | source | Source editables in `src/pages/index.astro`. | Copy/buttons in template. | — |
| About | Story/mission/values/programs/coach/vision/sponsors | source | Source editables in `src/pages/about.astro`. | Current page is static Astro content. | Page-builder migration would be the fuller architecture, outside this scoped setup. |
| Announcements | Hero | source | `src/pages/announcements.astro` via `PageHero`. | Hero copy in template. | — |
| Announcements | Urgent and regular cards | collection file + content | `@file[/src/content/announcements/<id>.md].title`, `published_at`, `@content`. | Announcement data/body in content files. | — |
| Events | Hero/types/list/CTAs | source + collection file | Static headings source-editable; event cards use `@file[/src/content/events/<id>.md].*`. | Events in content files; event type labels static. | — |
| FAQ | Hero/categories/questions/CTA | source + collection file | Category/CTA source-editable; FAQ cards use `@file[/src/content/faqs/<id>.md].*`. | FAQs in content files. | — |
| Contact | Hero/forms/info/volunteer | source + data-file | Form labels/copy source-editable; email uses `@data[site].email`. | Forms are static templates with placeholder actions. | Form endpoint configuration remains developer-managed. |
| Practices | Hero/schedule/bring/expect/timeline/CTA | source + data-file arrays | Schedule arrays use `@data[practice-schedule].*`; static headings source-editable. | Practice details in `src/data/practice-schedule.json`. | — |
| Juneteenth 5K | Static sections/highlights/details/partners/CTA | source | Source editables in `src/pages/juneteenth-5k.astro`; static logo/art remains assets. | Current page is static Astro content. | Page-builder migration deferred. |
| Run Tha City 517 | Hero/story/features/runs/how-to/related/CTA | source + collection file | Static copy source-editable; runs use `@file[/src/content/run-tha-city-events/<id>.md].*`. | Run events in content files. | — |

## Notes

- Blog and portfolio templates do not exist in this site.
- Collection entries are rendered on listing pages rather than detail pages, so inline collection editing uses `@file[...]` bindings.
- Static `.astro` pages have been migrated to `src/content/pages` page-builder entries. Remaining `source` editables are limited to shared template labels in header/footer and small static CTA labels where appropriate.
