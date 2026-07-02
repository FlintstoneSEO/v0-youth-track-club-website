---
name: latc-redesign
description: >-
  Use when redesigning the Lansing Area Track Club Astro site. Guides strategy,
  visual direction, Astro implementation, CloudCannon editability, SEO,
  accessibility, and performance QA.
---

# LATC Redesign Skill

Use this skill for redesign work on the Lansing Area Track Club site.

## Project stack

- Astro 5
- Tailwind CSS 4
- `lucide-astro`
- CloudCannon editable regions
- Content-driven pages rendered through `src/components/PageRenderer.astro`
- Shared data in `src/data/*.json`
- Build command: `npm run build`

## Files to inspect first

- `README.md`
- `package.json`
- `src/content/pages/index.md`
- `src/components/PageRenderer.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/styles/global.css`
- `src/data/site.json`
- `src/data/navigation.json`
- `src/data/footer.json`
- `src/data/practice-schedule.json`
- `src/content/config.ts`
- `cloudcannon.config.yml`
- `src/cloudcannon/registerComponents.ts`

## Redesign brief required before coding

Create a compact brief before editing:

| Item | Decision |
| --- | --- |
| Page or section |  |
| Primary audience |  |
| Primary decision |  |
| Main CTA |  |
| Trust barrier |  |
| Content source |  |
| Editable fields to preserve |  |
| SEO intent |  |
| Visual pattern |  |
| Patterns to avoid |  |
| Accessibility risks |  |
| Performance risks |  |

## Visual system

Default style: bold sports editorial plus warm community athletics.

Use:

- Track-lane rhythm.
- Meet-day schedule cards.
- Race-bib labels.
- Strong action CTA bands.
- Coach and community trust blocks.
- Stat strips for proof.
- Asymmetrical media sections.
- Practical family-facing information.

Avoid:

- Generic centered hero sections.
- Repeated three-card grids.
- Flat icon cards as the main design language.
- Soft SaaS gradients.
- Weak CTA wording.
- Hidden logistics.
- Heavy animation libraries.

## CloudCannon rules

- Preserve `data-editable` wrappers.
- Preserve correct `data-prop` attributes.
- Preserve array editing for actions, cards, and content blocks.
- Preserve existing `@file` and `@data` patterns.
- If adding a block type, update schema, renderer, and CloudCannon registration together.

## Homepage redesign sequence

Use this as the default section order:

1. Hero with immediate audience fit and registration/contact CTA.
2. Proof strip with local, athletic, and community credibility.
3. Program pathways by audience or need.
4. Practice schedule or upcoming event visibility.
5. Coach, values, and community trust section.
6. Athlete development outcomes.
7. Run Tha City 517 feature.
8. Juneteenth 5K feature.
9. FAQs or common questions.
10. Final CTA.

## SEO checklist

Every redesigned page should include:

- One clear H1.
- Logical H2 and H3 structure.
- Unique title and meta description.
- Internal links to related pages.
- Natural Lansing and Mid-Michigan relevance where applicable.
- Useful image alt text for meaningful images.
- Schema updates only when visible content supports them.

## Accessibility checklist

Check:

- Semantic sectioning.
- Heading order.
- Keyboard navigation.
- Visible focus states.
- Descriptive link text.
- Mobile tap target size.
- Color contrast.
- Form labels and validation states.
- Reduced-motion support.
- Meaningful alt text and decorative image handling.

## Performance checklist

Check:

- Hero media does not harm LCP.
- Images have reserved dimensions or aspect ratios.
- Non-critical media is lazy-loaded.
- Fonts remain lean.
- No unnecessary JavaScript libraries.
- No avoidable layout shift.
- `npm run build` passes.

## Final response after changes

Report:

1. Files changed.
2. Design decisions made.
3. Editable content preserved.
4. SEO/accessibility/performance checks handled.
5. Whether `npm run build` was run and the result.
6. What the user should review visually.
