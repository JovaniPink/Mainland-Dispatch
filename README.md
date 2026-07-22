# Mainland Dispatch

An editorial product prototype for context-rich coverage of China and the
US–China relationship. The governing principle is simple: every source gets
context, every conclusion shows its evidence, and every developing story keeps
its history.

> **Editorial boundary:** public Dispatches, Compare sources, Trace entries, and
> Dossier documents use reviewed public records and live source URLs. Evidence
> Atlas groupings remain provisional editorial source snapshots even though
> their underlying records are real. Desk leads do not become public merely by
> entering the review queue.

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
  current open-model record links directly to its chronology and source-backed
  Dispatches.
- **Evidence view** — a crawlable `/atlas` source lab with three cases. Each
  chain uses four complete, inspectable steps and preserves the difference
  between source facts and editorial relationships.
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
- Every record declares `provenance: "verified" | "prototype"`. Public reader
  records are verified; Atlas releases remain labeled prototypes because their
  grouping and interpretation are still provisional.
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
reader/media/explorer/intake machines, consent-gated external media, saved
reading, stream filtering, and exclusion of review-stage content.

Atlas now includes semiconductor policy, culture/everyday life, and open-model
release-state cases. It is linked in global navigation, while each release keeps
its source-snapshot warning and review state.

## Content workflow

Content lives in `src/content/`. The local Desk can assemble and validate a
draft, then emit JSON for review. That JSON is not persisted automatically; a
real authenticated write path and source-verification workflow are separate
product decisions.

Public promotion follows the explicit checklist in
[`docs/publication-methodology.md`](docs/publication-methodology.md). In short:
read the canonical source, separate reported fact from editorial commentary,
record date/language/attribution limitations, verify every public relationship,
and fail closed when a promised artifact or independent check has not arrived.
Research prompts remain private and cannot support public claims. The tracked
catalog distinguishes supplied article URLs from publisher-verified canonical
URLs and retains reviewed supporting records, explicit claim statuses, and
limitations.

Topic-specific intake logs record source quality, exclusions, open checks, and
the exact research stopping point. The current Chinese open-model package is
documented in
[`docs/source-notes/2026-07-21-chinese-open-models.md`](docs/source-notes/2026-07-21-chinese-open-models.md).
The user-supplied follow-up brief is tracked separately in
[`docs/source-notes/2026-07-21-supplied-open-weight-brief.md`](docs/source-notes/2026-07-21-supplied-open-weight-brief.md),
and the deliberately varied historical intake is recorded in
[`docs/source-notes/2026-07-21-random-backfile-sampler.md`](docs/source-notes/2026-07-21-random-backfile-sampler.md).
The larger editorial-only link backlog and its 2006–2026 chronology are
documented in
[`docs/source-notes/2026-07-21-open-model-sourcebook-expanding-time.md`](docs/source-notes/2026-07-21-open-model-sourcebook-expanding-time.md).
The follow-up global-architecture dossier, claim audit, withheld assertions, and
recommended evidence-first article structure are documented in
[`docs/source-notes/2026-07-21-global-ai-architectures-dossier-audit.md`](docs/source-notes/2026-07-21-global-ai-architectures-dossier-audit.md).
The revised Kimi K3 sourcing brief, canonical-source corrections, six historical
drafts, source-inbox expansion, and exact research stopping point are documented
in
[`docs/source-notes/2026-07-22-kimi-k3-sourcing-brief-intake.md`](docs/source-notes/2026-07-22-kimi-k3-sourcing-brief-intake.md).
The three supplied general-China article batches are consolidated into one
88-candidate access and disposition audit in
[`docs/source-notes/2026-07-22-china-article-corpus-review.md`](docs/source-notes/2026-07-22-china-article-corpus-review.md).
The fourth 30-candidate batch, including redirect corrections, two rejections,
and article-specific review blockers, is recorded in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-04-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-04-review.md).
The fifth 30-candidate batch adds legal, technical, culture, infrastructure,
finance, and everyday-life leads with six documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-05-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-05-review.md).
The sixth 30-candidate batch adds space, mobility, labor, education, media,
science, legal-case, and everyday-life leads with source-specific corrections
and four documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-06-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-06-review.md).
The seventh 30-candidate batch adds archaeology, infrastructure, environment,
cybersecurity, research, finance, culture, and maritime leads with three
documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-07-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-07-review.md).
