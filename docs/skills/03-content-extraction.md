# 03 — Content & Asset Extraction

**Goal:** pull the source page's content, metadata, and images into a clean, importable form.
**EMA skills:** `excat-content-import` (scrape stage), `scrape-webpage`.

## Expected output

- Cleaned HTML of the source page (boilerplate/nav/footer/scripts stripped).
- Metadata extracted (title, description, og:image, canonical, robots).
- Images downloaded locally with a manifest (source URL → local path).
- Analysis JSON tying it together (paths, metadata, cleaned HTML, images).

---

## PROMPT ADD-ON

```
Scrape https://wknd-trendsetters.site/about-us for import.
1. Extract cleaned main content HTML (strip site chrome, scripts, tracking).
2. Extract metadata: Title, Description, og:image, canonical, robots, publish date if any.
3. Download all in-content images; produce a manifest mapping source URL -> local file.
   Note image dimensions and whether each is decorative (alt="") or meaningful.
4. Preserve source text verbatim — including any typos — do not "improve" copy.
5. Report anything that won't round-trip cleanly (background images in CSS, SVG sprites,
   videos, PDFs, icon fonts).

STOP and give me the metadata table + image manifest + any non-round-trippable assets.
```

---

## HITL decision points

- **Asset hosting** — will images be uploaded to **DA Media Library** (preferred, gives
  authoritative `media_<hash>` URLs) or referenced another way? (See image handling in
  `../project/migration.md`.)
- **PDFs / downloads** — confirm which links should force download (`download` attribute)
  vs. open in-tab.
- **Copy fidelity** — confirm whether to preserve source typos verbatim (default: yes).

## Best practices

- **Metadata images must become path TEXT in metadata cells later — never `<img>`**
  (an `<img>` in a metadata cell renders `about:error` and corrupts `og:image`).
- Watch DA suffix mangling: files like `.pdf`/`.json` must go through the **DA source API**,
  not the editor UI, which turns `.pdf`→`-pdf`.
- Optimize/verify committed image sizes (author-uploaded DA images are auto-optimized;
  repo-committed assets are not).
- Keep a manifest so image repairs later can use Media Library **Copy** URLs.

## Done when

- Cleaned HTML + metadata + image manifest exist and are reviewed.
- Non-round-trippable assets are listed with a plan for each.
