# 11 — Publish & Pull Request

**Goal:** ship the change in the correct order and open a PR that passes the gate.

## Deploy order (non-negotiable)

1. **Push code first** — feature branch → PR → merge to `main`; wait ~30s for AEM Code Sync.
2. **POST / preview / publish DA docs** — only after the code they depend on has landed.
3. **PR gate** — the PR body must contain a bulleted, **servable `.aem.page` preview URL**.

---

## PROMPT ADD-ON

```
Publish the /about-us migration.
1. Ensure lint is clean and QA passed.
2. Push code to a feature branch and open a PR to main. In the PR body include:
   - Fix #<issue> (if any)
   - Test URL (After): https://<branch>--Trendsetters--kirti-ema.aem.page/about-us
   (A GitHub blob/markdown link is NOT acceptable — must be a servable preview URL.)
3. After code lands on the branch, preview/publish the DA docs:
   - preview: POST https://admin.hlx.page/preview/kirti-ema/Trendsetters/main/about-us
   - live:    POST https://admin.hlx.page/live/kirti-ema/Trendsetters/main/about-us
4. Run `gh pr checks` and report code-sync, lint, and performance status.

Report: branch, PR link, the preview URL used, and check statuses.
If any admin call returns 401/403, tell me to enable the credential opt-in in
Settings → LLM Permissions — do NOT ask me for a token.
```

---

## HITL decision points

- **Merge timing** — merge to `main` now, or hold on the feature branch for review?
- **Publish scope** — publish just `/about-us`, or the whole template batch?

## Best practices

- **Code before content.** Publishing DA docs that reference not-yet-synced code = broken pages.
- Confirm **local↔DA parity** before publishing (see `04-da-authoring.md`).
- Verify the preview URL actually renders before pasting it in the PR.
- Never paste secrets; credentials are auto-injected for authorized `admin.*` endpoints.
- Use `gh pr checks` to confirm Code Sync + lint + PSI before requesting review.

## Done when

- PR open with a servable `.aem.page` preview URL; checks green; pages preview/publish cleanly.
