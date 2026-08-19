# 08 — Testing

**Goal:** validate code changes before QA/PR — lint, unit tests for logic, browser rendering,
and performance.
**EMA skills:** `testing-blocks`.

## Expected output

- `npm run lint` clean (ESLint Airbnb + Stylelint standard).
- Unit tests for pure logic/utilities (kept if reusable; throwaway otherwise).
- Browser render verification via Playwright (DOM snapshot + computed styles).
- PSI / Lighthouse check against the feature preview URL.

---

## PROMPT ADD-ON

```
Test the changes for {{block/page}} before I open a PR.
1. Run `npm run lint`; fix any issues (lint:fix where safe). Report the result.
2. For any non-trivial JS logic (parsing, config extraction), add a focused unit test and
   run it. Note which tests are worth keeping vs. throwaway.
3. Browser-verify in the local preview: load the page, snapshot the DOM to confirm the
   block decorated correctly, and check key computed styles. Use screenshots only if
   pixel-level confirmation is truly needed.
4. Run a PageSpeed/Lighthouse check on the feature preview URL and report scores. Target 100;
   fix regressions in JS/CSS/images.

Report: lint status, test results, render check, PSI scores (mobile + desktop).
```

---

## HITL decision points

- **Keep vs. throwaway tests** — which validations become permanent unit tests?
- **PSI threshold** — hard-require 100, or accept ~99 desktop given known mobile flakiness?

## Best practices

- **Verify by rendering**, not by assertion — snapshot the DOM and check computed styles.
- Prefer **text-based inspection** (snapshot/evaluate) over screenshots (token cost).
- Lint is a **gate**, not a suggestion — `main.yaml` runs it on every push.
- **PSI note:** mobile runs can time out (score 0) while desktop is ~99 — rerun before
  treating as a regression (see `../project/known-issues.md`).
- Keep JS bundle small (no deps); rely on per-block code splitting.
- Check accessibility: heading hierarchy, alt text, ARIA, focus.

## Done when

- Lint clean, logic tests green, block renders correctly in the browser, PSI acceptable.
