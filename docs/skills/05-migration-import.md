# 05 — Migration: Import Infrastructure & Content Import

**Goal:** generate the parsers/transformers/page-templates that convert scraped HTML into
EDS block markup, then run a bulk import. This is how content is created — **never by hand.**
**EMA skills:** `excat-import-infrastructure`, `import-parser`, `import-transformer`,
`block-mapping-manager`, `excat-import-script`, `excat-content-import`.

## Expected output

- `tools/importer/parsers/{variant}.js` — one parser per block variant.
- `tools/importer/transformers/` — cleanup, sections, Dynamic Media/Scene7 transformers.
- `page-templates.json` with block DOM-selector mappings added.
- A bundled import script + `run-bulk-import.js` execution.
- Imported pages posted to DA.

---

## PROMPT ADD-ON

```
Build import infrastructure for the /about-us template and import it.
1. From page-templates.json + cleaned.html + metadata.json, generate a parser per block
   variant. Validate each parser; iterate until it passes.
2. Generate transformers (cleanup, sections, Dynamic Media if used).
3. Add block DOM-selector mappings to page-templates.json (block-mapping-manager). Skip
   templates already mapped.
4. Assemble the import script and run it via run-bulk-import.js on /about-us FIRST as a
   dry run of one page.
5. Show me the generated block-table markup before posting to DA.

Report: parser/transformer validation results, the block tables produced, and any sequence
the parser could not map (flag as manual).
Do NOT hand-write content/*.html. Do NOT run a full-template import until the single-page
dry run is verified.
```

Broaden after the single page verifies:
```
The /about-us dry run looks correct. Run the import for the rest of the {{template}}
template. Report per-URL success/failure and total imported.
```

---

## HITL decision points

- **Single page vs. full template** — always dry-run one page first; get approval to scale.
- **Unmappable sequences** — for anything the parser can't handle, decide: adjust the
  block contract, or hand-author as a documented exception page.
- **Dynamic Media / Scene7** — confirm whether the source uses it (changes transformers).

## Best practices

- **Validate parsers before running** the script; a bad parser corrupts many pages at once.
- Keep parsers/transformers **idempotent** — re-running import must not double-transform.
- Import **one page, verify, then fan out** — cheapest way to catch a systemic error.
- Preserve source text verbatim through transformation (no copy edits).
- Log any URL that fails; never let a partial import look complete.

## Done when

- Parsers/transformers validate; `/about-us` single-page import renders correctly locally.
- Template-wide import reports per-URL results with zero silent drops.
