# Build and Test Notes

## Local Verification

Command used:

```sh
source ~/.config/nvm/nvm.sh && nvm use 24.14.1 && npm run build
```

Result:

- Astro check: 0 errors, 0 warnings, 0 hints.
- Astro build: complete.
- Built pages: 9.

## Final Sweep

- Clean-cache build was run after removing `.astro` and `dist`.
- Built HTML contains editable regions:
  - `85` array regions
  - `356` array-item regions
  - `4` image regions
  - `54` source regions
  - `520` text regions
- CloudCannon CLI validation passes:
  - `cloudcannon.config.yml`
  - `.cloudcannon/initial-site-settings.json`

## CloudCannon Verification For User

After deployment, verify:

- Page Builder entries open in the Visual Editor.
- `content_blocks` can be added, removed, and reordered.
- Inline text edits update page frontmatter.
- Collection cards using `@file[...]` update the intended source Markdown files.
- Shared data editables update the expected JSON files.
