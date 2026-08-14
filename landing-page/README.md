# THE SALON by Bluemind Foundation — Landing Page

This is the public landing page for the inaugural edition of **THE SALON**,
an invitation-only cultural gathering convened by Bluemind Foundation on
**17 September 2026** in New York, at Praxis' NYC HQ, during the 81st UN
General Assembly.

It is one of five parallel workstreams building a shared visual-identity
system in this repository. It consumes the shared design system and does
not redefine any of it.

## Files

```
landing-page/
├── index.html            the page (semantic HTML, one long scroll)
├── styles.css             layout / component styles — imports the design system
├── README.md              this file
├── preview-desktop.png     Playwright screenshot, 1440px viewport, full page
└── preview-mobile.png      Playwright screenshot, 390px viewport, full page
```

`index.html` links `../design-system/tokens.css` and `../design-system/
comb-placeholder.svg` directly — those two files are treated as read-only
inputs and are never edited or duplicated here.

## Structure

The page is a single scroll, in this order:

1. **Hero** — first screen only: "THE SALON", "Convened by Bluemind
   Foundation", the comb graphic (large, centered, treated as art), the two
   tagline lines, and a hairline "Register" button that smooth-scrolls to
   the invitation form. Deliberately the most minimal screen on the page.
2. **The Idea** — the framing statement.
3. **The Three Acts** — three editorial blocks (Act I: The Evidence, Act
   II: From Evidence to Infrastructure, Act III: La Clairière), laid out as
   three columns with hairline dividers on desktop and stacked with
   horizontal hairline dividers on mobile. No card or shadow styling.
4. **Speakers** — text-only placeholder, "(to be announced)".
5. **Founding Cultural Partners** — same placeholder treatment.
6. **Programme** — same placeholder treatment.
7. **Request an Invitation** — the fully built form (see below).
8. **Footer** — event name, date, city, and a mailto contact line.

## UX layer (added in the second design pass)

A modern-editorial interaction layer sits on top of the structure above,
built with plain CSS transitions/keyframes and a small vanilla-JS file
inlined at the bottom of `index.html` (no framework, no build step, no new
dependency):

- **Fixed nav** — a slim top bar (comb mark + "The Salon", nav links,
  "Request an Invitation" as a hairline button) that stays transparent over
  the hero and gains a solid background + hairline bottom border once the
  page scrolls past ~40px, tracked in JS by toggling a single `.is-scrolled`
  class. On screens ≤720px it collapses to a hamburger (`#nav-toggle`) that
  opens a full-screen hairline-divided menu; `Escape` or clicking a link
  closes it.
- **Scroll progress** — a 2px hairline at the very top of the viewport that
  fills left-to-right as the page is read (`transform: scaleX()`, updated
  on scroll via `requestAnimationFrame` so it never runs more than once per
  frame).
- **Active-section nav state** — an `IntersectionObserver` watches `#idea`,
  `#acts` and `#invitation` and underlines the matching nav link as each
  section crosses the middle of the viewport.
- **Scroll-reveal** — any element with a `data-reveal` attribute starts
  faded/lowered and animates to its resting state the first time it enters
  view (`IntersectionObserver`, one-shot — it unobserves after revealing).
  The three Act cards stagger via a `--delay` custom property so they
  cascade in left-to-right rather than popping in together.
- **Hero entrance** — the hero's own elements (eyebrow, "Convened by…",
  comb, taglines, Register button, scroll cue) fade/rise in on page load
  in sequence via `animation-delay`, driven by the same `--delay` pattern
  as the act cards — no JS needed for this part, pure CSS.
- **Ghost act numerals** — a large, very-low-opacity (`0.06`) "I" / "II" /
  "III" sits behind each Act card's copy (`--color-blue`, no gradient — a
  flat, quiet layering device, purely typographic).
- **Comb-motif divider** — a small inline SVG of evenly-spaced vertical
  hairlines (an abstraction of the comb's own teeth) replaces the plain
  `<hr>` between the Speakers / Founding Cultural Partners / Programme
  placeholder sections, tying the page's rhythm back to the hero mark
  instead of using a generic rule.
- **Back-to-top** — a small hairline square, bottom-right, fades in once
  you've scrolled past ~60% of the viewport height.
- **`prefers-reduced-motion: reduce`** is fully respected: every animation,
  transition and `scroll-behavior: smooth` is disabled and all `data-reveal`
  / hero-entrance elements are shown in their resting state immediately.

None of this introduces a color, gradient, shadow or new font — it's all
built from `design-system/tokens.css` values and plain opacity/transform
motion, which is what "quiet luxury" motion looks like: confident and
inevitable, not flashy.

### Bug fixed in this pass: the comb was rendering black, not blue

The first version of this page loaded the comb via
`<img src="../design-system/comb-placeholder.svg">`. An `<img>` reference to
an external SVG **cannot** inherit `currentColor` from the host page's CSS —
the SVG resolves `fill="currentColor"` against its own document's initial
`color` value, which is black. The comb was silently rendering solid black
everywhere on this page instead of Bluemind Blue. Fixed by inlining the
`<svg>…</svg>` markup directly in `index.html` (in the hero, and a smaller
copy in the nav mark) so it correctly inherits `color: var(--color-blue)`
from its parent. If you add the comb anywhere else on this page, inline it
rather than referencing it with `<img src="…">`.

## The "(to be announced)" sections

Speakers, Founding Cultural Partners and Programme are intentionally
**text-only** — quiet italic serif type, not empty photo grids or avatar
placeholders. This is a deliberate launch-strategy choice: no photography
appears anywhere on the page, because none exists yet (speakers and
partners have not been announced) and because mystery is part of how this
launch is meant to feel. Empty image grids would read as "unfinished
website"; quiet typography reads as "more to come, by design."

## The invitation form

The form at `#invitation` is real and fully built, but has **no backend**:

- `<form action="mailto:invitations@bluemindfoundation.org" method="get" novalidate>`
  — submitting opens the visitor's email client with the form fields
  encoded as a query string on a `mailto:` link. This is a client-side-only
  stand-in; browser support for `mailto` + `GET` form submission varies
  (Chrome and Firefox both open a compose window with the encoded fields;
  behavior is not identical everywhere), so this should be swapped for a
  real form endpoint (e.g. a serverless function, Typeform-style service,
  or CRM webhook) before this page goes live. `action="#"` was the other
  option considered; `mailto:` was chosen so a submission is not
  completely silent while there is no backend.
  **`invitations@bluemindfoundation.org` is a placeholder address** — swap
  it for Bluemind Foundation's actual intake inbox before this page is
  used for anything real; it must not point at a personal address.
- Validation is **client-side only**: native HTML `required` and `type`
  attributes (`email`, `url`) plus a small inline script that:
  - live-counts words in the "why would you like to join" textarea and
    shows "`n / 300 words`" as a soft, non-blocking note (it does not
    prevent submission over the limit — the brief calls for a soft limit,
    not a hard one);
  - reveals a "please specify" text input when "Other" is selected in the
    "how did you hear," "how are you connected," and "how would you like
    to contribute" groups, and clears/hides it again if "Other" is
    deselected.
- Field grouping mirrors the brief exactly: **Your Information**, **About
  You**, **Become a Founding Contributor (Optional)**, then the required
  capacity-disclaimer checkbox and the submit button.
- "How did you hear…" is a radio group (single choice); "How are you
  connected…" and "How would you most like to contribute…" are checkbox
  groups (multiple choice), since a person can plausibly sit in more than
  one category or want to help in more than one way.

## Deliberate placeholders (do not treat as final)

Everything below is intentionally provisional and inherited from
`design-system/tokens.css` — this page does not introduce anything new:

- **Colors** — `--color-blue` (`#14274E`, "Bluemind Blue") is a placeholder
  hex; swap it (and the other three color tokens) in `tokens.css` once
  Bluemind's real brand file arrives. Nothing in this page needs to change.
- **Typography** — `--font-display` (Fraunces) and `--font-text` (Inter)
  stand in for Bluemind's real typeface, not yet delivered.
- **The comb graphic** — `comb-placeholder.svg` is explicitly a stand-in
  for the real "Heal by Hair" comb artwork, pending an artist redesign. It
  is used here as the large, centered hero image, treated as art rather
  than as a logo mark.
- **No gradients, shadows, or glossy effects** anywhere on the page — the
  design system enforces this by simply not defining any; this page
  follows suit. Buttons are hairline-bordered text buttons with a
  color-invert hover state on pointer devices only (`@media (hover:
  hover)`), never a filled default state.

## Previewing

Open `index.html` directly in a browser (no build step, no dependencies):

```
open landing-page/index.html          # macOS
xdg-open landing-page/index.html      # Linux
```

Or serve the repo root with any static file server so the relative
`../design-system/…` links resolve, e.g.:

```
npx serve /home/user/test-claudre
```

## Visual verification

`preview-desktop.png` (1440px viewport) and `preview-mobile.png` (390px
viewport) are full-page Playwright screenshots taken against the current
`index.html`, used to check for overlap, clipping, or broken layout before
this page was considered done. Regenerate them after any markup/CSS change
with a short Playwright script pointed at
`file://…/landing-page/index.html`, using the Chromium binary at
`/opt/pw-browsers/chromium`.
