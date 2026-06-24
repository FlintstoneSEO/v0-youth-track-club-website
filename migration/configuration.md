# CloudCannon Configuration Notes

## Schemas

Downloaded official CloudCannon schemas:

- `migration/cloudcannon-config.latest.schema.json`
- `migration/cloudcannon-initial-site-settings.schema.json`

## Configuration Changes

- Changed the `pages` collection from `src/pages` Astro files to `src/content/pages` Markdown entries.
- Added `schemas.page_builder` using `.cloudcannon/schemas/page-builder.md`.
- Added `add_options` for creating Page Builder entries.
- Enabled visual and data editors for `pages`.
- Added `_structures.content_blocks` for all current page-builder block types:
  - `hero`
  - `text_section`
  - `card_grid`
  - `collection_list`
  - `practice_schedule`
  - `area_served`
  - `contact_forms`
- Added shared `_structures.actions` and `_structures.cards`.
- Added `_inputs` for arrays, HTML content, images, enums, and hidden `_schema`.

## Existing Data Configuration

Retained `data_config` and `file_config` for:

- site settings
- navigation
- footer
- practice schedule
- interim page hero data

## Notes

- The page-builder structure uses inline `_structures` because the block count is modest and the components are currently rendered by a single `PageRenderer.astro`.
- Current dedicated routes are not creatable duplicates; future pages can be created through the catch-all route.
