# THE SALON by Bluemind Foundation — Landing Page

This is the public landing page for the inaugural edition of **THE SALON**,
an invitation-only gathering convened by Bluemind Foundation on
**17 September 2026** in New York.

It is one of five parallel workstreams building a shared visual-identity
system in this repository. It consumes the shared design system
(`design-system/tokens.css`) and does not redefine any of it, except for
one new page-local accent token — see "Ochre" below.

This page has gone through two design-review passes since the first build;
this README describes the **current, third state**. Earlier passes (a
centered small-comb hero on white, a full nav bar with links, a 13-step
form) were superseded — see git history if you need that context.

## Design direction (current)

THE SALON is explicitly **not a new brand** — there is no logo, no nav, no
lockup. The signature is text: "THE SALON" / "Convened by Bluemind
Foundation." The comb is a graphic/architectural element bled across the
hero, not a pictogram. The whole page follows one rule: **one idea per
screen, a lot of space, short text, typography as the graphic device.**
Nothing should read as a conference, a form, or a UNGA side-event.

## Structure

The page is a single scroll, in this order — deliberately short:

1. **Hero** — `THE SALON` / `Convened by Bluemind Foundation.` /
   `September 17, 2026 · New York` (date in ochre) / `By invitation only.`
   / one CTA. Nothing else — no tagline, no UNGA framing. The monumental
   comb crop bleeds off the top-right.
2. **The Idea** — one statement, centered, one screen. No descriptive
   framing paragraph around it.
3. **The Three Acts** — three full-width sequential blocks (not a 3-column
   grid), each roughly one screen tall, separated by a plain hairline. A
   huge low-opacity roman numeral leads each one.
4. **Request an Invitation** — a 5-step guided flow (see below).
5. **Footer** — event name, `New York · September 17, 2026`, contact email.
   No UNGA mention, no venue name.

There is intentionally **no Speakers / Founding Cultural Partners /
Programme section** — those "(to be announced)" placeholders were removed;
they read as "unfinished site." They'll be added back once there's
something real to show.

## No nav, no logo — just one sticky CTA

There is no `<nav>`, no "THE SALON" wordmark-and-comb lockup anywhere in
the chrome, and no in-page links (`#idea`, `#acts`, etc.) — the page is
short enough to just be scrolled. The only persistent UI element is
`#sticky-cta`, a single "Request an Invitation" link:

- Hidden over the hero (which already has its own large CTA).
- Fades in once scrolled past ~92% of the hero's height.
- **Hides again while `#invitation` is in view** — the guided flow has its
  own per-step buttons, and a floating duplicate CTA would visually
  overlap the fields/buttons there. This is tracked with an
  `IntersectionObserver` on `#invitation` (see the `insideInvitation` flag
  in the inline script), not just a scroll-position threshold.
- **Mobile-first positioning**: a full-width bar pinned to the bottom
  (thumb-reach, since most visitors will open this from a phone), which
  becomes a small discreet pill in the top-right corner at `≥900px`.

## Hero — monumental comb

The comb is an original silhouette (not traced from any reference image):
a rectangle with a large circle subtracted from its corner (creating the
concave "hollow"), plus straight tapered teeth below — built as one
`<svg viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMin slice">`. On
desktop it covers the entire hero (`.hero-v2-comb-wrap { inset: 0 }` at
`≥900px`) so the circle always stays circular regardless of viewport
aspect ratio, cropped/anchored to the top-right. On mobile it's a smaller,
separately-positioned corner accent (`top/right/width/height`, not
`inset: 0`) so the composition doesn't try to force the same wide-aspect
crop into a narrow portrait screen.

**Do not give `.hero-v2-comb-wrap` both an `inset` and an explicit
`width`/`height` in the same rule** — `inset` sets all four offsets, which
over-constrains the box and silently breaks the intended crop (this
happened once already during review; the fix is documented inline in
`styles.css`).

There is deliberately **no interior cutout/logo shape** in the comb's
handle — a flat, solid mass with just the one hollow.

### Typographic details

- Extra spacing between "A" and "L" in SALON (`.lw { margin-left: 0.05em
  }`) — they sat too close at this scale.
- **O+N ligature** (off by default): add `class="join-on"` to the "O" span
  to pull the "N" toward it (`.join-on + .ls { margin-left: -0.06em; }`) —
  a subtle touch between the O's bowl and the N's stem, not an overlap.
- **Vertical micro-position**: add `transform: translateY(±28px)` to
  `.hero-v2-content` to test the hero shifted up/down against the comb's
  hollow, if the current (flex, bottom-anchored on mobile / centered on
  desktop) position isn't preferred.

### Ochre — a new, deliberate accent

`--color-ochre: #c6883e`, defined locally in this file's `:root` (not in
the shared `design-system/tokens.css`), used only for the event date. This
is **not a placeholder** like the blue hex/font/comb are — it's an
explicit art-direction decision. It's scoped to this page only for now;
promote it into the shared tokens if/when this direction rolls out to the
rest of the system.

## Request an Invitation — 5-step guided flow

Rebuilt around SurveyMonkey/Typeform-style fluidity (interaction only, not
their visual style — everything still reads as THE SALON's own minimal,
editorial system):

- **Step 0** (intro, unnumbered) — short framing + "Begin".
- **01 / 05** — name, email, organization, role, LinkedIn (optional), all
  on one screen ("Tell us who you are").
- **02 / 05** — motivation (300-word soft limit, live counter).
- **03 / 05** — how did you hear about THE SALON (radio group).
- **04 / 05** — who else should be in the room (optional referral fields —
  no branch/skip step; just leave them blank).
- **05 / 05** — how would you like to contribute (checkboxes), the
  capacity-disclaimer consent checkbox, and the final "Request an
  Invitation" submit button, all on one screen.

Compared to the previous 13-step version, the **"how are you connected"
question was dropped** and the founding-contributor step no longer
branches on a yes/no choice — both simplifications per review, since the
optional referral fields can just be left empty.

Implementation notes (unchanged in spirit from before):
- All steps live in one `<form>` with the same field `name`s, stacked in
  a single CSS grid cell (`.flow-steps`) so only the active step is
  visible/interactive. The `mailto:` submission mechanism is unchanged.
- Each step validates its own required fields via `reportValidity()` on
  "Continue →"; the form itself has `novalidate` so an earlier hidden
  step's empty field can never block navigation.
- Enter key advances on single-line text inputs (not `<textarea>`, so
  multi-line entry still works).
- The discreet `01 / 05`-style step counter (`.step-index`) replaces the
  earlier thin progress bar — "très discret," per review, rather than a
  persistent bar.

### The invitation form has no backend

`<form action="mailto:invitations@bluemindfoundation.org" method="get"
novalidate>` — submitting opens the visitor's email client with the
fields encoded as a query string. This is a client-side-only stand-in;
swap it for a real form endpoint before this page goes live.
**`invitations@bluemindfoundation.org` is a placeholder address** — it
must not point at a personal address; swap it for Bluemind's real intake
inbox.

## Deliberate placeholders (do not treat as final)

Everything below is intentionally provisional and inherited from
`design-system/tokens.css` — this page does not introduce anything new
except ochre (see above):

- **Colors** — `--color-blue` (`#14274E`, "Bluemind Blue") is a
  placeholder hex; swap it in `tokens.css` once Bluemind's real brand file
  arrives. Nothing on this page needs to change.
- **Typography** — `--font-display` (Fraunces) and `--font-text` (Inter)
  stand in for Bluemind's real typeface. A separate `@import` in this
  file adds Fraunces weight 700 (for the monumental hero wordmark), since
  `tokens.css` only imports up to 600.
- **The comb graphic** — an original placeholder silhouette, explicitly
  not the real "Heal by Hair" artwork/master visual. Swap the SVG path
  data once the final version is delivered; every place it's used in this
  file references the same shape, so it's a single find-and-replace.
- **No gradients, shadows, or glossy effects, and no gimmick
  animation/effects** anywhere — only quiet fades/rises (`hero-in`,
  `data-reveal`) and simple opacity/transform transitions, all disabled
  under `prefers-reduced-motion: reduce`.

## Files

```
landing-page/
├── index.html            the page (semantic HTML, one long scroll)
├── styles.css             layout / component styles — imports the design system
├── README.md              this file
├── preview-desktop.png     Playwright screenshot, 1440px viewport, full page
└── preview-mobile.png      Playwright screenshot, 390px viewport, full page
```

`index.html` links `../design-system/tokens.css` directly, treated as a
read-only input and never edited here. The comb SVG is inlined directly in
`index.html` rather than referenced via `<img src="…design-system/comb-
placeholder.svg">` — an `<img>` reference to an external SVG cannot
inherit `currentColor` from the host page and would silently render black
instead of Bluemind Blue (this bug existed in an earlier pass and was
fixed by inlining).

## Previewing

Open `index.html` directly in a browser (no build step, no dependencies):

```
open landing-page/index.html          # macOS
xdg-open landing-page/index.html      # Linux
```

Or serve the repo root with any static file server so the relative
`../design-system/…` link resolves, e.g.:

```
npx serve /home/user/test-claudre
```

**Test mobile first.** This page is designed mobile-first (base CSS rules
target small screens; `min-width` media queries layer on desktop
enhancements) because most visitors are expected to arrive from an
invitation link opened on a phone (email/WhatsApp/LinkedIn).

## Visual verification

`preview-desktop.png` (1440px viewport) and `preview-mobile.png` (390px
viewport) are full-page Playwright screenshots taken against the current
`index.html`. Regenerate them after any markup/CSS change with a short
Playwright script pointed at `file://…/landing-page/index.html`, using the
Chromium binary at `/opt/pw-browsers/chromium`. When checking `hero-in`
staggered elements or the sticky CTA's opacity transition, wait at least
~1.5s after page load / class changes before screenshotting — shorter
waits can catch an element mid-animation and look like a bug (faint text,
washed-out button) when it isn't one.
