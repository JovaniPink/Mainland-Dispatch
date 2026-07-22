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

## Required checks before publication

1. **Canonical source read.** Open and read the source itself. A search result,
   social summary, Hacker News submission, or syndication headline is discovery
   evidence only.
2. **Identity and date.** Check the canonical URL, publisher, title, byline when
   available, publication date, and source language. Preserve the original date
   even when the Dispatch is curated years later.
3. **Faithful summary.** Summarize the source's actual scope and avoid turning a
   period report into a timeless claim. Attribute first-party benchmarks,
   company motives, official statements, and forecasts to their speakers.
4. **Separate commentary.** `summary` describes the source; `commentary` is the
   editorial reading; `whyItMatters` explains the selection. Discussion links
   may inform commentary but are labeled `commentary-context` and never treated
   as proof.
5. **Limitations visible.** Record paywall, translation, archival, methodology,
   denominator, or future-verification limits where they affect interpretation.
   A promised release is `officiallyAnnounced`, not `implemented`.
6. **Relationship review.** Every relation exposed by Compare, Trace, Dossier,
   related Dispatches, or Atlas must resolve to a public record or a directly
   cited source. Review-stage Dispatches cannot be used as hidden public graph
   nodes.
7. **No synthetic details.** Do not infer quotations, page counts, people,
   locations, dates, media IDs, or quantitative values to make a component look
   complete. An empty optional structure is preferable to invented precision.
8. **Quality gate.** Run the complete repository gate and inspect production at
   desktop and mobile widths for changes to public content or navigation.

## Discussion-source review

Hacker News points, comment counts, rank, and usernames are provenance for how a
lead was discovered, not measures of truth, expertise, consensus, or editorial
importance. The external article remains the candidate source; its HN thread is
a separately labeled `commentary-context` record. A direct Ask HN or Tell HN
submission is anecdotal discussion, not independent reporting.

Before using a discussion theme, review the complete relevant tree rather than
only the highest-ranked comments. Retain only concrete corrections, checkable
references, relevant firsthand experience with its limits stated, exposed
assumptions, or distinctions and uncertainties that improve the reporting. Drop
jokes, slogans, repetition, unsupported national generalizations, personal
attacks, popularity arguments, and claims that votes establish consensus.

Commentary themes should normally be paraphrased without usernames. They cannot
verify a factual claim, satisfy an Atlas artifact's source requirement, or
create a relationship in the public graph. If a comment supplies a useful
primary record, review and cite that record directly.

## Evidence status vocabulary

- `reported`: a named source reports the claim; it has not been independently
  established here.
- `officiallyAnnounced`: the responsible organization states an intended or
  current action; future delivery remains open.
- `implemented`: an operative rule, published artifact, or completed release is
  directly inspectable.
- `independentlyObserved`: a separate source or reproducible artifact confirms
  the observation.
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

## Revision discipline

Corrections update `updatedAt`, preserve source and curation dates, and use the
`corrected` status when the public record changes materially. Removed or broken
sources should be archived or withdrawn, not silently replaced with a different
claim. New leads remain in review until this checklist is repeated for that
specific source.
