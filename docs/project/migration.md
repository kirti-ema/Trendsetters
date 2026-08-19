# Migration Workflow (A → Z)

How content is migrated from the source site (`wknd-trendsetters.site`) into this EDS +
DA.live project. Each phase names the EMA skill that drives it. A companion library of
**prompt add-ons** (one per phase) will live under `docs/skills/`.

## Phase map

| # | Phase | EMA skill(s) | Output |
| --- | --- | --- | --- |
| 1 | **Site scope** | `excat-site-scope`, `excat-url-discovery` | URL inventory, migration scope report |
| 2 | **Template / site catalog** | `excat-site-catalog`, `excat-site-analysis` | Template + block catalog, page-templates skeletons |
| 3 | **Page analysis** | `excat-page-analysis`, `authoring-analysis` | Section/sequence structure, authoring decisions, block variants |
| 4 | **Design / styling** | `excat-complete-design-expert`, `excat-block-design-expert` | Design tokens + block CSS matching source |
| 5 | **Import infrastructure** | `excat-import-infrastructure`, `import-parser`, `import-transformer`, `block-mapping-manager` | Parsers, transformers, page-template block maps |
| 6 | **Import script + content import** | `excat-import-script`, `excat-content-import` | Bundled import script + imported pages in DA |
| 7 | **Header / footer** | `excat-navigation-orchestrator`, `excat-footer-orchestrator` | Instrumented nav + footer |
| 8 | **Validation / QA** | `excat-import-validation`, `excat-visual-critique`, `testing-blocks` | Completeness scoring, visual diff, lint/PSI |
| 9 | **Fixes** | `excat-eds-debugger`, `excat-visual-critique` | Targeted corrections |
| 10 | **Publish** | (deploy order below) | Live pages, PR with preview URL |

## Deploy order (critical sequence)

1. **Push code first** — branch → PR → `main`; wait ~30s for AEM Code Sync.
2. **POST / preview / publish DA docs** — only after the code they depend on has landed.
3. **Gate check** — PR body must contain a bulleted, servable `.aem.page` preview URL.

## DA authoring & parity rules

- **DA is the source of truth.** Prefer **DA → local refresh** over local → DA sync.
- Local↔DA durability: local files hold the bare inner `<div>…</div>`; DA docs wrap that
  inner in `<body><header></header><main>…</main><footer></footer></body>`. Verify parity
  (local file == DA `<main>` inner) before trusting a sync.
- Upload/publish a page to DA (credentials auto-injected — no `Authorization` header):
  ```sh
  curl -X POST -F "data=@{file}.html;type=text/html" \
    "https://admin.da.live/source/kirti-ema/trendsetters/{path}.html"
  ```
- Preview / publish via `admin.hlx.page`:
  ```sh
  curl -X POST "https://admin.hlx.page/preview/kirti-ema/Trendsetters/main/{path}"
  curl -X POST "https://admin.hlx.page/live/kirti-ema/Trendsetters/main/{path}"
  ```
- If any admin call returns 401/403, the credential opt-in is off — the user must enable it
  in Settings → LLM Permissions. **Never ask for or use a pasted token.**

## Image handling (from prior-migration lessons)

- **Preferred:** DA Media Library → **Copy** to get an authoritative
  `https://main--Trendsetters--kirti-ema.aem.live/media_<hash>.ext` URL; author as
  `<picture><img src="…" alt="" loading="lazy"></picture>`.
- **Fallback:** relative `/media-da/{docpath}/{name}-<hash>.ext` references when the asset
  is not in the library.
- **Sync-safety:** before local → DA sync, confirm local carries DA's round-trippable
  fallback form (not a compact `/media-da` snapshot), or the image breaks on re-POST.
- Card/teaser images referenced in metadata must be **path text**, never `<img>`.

## Verification recipe (per fix)

1. POST fixed source to DA → expect 200.
2. Preview (`admin.hlx.page/preview/...`) → 200 (publish with `/live/...`).
3. Fetch `…aem.page/{path}.plain.html` → assert broken-image markers count == 0.
4. Playwright: navigate, force image load, assert `naturalWidth > 0` and 0 `about:error`.
5. Re-align local file to DA `<main>` inner (parity).

## Content-import rule

Never write `content/*.html` by hand. Generate content with the project's bundled import
script and the `run-bulk-import.js` helper (from the content-import skill). See
[`docs/skills/`](../skills/README.md) for the per-phase prompt add-ons that drive each phase.
