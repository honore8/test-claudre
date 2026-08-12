# THE SALON — Event Experience Templates

Physical (and projected) collateral for THE SALON by Bluemind Foundation —
September 17, 2026, Praxis' New York HQ, during the 81st UN General
Assembly. Inaugural, invitation-only gathering, ~50 guests.

All HTML files import `../design-system/tokens.css` and must not redefine
its tokens. Every print item sets its true physical size via a CSS
`@page { size: … }` rule so the exported PDF is at 1:1 print scale.
Digital slides use the same `@page` mechanism with pixel dimensions,
since a 16:9 projection slide has no physical page size.

Layouts are built in `vw`/`vh` units (matching the convention already
used in `assets/poster/poster-master.html`) so the same markup scales
cleanly regardless of the exact CSS-pixel-per-inch mapping used when
rendering the PNG preview — the PDF is still generated at the exact
`@page` physical size via `preferCSSPageSize: true`.

Two visual registers are used deliberately, both within the design
system's restraint (no gradients, no shadows, no glossy effects):
- **Printed / ink-on-paper collateral** — white ground, Bluemind Blue
  type, exactly as in the existing save-the-date and poster.
- **Projected slides** (title, content, closing, partner-acknowledgement)
  — full-bleed Bluemind Blue ground with reversed white/ivory type,
  appropriate to a dim room and consistent with the brief's "Apple
  keynote restraint" reference. This is the one place color is inverted;
  it never appears on printed pieces.

The comb mark is inlined as raw SVG (not `<img src="…comb-placeholder.svg">`)
so its `fill="currentColor"` correctly follows the CSS `color` of its
container — using `<img>` would lock the artwork to the SVG's own
default black fill in most browsers, since an externally-loaded SVG
document doesn't inherit page CSS.

## Files, physical size, and use

| File | Physical size | Use |
|---|---|---|
| `welcome-signage.html` | 24in × 36in, portrait | Freestanding/easel entrance sign. Comb large and centered — one of the two places in this system where that scale is explicit. |
| `registration-desk-sign.html` | 18in × 24in, portrait | Sign propped behind the registration desk, eye level. Quieter treatment: small corner comb mark. |
| `name-badge.html` | 3.5in × 2.25in, landscape | Attendee badge template. Mail-merge `[First Name]` / `[Last Name]` / `[Organization]`. Fixed tiny comb mark, bottom-right corner, on every badge. No lanyard art, no role-color ribbons. |
| `name-card.html` | 4in × 6in flat sheet → folds to a 4in × 3in standing tent | Place-setting card. `[Guest Name]` centered. Front-facing (bottom) panel and a 180°-rotated duplicate (top) so the card reads correctly from both sides of the table once folded. Dashed "FOLD" line is a non-printing production guide. |
| `table-cards.html` | 5in × 7in flat sheet → folds to a 5in × 3.5in standing tent | Seating-zone / table marker. One field, `[Table / Zone Label]` (e.g. "Table 4", "Act I"). Same fold-guide convention as `name-card.html`. |
| `menus.html` | 5in × 8in, portrait, flat, single-sided | Reception & dinner menu card. Ivory ground — the one deliberate warm accent surface in this set (used "sparingly" per the design system). Three quiet typographic sections (To Begin / To Continue / To Close), each with `[Course / Item]` + `[placeholder description]` lines. No borders, no food photography. |
| `wayfinding-lower.html` | 11in × 17in, portrait | Directional sign at the top of the stairwell, pointing down to Act I & Act II ("The Evidence"). Copy: "Begin with what is proven." |
| `wayfinding-upper.html` | 11in × 17in, portrait | Companion sign at the base of the stairwell, pointing up to Act III ("La Clairière — A Celebration of Black Cultures of Care"). Copy: "Continue upward — from evidence to encounter." Together the pair marks the symbolic floor transition called for in the brief. |
| `title-slide-template.html` | 1920×1080 (16:9) | Projected title-slide layout for Act I / Act II presentations. Eyebrow (act label) + large headline placeholder + one-line supporting placeholder. Full-bleed blue, reversed type. |
| `content-slide-template.html` | 1920×1080 (16:9) | Companion content/body slide layout: eyebrow + headline + hairline rule + body-copy placeholder area. Satisfies the brief's single "presentation-slide-template" item as two clearly separated files. |
| `closing-slide.html` | 1920×1080 (16:9) | Quiet closing/"With Gratitude" slide. Comb large and centered — the second of the two places that scale is explicit. |
| `partner-acknowledgement-slide.html` | 1920×1080 (16:9) | "Founding Cultural Partners" eyebrow + one partner-name placeholder. An HTML comment shows how to add a second partner: stacked with a large vertical gap, never a grid or side-by-side logo wall. |

Every file above has a matching `.pdf` (exported at its exact physical
size via Playwright + `preferCSSPageSize`) and `.png` preview (rendered
at deviceScaleFactor 1.5–4 depending on physical size, higher for the
smallest formats — badge and tent cards — to keep small type crisp)
in this same folder.

## Notes for production

- The dashed lines and "FOLD" labels on `name-card.html` and
  `table-cards.html` are production guides, not final ink — remove that
  layer (or print it very light) depending on the print shop's process.
- Bracketed placeholders (e.g. `[First Name]`, `[Table / Zone Label]`)
  are intentional literal template text, matching the convention used
  throughout the rest of this design system's placeholder pieces.
- Colors, typeface stacks, and the comb artwork are all placeholders
  per `../design-system/tokens.css` — swap centrally there once
  Bluemind's real brand file and the artist's final comb redesign are
  delivered; nothing in this folder needs to change.
