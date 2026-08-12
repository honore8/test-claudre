# THE SALON — Invitation Suite

Invitation assets for **THE SALON by Bluemind Foundation** — September 17, 2026, New York, during the 81st UN General Assembly. Built on the shared design system at `../design-system/tokens.css` and `../design-system/comb-placeholder.svg`. Do not edit those two files from here; every HTML file in this folder links to `tokens.css` by relative path instead of redefining colors, type, or spacing.

## Files

| File | Purpose | Dimensions / format |
|---|---|---|
| `save-the-date.html` / `.png` / `.pdf` | Poster-like save-the-date. Event name, date, city, "by invitation," the comb — nothing more. | 1200×1500 px (PNG); ~148×185mm card size via CSS `@page` (PDF) |
| `digital-invitation.html` / `.png` | Single shareable web page: full poster hierarchy plus venue/acts structure and a "Request an Invitation" CTA. | 1200px wide, full height (PNG ≈1200×1853 at 2x scale) |
| `email-invitation.html` / `email-invitation-preview.png` | Email-safe HTML template: table-based layout, inlined CSS, no external stylesheet. See "Email Notes" below. | 600px wide (email standard); preview PNG rendered at 640px |
| `pdf-invitation.html` / `.pdf` | Formal two-page print-ready invitation for a card insert. Page 1: cover. Page 2: the evening's structure. | A5 (148mm × 210mm) via CSS `@page`, one PDF page per `<section class="sheet">` |

## How to re-export

All PNG/PDF exports were produced with Playwright/Chromium. To regenerate after editing an HTML file:

```js
const { chromium } = require('playwright');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await page.goto('file://' + require('path').resolve('save-the-date.html'));
await page.screenshot({ path: 'save-the-date.png' });
// PDFs: the HTML already defines @page size; just call
await page.pdf({ path: 'save-the-date.pdf', printBackground: true, preferCSSPageSize: true });
```

For `digital-invitation.html`, take the screenshot at the page's natural scroll height (viewport height doesn't matter — resize the viewport to `document.body.scrollHeight` before shooting) rather than a fixed height, since the page is not a fixed poster.

## Email notes

`email-invitation.html` is written for email clients, not browsers:

- **Table-based layout.** Outlook on Windows renders email HTML with Word's engine, which does not support modern CSS layout (flexbox, grid) reliably — everything here uses nested `<table>` elements instead.
- **Inlined CSS.** The file does *not* link `../design-system/tokens.css`. Most email clients (Gmail, Outlook, many mobile mail apps) strip `<link>` stylesheets and `<style>` blocks that reference external files, so every hex value and font stack is copied by hand into `style=""` attributes on each element, using the **same values** as `tokens.css` (`#14274E` Bluemind Blue, `#FFFFFF` white) so the email stays visually consistent with the rest of the system.
- **Web-safe font fallbacks.** Each `font-family` stack lists web-safe fonts (Georgia/Times New Roman for the display serif, Arial/Helvetica for the text sans) *before* Fraunces/Inter, since many email clients block webfonts entirely. The layout and hierarchy hold up on the fallback fonts alone.
- **No gradients or shadows to strip.** The brand system already forbids gradients, drop shadows, and glossy effects, so nothing is lost when a client strips that CSS — there was never any to begin with.
- **Comb mark inlined as SVG.** The comb is embedded directly as inline `<svg>` markup (not `<img src="...svg">`) so it survives clients that block linked images.

Because of all of the above, this template degrades safely: even a client that strips every `<style>` block and blocks every webfont will still show the correct copy, in the correct order, in the correct fallback fonts and correct navy color, on a plain white background.

## Placeholder notices carried over from the design system

- **Color** `--color-blue` (`#14274E`, used directly as `#14274E` in the email template) is a placeholder for Bluemind's real brand hex.
- **Comb mark** (`comb-placeholder.svg`, and the inlined SVG copy in `email-invitation.html`) is placeholder geometry for the real "Heal by Hair" comb artist redesign.

Swap both once final brand assets arrive — no other changes to these files should be needed.
