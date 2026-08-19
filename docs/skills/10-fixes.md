# 10 — Debug & Targeted Fixes

**Goal:** resolve the issues found in QA — blocks, images, CSS, code sync — with verified,
minimal changes, then re-run testing/QA.
**EMA skills:** `excat-eds-debugger`, `excat-visual-critique`.

## PROMPT ADD-ON

```
Fix the issues found in QA for /about-us, one at a time, most severe first.
For each issue:
1. State the root cause (inspect real markup/DOM/computed styles — don't guess).
2. Make the minimal change (block JS/CSS, content via import script, or DA source — NOT
   scripts/aem.js, NOT hand-edited content/*.html for standard pages).
3. Verify by rendering: reload local preview, snapshot DOM, check the specific property.
   For images: assert naturalWidth > 0 and 0 about:error.
4. If it touches DA content, follow code-first deploy order and re-check local↔DA parity.

Report each fix with before/after evidence. Re-run lint after CSS/JS changes.
```

---

## Common issues & fixes (carried from prior migration — verify before applying)

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Image `about:error`, mangled hash chain | Not freshly in DA Media Library | Re-upload to DA; use Media Library **Copy** for authoritative `media_<hash>` URL |
| Image breaks after local→DA sync | Local held compact `/media-da` snapshot | Refresh local from DA (round-trippable form); DA is source of truth |
| Featured/hero image won't load with absolute URL | Absolute `content.da.live` hash-chain | Convert to relative `/media-da/` path |
| Sheet won't load (`faqs-json`) | DA editor mangled `.json`→`-json` | Correct to `.json`; author via DA **source API** |
| PDF opens in-tab / `-pdf` href | Suffix mangling + no download attr | Fix `.pdf` href; add HTML5 `download` attribute |
| `og:image` broken / card image errors | `<img>` placed in a metadata cell | Author image reference as **path text** in metadata |
| Dynamic list stale/empty | Index/metadata publish lag | Prefer **static** authored content until index stabilizes |
| Nested grids on block-authored page | Layout builder fired on block-authored page | Guard the builder with a bail condition (e.g. skip if wrapper already exists) |

---

## HITL decision points

- **Dynamic vs. static** — if a fix depends on index freshness, prefer static (ask first).
- **Content vs. code fix** — is this a DA authoring fix or a block-code fix? Confirm the layer.
- **Scope creep** — fix the reported issue only; flag adjacent problems separately.

## Best practices

- **One fix at a time**, verified by rendering, before the next.
- Inspect before editing (`curl …plain.html`, DOM snapshot, computed styles).
- Respect layer boundaries: `aem.js` off-limits; standard `content/*.html` via import script only.
- After DA content fixes: POST → preview → publish → re-align local (parity).

## Done when

- Each QA issue has a verified fix with evidence; lint clean; QA re-run passes.
