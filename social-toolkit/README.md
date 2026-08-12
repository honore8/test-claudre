# THE SALON — Social Media Toolkit

Reusable 1080×1080 square templates for **THE SALON by Bluemind Foundation** — September 17, 2026, New York, during the 81st UN General Assembly. Built on the shared design system at `../design-system/tokens.css` and `../design-system/comb-placeholder.svg`. Do not edit those two files from here; every template links to `tokens.css` by relative path instead of redefining colors, type, or spacing.

## Files

| File | Eyebrow | Focal content | Notes |
|---|---|---|---|
| `speaker-announcement.html` | ANNOUNCING | `[SPEAKER NAME]` (display serif) / `[ROLE / TITLE], [ORGANIZATION]` | Fixed corner comb mark; labeled circular portrait placeholder (dashed outline) sized and positioned so a future photo drops in without moving anything else |
| `moderator-announcement.html` | MODERATING | Same as speaker template | Identical system, eyebrow only differs |
| `founding-partner-announcement.html` | FOUNDING CULTURAL PARTNER | `[PARTNER NAME]` (display serif) / one-line description | No portrait — organizations get name + description only, one partner at a time, no logo wall |
| `media-partner-announcement.html` | MEDIA PARTNER | Same as founding-partner template | Identical system, eyebrow only differs |
| `countdown.html` | UNTIL THE SALON (beneath numeral) | `[N] DAYS` in large display serif | Comb is small and quiet at the top — this template is about the numeral, not the mark; do not enlarge or center the comb here |
| `registration-open.html` | — | "Request an Invitation" headline + supporting line + text-button CTA | CTA is a hairline-bordered text link, no filled/saturated button, matching the invitation suite's RSVP treatment |
| `event-recap.html` | — | "Thank You" + centered comb + `[EVENT NAME] — [DATE]` footer | Headline and supporting line are intentionally generic/durable so this can be reused after future editions without rewriting |

Every template's HTML/CSS is built for a **1080×1080 logical canvas**, then exported to PNG from a 1080×1080 viewport at `deviceScaleFactor: 2`. That produces a **2160×2160px** PNG — the same square composition at Retina pixel density, matching what the brief's "1080×1080, deviceScaleFactor 2" spec is designed to produce. If a platform strictly requires a 1080×1080 pixel file, downscale the PNG 50% (it was authored at 2x for crispness, so it downsamples cleanly) or re-export with `deviceScaleFactor: 1`.

## How to swap placeholder copy

Every bracketed token (`[SPEAKER NAME]`, `[ROLE / TITLE]`, `[ORGANIZATION]`, `[PARTNER NAME]`, `[N]`, `[EVENT NAME]`, `[DATE]`, etc.) sits inside its own text node in the HTML — replace the bracketed text only, leave every surrounding tag, class, and inline style untouched, then re-export the PNG. No layout, spacing, or type-size changes are needed for reasonably short substitutions (a very long name/title may need the `font-size` reduced slightly on that one element, but the default sizes were chosen with realistic name/title lengths in mind).

## How to re-export

All PNGs were produced with Playwright/Chromium:

```js
const { chromium } = require('playwright');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2 });
await page.goto('file://' + require('path').resolve('speaker-announcement.html'));
await page.screenshot({ path: 'speaker-announcement.png' });
```

Repeat per template after any copy or layout edit.

## Speaker & Founding Partner Announcement Visual Approach

This exact text also appears as an HTML comment at the top of `speaker-announcement.html`, `moderator-announcement.html`, `founding-partner-announcement.html`, and `media-partner-announcement.html`, for consistency with the design-system workstream's documentation:

> Speaker & Founding Partner Announcement Visual Approach — Once photography becomes appropriate (post speaker confirmation), maintain restraint: a single subject, tightly cropped portrait (shoulders-up), shot against a plain, unstyled backdrop (soft ivory or Bluemind Blue seamless paper — no environmental or office backgrounds), converted to a two-tone duotone treatment in Bluemind Blue and white (or Bluemind Blue and soft ivory) rather than full color. The comb glyph may appear as a small fixed eyebrow mark near, never overlapping, the face. Pair with the person's name and one-line role set in the display serif, and an "ANNOUNCING" eyebrow label in tracked-caps sans. No drop shadows, no saturated color blocks behind the portrait, no grids of multiple partner logos — one subject or one mark at a time, same generous margins as everything else in the system.

Until a duotone portrait is ready, `speaker-announcement.html` and `moderator-announcement.html` ship with a clearly labeled circular placeholder region (dashed outline, "Portrait Placeholder — Duotone, Shoulders-Up") in the exact position, size, and shape a real portrait will occupy. When a photo is ready, replace the placeholder `<div>`'s contents with the image, keep the same width/height/border-radius, and delete the placeholder label text and dashed border.

`founding-partner-announcement.html` and `media-partner-announcement.html` intentionally ship with **no** portrait placeholder, since they announce an organization rather than a person — the restraint principle there is "one partner name at a time, no logo wall," not a portrait treatment.

## Placeholder notices carried over from the design system

- **Color** `--color-blue` (`#14274E`) is a placeholder for Bluemind's real brand hex.
- **Comb mark** (`comb-placeholder.svg`) is placeholder geometry for the real "Heal by Hair" comb artist redesign.

Swap both once final brand assets arrive — no other changes to these templates should be needed.
