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
