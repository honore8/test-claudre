# THE SALON — Press Kit Templates

Press-folder collateral for THE SALON by Bluemind Foundation —
September 17, 2026, Praxis' New York HQ, during the 81st UN General
Assembly. Inaugural, invitation-only gathering, ~50 guests.

All pages are **US Letter, 8.5in × 11in, portrait**, set via a CSS
`@page` rule and exported to print-ready PDF at that exact size, plus a
PNG preview. All files import `../design-system/tokens.css` and do not
redefine its tokens. Ink-on-white throughout, matching the rest of the
printed collateral family (see `../event-experience/README.md` for the
one place this system inverts to blue-ground — the projected slides,
which are out of scope for a paper press kit).

The comb mark is inlined as raw SVG rather than referenced via
`<img src="…comb-placeholder.svg">`, so it correctly follows the CSS
`color` of its container (see the note in the event-experience README
for why the `<img>` approach does not reliably carry `currentColor`).

## Files and use

| File | Use |
|---|---|
| `press-kit-cover.html` | Cover / title page for the press folder. "THE SALON" + "by Bluemind Foundation" + date/city/UNGA line, comb large and centered — a title-page treatment. |
| `media-fact-sheet.html` | One-pager: WHAT / WHEN / WHERE / WHO in a quiet label–value list, with the three-act structure summarized in one line each (Act I — The Evidence; Act II — From Evidence to Infrastructure; Act III — La Clairière). Includes a `[ABOUT BLUEMIND FOUNDATION — placeholder]` paragraph and a `[MEDIA CONTACT — placeholder]` footer line. |
| `speaker-profile.html` | Template one-pager: `[Speaker Name]`, `[Role / Title]`, `[Organization]`, and a dashed-outline text-safe area holding `[BIO — 100–150 words]` — the dashed box marks the approximate space a bio of that length will occupy at this type size; it is a design guide, not final ink. **No photo slot** — see note below. |
| `partner-profile.html` | Same template logic for a Founding Cultural Partner: `[Partner Name]` + a dashed-outline `[PARTNER DESCRIPTION — placeholder]` area. Typographic only — no logo, no logo-wall styling. |

Every file above has a matching `.pdf` (exact 8.5in × 11in, via
Playwright + `preferCSSPageSize`) and `.png` preview (deviceScaleFactor 2)
in this same folder.

## Photography — not yet in scope

`speaker-profile.html` intentionally has no photo slot; photography has
not been approved or scoped for THE SALON at the time this template was
built (noted in an HTML comment at the top of that file). Once
photography is approved, add a portrait slot to this template using
whichever duotone-portrait treatment the design system documents for
photographic images elsewhere in this identity system — a plain
photograph would break the "no photography" / "no glossy effects"
restraint this system otherwise holds to.

## Notes for production

- Bracketed placeholders (`[Speaker Name]`, `[PARTNER DESCRIPTION —
  placeholder]`, etc.) are intentional literal template text, matching
  the convention used throughout this design system's other placeholder
  pieces — replace the bracket text itself when populating real copy.
- Colors, typeface stacks, and the comb artwork are placeholders per
  `../design-system/tokens.css` — swap centrally there once Bluemind's
  real brand file and the artist's final comb redesign are delivered;
  nothing in this folder needs to change.
