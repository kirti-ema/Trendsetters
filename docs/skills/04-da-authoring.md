# 04 — DA.live Authoring & Parity

**Goal:** get content into DA correctly and keep local ↔ DA parity so syncs are safe.
**EMA skills:** `content-modeling`, `authoring-analysis` + DA source API.

## Key model

- Local `content/**/*.plain.html` holds the **bare inner** `<div>…</div>`.
- DA docs wrap that inner as `<body><header></header><main>INNER</main><footer></footer></body>`.
- **DA is the source of truth.** Prefer **DA → local refresh** over local → DA sync.

---

## PROMPT ADD-ON

```
Author /about-us into DA (kirti-ema/trendsetters) from the approved analysis.
1. Build the page as sections; use default content for prose/images and the approved blocks
   for the rest. Block config goes in the block's table rows/cells.
2. Metadata block at the end: Title, Description, and any og:image AS PATH TEXT (never <img>).
3. For any sheet-driven list, reference the DA sheet by a .json link (via DA source API so
   the .json suffix isn't mangled); create the sheet with the agreed columns.
4. POST the page to DA:
   curl -X POST -F "data=@about-us.html;type=text/html" \
     "https://admin.da.live/source/kirti-ema/trendsetters/about-us.html"
5. Verify local↔DA parity: local file inner == DA <main> inner (byte-identical).
6. Confirm every image uses DA's round-trippable form (Media Library Copy URL or
   /media-da relative), NOT a compact snapshot that breaks on re-POST.

Report POST status codes, the parity check result, and the sheet path(s) created.
```

---

## HITL decision points

- **Content model per repeating list** — final call on **hard-coded inline vs. DA sheet**:
  | Choose inline (hard-code) when… | Choose a DA sheet when… |
  | --- | --- |
  | List is short & stable | List is long or frequently edited |
  | Used on one page | Reused across pages |
  | No sorting/filtering needed | Needs ordering/filtering/index |
  | You want zero index-freshness risk | Authors must edit without touching the page |
- **Sheet columns** — confirm column names before creating (e.g. FAQs: `question`,`answer`,`order`).
- **Author ergonomics** — is the block table simple enough for a non-technical author?

## Best practices

- Use the **DA source API** for anything with dots in the name (`.json`, `.pdf`).
- Keep the metadata block minimal and correct; it drives SEO + social cards.
- After authoring, **preview then publish** (see `11-publish-pr.md`); re-align local to DA.
- Never hand-edit `.plain.html` for standard pages — only documented dynamic/exception pages.

## Done when

- Page POSTed to DA (200), previews correctly, local↔DA parity confirmed.
- Any sheets created with agreed columns; images in round-trippable form.
