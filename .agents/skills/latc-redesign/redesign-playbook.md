# LATC Redesign Playbook

Use this alongside `SKILL.md` for planning the actual redesign.

## Site identity

Lansing Area Track Club should feel like a local athletics organization with real community roots, not a generic template. The site should balance performance, discipline, family trust, and Lansing pride.

## Core users and their questions

| User | Questions the design must answer |
| --- | --- |
| Parent or guardian | Who is this for? Is it safe and organized? How do we join? When and where are practices? |
| Student athlete | Does this feel exciting? Will this help me improve? What events or training are available? |
| Community runner | What is Run Tha City 517? How do I participate? |
| Event participant | When is the event? Where is it? How do I register or learn more? |
| Sponsor or partner | Is this organization credible? What community impact does it have? |

## Homepage design direction

### Hero

Use an athletic hero that makes the local value clear immediately.

Recommended content hierarchy:

1. Eyebrow: Lansing and Mid-Michigan track/running program.
2. H1: A clear parent-facing promise.
3. Subtitle: Track, running, speed, endurance, confidence, and discipline.
4. Primary CTA: Register or contact.
5. Secondary CTA: View practices and events.
6. Trust cue: Founded year, coach/community statement, or area served.

Avoid a hero that only states the club name without explaining the value.

### Proof strip

Use compact proof items such as:

- Serving Lansing since 2015.
- Track and field plus running development.
- Community-centered coaching.
- Practices, meets, and local events.

### Program pathways

Create clear pathways such as:

- New families.
- Returning athletes.
- Speed and endurance training.
- Community running.
- Events and races.

### Schedule visibility

Practice and event information should not feel buried. Use schedule cards, date blocks, and clear links.

### Trust section

Build trust through:

- Coach Ramon Brunson.
- Positive environment.
- Discipline and confidence.
- Community connection.
- Local service area.
- Parent-friendly FAQs.

### Community features

Give Run Tha City 517 and the Juneteenth 5K strong visual treatment, but keep them secondary to the track club's main join/contact path unless the user requests otherwise.

## Component ideas

| Component | Purpose |
| --- | --- |
| AthleticHero | Strong first impression and CTA clarity |
| ProofStrip | Fast credibility and local relevance |
| ProgramPathways | Help visitors self-select |
| PracticeCards | Make logistics scannable |
| CoachTrustBlock | Build credibility and comfort |
| OutcomeGrid | Explain athletic and character development |
| EventFeature | Promote Run Tha City or Juneteenth 5K |
| ParentFAQ | Reduce uncertainty before contact |
| FinalCTA | Repeat the main conversion action |

## Content block guidance

The current page-builder uses block types such as:

- `hero`
- `text_section`
- `card_grid`
- `collection_list`
- `practice_schedule`
- `area_served`
- `contact_forms`

Before creating a new block type, check whether an existing block can be extended safely. Add new block types only when the visual pattern cannot be represented cleanly with the existing structure.

## Suggested new block types

Consider these only if the redesign needs stronger visual variety:

### `proof_strip`

Fields:

- eyebrow
- items array
  - value
  - label
  - description
- tone

### `feature_panel`

Fields:

- eyebrow
- title
- content
- image
- image_alt
- media_position
- tone
- actions

### `program_pathways`

Fields:

- eyebrow
- title
- subtitle
- pathways array
  - title
  - description
  - icon
  - url
  - cta_label

### `split_cta`

Fields:

- eyebrow
- title
- description
- primary_action
- secondary_action
- supporting_note
- tone

## Visual variety rules

For each redesigned page, intentionally vary:

- Hero composition.
- Section rhythm.
- Card shape.
- Image crop.
- CTA placement.
- Proof format.
- Background treatment.
- Content density.

Block these defaults unless clearly justified:

- Centered hero with all content stacked.
- Three identical icon cards.
- Same rounded card style on every section.
- Same blue and green treatment everywhere.
- CTA only at the bottom of the page.
- Large decorative icons replacing real content.

## SEO structure

Recommended page themes:

| Page | SEO role |
| --- | --- |
| Home | Lansing Area Track Club and local running/track overview |
| About | Story, coach, values, community trust |
| Practices | Practice schedule, age groups, location, what to expect |
| Events | Meets, races, community events |
| Run Tha City 517 | Lansing community running group |
| Juneteenth 5K | Lansing Juneteenth 5K Run/Walk/Roll |
| FAQ | Parent and participant questions |
| Contact | Registration/contact intent |

## QA prompts for Codex

Before finalizing, answer:

1. Is the main CTA visible near the top?
2. Are practice/event logistics easier to find than before?
3. Does the design look like track/running, not a generic agency site?
4. Does every content change remain editable where expected?
5. Does the page keep one clear H1?
6. Are all interactive elements keyboard accessible?
7. Does reduced motion work?
8. Did `npm run build` pass?
