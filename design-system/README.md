# THE SALON by Bluemind Foundation — Design System

Reference documentation and component library for THE SALON's 2026 launch — an invitation-only cultural gathering (~50 guests) on 17 September 2026 in New York during the 81st UN General Assembly.

## Files in this directory

| File | What it is |
|---|---|
| `tokens.css` | **Shared foundation — do not edit.** Single source of truth for color, type, spacing, and grid variables. Owned by another workstream; every other file here reads from it rather than redefining values. |
| `comb-placeholder.svg` | **Shared foundation — do not edit.** Placeholder geometry for the "Heal by Hair" comb symbol (rounded spine, nine tapered teeth, `fill="currentColor"`), standing in until the artist's final redesign is delivered. |
| `docs.html` | **THE SALON Design System** — the institutional reference. Design philosophy, color, typography hierarchy, grid & layout, spacing scale, icon-usage policy, the comb symbol's role and rules, photography guidance (including the exact "Speaker & Founding Partner Announcement" language used by the social-toolkit workstream), and a Do/Don't summary. Every section renders live examples built from the real tokens, not just prose. |
| `docs.css` | Documentation-only presentation layer (page chrome, sticky section nav, color swatches, the grid diagram, the spacing ruler, the comb clear-space diagrams). Shared by both `docs.html` and `components.html`. Defines no color/type/spacing values itself — it reads `tokens.css` throughout. |
| `components.html` | **Component Library** — a living style guide of copy-pasteable components: buttons, titles, section headers, pull-quotes, speaker card, partner card, CTA block, forms, dividers. Each component is shown live with a "when to use" note and the exact HTML/class markup to copy. |
| `components.css` | The actual reusable component stylesheet. Built only from `tokens.css` variables — no new colors, fonts, or spacing values are introduced. This is the file other builders should link into new pages, alongside `tokens.css`. |

## How the system fits together

```
tokens.css  ───────────────┐
comb-placeholder.svg  ─────┤
                            ▼
                     docs.css / components.css
                            ▼
                docs.html   components.html
```

- `tokens.css` and `comb-placeholder.svg` are the shared foundation this workstream documents but never modifies — other parallel workstreams (landing page, poster, carousel, social toolkit) also depend on both staying stable.
- Any new HTML deliverable in the repo should link `tokens.css` first, then `components.css`, and build pages using the classes documented in `components.html` (`.btn`, `.title`, `.section-header`, `.pull-quote`, `.card-speaker`, `.card-partner`, `.cta-block`, `.form-field`/`.input`/`.textarea`/`.select`/`.form-check`, `.divider`/`.divider--wide`) rather than writing new one-off CSS.
- `docs.html` is the place to check *why* a rule exists (philosophy, clear-space rule for the comb, the no-photography policy for 2026) before building; `components.html` is the place to copy *how* to build it.

## Known placeholders (flagged in `docs.html`)

- `--color-blue` (#14274E) is a placeholder for Bluemind Foundation's real brand hex, not yet supplied.
- `--font-display` (Fraunces) is a placeholder for Bluemind's real typeface, meant to be swapped later.
- `comb-placeholder.svg` is placeholder geometry, not final art — the real "Heal by Hair" comb is being redesigned by an artist.

None of these require changes anywhere else in the system once the real assets arrive — every deliverable reads the variables/file, not hardcoded values.

## Verification

Both `docs.html` and `components.html` were screenshotted full-page at a 1440px desktop viewport with Playwright/Chromium and visually reviewed (including cropped close-ups of the comb clear-space diagrams and the forms section) to confirm no overlapping or broken layout.
