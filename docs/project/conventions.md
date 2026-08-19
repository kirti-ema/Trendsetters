# Conventions

Project-specific rules. General EDS standards live in `AGENTS.md`; this file records what
is specific to Trendsetters or worth emphasizing.

## Coding conventions

- **JavaScript:** ES6+, Airbnb ESLint config, **always include `.js` in imports**, Unix
  (LF) line endings. Every block exports a default `async function decorate(block)`.
- **CSS:** Stylelint standard; modern CSS (Grid/Flexbox/Custom Properties). **Mobile-first**
  — base styles, then `min-width` media queries at **600 / 900 / 1200px**.
- **No build step, no dependencies shipped to the browser.** Lint tooling only in `package.json`.
- **Never modify `scripts/aem.js`.** It is the core library.

## Naming conventions

- Block folder + files: `blocks/{name}/{name}.js`, `blocks/{name}/{name}.css`.
- **Scope every block selector to `.{blockname}`.** ✗ `.item-list` → ✓ `.cards .item-list`.
- **Avoid `{blockname}-wrapper` and `{blockname}-container` as block-internal classes** —
  those names are used by EDS on section wrappers/containers and cause confusion. (The
  `widget` loader deliberately *rewrites* wrapper/container classes; that is the exception.)
- Design tokens live in `:root` (`styles.css`); reference via `var(--token)`.

## Block conventions

- Decide the **initial content structure (the author↔developer contract)** before writing
  code; changing it later can break already-authored pages.
- Handle **missing or extra fields gracefully** — authors may omit or add cells.
- Inspect real backend markup before coding: `curl http://localhost:3000/{path}.plain.html`
  (also `.md` and rendered HTML). Don't assume DOM shape.
- Keep blocks **self-contained, responsive, and accessible** by default.
- Buttons follow the emphasis contract in `architecture.md` (`decorateButtons`).

## Authoring conventions (DA.live)

- **DA is the source of truth.** Prefer refreshing local `content/` **from** DA over
  syncing local → DA. `content/**` is git-ignored.
- **Do not hand-edit `.plain.html`** except documented dynamic/exception pages.
- **Card / teaser images referenced from metadata must be authored as path TEXT, never as
  `<img>`** — an `<img>` in a metadata cell renders `about:error` and corrupts `og:image`.
- **Filenames with dots (`.json`, `.pdf`) — use the DA source API, not the DA editor UI**,
  which mangles `.json`/`.pdf` suffixes into `-json`/`-pdf`.
- Sheet-driven data (FAQs, contributors, specs) lives in DA sheets referenced by `.json`
  links; adding a row + publishing is the author workflow.

## Migration conventions

- **Never generate or edit HTML in `content/` by hand.** Produce content via the project's
  bundled **import script** + the `run-bulk-import.js` helper from the content-import skill.
- **Deploy order is code-first:** push code (branch → PR → `main`, wait ~30s for Code Sync)
  **before** POSTing/previewing/publishing DA docs that depend on it.
- **PRs must include a servable preview URL** (`https://{branch}--Trendsetters--kirti-ema.aem.page/{path}`).
  GitHub blob/markdown links are rejected.
- Prefer **reusing existing block variants** over creating new ones (similarity check before
  creating; EMA's block-variant tooling uses ~80% similarity threshold).

## Security conventions

- **Never** commit secrets (API keys, tokens). If a user pastes a secret, treat it as
  compromised — do not use it; credentials are auto-injected for authorized endpoints.
- Preserve the Trusted Types policy and CSP in `scripts.js` / `head.html`.
- Everything here is public client-side code. Use `.hlxignore` to keep files from being served.

## Do / Don't quick reference

**Do**
- Reuse design tokens and existing blocks/variants.
- Verify changes by **rendering** (local preview + Playwright), not by assertion.
- Keep block CSS scoped and mobile-first.
- Run `npm run lint` before every commit.

**Don't**
- Modify `scripts/aem.js`.
- Commit or hand-author `content/**` (except documented exception pages).
- Put `<img>` in metadata cells; use path text.
- Sync local → DA without confirming image forms are round-trip-safe (see `known-issues.md`).
- Paste or use secrets in chat.
