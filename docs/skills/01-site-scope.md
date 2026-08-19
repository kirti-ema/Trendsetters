# 01 — Site Scope & Catalog

**Goal:** know the whole site before touching one page. Discover URLs, group them into
templates, catalog blocks, and size the migration.
**EMA skills:** `excat-site-scope`, `excat-url-discovery`, `excat-site-catalog`, `excat-site-analysis`.

## Expected output

- URL inventory: `urls-all.json`, `urls-grouped.json`, `urls-checklist.json`.
- Template catalog: `template-catalog.json` + per-page `.pages/`.
- Block catalog: `block-catalog.json` + `.blocks/` (EDS-mapped vs. custom breakdown).
- `summary.json` + an interactive HTML report bundle (`template-catalog-report-bundle.zip`).
- Coverage % and report status (complete / incomplete / failed).

---

## PROMPT ADD-ON

```
Catalog the site https://wknd-trendsetters.site.
1. Discover all URLs (sitemap first, then crawl gaps). Report total count + how found.
2. Group URLs into page templates; for each template give: name, representative URL,
   page count, and a one-line description.
3. Catalog blocks per template. Split into EDS-mapped (boilerplate/collection) vs. custom.
   For each custom block, note the source pattern it comes from.
4. Report locale breakdown and overall coverage %.
5. Produce the HTML report bundle AND the JSON artifacts in catalog/.

Then STOP and give me:
- The template list with counts (which template does /about-us belong to?)
- Which blocks already exist in this repo vs. must be built/imported
- Any URLs you could not classify
Do not start page analysis until I pick the templates/pages to migrate first.
```

To view the report in the console, ask afterwards:
```
Move template-catalog-report-bundle.zip to the /content folder to render it in the
preview tab. Update all references as needed.
```

---

## HITL decision points

- **Migration scope:** all templates, or a prioritized subset? (Recommend starting with the
  template that contains `/about-us`.)
- **Locale scope:** which locales are in scope? Un-scoped locales may be left static.
- **Custom-block budget:** for each custom block found — build new, reuse an existing
  variant, or pull from the Block Collection? Decide here to avoid duplicate variants later.

## Best practices

- Prefer the **sitemap** for completeness; crawl only to fill gaps. Log anything dropped.
- Record the **EDS-mapped vs. custom** split now — it's the single best predictor of effort.
- Keep the catalog artifacts in `catalog/`; downstream skills read them.
- Don't over-catalog: a representative page per template is enough to plan.

## Done when

- Template + block catalogs exist and coverage % is reported.
- Human has picked the template(s)/page(s) to migrate first.
- The template owning `/about-us` is identified.
