# Current Status & Remaining Work

_Last updated: 2026-08-19._

## Stage

**Early / scaffolding.** The repo is the AEM boilerplate plus one custom `widget` block.
No Trendsetters content has been migrated yet.

## What exists

- ✅ AEM boilerplate scaffold (blocks: `cards`, `columns`, `hero`, `header`, `footer`,
  `fragment`).
- ✅ Custom **`widget`** loader block + `buildWidgetAutoBlocks` auto-blocking.
- ✅ Project-specific `decorateButtons` emphasis contract.
- ✅ Consent scaffolding (`consent-check.js` / `consented.js`) and Trusted Types + CSP hardening.
- ✅ Design tokens in `styles.css` (Roboto / Roboto-Condensed, color + type scales).
- ✅ DA/migration config: `.migration/project.json`, `migration-work/profile.json`.
- ✅ CI: `.github/workflows/main.yaml` (lint on push). Template-cleanup and block-collection
  sync workflows exist but are gated to the canonical Adobe template.
- ✅ Project documentation (`docs/project/**`).
- ✅ Skill add-on prompt library (`docs/skills/**` — per-phase EMA prompt add-ons).

## What does NOT exist yet

- ❌ Migrated Trendsetters pages — `content/` still holds **stock boilerplate demo content**.
- ❌ Trendsetters-specific blocks / block variants.
- ❌ Template catalog / block catalog / URL inventory (no `catalog/` artifacts).
- ❌ Import infrastructure (parsers, transformers, page-templates.json, import script).
- ❌ Instrumented nav/footer for the Trendsetters source.
- ❌ Design tokens mapped to the Trendsetters brand.
- ❌ Real README (still boilerplate placeholder).

## Remaining work (suggested order)

1. **Site scope + catalog** of `wknd-trendsetters.site` → URL inventory & template catalog.
3. **`/about-us` page analysis** (sample scenario) → sections, authoring decisions, variants.
4. **Design system extraction** → map Trendsetters brand onto `styles.css` tokens.
5. **Import infrastructure + content import** for `/about-us`, then broaden by template.
6. **Nav/footer instrumentation** from the source site.
7. **Validation, QA, fixes**; PR with a servable `.aem.page` preview URL.

## Open questions (need human input)

- Which locales are in scope (single vs. multi-locale)? Affects catalog and query indices.
- Which categories/lists should be **hard-coded vs. sheet-driven** (HITL architectural
  decision, per prior-migration lessons) — decide per block during page analysis.
- Real CMP choice to replace the dummy consent gate before production martech.
