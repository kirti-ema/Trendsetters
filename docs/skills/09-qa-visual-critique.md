# 09 — QA & Visual Critique

**Goal:** prove the migrated page matches the source in **content completeness** and
**visual fidelity**, and drive fixes for divergences.
**EMA skills:** `excat-import-validation`, `excat-visual-critique`.

## Expected output

- Content-completeness score per page (source vs. output) with a list of missing/extra items.
- Visual diff (block / section / full-page / full-site) with prioritized issues.
- A fix list handed to `10-fixes.md`.

---

## PROMPT ADD-ON — post-import validation

```
Validate the imported /about-us against the source.
1. Score content completeness: compare source vs. output text, headings, links, images,
   metadata. List anything missing, extra, or reordered.
2. Flag pages/sections that diverge beyond a small threshold.
3. For flagged sections, do a visual critique (rendered vs. source) and list concrete,
   prioritized issues (layout, spacing, color, typography, images).

Report the completeness score + ranked issue list. Do not fix yet — I want to review first.
```

## PROMPT ADD-ON — visual critique (targeted)

```
Critique {{this section | this block | the full page}} of /about-us against
https://wknd-trendsetters.site/about-us.
Give a ranked list of visual differences with the CSS/markup cause for each, most severe
first. Verify each finding by rendering, not assumption.
```

---

## HITL decision points

- **Fidelity bar** — pixel-perfect, or "close enough" for content sections?
- **Intentional deviations** — any brand/layout changes we're deliberately making vs. the source?
- **Fix now vs. backlog** — which divergences block publish vs. can follow later?

## Best practices

- **Completeness before pixels** — missing content is worse than a spacing gap.
- Assert **`about:error` count == 0** and **`naturalWidth > 0`** for every image (broken-image
  detection — see `../project/known-issues.md`).
- Verify metadata renders correctly (`og:image` from path text, not `<img>`).
- Use screenshots sparingly; do most comparison via DOM snapshot + computed styles.
- Rank issues by severity so fixes are ordered, not shotgunned.

## Done when

- Completeness score is acceptable and human-approved.
- Visual issues are ranked and triaged into fix-now vs. backlog.
