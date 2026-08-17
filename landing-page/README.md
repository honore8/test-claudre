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

## Hero — the master visual comb

The comb went through four versions on this page. The current one
(fourth) is Landry's **cleanest export** — a single continuous outline —
supplied directly as SVG and inlined verbatim in `index.html`:

1. An original placeholder shape (a rectangle with a circle subtracted
   from its corner, plus tapered teeth) — used before any real artwork
   arrived. If you see a reference anywhere to a "hollow" or "rectangle
   minus a circle," it's stale from this pass.
2. Landry's full master-visual artwork (a figure-with-raised-arms
   silhouette transitioning into an afro-pick spine and teeth, three
   separate `<path>`s), `viewBox 0 0 275.75048 607.53936`, cropped/
   positioned via this page's own CSS (`.hero-v2-comb-wrap` offsets).
3. Landry's own pre-cropped export of that same artwork — the same three
   paths, `viewBox 0 0 139.07036 420.37173`, each wrapped in a
   `<clipPath>` (Inkscape's own crop export). This version had a visible
   gap of plain blue between the top wedge and the teeth at the size we
   were using it at — flagged to the client rather than patched
   unilaterally, since it wasn't clear whether that was inherent to
   their crop or a sizing issue on our end.
4. **Current**: Landry supplied a completely different, single-path SVG
   — `viewBox 0 0 152.08364 526.43707`, ONE continuous outline (no
   `<clipPath>`, no multi-path seams). The notch/curve that reads as the
   comb's "hollow" flows directly into the teeth with no gap — this
   resolved the version-3 issue by construction, not by us tuning
   position/size. The notch sits on the shape's LEFT edge (its top and
   right edges are straight lines), so it's positioned facing the text
   block, bleeding its flat top/right edges off the hero.

**Color**: the source files' own fill was `#d88d63` (a warm terracotta)
in versions 2–3; version 4's source used `#333333` (likely just an
Inkscape export default, not a meaningful color). All versions from the
white-color request onward use `style="fill:currentColor"` on the path
plus `.hero-v2-comb-wrap { color: var(--color-white) }` — change both
together if a future review wants a different color.

**Sizing**: `.hero-v2-comb-wrap` uses `aspect-ratio: 152.08364 /
526.43707` (the CURRENT (v4) SVG's own `viewBox` — update this alongside
the SVG itself if Landry sends another version) plus a `width`, rather
than an independent `width` + `height` box, so the artwork is never
stretched (`preserveAspectRatio="xMidYMin meet"` on the `<svg>` handles
this). Separate tuned `top`/`right`/`width` for mobile (base rules) vs.
`≥900px` (desktop override) — both currently keep the shape close to its
natural flush position (`top: 0`, `right` near `0`) since, unlike
versions 2–3, there's no interesting internal crop left to compose via
positioning; the "bleed" mostly reads through the flat top/right edges
naturally leaving frame.

**Do not give `.hero-v2-comb-wrap` both `inset` and an explicit
`width`/`height` in the same rule** if you touch this again — `inset` sets
all four offsets at once and can silently override a `top`/`right` you
meant to keep (this happened once during an earlier pass, when the
wrapper still held the placeholder shape).

### Typographic details

- Extra spacing between "A" and "L" in SALON (`.lw { margin-left: 0.05em
  }`) — they sat too close at this scale.
- **O+N ligature** (off by default): add `class="join-on"` to the "O" span
  to pull the "N" toward it (`.join-on + .ls { margin-left: -0.06em; }`) —
  a subtle touch between the O's bowl and the N's stem, not an overlap.
- **Vertical micro-position**: `.hero-v2-content` already carries
  `transform: translateY(-6vh)` (raises the whole block slightly, per
  review) — adjust that value directly if it needs further tuning against
  the comb artwork's position.

### Ochre — a new, deliberate accent

`--color-ochre: #c6883e`, defined locally in this file's `:root` (not in
the shared `design-system/tokens.css`), used only for the event date. This
is **not a placeholder** like the blue hex/font still are (the comb
artwork is now final, per above) — it's an explicit art-direction
decision. It's scoped to this page only for now; promote it into the
shared tokens if/when this direction rolls out to the rest of the system.

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
- **Typography** — `--font-text` (Inter) still stands in for Bluemind's
  real body typeface; `--font-display` (Fraunces) still stands in
  everywhere it's used (Idea, Acts, form questions, etc.) *except* the
  hero wordmark, which now uses **Lapidary 333 Bold — the client's real
  supplied typeface**, not a placeholder (see "The hero wordmark
  typeface" below).
- **The comb graphic** — final, not a placeholder. Landry's master visual
  artwork (see "Hero — the master visual comb" above; now on its 4th
  supplied version), fill recolored to white per review.
- **No gradients, shadows, or glossy effects, and no gimmick
  animation/effects** anywhere — only quiet fades/rises (`hero-in`,
  `data-reveal`) and simple opacity/transform transitions, all disabled
  under `prefers-reduced-motion: reduce`.

## The hero wordmark typeface

`fonts/Lapidary333-Bold.otf` is the client's own supplied font file
(Lapidary No. 333 Bold), loaded via a page-local `@font-face` in
`styles.css` and applied only to `.hero-v2-title` ("THE SALON"), with
Fraunces as the fallback (`font-family: 'Lapidary 333', var(--font-
display);`). Everything else on the page (Idea, Acts, form, footer)
still uses Fraunces/Inter — this typeface hasn't been rolled out beyond
the hero wordmark. If it should apply more broadly, add more `@font-face`
weights as they're supplied and update the relevant selectors — don't
just swap `--font-display` globally without confirming, since Fraunces
elsewhere hasn't been reviewed against this typeface.

## Files

```
landing-page/
├── index.html            the page (semantic HTML, one long scroll)
├── styles.css             layout / component styles — imports the design system
├── README.md              this file
├── fonts/
│   └── Lapidary333-Bold.otf   client-supplied, hero wordmark only (see above)
├── preview-desktop.png     Playwright screenshot, 1440px viewport, full page
└── preview-mobile.png      Playwright screenshot, 390px viewport, full page
```

`index.html` links `../design-system/tokens.css` directly, treated as a
read-only input and never edited here. The comb SVG is inlined directly
in `index.html` with `fill:currentColor` (white) — this page no longer
references the shared `design-system/comb-placeholder.svg` at all (that
placeholder is still used by the other four workstreams — poster,
carousel, invitations, social-toolkit, event-experience/press-kit — which
haven't received the final master visual yet). An earlier pass on this
page did load the comb via `<img src="…design-system/comb-placeholder.svg">`,
which silently rendered black instead of Bluemind Blue because an `<img>`
reference to an external SVG can't inherit `currentColor` — fixed at the
time by inlining, and inlining remains how the comb is included today.

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
