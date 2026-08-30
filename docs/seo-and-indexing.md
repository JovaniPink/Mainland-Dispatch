# SEO and indexing contract

## Purpose

Search metadata must reflect the same publication boundary as the visible
product. Review-stage leads, private reading state and the local Desk cannot be
made public indirectly through a sitemap, canonical URL, structured data or
social preview.

The production origin is `https://mainlanddispatch.com`. Every indexable page
has one absolute canonical URL, a concise description, Open Graph metadata and
a large-image social card.

## Indexable surfaces

- `/` — the public Notebook landing page;
- `/notebooks` — the public Notebook collection;
- `/notebook/[slug]` — only Notebook entries selected as public; the public
  statuses are `published` and `corrected`, while `draft` entries fail closed at
  the route and metadata boundaries;
- `/archive` — the interactive reviewed Dispatch archive; its filter, timeline
  and relationship state canonicalize to the base route;
- `/dispatch/[slug]` — only published or corrected Dispatches;
- `/compare/[slug]` — validated public comparisons;
- `/trace/[slug]` — validated public chronologies;
- `/dossiers/[slug]` — validated public dossiers.

Archive filters, relationship focus and selected Notebook inquiry are
interaction state rather than separate documents. They do not enter the
sitemap. Archive state canonicalizes to `/archive`.

Notebook Two’s `promise` selection and incoming `utm_*` parameters are also
interaction/attribution state. The address bar may retain a valid `promise` and
incoming UTMs so selection remains shareable, while canonical metadata always
resolves to the clean Notebook route. Invalid `promise` values are removed
without disturbing unrelated parameters. Query state never enters the sitemap,
JSON-LD citations, or internal navigation.

## Non-indexable surfaces

- `/desk` is disallowed in `robots.txt`, absent from navigation and sitemap,
  disabled in production by default, and marked `noindex`, `nofollow`,
  `noarchive` when explicitly enabled.
- `/saved` stores browser-local state. It is absent from the sitemap and marked
  `noindex`, `nofollow`, `noarchive`.
- `/atlas` and every Atlas query variant return not found because all current
  releases remain `prototype` / `source-snapshot`. They are absent from the
  sitemap and cannot contribute metadata or dossier modules.
- Review-stage Dispatches have no generated public route and therefore cannot
  emit metadata or structured data.

`robots.txt` disallowance is not used as a substitute for `noindex` on a route
that can render. Both boundaries are intentional for the Desk.

## Metadata and structured data

The root layout declares site identity, publisher, language, category, topical
keywords, crawler preview permissions and the shared social image. A WebSite and
Organization JSON-LD graph identifies the publication.

Every public Dispatch emits `NewsArticle` JSON-LD with:

- the Dispatch headline and concise summary;
- canonical Mainland Dispatch page;
- Dispatch curation date and revision date;
- Mainland Dispatch as the page author and publisher;
- the canonical source in `isBasedOn` and all reviewed evidence URLs in
  `citation`; and
- vertical and tag context.

Structured data does not claim that an external byline authored Mainland
Dispatch's editorial analysis, that Mainland Dispatch authored the canonical
source, or that a review-stage candidate is published.

Each public Notebook entry emits `Article` JSON-LD with Mainland Dispatch as the
author, its own publication and revision dates, canonical conversation
formats, and its bounded supporting source trail as citations. It does not
represent Kevin Rudd, Ezra Klein, _The New York Times_, Apple or YouTube as the
author of Mainland Dispatch’s synthesis.

## First-party share attribution

Share actions use ordinary links and no third-party script. Only the return URL
to Mainland Dispatch receives parameters:

- `utm_campaign=open-models-closed-system`;
- channel-specific `utm_source`;
- `utm_medium=reader-share` for copy/email or `social` for LinkedIn/Bluesky;
  and
- `utm_content=notebook-header` or the selected `promise-*` ID.

Canonical URLs, internal navigation, sitemap entries, JSON-LD citations, and
outbound evidence links never receive UTMs. This prepares attribution for
future analytics; no analytics service is installed and no measurement is
claimed.

## Sitemap policy

The sitemap is constructed only from validated public content selectors. It
contains stable canonical URLs, meaningful last-modified dates, conservative
change frequencies and relative priorities. It never imports the entire Desk
catalog.

The homepage and `/notebooks` last-modified dates follow the newest revision
across every public Notebook, independent of ordinal order. Each Notebook uses
its own revision. `/archive` follows the newest public
Dispatch revision. Dispatches use `updatedAt`; comparisons use the newest
linked public Dispatch; traces use the newest timeline entry; and dossiers use
`lastReviewed`. Atlas releases are absent because they remain unpublished
prototype/source-snapshot records.

## Validation

The SEO regression suite checks canonical URL construction, description length,
unique sitemap URLs, exact inclusion of every public Notebook, archive and every
public Dispatch, exclusion of `/atlas`, `/desk` and `/saved`, meaningful
revision dates, crawler directives and manifest identity. The full gate then
builds every public route.

The implementation follows Google guidance for
[accurate sitemap modification dates](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[crawlable descriptive links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable),
and [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article),
plus WCAG 2.2 guidance for
[link purpose in context](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html).
Metadata can make a page more legible to crawlers, but this contract does not
claim rich-result eligibility or improved ranking.

For metadata or layout changes, inspect rendered HTML at desktop and 390px
mobile widths and confirm canonical, robots, Open Graph and JSON-LD output.

## Link auditing

`npm run link:audit:static` reads the production sitemap and rendered HTML. It
checks internal routes and fragments, the sitemap/indexability boundary, clean
HTTPS evidence URLs, descriptive source labels, external-anchor safety,
canonicals, robots metadata, Open Graph URLs, JSON-LD, and serialized
consent-gated media URLs. It runs after the canonical production build inside
`npm run test-all`.

`npm run link:audit:live` is a separate network check. The scheduled read-only
workflow runs at 13:17 UTC each Monday and can also be started manually. It
requires direct successful first-party sitemap routes, uses bounded concurrency
and timeouts, and records redirects without editing content. Media and PDF
probes use `HEAD` or a one-byte ranged `GET` rather than downloading the full
asset.

A third-party URL fails only after two `GET` attempts confirm `404` or `410`, or
when an HTTPS URL redirects to HTTP. `401`, `403`, `429`, and `451` are reported
as restricted. `400`, `405`, server errors, DNS or TLS failures, resets, and
timeouts are inconclusive. A confirmed failure stops the workflow for human
editorial review; the audit never replaces or removes a source automatically.
