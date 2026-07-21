# Mainland Dispatch

A curated publication on China and the US–China relationship. Every source
gets context; every conclusion shows its evidence; every developing story
preserves its history.

## Design: The Correspondent's Notebook

Mineral-paper background, editorial ink, vermilion annotation marks, muted
jade metadata, and a double ruled margin on large screens. Typography is
Newsreader (display and commentary), Geist (interface), and IBM Plex Mono
(dates, locations, languages, source labels). Two reading environments:
**Paper** and **Night**, toggled from the masthead and persisted in
localStorage.

## Interaction model

- **Read** — the editorial presentation: source headline, commentary,
  "Why it matters", tags and entities, published vs curated dates.
- **Compare** (`/compare/[slug]`) — mainland source, US source, and primary
  document side by side, with shared facts, differing emphasis, and
  editorial notes. No bias scores; framing differences are exposed for
  inspection. Stacked with source tabs on mobile.
- **Trace** (`/trace/[slug]`) — a chronological record of a developing
  story with a clickable timeline and a critical-moments sidebar, ending in
  a current editorial assessment with an explicit evidence status.
- **Desk** (`/desk`) — the private editorial mode: a link-intake composer
  validated live against the Zod schema, and a review queue with a
  selected-item evidence panel.

## Architecture

- **Next.js 15** (App Router) + **Tailwind CSS v4** + **TypeScript**.
- **Content model** (`src/content/schema.ts`): a Zod discriminated union
  over dispatch kinds (`article`, `video`, `audio`, `document`, `social`,
  `gallery`, `data`, `original`), with media-specific fields living only on
  the relevant variant. Seeds in `src/content/*.ts` are parsed through the
  schema at import time, so invalid content fails the build.
- **XState v5 machines** (`src/machines/`): a reader machine
  (browsing → filtering / focused / searching), a media actor
  (poster → consented → loading → playing / unavailable), and a link-intake
  machine (resolving → validating → duplicateCheck → editing → saved).
- **State Lab**: in development mode, collapsible inspectors under the
  stream, media facades, and composer show current state, last event,
  available events, transition history, and live Zod results.
- **Media facades**: privacy-conscious click-to-load — poster, publisher,
  duration, language, and an external-source label are shown, and the
  third-party iframe is created only after the reader presses play.
- **Dossiers** (`/dossiers/[slug]`): long-running subjects with claims
  labeled `reported / officially announced / implemented / independently
  observed / contested / superseded / corrected`, primary documents,
  unresolved questions, and a last-reviewed date.
- **Saved reading** (`/saved`): a localStorage bookmark collection.

## Development

```bash
npm install
npm run dev    # development, with State Lab inspectors
npm run build  # validates all seed content through the Zod schemas
npm run start
```

Content lives in `src/content/`. To add a dispatch, use the Desk composer
to produce validated JSON, then paste it into `src/content/dispatches.ts`.

Quality tooling: `npm run typecheck` (strict tsc), `npm test` (Jest +
Testing Library), `npm run format` (Prettier). Husky runs lint-staged on
commit and typecheck on push.

## Standards notes (documented deviations)

Checked against the workspace Next.js SOP and the Cross-App Analytics SOP;
deviations are recorded here per the analytics SOP §2 exception rule:

- **Next.js 16**: currently on 15.5; the upgrade is deferred to its own PR
  so framework churn stays isolated from feature review.
- **react-hook-form**: the Desk composer is XState-driven with live Zod
  validation; RHF will be revisited when real persistence lands.
- **Analytics stack** (GTM, GA4, Consent Mode, BigQuery export, Search
  Console/IndexNow, Clarity): launch-time infrastructure for deployed
  properties. This prototype is not deployed; no placeholder tag IDs are
  committed. Wire these up at launch following the SOP naming standard.
