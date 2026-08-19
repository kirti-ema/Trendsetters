# Architecture

## Repository structure

```
├── blocks/            # Reusable content blocks (see inventory below)
│   └── {name}/{name}.js + {name}.css
├── scripts/
│   ├── aem.js           # Core EDS decoration library — NEVER MODIFY
│   ├── scripts.js       # Page decoration entry point + project customizations
│   ├── consent-check.js # Dummy CMP / consent gate (loaded delayed)
│   └── consented.js     # Scripts that require consent (analytics/martech) — currently empty
├── styles/
│   ├── styles.css        # Global styling + design tokens (LCP-critical)
│   ├── lazy-styles.css   # Below-the-fold styling
│   └── fonts.css         # Font-face definitions
├── content/             # DA-authored content mirror (GIT-IGNORED, DA is source of truth)
├── fonts/  icons/       # Web fonts, SVG icons
├── head.html            # Global <head> (CSP, viewport, core scripts/styles)
├── 404.html
├── .migration/project.json      # DA org/site/content-host config
└── migration-work/profile.json  # { org, site } for migration tooling
```

## Three-phase page loading (`scripts.js` → `loadPage`)

1. **Eager** — decorate main, sections, blocks, buttons; load first section for LCP.
2. **Lazy** — remaining content, header, footer, `lazy-styles.css`.
3. **Delayed** — deferred work incl. `import('./consent-check.js')` (martech via consent).

## Blocks inventory

| Block | Origin | Notes |
| --- | --- | --- |
| `cards` | boilerplate | Standard card grid. |
| `columns` | boilerplate | Multi-column layout. |
| `hero` | boilerplate | Hero section. |
| `header` | boilerplate | Nav from `content/nav.plain.html`. |
| `footer` | boilerplate | Footer from `content/footer.plain.html`. |
| `fragment` | boilerplate | Loads `/fragments/*` references (auto-blocked). |
| **`widget`** | **custom** | Generic widget loader — see below. |

> There are **no other custom blocks or variants in this repo yet.** Block variants and
> dynamic blocks referenced in `known-issues.md` are carried lessons from a prior
> migration, not present here.

## The `widget` block (custom loader)

`blocks/widget/widget.js` turns an authored link into a self-contained micro-app:

- **Trigger:** any `<a href*="/widgets/">` — auto-blocked by `buildWidgetAutoBlocks` in
  `scripts.js` (skips links already inside a `.widget`; replaces the wrapping `<p>` when
  the paragraph contains only that link, else replaces the link in place).
- **Loading:** parses the href into `{widgetPath, widgetName}`, then fetches
  `${codeBasePath}/widgets/{path}/{name}.html`, `.css`, and `.js` in parallel; runs the
  widget module's default export against the block element.
- **Config:** query-string params on the href become `data-*` attributes on the block.
- **Shell rewrite:** replaces `widget` / `widget-wrapper` / `widget-container` classes
  with `{name}` / `{name}-wrapper` / `{name}-container`, and sets `data-source`.
- Failures are caught and logged; they never break page decoration.

## Auto-blocking (`buildAutoBlocks` in `scripts.js`)

1. **Fragments** — `a[href*="/fragments/"]` → `fragment` block, inlined via `loadFragment`.
2. **Widgets** — `buildWidgetAutoBlocks` (see above).

Add new auto-block logic here; keep it wrapped in try/catch so a single failure can't
abort decoration.

## Button decoration contract (`decorateButtons`)

Project-specific — links are buttonized **only when authored with emphasis**:

- `**strong**` link → `.button.primary`
- `*em*` link → `.button.secondary`
- `***strong+em***` link → `.button.accent` (high-impact CTA)
- Plain links, image links, and links whose text equals their URL are left alone.

Authors control button styling via Markdown emphasis — document this for content authors.

## Security hardening (beyond stock boilerplate)

- **Trusted Types policy** in `scripts.js`: a `default` policy sanitizes `srcdoc` on
  iframes and strips `<script>` from contextual-fragment / document-write sinks.
- **CSP** in `head.html`: `require-trusted-types-for 'script'`, `object-src 'none'`,
  script nonce `aem`, `move-to-http-header`.
- Do not weaken these without a documented reason.

## Design tokens (`styles/styles.css` `:root`)

- **Fonts:** body = `roboto`; headings = `roboto-condensed` (with Arial size-adjust fallbacks).
- **Colors:** `--background-color`, `--light-color`, `--dark-color`, `--text-color`,
  `--link-color` (`#3b63fb`), `--link-hover-color` (`#1d3ecf`).
- **Type scale:** `--body-font-size-{m,s,xs}`, `--heading-font-size-{xxl…xs}`; smaller
  values applied at `@media (width >= 900px)`.
- **Layout:** `--nav-height: 64px`.

Reuse these tokens; introduce new tokens in `:root` rather than hard-coding values in
blocks. Migration design work should map the source site's palette/type onto these tokens.
