# 06 — Design System & Block Styling

**Goal:** map the source site's brand onto the project's design tokens, then style blocks to
match the source (computed-style accurate, responsive, accessible).
**EMA skills:** `excat-complete-design-expert`, `excat-block-design-expert`, `excat-visual-critique`.

## Expected output

- Updated `:root` tokens in `styles/styles.css` (colors, fonts, type scale, spacing).
- Per-block CSS matching the source's computed styles, scoped to `.{blockname}`, mobile-first.
- Visual verification (source vs. rendered) with iterations.

---

## PROMPT ADD-ON — site tokens

```
Extract the design system from https://wknd-trendsetters.site and map it onto our tokens.
1. Pull the source's brand palette, font families, type scale, and key spacing.
2. Map them onto existing :root custom properties in styles/styles.css
   (--background-color, --text-color, --link-color, --heading-font-family, the font-size
   scale, --nav-height). Add NEW tokens in :root only when nothing existing fits.
3. Do NOT hard-code colors/sizes inside blocks — reference var(--token).
4. Keep Roboto fallbacks working unless the brand font requires changes.

Show me the token diff before applying, then apply and reload the local preview.
```

## PROMPT ADD-ON — block styling

```
Style the {{block}} block to match its counterpart on https://wknd-trendsetters.site/about-us.
1. Extract exact computed styles from the source element (spacing, colors, radii, shadows,
   typography, breakpoints).
2. Write CSS scoped to .{{block}}, mobile-first with min-width media queries at 600/900/1200px.
3. Use design tokens where they exist; avoid new one-off values.
4. Visually verify against the source (up to 3 iterations); report remaining diffs.
```

---

## HITL decision points

- **Token vs. one-off** — introduce a new global token, or keep a value block-local? (Prefer
  a token when it recurs.)
- **Brand font adoption** — swap Roboto for the source's font, or approximate with fallbacks?
- **Pixel-parity threshold** — how close must it match before "good enough"?

## Best practices

- **Token-first:** never hard-code a color/size a block could share. All in `:root`.
- **Mobile-first**, breakpoints at 600 / 900 / 1200px. Scope every selector to `.{blockname}`.
- Avoid `{blockname}-wrapper` / `{blockname}-container` class names (reserved by sections).
- Use text-based inspection (snapshot + computed styles) for routine checks; **screenshots
  only for final pixel QA** — they're token-expensive.
- Keep LCP-critical styling in `styles.css`; below-the-fold in `lazy-styles.css`.

## Done when

- Tokens mapped; blocks match the source within the agreed threshold across breakpoints.
- No hard-coded values that should be tokens; CSS lints clean.
