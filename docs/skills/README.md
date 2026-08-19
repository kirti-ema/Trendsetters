# Skill Add-Ons — EMA Prompt Library

Reusable **prompt add-ons** for driving the Trendsetters migration with EMA. Each file
covers one phase of the A→Z flow. They **complement** EMA's built-in skills (site-catalog,
site-migration, page-analysis, import-infrastructure, visual-critique, …) — they don't
replace them. Think of each as a paste-in block that pins down scope, conventions, HITL
decisions, and "done" criteria so EMA behaves consistently and produces production-grade output.

## How to use

1. Pick the phase you're in (see the flow below).
2. Open that file, copy the **PROMPT ADD-ON** block, fill the `{{placeholders}}`, and paste
   it into your EMA prompt (usually after a one-line task like "Analyze /about-us").
3. Answer the **HITL decision points** when EMA surfaces them.
4. Check the **Done when** list before moving on.

Every add-on assumes the project context in [`../project/`](../project/README.md) is loaded
(conventions, architecture, known issues). Where an add-on repeats a rule, it's because that
rule is load-bearing for the phase.

## The flow

| # | File | Phase | Primary EMA skill(s) |
| --- | --- | --- | --- |
| 0 | [`00-master-flow.md`](./00-master-flow.md) | End-to-end orchestration + guardrails | site-migration |
| 1 | [`01-site-scope.md`](./01-site-scope.md) | Site scope & catalog | site-scope, url-discovery, site-catalog |
| 2 | [`02-page-analysis.md`](./02-page-analysis.md) | Page analysis & authoring decisions | page-analysis, authoring-analysis |
| 3 | [`03-content-extraction.md`](./03-content-extraction.md) | Scrape & extract content/assets | scrape-webpage |
| 4 | [`04-da-authoring.md`](./04-da-authoring.md) | DA.live authoring & parity | (DA source API + content-modeling) |
| 5 | [`05-migration-import.md`](./05-migration-import.md) | Import infrastructure + content import | import-infrastructure, import-script, content-import |
| 6 | [`06-design-system.md`](./06-design-system.md) | Design tokens & block styling | complete-design-expert, block-design-expert |
| 7 | [`07-nav-footer.md`](./07-nav-footer.md) | Nav & footer instrumentation | navigation-orchestrator, footer-orchestrator |
| 8 | [`08-testing.md`](./08-testing.md) | Testing (unit, browser, lint, PSI) | testing-blocks |
| 9 | [`09-qa-visual-critique.md`](./09-qa-visual-critique.md) | QA & visual critique vs source | import-validation, visual-critique |
| 10 | [`10-fixes.md`](./10-fixes.md) | Debug & targeted fixes | eds-debugger |
| — | [`11-publish-pr.md`](./11-publish-pr.md) | Deploy order, publish, PR gate | (deploy workflow) |

## Global guardrails (true for every phase)

- **DA is source of truth.** Refresh local ← DA; never blind-sync local → DA. `content/**` is git-ignored.
- **Never** edit `scripts/aem.js`; **never** hand-write `content/*.html` (use the import script).
- **Code-first deploy order:** push code → wait ~30s for Code Sync → then POST/preview/publish DA.
- **PRs need a servable `.aem.page` preview URL** or they're rejected.
- **Never paste/use secrets** — credentials are auto-injected for authorized endpoints.
- **Verify by rendering** (local preview + Playwright), not by assertion.
- **HITL:** when an architectural choice appears (hard-coded vs. sheet-driven, new vs. reused
  block, locale scope, dynamic vs. static), STOP and ask the human — don't guess.

## Sample scenario used throughout

Source: `https://wknd-trendsetters.site/about-us` → target path `/about-us` in
`kirti-ema/trendsetters` (DA), served at `https://main--Trendsetters--kirti-ema.aem.page/about-us`.
