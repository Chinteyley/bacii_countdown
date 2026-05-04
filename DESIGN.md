# Bac II Countdown — Design System

## Reference
Nothing OS / Nothing Phone Glyph aesthetic. Monochrome, dot-matrix numerals,
corner meta-text, single red indicator.

## Color Strategy
Restrained, achromatic. Dark surface with one red accent used in exactly one
place: a single 6px Glyph-style dot in the top-left status cluster.

## Theme
Dark only. Scene: a Grade-12 student checks the page on their phone in a dim
room at 11pm, half-studying. Dark monochrome reduces eye strain and matches the
industrial Nothing reference. A light variant could ship later but is not v1.

## Tokens

### Surface
- `--ink`: `oklch(0.08 0 0)` — near-black (not `#000`, but achromatic on purpose
  to match the Nothing brand).
- `--ink-deep`: `oklch(0.05 0 0)` — slightly deeper near-black for vignette.
- `--rule`: `oklch(0.22 0 0)` — hairlines.

### Foreground (light on dark)
- `--paper`: `oklch(0.96 0 0)` — primary text (the day number, header label).
- `--paper-muted`: `oklch(0.62 0 0)` — secondary text (target date, time).
- `--paper-faint`: `oklch(0.38 0 0)` — tertiary text (footer, meta).

### Accent
- `--glyph`: `oklch(0.65 0.22 25)` — Nothing red. Used on a single 6px LED-style
  dot in the header. Carries a soft 8–12px halo to feel lit. No other element
  uses it.

## Typography
- **Hero numerals**: Doto (variable, dot-matrix font). The day count uses
  `font-variation-settings: 'ROND' 0` (square dots) at large sizes. Scales via
  `clamp(7rem, 38vw, 22rem)`.
- **Mono labels and meta**: Geist Mono. Uppercase with tracking 0.22–0.4em. Used
  for the header ("Bac II", date), the "days" label, the HH:MM:SS ticker, and
  the footer.
- **Body**: Geist Sans (rarely surfaces — there's almost no body copy).
- Hierarchy: the hero numeral is so large it doesn't need a competing rank. All
  meta is the same small mono size. Hierarchy is by *position* (corners), not
  by size.

## Layout
- Single screen, mobile-first, `min-h-svh`, `flex-col justify-between`.
- Three regions:
  - **Top-left**: status cluster (red dot · "BAC II" · target date below).
  - **Center**: enormous day count + tiny "days" label + small HH:MM:SS row.
  - **Bottom**: corner meta — `ctey.dev` left, version stamp right.
- Corners are the design. Nothing in the middle except the number.
- Generous padding: `px-6` on mobile, `px-10` tablet, `px-14` desktop.

## Background
Subtle dot-pattern wink to the Glyph LED matrix. 0.6px white dots at ~5–7%
opacity on a 28px grid. Faint vignette via radial gradient that darkens corners
slightly.

## Motion
- Day count: `@number-flow/react` rollover, 600ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- Seconds ticker: 240ms ease-out for digit changes.
- Red Glyph dot: optional slow pulse (1.4s) is *off* by default; enable for the
  final 24 hours only (future move).
- Nothing else moves.

## Copy
Three on-screen strings only:
- `BAC II`
- `10 / 08 / 2026 · 07:00 ICT`
- `days`

Plus a footer attribution.

## Future moves (not v1)
- Light theme variant for daytime users.
- Glyph dot pulse on the final 24 hours.
- Dot-matrix Khmer numerals via a custom display variant.
