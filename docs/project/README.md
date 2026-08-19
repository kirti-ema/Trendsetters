# Trendsetters — Project Documentation

Persistent context for the **Trendsetters** AEM Edge Delivery Services (EDS) + DA.live
migration project. These files are written to serve as durable context for future
EMA (Experience Modernization Agent) conversations: read them before modifying the
project so you inherit the conventions, constraints, and decisions already made.

> **Source of truth precedence:** `AGENTS.md` (Adobe/EDS standards) → these `docs/project/`
> files (project-specific rules) → the repository code itself. If any doc conflicts with
> the actual code, trust the code and update the doc.

## Files in this folder

| File | What it contains |
| --- | --- |
| [`overview.md`](./overview.md) | Project identity, hosts/orgs, environments, migration source, tech stack, current status at a glance. |
| [`architecture.md`](./architecture.md) | Repo structure, page-loading phases, blocks inventory, the custom `widget` loader, auto-blocking, button contract, consent + Trusted Types, design tokens. |
| [`conventions.md`](./conventions.md) | Coding, naming, CSS, block, authoring, and migration conventions. The do / don't rules. |
| [`migration.md`](./migration.md) | Migration workflow (A→Z), deploy order, DA authoring/parity rules, image handling, and the EMA skills that drive each phase. |
| [`known-issues.md`](./known-issues.md) | Known issues, workarounds, and manual-implementation requirements — including lessons carried from a prior comparable EMA migration. |
| [`status.md`](./status.md) | Current migration/development status, what exists, and remaining work. |

See also the **[skill add-on prompt library](../skills/README.md)** (`docs/skills/`) — per-phase,
paste-in prompt add-ons for driving the migration with EMA.

## How to use these as EMA context

- Point new EMA conversations at `docs/project/` (or paste the relevant file) before
  asking for changes.
- Keep each file **concise** — it is context, not a manual. Prefer linking to `AGENTS.md`
  and aem.live docs over duplicating them.
- Update `status.md` and `known-issues.md` as the migration progresses; update the others
  only when a rule or architectural decision actually changes.

## Important: current vs. carried knowledge

This repo is currently **early-stage** — the AEM boilerplate plus one custom `widget`
block, with stock demo content still in `content/`. Where these docs describe block
variants, dynamic blocks, or fixes that are **not yet present in this repo**, they are
labelled as **carried lessons** from a prior comparable EMA migration (the WKND-style
capstone). Treat those as reusable patterns and cautions, not as existing implementation.
Verify against the actual code before relying on any specific file, block, or flag.
