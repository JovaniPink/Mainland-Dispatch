# Public content publication methodology

## Purpose

Mainland Dispatch publishes compact source records with editorial context. A
public card is not a scraped headline and not a claim that the publisher is
neutral or complete. It records what a reviewed source says, why an editor
selected it, and which conclusions still require other evidence.

The local Desk and source-lead inbox are review surfaces. Their contents are not
public content. Only records with `editorialStatus: published` or `corrected`
can enter public streams, routes, saved views, Compare, Trace, or Dossier
relationships.

During Season Zero, a public Notebook entry is the primary editorial object. It
may bring several reviewed records into one coherent inquiry, but it must
preserve the same distinctions between source report, observation,
interpretation, official position, contested claim and scenario. The Notebook
does not weaken the Dispatch evidence boundary or make review-stage leads
public.

## Required checks before publication

1. **Canonical source read.** Open and read the source itself. A search result,
   social summary, discussion link, or syndication headline is discovery only.
2. **Identity and date.** Check the canonical URL, publisher, title, byline when
   available, publication date, and source language. Preserve the original date
   even when the Dispatch is curated years later. A supplied or
   redirect-resolved URL is not a publisher-verified canonical URL.
3. **Faithful summary.** Summarize the source's actual scope and avoid turning a
   period report into a timeless claim. Attribute first-party benchmarks,
   company motives, official statements, and forecasts to their speakers.
4. **Separate commentary.** `summary` describes what the canonical source
   reports; `commentary` is Mainland Dispatch's independently written analysis;
   `whyItMatters` explains why the reviewed evidence matters. Research prompts
   are never treated as proof or retained as public citations.
5. **Limitations visible.** Record paywall, translation, archival, methodology,
   denominator, or future-verification limits where they affect interpretation.
   A promised release is `officiallyAnnounced`, not `implemented`.
6. **Relationship review.** Every relation exposed by Compare, Trace, Dossier,
   or related Dispatches must resolve to a public record or a directly cited
   source. Review-stage Dispatches and local Atlas fixtures cannot be used as
   hidden public graph nodes.
7. **No synthetic details.** Do not infer quotations, page counts, people,
   locations, dates, media IDs, or quantitative values to make a component look
   complete. An empty optional structure is preferable to invented precision.
8. **Quality gate.** Run the complete repository gate and inspect production at
   desktop and mobile widths for changes to public content or navigation.
9. **Search publication gate.** A public page must have one canonical URL, a
   faithful concise description, social metadata, and—where applicable—
   structured data. Review-stage content, private reader state, and Desk data
   must remain absent from sitemap and structured-data output.

## Article-to-Dispatch review

Every external article is reviewed as its own candidate. A candidate advances
only after its canonical metadata, full text, necessary primary records,
independent corroboration, later developments, and limitations have been
reviewed. Paywalled, dead, unstable, derivative, duplicate, or materially
misleading candidates are withheld or rejected rather than drafted from a
headline or snippet.

The public record contains only canonical and supporting evidence. Informal
research prompts cannot verify a claim, satisfy an Atlas source requirement, or
create a public relationship. If a prompt surfaces a useful primary record, the
editor reviews and cites that record directly.

## Notebook-entry review

A Notebook entry begins with one consequential source, not with an intake
quota. Before prose is written, its working ledger must record:

- canonical distribution formats and any differences in titles, durations or
  edits;
- the precise passages or timecodes the entry analyzes;
- the originating speaker’s argument in attributed language;
- primary records and independent evidence needed to test observable claims;
- serious complications or counter-readings;
- relevant institutional context written without insinuation;
- a separate line for each prediction, scenario or inferred timetable; and
- access, transcript, translation and review-stopping limitations.

Mainland Dispatch synthesis must remain visibly distinct from the source’s
argument. A Notebook page can link to existing public Dispatch, Compare, Trace,
or Dossier material when it improves comprehension; it must not expose local
Atlas fixtures or create separate products merely to display the same inquiry.

Season Zero publication is intentionally irregular. Recurring research,
verification, writing and editing are capped at 8–10 hours per entry. Automated
transcript ingestion, generalized CMS work and new top-level product areas
remain out of scope. On August 14 the editor narrowly reopened one manually
curated quality-link intake without authorizing recurring ingestion or public
promotion. See the [curated-intake
decision](decisions/2026-08-14-curated-source-intake-resumption.md). On July 28
the editor explicitly commissioned Notebook Two; that is a “continue”
instruction, not evidence that the founding reader study was conducted. See the
[Notebook Two decision note](decisions/2026-07-28-notebook-two.md).

## Evidence status vocabulary

- `reported`: a named source reports the claim; it has not been independently
  established here.
- `officiallyAnnounced`: the responsible organization states an intended or
  current action; future delivery remains open.
- `implemented`: an operative rule, published artifact, or completed release is
  directly inspectable.
- `independentlyObserved`: at least one explicitly classified independent
  corroborating source, in addition to the canonical report, confirms the
  observation. Repeating one source ID or adding a methodology source does not
  satisfy this status.
- `contested`: sources or methods materially disagree, or the available record
  cannot decide the claim.
- `superseded`, `corrected`: a later record changes the earlier state and the
  chronology preserves both.

## Current public corpus

The public archive contains reviewed source records from ChinaFile, Sixth Tone,
Made in China Journal, Rest of World, Meta AI, and ChinaTalk. It deliberately
mixes culture and everyday life with labor and technology rather than presenting
China only through crisis or bilateral competition.

The open-model Compare, Trace, and Dossier use the same three published records:
Meta's Llama 2 announcement, Meta's Llama 3.1 announcement, and ChinaTalk's
annotated translation of Liang Wenfeng's 2024 interview. Kimi K3 appears in the
chronology and Dossier only as a sourced July 20 announcement with a July 27
verification gate; its review-stage Dispatch remains outside public routes.

The wider source-lead catalog currently contains 481 records. The thirteen
general-China article batches plus the August 14 quality-link intake account for
404 external candidates: 375 are
withheld and 29 rejected. None is drafted or public. These figures describe
editorial intake, not the size of the public archive.

The public Archive may report these figures as a validated aggregate snapshot,
but it may not render the underlying private candidates, their URLs or their
relationships. Its interactive filters, timeline and relationship view operate
only on published or corrected Dispatches. This preserves research memory
without converting collection into recommendation.

The first public Notebook entry, “What Xi Jinping Wants,” is supported by a
bounded [source
ledger](source-notes/2026-07-23-what-xi-jinping-wants-ledger.md). It does not
change the disposition of any general-China article candidate.

The second public entry, “Open Models, Closed System?,” uses a separate
[13-stop source
ledger](source-notes/2026-07-28-open-models-closed-system-ledger.md) and a
six-record “What to Watch” register. It distinguishes future commitments,
institutional facts, observed conditions, policy principles, and reported
proposals instead of presenting them as one class of promise. Notebook source stops are not Dispatch mappings and
do not change the 13-record public Archive count.

## Search and indexing boundary

Only validated public selectors may feed route generation, the sitemap,
canonical metadata or structured data. `/saved` is private browser state and is
`noindex`; `/desk` is disabled by default, disallowed and `noindex`. Public
Dispatch structured data identifies the external canonical source through
`isBasedOn` without representing the source publisher's work as Mainland
Dispatch authorship.

Atlas releases remain local prototype/source-snapshot records. `/atlas` returns
not found, and no Atlas state enters route generation, the sitemap, canonical
metadata, structured data, or a public Dossier module. See
[`seo-and-indexing.md`](seo-and-indexing.md) for the full contract.

## Revision discipline

Corrections update `updatedAt`, preserve source and curation dates, and use the
`corrected` status when the public record changes materially. Removed or broken
sources should be archived or withdrawn, not silently replaced with a different
claim. New leads remain in review until this checklist is repeated for that
specific source.
