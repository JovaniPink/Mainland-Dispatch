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

- `/` — public Dispatch archive;
- `/dispatch/[slug]` — only published or corrected Dispatches;
- `/compare/[slug]` — validated public comparisons;
- `/trace/[slug]` — validated public chronologies;
- `/dossiers/[slug]` — validated public dossiers;
- `/atlas` — default Evidence Atlas source snapshot; and
- `/atlas?case=[release-slug]` — a non-default published Atlas release.

Filters, selected steps, places and chart months are interaction state, not
separate documents. They do not enter the sitemap and canonicalize to their
published Atlas case.

## Non-indexable surfaces

- `/desk` is disallowed in `robots.txt`, absent from navigation and sitemap,
  disabled in production by default, and marked `noindex`, `nofollow`,
  `noarchive` when explicitly enabled.
- `/saved` stores browser-local state. It is absent from the sitemap and marked
  `noindex`, `nofollow`, `noarchive`.
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

## Sitemap policy

The sitemap is constructed only from validated public content selectors. It
contains stable canonical URLs, meaningful last-modified dates, conservative
change frequencies and relative priorities. It never imports the entire Desk
catalog.

The homepage last-modified date follows the newest public Dispatch revision.
Dispatches use `updatedAt`; comparisons use the newest linked public Dispatch;
traces use the newest timeline entry; dossiers use `lastReviewed`; and each
Atlas case uses its own published release retrieval date.

## Validation

The SEO regression suite checks canonical URL construction, description length,
unique sitemap URLs, inclusion of every public Dispatch, exclusion of `/desk`
and `/saved`, meaningful revision dates, crawler directives and manifest
identity. The full gate then builds every public route.

For metadata or layout changes, inspect rendered HTML at desktop and 390px
mobile widths and confirm canonical, robots, Open Graph and JSON-LD output.
