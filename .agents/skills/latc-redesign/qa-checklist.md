# LATC Redesign QA Checklist

Use this checklist before opening a PR or reporting redesign work as complete.

## Strategy

- [ ] The redesigned page has a clear user decision.
- [ ] The main CTA is visible near the top of the page.
- [ ] The design direction fits local track, running, and community athletics.
- [ ] The page does not look like a generic SaaS or agency template.
- [ ] Trust cues appear before high-friction asks.
- [ ] Practice, event, or contact logistics are easy to find when relevant.

## Content and CloudCannon

- [ ] Markdown/frontmatter content remains editable where expected.
- [ ] `data-editable` wrappers are preserved.
- [ ] `data-prop` values point to the correct source fields.
- [ ] Array fields support add, remove, and reorder where expected.
- [ ] Cross-file editables use existing `@file` or `@data` patterns correctly.
- [ ] Any new block type is reflected in content schema, rendering, and CloudCannon registration.
- [ ] Missing images, long text, and empty collections have reasonable handling.

## Design

- [ ] Hero composition is intentional.
- [ ] Section rhythm changes across the page.
- [ ] CTA styling is clear and consistent.
- [ ] Cards are not overused as the only visual pattern.
- [ ] Visual emphasis supports the content hierarchy.
- [ ] Mobile layout is intentionally composed.
- [ ] Desktop layout improves scanability rather than only adding space.

## SEO

- [ ] Page has one clear H1.
- [ ] H2/H3 hierarchy is logical.
- [ ] Title and description are accurate.
- [ ] Internal links point to relevant pages.
- [ ] Local language is natural, not keyword-stuffed.
- [ ] Image alt text is meaningful where images are informative.
- [ ] JSON-LD still reflects visible content.
- [ ] Canonical URL behavior remains correct.

## Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Color contrast is acceptable.
- [ ] Links and buttons have clear accessible names.
- [ ] Form labels and instructions are clear.
- [ ] Motion respects reduced-motion preference.
- [ ] Tap targets are comfortable on mobile.
- [ ] Decorative images are hidden from assistive tech.
- [ ] Informative images have useful alt text.

## Performance

- [ ] Hero image/media is optimized for LCP.
- [ ] Images reserve space with dimensions or aspect ratio.
- [ ] Non-critical images are lazy-loaded.
- [ ] No unnecessary JS library was added.
- [ ] No avoidable layout shift was introduced.
- [ ] CSS remains maintainable.
- [ ] Fonts remain lean.

## Build

- [ ] Run `npm install` if dependencies changed.
- [ ] Run `npm run build`.
- [ ] Fix Astro, TypeScript, schema, or CloudCannon registration errors.
- [ ] Document any check that could not be run.

## Final review note template

```md
## Summary
- 

## Files changed
- 

## Design direction
- 

## Editable content preserved
- 

## SEO/accessibility/performance notes
- 

## Build result
- `npm run build`: pass/fail/not run

## Please review
- 
```
