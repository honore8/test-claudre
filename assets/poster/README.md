# THE SALON — Launch Poster

All files derive from one master source, `poster-master.html`, which imports
`../../design-system/tokens.css` and inlines the comb placeholder SVG so it
inherits `currentColor` correctly. The master's typography and comb sizing
are set in `vw` units (rather than fixed pixels), so the exact same markup
re-composes cleanly at different target aspect ratios — the layout's middle
grid row (holding the comb) simply grows or shrinks while the top and
bottom copy blocks stay anchored, which is how the taller Instagram Story
frame gets "re-composed" instead of cropped. See `render-poster.js` for how
each export is produced (same HTML, different Playwright viewport / PDF
page size).

## Files

| File | Purpose | Dimensions |
|---|---|---|
| `poster-master.html` | Master source. Edit this, then re-run `render-poster.js`. | Responsive (vw-based); reference ratio 0.7071:1 (A2) |
| `render-poster.js` | Node/Playwright script that renders every export below from the master. Run with `node render-poster.js`. | — |
| `poster-linkedin.png` | LinkedIn post image | 1080×1350 |
| `poster-instagram-feed.png` | Instagram feed post | 1080×1350 (identical to LinkedIn export — same aspect ratio) |
| `poster-instagram-story.png` | Instagram Story | 1080×1920 |
| `poster-highres.png` | Large raster at the true A2 aspect ratio, for general high-res use (print previews, press kits, large-screen display) | 4000×5656 (2000×2828 viewport at deviceScaleFactor 2) |
| `poster-a2-print.pdf` | True print-size PDF for professional offset/large-format printing | 420mm × 594mm (A2), via CSS `@page`, `preferCSSPageSize: true` |
| `poster.pdf` | Digital-use PDF sized for easy sharing/email (screen-friendly page size) | 1080×1350px converted to points (810×1012.5pt) |
| `poster-master.svg` | Standalone vector approximation of the composition | viewBox 1000×1414 (0.7071:1) |

## About `poster-master.svg`

This is a **static, hand-built vector approximation** of the HTML composition —
the closest editable-vector substitute for the "Editable Figma file" asked
for in the brief. A real Figma file cannot be produced from a coding
session; this SVG is offered instead because it imports cleanly into Figma
(File → Import) as a starting point for further art direction, once the
real Bluemind brand file (exact hex, licensed typeface, final "Heal by
Hair" comb artwork) is available. Treat text as text and reflow as needed
once real fonts are loaded in Figma — this file uses system-font fallbacks
(Georgia / Helvetica) rather than embedding Fraunces/Inter.

## Known placeholders (do not treat as final)

- **Color**: `--color-blue` (#14274E) is a placeholder standing in for
  Bluemind's real brand hex — see `design-system/tokens.css` for the note.
- **Typeface**: Fraunces/Inter are placeholders for Bluemind's real
  typeface.
- **Comb artwork**: `design-system/comb-placeholder.svg` is explicitly a
  placeholder for the final "Heal by Hair" comb icon, pending an artist
  redesign.
- **No photography** anywhere is intentional per the brief (mystery is part
  of the launch), not an omission.

## Regenerating

```
cd /home/user/test-claudre/assets/poster
node render-poster.js
```

Requires the Playwright + Chromium setup already available in this
environment (see script header for the exact paths used).
