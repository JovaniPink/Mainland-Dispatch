# Public corpus promotion and fictional-record removal

Date: 2026-07-22

## Decision

Remove the twelve interface-only Dispatch records and the associated fictional
Compare, Trace, and Dossier graph. Do not retain them as hidden catalog content
or relabel invented claims as verified. Component variants that lack a reviewed
source are exercised with local unit-test fixtures rather than fake public
articles.

Promote thirteen records whose canonical sources had already been read during
the backfile and open-model reviews:

- `d-021` through `d-030`: ChinaFile, Sixth Tone, Made in China Journal, and
  Rest of World reporting and analysis dated 2012–2022;
- `d-032` and `d-033`: Meta's Llama 2 and Llama 3.1 first-party release records;
- `d-034`: ChinaTalk's annotated translation of Liang Wenfeng's 2024 36Kr
  interview.

The promotion is intentionally mixed. Ten records concern language, games,
student life, labor, religion, advocacy, creators, and platform governance.
Three document open-weight strategy. This avoids replacing a fake China feed
with an equally distorted all-geopolitics or all-AI feed.

## Records kept behind review

`d-013` through `d-020`, `d-031`, `d-035`, and `d-036` remain in
`sourceReview`. Their sources are real, but publication is a separate editorial
decision. Reasons include paywalled analysis, current-cycle claims needing more
corroboration, incident reporting, policy interpretation, and the need to keep
vendor or author conclusions attributed.

Kimi K3 is the clearest fail-closed example. Moonshot AI's July 20 announcement
is a source for what the company launched and promised. It is not evidence that
the promised July 27 weights, code, or license already exist. The public Trace
and Dossier therefore label the future artifact release
`officiallyAnnounced`; the Kimi Dispatch remains non-public pending the stated
verification date.

## New public graph

The replacement Compare, Trace, and Dossier all use reviewed public records:

- Meta, “Llama 2,” 2023-07-18;
- Meta, “Llama 3.1,” 2024-07-23;
- ChinaTalk / 36Kr, Liang Wenfeng interview, 2024-11-27.

The graph compares release posture rather than model capability or national
virtue. First-party release posts establish artifacts and declared strategy;
they do not independently prove benchmark quality, adoption, safety, serving
cost, or cost per completed task. The ChinaTalk record is a reviewed annotated
translation of a founder account, so motives and technical claims remain
attributed to Liang.

## Boundary enforcement

The catalog now rejects:

1. a public Dispatch with `provenance: prototype`;
2. a public Dispatch whose source host is `example.com`;
3. a public Compare, Trace, or Dossier with prototype provenance;
4. any public graph relationship that resolves to a review-stage Dispatch.

Evidence Atlas remains different by design. Its underlying sources are real,
but its grouping, relation labels, and editorial interpretation remain
`prototype` / `source-snapshot`. The open-model Atlas case now resolves to the
new verified Dossier; the semiconductor case no longer points to the removed
fictional Dossier.
