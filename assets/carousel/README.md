# THE SALON — LinkedIn Carousel

Seven slides (1080×1350 each), one HTML file per slide, sharing
`carousel.css` (which imports `../../design-system/tokens.css`). The
brief's minimum was 6 slides; a 7th — "Three Acts" — was added between
"Why THE SALON?" and "Act I" as a quiet bridging/overview slide, since it
sets up the three-act structure the next slides walk through one at a
time. Every slide carries a small persistent footer mark ("THE SALON" /
page count) — quiet, not a logo lockup.

## Slides

| File | Slide | Notes |
|---|---|---|
| `slide-1.html` | Cover | "THE SALON" / "Convened by Bluemind Foundation." / "Shaped by Africa." / "Open to the World." Comb hero, large and centered. |
| `slide-2.html` | Why THE SALON? | Body copy only, no comb, generous margins. |
| `slide-3.html` | The Program — Three Acts | Added slide bridging the "why" and the program: eyebrow "The Program," heading "Three Acts.", a quiet hairline-divided list of the three act titles. |
| `slide-4.html` | Act I — The Evidence | Eyebrow "Act I", display heading "THE EVIDENCE", supporting line "Trust as Public Infrastructure", detail "World premiere of the Trust Study." No imagery. |
| `slide-5.html` | Act II — From Evidence to Infrastructure | Eyebrow "Act II", heading, question line. A pure-CSS/SVG architectural bracket motif (nested framing lines, suggesting systems built at increasing scale) stands in for panel iconography — deliberately not "panel discussion" signage. |
| `slide-6.html` | Act III — La Clairière | Eyebrow "Act III", very large heading "LA CLAIRIÈRE", one supporting line. Almost all typography, quiet and confident, no further explanation. |
| `slide-7.html` | Closing CTA | "THE SALON by Bluemind Foundation" / date / city / "By invitation." / "Interested in attending?" + a bordered text button ("Request an Invitation") using `--border-hairline` — no filled color, no shadow. |

## Shared files

- `carousel.css` — shared layout rules (slide canvas, footer mark, eyebrow, rule, hairline button) on top of the shared tokens.
- `render-carousel.js` — Node/Playwright script that renders every PNG and the combined PDF. Run with `node render-carousel.js`.

## Exports

| File | Purpose | Dimensions |
|---|---|---|
| `slide-1.png` … `slide-7.png` | Individual carousel images, upload order | 1080×1350 each (2160×2700 actual pixels, deviceScaleFactor 2) |
| `carousel.pdf` | Multi-page PDF, one page per slide, for review/sharing/print-adjacent use | 7 pages, each 1080×1350px-equivalent (810×1012.5pt) |

## Known placeholders (do not treat as final)

Same as the poster: `--color-blue` and the Fraunces/Inter font stacks are
placeholders for Bluemind's real brand hex and typeface; the comb is
`design-system/comb-placeholder.svg`, pending final "Heal by Hair" artwork.
No photography anywhere is intentional (mystery is part of the launch).

## Regenerating

```
cd /home/user/test-claudre/assets/carousel
node render-carousel.js
```

The script merges the seven single-page PDFs into `carousel.pdf` using
`pdf-lib` (installed into the shared Playwright tools directory for this
session); it falls back to `qpdf`/`ghostscript` if `pdf-lib` isn't
resolvable in a future environment.
