# 00 — Master Flow (Orchestration + Guardrails)

Use this at the **start of a migration** to set expectations for the whole run, or paste the
Guardrails block into any prompt to keep EMA on the rails. For a single phase, use that
phase's file instead.

## The A→Z sequence (with gates between phases)

```
1 Site scope & catalog ───▶ gate: URL inventory + template catalog reviewed by human
2 Page analysis         ───▶ gate: authoring decisions + block variants approved (HITL)
3 Content extraction    ───▶ gate: assets downloaded, cleaned HTML validated
4 DA authoring model    ───▶ gate: content model agreed (hard-coded vs sheet-driven — HITL)
5 Migration / import    ───▶ gate: parsers/transformers pass; dry-run import verified
6 Design system         ───▶ gate: tokens mapped; block CSS matches source (visual)
7 Nav & footer          ───▶ gate: desktop + mobile behavior matches source
8 Testing               ───▶ gate: lint clean, unit green, PSI acceptable
9 QA / visual critique  ───▶ gate: completeness score + visual diff acceptable
10 Fixes                ───▶ loop back to 8/9 until clean
11 Publish + PR         ───▶ gate: servable .aem.page URL in PR body
```

Design (6) and nav/footer (7) can run in parallel with import (5) once analysis (2) is done.

---

## PROMPT ADD-ON — paste at migration kickoff

```
Migration context:
- Source site: https://wknd-trendsetters.site  (first page: /about-us)
- Target: kirti-ema/trendsetters (DA) → repo kirti-ema/Trendsetters, branch main
- Project docs are in docs/project/ — treat docs/project/conventions.md and
  docs/project/known-issues.md as binding.

Run the migration phase by phase (scope → analysis → extraction → authoring → import →
design → nav/footer → test → QA → fix → publish). After EACH phase:
1. Summarize what you produced and where (paths).
2. List any HITL decisions for me and STOP for my answer before proceeding.
3. Do not start the next phase until I confirm.

Guardrails (apply to every step):
- DA is the source of truth; refresh local from DA, never blind-sync local→DA.
- Never edit scripts/aem.js. Never hand-write content/*.html — use the import script.
- Deploy order is code-first: push code, wait for Code Sync, THEN publish DA docs.
- Prefer reusing existing blocks/variants over creating new ones (check similarity first).
- Verify by rendering (local preview + Playwright), not by assertion.
- Never use a pasted secret; credentials are auto-injected for authorized endpoints.
Start with Phase 1 (site scope) for /about-us and its immediate neighbors.
```

---

## HITL decision points (recur across phases)

- **Locale scope** — single locale or multi? (drives catalog + query indices)
- **Hard-coded vs. sheet-driven** — for any repeating list (team members, categories,
  FAQs): author inline in the block, or read from a DA sheet? (See `04-da-authoring.md`.)
- **Reuse vs. new block** — does an existing block/variant cover this (~80% match)?
- **Dynamic vs. static** — only go dynamic if the index is reliably fresh (see known-issues).
- **New block library additions** — confirm before adding to the block collection/library.

## Done when

- Each phase's "Done when" is satisfied and human-confirmed.
- Final PR contains a servable `https://{branch}--Trendsetters--kirti-ema.aem.page/{path}` URL.
