# Mainland Dispatch

A public research notebook built on a transparent, interactive evidence archive
for understanding contemporary China and the U.S.–China relationship. Each
inquiry begins with a consequential conversation, document or development and
follows it into its sources, assumptions, competing interpretations, historical
context and unresolved questions.

> **Editorial boundary:** every public Dispatch, Compare source, Trace entry,
> Dossier document, and Notebook inquiry has passed its stated review boundary.
> Prototype and source-snapshot records remain local research fixtures. Desk
> leads do not become public merely by entering the review queue.

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

- **Notebook** — the dominant public journey. A bounded inquiry combines
  personal motivation, a faithful reconstruction of an argument, timecoded
  turning points, claim labels, pushback, institutional context, a short source
  trail and one unresolved question.
  The newest entry, “Open Models, Closed System?,” adds a source-audited claim
  review and six-record “What to Watch” evidence register while the founding Rudd inquiry
  remains public.
- **Source Archive** — an interactive public evidence surface with faceted
  search, chronological and relationship views, reviewed source metadata,
  classified claims, explicit limitations and shareable URL state. It exposes
  only published records; aggregate corpus counts explain the private reservoir
  without rendering withheld or rejected leads as recommendations.
- **Compare** — mainland, US, and primary-document framing with shared facts,
  differing emphasis, and no synthetic bias score. Mobile uses state-driven
  source tabs.
- **Trace** — a selectable chronology with critical moments and an explicit
  evidence status for the current assessment.
- **Dossiers** — claims separated into reported, announced, implemented,
  independently observed, contested, superseded, and corrected. The
  current open-model record links directly to its chronology and source-backed
  Dispatches.
- **Evidence view** — three local research cases used to test evidence-chain,
  relationship, chart, and map interactions. `/atlas` returns not found until a
  case completes a separate publication review.
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
  records are verified. Prototype Atlas releases are excluded from public
  selectors, routes, dossier modules, metadata, and the sitemap.
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

- Next.js 16.3, React 19.2, Tailwind CSS 4, TypeScript 6, XState 5, and Zod 4.
- Zod discriminated union for `article`, `video`, `audio`, `document`, `social`,
  `gallery`, `data`, and `original` dispatches.
- XState owns real interaction state:
  - stream filtering/search;
  - Archive view selection, faceted filters, relationship focus, query
    hydration, Notebook inquiry selection and shareable URL state;
  - Notebook consent-gated audio;
  - Compare source selection;
  - Trace entry selection;
  - media poster → loading → playing/unavailable/retry;
  - Desk intake → validation → duplicate check → editing → saved JSON.
- Notebook `promise` selection is deliberately URL-derived state rather than a
  statechart. XState is reserved for lifecycle behavior; pure functions validate
  and update selection while preserving unrelated query parameters.
- Media embeds are consent-gated. A verified external video creates its iframe
  only after consent and reports readiness through iframe load/error events.
  Prototype media exercises the same machine without contacting a third party.
- Local Atlas geography follows the same privacy contract. A labeled SVG and
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
- Metadata includes route titles/descriptions, route canonicals, Open Graph
  artwork, WebSite/Organization and NewsArticle structured data, manifest,
  `robots.txt`, private-route `noindex`, and a public-only dated sitemap. The
  contract is documented in
  [`docs/seo-and-indexing.md`](docs/seo-and-indexing.md).

## Development

Requires Node 22.15 or newer.

```bash
npm ci
npm run dev
```

The complete quality gate is:

```bash
npm run audit:production
npm run audit:toolchain
npm run test-all
```

It rejects high-severity advisories in both the deployed and complete dependency
graphs, then runs formatting, ESLint, strict TypeScript, Jest/Testing Library
coverage, and a production build. The same gates run in GitHub Actions.
Individual commands remain available for formatting (`npm run format:check`),
lint (`npm run lint`), types (`npm run typecheck`), tests (`npm test`), and the
production build (`npm run build`).

Dependency changes must keep both audit scripts green. The production audit
covers the deployed graph; the toolchain audit covers development and build
dependencies as well.
Next.js and `eslint-config-next` move together, React and React DOM stay on the
same exact version, and transitive advisory fixes are resolved through a
compatible lockfile refresh without forced major upgrades or audit exclusions.

The hosted workflow pins third-party actions to immutable commits, grants only
read access to repository contents, and cancels superseded runs for the same
branch or pull request.

Current regression coverage includes catalog integrity, publication boundaries,
reader/media/explorer/intake machines, Archive timelines and relationships,
consent-gated external media, saved reading, stream filtering, and exclusion of
review-stage content.

Atlas includes semiconductor policy, culture/everyday life, and open-model
release-state cases. It remains an unpublished experimental source lab; its
prototype/source-snapshot releases are retained for local development and
methodology review only.

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

**Season Zero intake freeze:** effective July 23, 2026, no additional
article-intake batches, automated ingestion pipeline, generalized CMS or new
top-level product area will be added. The existing 461-lead catalog is
sufficient. Work is concentrated on publishing and testing one consequential
Notebook entries and making their existing supporting Archive more legible. On
July 28 the editor explicitly commissioned Notebook Two; this is documented as
a “continue” decision without claiming the founding reader study occurred. The
Archive refinement is not a second intake system: it visualizes only the
reviewed public boundary. The full decision is recorded in
[`docs/decisions/2026-07-23-season-zero.md`](docs/decisions/2026-07-23-season-zero.md)
and
[`docs/decisions/2026-07-28-notebook-two.md`](docs/decisions/2026-07-28-notebook-two.md).

The current documentation map, governing-methodology precedence, and catalog
rollup are maintained in [`docs/README.md`](docs/README.md). The source-lead
catalog contains 461 records. The thirteen general-China intake batches cover
384 external article candidates: 355 withheld, 29 rejected, and none drafted or
public.

Topic-specific intake logs record source quality, exclusions, open checks, and
the exact research stopping point. They are dated snapshots, so earlier totals
describe the catalog at that review time. The current Chinese open-model package is
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
The eighth 30-candidate batch adds daily life, science, platform governance,
public health, environment, corporate policy, and rights reporting with four
documented rejections and numerical or policy corrections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-08-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-08-review.md).
The ninth 30-candidate batch adds science, religion, education, geospatial,
security, industry, climate, social-policy, and rights reporting with two
documented rejections and explicit corrections to social-credit, space-station,
emissions, and mapping claims in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-09-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-09-review.md).
The tenth supplied group contains 29 external candidates after exclusion of one
discussion-only prompt. It adds history, space, literature, cyber, climate,
trade, finance, and everyday-business leads with three documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-10-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-10-review.md).
The eleventh supplied group contains 28 external candidates after excluding two
discussion-only submissions. It adds manufacturing, conservation, sports,
security, markets, academic-freedom, infrastructure, and everyday-business
leads, all withheld at the exact point where source or corroboration review
remains incomplete, in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-11-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-11-review.md).
The twelfth supplied group contains 29 new external candidates after excluding
one exact duplicate already tracked in batch 05. It adds law, finance, energy,
mapping, media, conservation, technology, and everyday-life leads with three
documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-12-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-12-review.md).
The thirteenth supplied group adds 30 distinct infrastructure, trade, protest,
media, space, sports, daily-life, maritime, technology, and legal candidates,
with two documented rejections in
[`docs/source-notes/2026-07-22-china-article-corpus-batch-13-review.md`](docs/source-notes/2026-07-22-china-article-corpus-batch-13-review.md).
The founding Notebook’s verified formats, corrected timecodes, claim
classifications, source trail, access limitations and exact research stopping
point are recorded in
[`docs/source-notes/2026-07-23-what-xi-jinping-wants-ledger.md`](docs/source-notes/2026-07-23-what-xi-jinping-wants-ledger.md).
Notebook Two’s audio boundary, 13 source stops, claim decisions, promise
baselines, excluded assertions, and exact July 28 stopping point are recorded in
[`docs/source-notes/2026-07-28-open-models-closed-system-ledger.md`](docs/source-notes/2026-07-28-open-models-closed-system-ledger.md).
