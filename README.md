# Mainland Dispatch

An editorial product prototype for context-rich coverage of China and the
US–China relationship. The governing principle is simple: every source gets
context, every conclusion shows its evidence, and every developing story keeps
its history.

> **Prototype content notice:** all current headlines, dates, quotations,
> bylines, figures, and links are fictionalized interface samples. They are
> visibly labeled in the application and must not be represented as reporting.

## Design direction

“The Correspondent’s Notebook” combines a mineral-paper field notebook with a
disciplined source archive. It uses near-black editorial ink, vermilion
annotations, jade metadata, a double ruled margin, restrained motion, and Paper
and Night reading environments. System serif/sans/mono stacks keep builds
network-independent.

The stream is deliberately not a wall of identical cards. Video, audio,
documents, data, galleries, social captures, articles, and original notes have
distinct visual signatures, while the first item receives a wider editorial
treatment. The pattern borrows chapter rhythm from `christinepink`, structured
link metadata from `jovanipinkv2`, selectable moments from `chess-lab`, and
claim-safety posture from `handoff-navigator`.

## Reader experiences

- **Read** — source metadata, commentary, “Why it matters,” entities, tags, and
  separate source/curation dates.
- **Compare** — mainland, US, and primary-document framing with shared facts,
  differing emphasis, and no synthetic bias score. Mobile uses state-driven
  source tabs.
- **Trace** — a selectable chronology with critical moments and an explicit
  evidence status for the current assessment.
- **Dossiers** — claims separated into reported, announced, implemented,
  independently observed, contested, superseded, and corrected. The
  semiconductor dossier is the primary entry point to its experimental
  evidence view.
- **Evidence view** — a crawlable `/atlas` prototype organized around four
  complete, inspectable steps. It is deliberately absent from global
  navigation until a second editorial case proves the model generalizes beyond
  semiconductor controls.
- **Saved** — a browser-local reading collection implemented as an external
  store, so all Save controls stay synchronized.
- **Desk** — a local editorial sandbox with link intake, live Zod feedback, and
  an evidence-focused review queue. It is absent from public navigation and
  returns 404 in production unless `ENABLE_EDITORIAL_DESK=1` is explicitly set
  at build time. It is not an authenticated CMS.

## Publication and evidence boundaries

- Only `published` and `corrected` dispatches can enter public streams, static
  route generation, related links, saved reading, Compare, Trace, or Dossiers.
- Review-stage records remain available to the local Desk but do not resolve on
  public dispatch routes.
- Every record declares `provenance: "verified" | "prototype"`; prototype
  records display a global and per-record warning and use non-live example URLs.
- `src/content/catalog.ts` validates the complete graph at import time: schema
  variants, real calendar dates, route-safe slugs, unique IDs/slugs, date order,
  chronological trace entries, and every dispatch/trace/dossier relation.
- Atlas sources distinguish controlling records, supporting statements,
  contextual data, methodology, and enrichment. Stored artifacts declare a
  local path and SHA-256 that the test suite recomputes. The complete source
  inventory, web audit, query contract, exclusions, and promotion threshold are
  documented in
  [`docs/evidence-atlas-source-methodology.md`](docs/evidence-atlas-source-methodology.md).

## Architecture

- Next.js 16.2, React 19, Tailwind CSS 4, TypeScript 6, XState 5, and Zod 4.
- Zod discriminated union for `article`, `video`, `audio`, `document`, `social`,
  `gallery`, `data`, and `original` dispatches.
- XState owns real interaction state:
  - stream filtering/search;
  - Compare source selection;
  - Trace entry selection;
  - media poster → loading → playing/unavailable/retry;
  - Desk intake → validation → duplicate check → editing → saved JSON.
- Media embeds are consent-gated. A verified external video creates its iframe
  only after consent and reports readiness through iframe load/error events.
  Prototype media exercises the same machine without contacting a third party.
- Atlas geography follows the same privacy contract. A local labeled SVG and
  semantic relationship list carry the evidence by default; MapLibre and
  OpenFreeMap load only after the reader opens the optional geographic dialog.
  Paper uses Positron and Night uses the native Dark style. Closing the dialog
  disposes the map, while failed or degraded tiles never remove the local
  evidence.
- Atlas deep links accept `chain`, `step`, `place`, and `month`. Place and month
  are retained only when valid for the selected step; month is strictly a chart
  cursor, not an evidence-as-of reconstruction.
- Development-only State Lab panels expose current state, recent events,
  available events, and Zod results.
- Metadata includes route titles/descriptions, Open Graph artwork, manifest,
  `robots.txt`, and a public-only sitemap.

## Development

Requires Node 22.15 or newer.

```bash
npm ci
npm run dev
```

The complete quality gate is:

```bash
npm run test-all
```

It runs formatting, ESLint, strict TypeScript, Jest/Testing Library coverage,
and a production build. The same gate runs in GitHub Actions. Individual
commands are also available as `npm run format:check`, `npm run lint`,
`npm run typecheck`, `npm test`, and `npm run build`.

Current regression coverage includes catalog integrity, publication boundaries,
reader/media/explorer/intake machines, consent-gated prototype media, saved
reading, stream filtering, and exclusion of review-stage content.

Atlas remains a single-case research prototype. Restoring it to global
navigation requires at least one separately sourced culture or everyday-life
case; that editorial release is intentionally deferred.

## Content workflow

Content lives in `src/content/`. The local Desk can assemble and validate a
draft, then emit JSON for review. That JSON is not persisted automatically; a
real authenticated write path and source-verification workflow are separate
product decisions.

Before changing a record from `prototype` to `verified`, replace every sample
claim, URL, media identifier, and attribution with reviewed source material,
verify translations and archival captures, and move the record through the
editorial state machine.
