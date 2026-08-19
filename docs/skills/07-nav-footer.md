# 07 — Navigation & Footer Instrumentation

**Goal:** rebuild the source header/nav and footer as EDS blocks driven by
`content/nav.plain.html` and `content/footer.plain.html`, matching desktop + mobile behavior.
**EMA skills:** `excat-navigation-orchestrator`, `excat-footer-orchestrator`.

## Expected output

- `content/nav.plain.html` + `content/footer.plain.html` authored for Trendsetters (the repo
  currently ships the **boilerplate** versions — they must be replaced).
- `blocks/header/*` and `blocks/footer/*` behavior verified against the source.
- Desktop, mobile, and (if present) megamenu interactions mapped from screenshots.

---

## PROMPT ADD-ON — navigation

```
Migrate the header/navigation from https://wknd-trendsetters.site.
Requirement: use screenshots — never assume structure.
1. Capture the nav at desktop AND mobile. Map each item's behavior (link, dropdown,
   megamenu, search). Hover per item if content is revealed on hover.
2. Author content/nav.plain.html to match (sections: brand, nav tree, tools/search).
3. Instrument blocks/header as needed; verify open/close, keyboard, and focus behavior.
4. Compare rendered vs. source at both breakpoints.

Only extract programmatically if the full nav tree is pre-rendered in DOM with no
hover-revealed content; otherwise use Playwright hover per item.
STOP with a before/after comparison at desktop + mobile.
```

## PROMPT ADD-ON — footer

```
Migrate the footer from https://wknd-trendsetters.site.
1. Detect footer sections programmatically; map per-element links + behavior.
2. Author content/footer.plain.html to match; keep legal/consent links working
   (Cookie preferences should hit the consent flow).
3. Verify appearance vs. source at mobile + desktop.
Report the section structure and any dynamic elements.
```

---

## HITL decision points

- **Megamenu vs. simple dropdown** — confirm interaction model per top-level item.
- **Search** — real search integration, or placeholder for now?
- **Consent link** — wire "Cookie preferences" to the dummy consent gate (`?consent=…`) or a
  real CMP once chosen (see `../project/known-issues.md`).
- **Locale switcher** — in scope?

## Best practices

- **Never assume nav structure from a link list** — require screenshot evidence.
- The page being migrated should exist before instrumenting nav that links to it.
- Preserve accessibility: keyboard navigation, ARIA on menus, visible focus.
- Keep header markup lean — it's on every page and affects CLS/LCP.

## Done when

- `nav.plain.html` / `footer.plain.html` reflect Trendsetters (not boilerplate).
- Desktop + mobile behavior matches source; consent/legal links work.
