# Known Issues, Workarounds & Manual Requirements

Two categories below:
- **A. Repo-specific (now):** true of this repo today.
- **B. Carried lessons:** issues + resolutions from a prior comparable EMA migration
  (WKND-style capstone). Not present in this repo yet — treat as cautions and reusable
  patterns. **Verify any named file/block/flag still applies before relying on it.**

---

## A. Repo-specific (current state)

1. **`content/` holds stock boilerplate demo content.** `index/nav/footer.plain.html`
   reference `aem-boilerplate--adobe` and unrelated `mysite--aemtutorial` media, not
   Trendsetters. These must be replaced by migrated content; don't treat them as real.
2. **Only one custom block (`widget`).** Any Trendsetters-specific block/variant must be
   built (or imported from the Block Collection) before content that uses it will render.
3. **Consent is a dummy CMP.** `consent-check.js` defaults to *declined*; override with
   `?consent=accept`. Swap for a real CMP before production analytics/martech.
4. **README is still the boilerplate placeholder** ("Your Project's Title…").

---

## B. Carried lessons from a prior EMA migration

### Issues & resolutions

1. **Broken article images (`about:error`, mangled hash chains).** Cause: images not freshly
   uploaded to DA Media Library. Fix: re-upload to DA, then batch-fix via Media Library
   **Copy** to get authoritative `media_<hash>` URLs.
2. **PDF link corruption** (`-pdf` instead of `.pdf`). Fix href syntax; add HTML5 `download`
   attribute to force download instead of in-tab view.
3. **Sync-revert regression.** Local → DA sync reverted a page to a broken state because the
   local `.plain.html` held a render snapshot (compact `/media-da`) incompatible with
   re-posting. Fix/convention: **pull DA `<main>` inner to local; DA is source of truth.**
4. **Sheet filename mangling** (`faqs-json`). Cause: DA editor UI mangles `.json`/`.pdf`.
   Fix: correct to `faqs.json` in sheet ref and code; use the **DA source API** (authoritative).
5. **Index metadata lag** (`publishDate` unreliable). Fix: revert dynamic sidebar to
   **static** authored content; don't enable dynamic fetch until the indexer stabilizes.
6. **Hero featured image path** failed with absolute `content.da.live` URLs. Fix: convert
   to relative `/media-da/` paths.

### Workarounds

- **Indexer cache lag:** `publishDate`, `category`, `groupSize` can be stale; refresh/retry.
- **PSI flakiness:** mobile runs may time out (score 0) while desktop ~99; rerun before
  treating as a regression.
- **Un-migrated locale (e.g. CA):** may remain static and **not sync-safe** (still compact
  `/media-da`); requires matching query indices before activation.

### Manual-implementation requirements (importer cannot fully produce)

- **Dynamic / hand-authored blocks** flagged as exceptions — e.g. sheet-driven accordions,
  profile/teaser cards reading DA sheets, tabbed filters. These need hand-editing with
  exception flags and careful decorator bail conditions to avoid nested grids.
- **Sheet-backed data** (FAQs, contributors, specs) authored as DA sheets, referenced by
  `.json` links.
- **Block-per-section article layouts** and author-bio auto-blocks with strict content
  preconditions (e.g. author photo must precede the author `H2`).

### Auto-block execution order matters

When multiple auto-blocks exist, order is significant (prior project ran: fragments →
featured → listing → author-bio → widgets). This repo currently runs **fragments →
widgets**; preserve/extend order deliberately in `buildAutoBlocks`.
