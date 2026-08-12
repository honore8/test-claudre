# THE SALON by Bluemind Foundation — Visual Identity & Launch Assets

Inaugural edition: **September 17, 2026 — New York — Praxis HQ**, during the
81st UN General Assembly. Invitation-only, ~50 guests.

This repository is the visual foundation for THE SALON as a recurring
Bluemind Foundation platform, not just a one-off event kit. Every folder
below is built against one shared design system so the whole thing can
evolve consistently in future editions.

## Start here

- **`design-system/tokens.css`** — the single source of truth for color,
  type, spacing and grid. Every other file in this repo imports it rather
  than redefining values.
- **`design-system/comb-placeholder.svg`** — the hero mark (a stand-in for
  the real Heal by Hair comb icon, still pending the artist's redesign).
- **`design-system/docs.html`** — open this first. It documents the full
  design philosophy, color/type/grid rules, comb usage, photography
  guidelines, and do's/don'ts.
- **`design-system/components.html`** — the copy-pasteable component
  library (buttons, headers, cards, forms, dividers, quotes).

## What's placeholder, and what needs to be swapped in before launch

This system was built without access to Bluemind Foundation's actual brand
file, so three things are deliberate stand-ins, flagged throughout the
repo wherever they appear:

1. **Bluemind Blue** — currently `#14274E` (`--color-blue` in
   `tokens.css`). Replace with the real brand hex; nothing else needs to
   change since every asset reads from this one variable.
2. **Typography** — currently Fraunces (display) + Inter (text), chosen to
   match the brief's editorial/quiet-luxury direction. Replace the two
   `--font-display` / `--font-text` stacks once Bluemind's existing
   typeface files are available.
3. **The comb icon** — `comb-placeholder.svg` is original placeholder
   geometry (a spine + nine tapered teeth), not the real Heal by Hair
   artwork. Swap the file once the artist's redesign is delivered; every
   template references it by path, so one file swap updates it everywhere.

One more thing to fix before this goes live: the landing page's
"Request an Invitation" form currently submits to a placeholder address,
`invitations@bluemindfoundation.org` — point it at Bluemind's real intake
inbox (see `landing-page/README.md`).

## Folder map

| Folder | What it is |
|---|---|
| `design-system/` | Tokens, comb mark, design-system docs, component library |
| `assets/poster/` | Launch poster — LinkedIn, Instagram (feed + story), A2 print PDF, high-res PNG, digital PDF, SVG master |
| `assets/carousel/` | 7-slide LinkedIn carousel — PNGs + merged PDF |
| `landing-page/` | Full responsive landing page (desktop + mobile) with the complete Request-an-Invitation form |
| `invitations/` | Save the date, digital invitation, email invitation (inlined for email clients), print PDF invitation |
| `social-toolkit/` | 7 reusable announcement/countdown/recap templates with swappable placeholder copy |
| `event-experience/` | Physical signage and slide templates: welcome sign, registration desk sign, name badge, name/table cards, menus, wayfinding, presentation slide templates, closing slide, partner acknowledgement slide |
| `press-kit/` | Press kit cover, media fact sheet, speaker profile, partner profile |

Every folder has its own `README.md` with the exact file list, dimensions,
and (where relevant) how to re-run the Playwright export scripts.

## Format note

The brief asks for editable Figma files across most deliverables. This
repo doesn't have Figma access, so the editable source in every case is
clean HTML/CSS or SVG instead — `assets/poster/poster-master.svg` and the
various `*-master.html` / template `.html` files import into Figma readily
and are easier to keep in sync with the shared token system than a
separate Figma file would be. PNG and PDF exports are generated from
these sources via a Playwright render script in each folder, not hand-built
separately, so regenerating any deliverable is a one-command re-render
after editing its HTML/CSS source.

## No photography, by design

No photography appears anywhere in this launch system — that's
intentional per the brief (mystery is part of the launch). When speakers
and Founding Cultural Partners are ready to be announced, the recommended
visual approach (single subject, tight crop, duotone treatment in
Bluemind Blue, no environmental backgrounds) is documented verbatim in
`design-system/docs.html` and `social-toolkit/README.md` so it's applied
consistently the first time photography enters the system.
