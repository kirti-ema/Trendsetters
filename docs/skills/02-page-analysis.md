# 02 — Page Analysis & Authoring Decisions

**Goal:** decompose one page into sections and content sequences, decide **default content
vs. block** for each sequence, and identify/reuse block variants.
**EMA skills:** `excat-page-analysis`, `authoring-analysis`, `block-inventory`, `content-modeling`.

## Expected output

- Section boundaries + per-section content sequences (neutral descriptions).
- Authoring decision per sequence: **default content** (heading/text/list/image/button) vs.
  **block** (which block + variant).
- Block-variant reuse report (existing variant matched, or new variant proposed).
- Analysis artifacts (JSON, screenshots, cleaned HTML) — no import infra yet.

---

## PROMPT ADD-ON

```
Analyze https://wknd-trendsetters.site/about-us for EDS authoring.
1. Split into sections (top-level bands). For each: purpose + section-style hints
   (e.g. highlight, dark) if any.
2. Within each section, list content sequences in reading order with neutral descriptions.
3. For each sequence decide: default content OR a block. If a block, name it and check the
   existing block palette FIRST (blocks/ + Block Collection). Only propose a NEW variant if
   nothing matches ~80%; justify why.
4. Flag anything the importer can't produce cleanly (dynamic lists, sheet-driven data,
   tabbed filters, accordions) as a manual/exception item.
5. Save analysis artifacts (JSON + screenshots + cleaned HTML).

STOP and give me:
- The section/sequence map with default-vs-block decisions
- New variants proposed (with justification) vs. reused
- Every repeating list, and your recommendation: hard-code inline vs. DA sheet
Wait for my approval before generating any block code or import infrastructure.
```

---

## HITL decision points (critical for /about-us)

- **Repeating lists → hard-coded vs. sheet-driven.** e.g. a team/leadership grid or values
  list on `/about-us`: author inline in a `cards` block (simple, static, no index
  dependency) **or** read from a DA sheet (scales, editable without touching the page)?
  Default recommendation: **hard-code** unless the list is long, frequently edited, or
  reused across pages — because dynamic/index-backed data has freshness risk (see
  `../project/known-issues.md`).
- **New vs. reused block/variant** — approve each proposed new variant.
- **Section styling** — which sections get a section-style (highlight/dark/etc.)?
- **Default content vs. block** — don't over-block; prose + images should stay default content.

## Best practices

- Inspect real markup: `curl http://localhost:3000/about-us.plain.html` before deciding.
- Favor **default content** for headings/paragraphs/simple images — blocks add cost.
- Keep the **author↔developer contract** simple; fewer, well-named cells beat many.
- Note author ergonomics: how will someone edit this in DA without training?

## Done when

- Section/sequence map with authoring decisions is approved by the human.
- Variant reuse-vs-new decisions are made.
- Hard-coded vs. sheet-driven decided for every repeating list.
