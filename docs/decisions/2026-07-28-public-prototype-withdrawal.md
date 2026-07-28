# Public prototype withdrawal

**Status:** Accepted
**Effective:** July 28, 2026

## Decision

Mainland Dispatch production may not render sample, fictional, prototype, or
source-snapshot editorial material. Public content must satisfy the applicable
review boundary and use verified provenance.

The thirteen public Dispatch records, their Compare/Trace/Dossier graph, and
the two Notebook inquiries remain public because they are source reviewed,
evidence linked, and explicitly classified as verified or source reviewed.

The three Evidence Atlas releases remain:

```text
provenance: prototype
reviewState: source-snapshot
editorialStatus: archived
```

They are therefore withdrawn from every public selector. `/atlas` and its query
variants return not found; Atlas releases no longer enter dossier modules,
metadata, structured data, internal navigation, or the sitemap. Their content
remains available locally for research, methodology work, and component tests.

## Enforcement

1. `publishedAtlasReleases` is empty until a separate publication review
   changes both the content and its provenance contract.
2. Public Dispatches must remain `verified`, evidence reviewed, linked to their
   canonical source lead, and free of placeholder hosts.
3. Compare, Trace, and Dossier records must remain verified and may reference
   only public Dispatches.
4. Notebook entries must remain source reviewed.
5. Withheld, rejected, review-stage, prototype, and source-snapshot records
   cannot become public through a route, relationship, sitemap, metadata, or
   structured-data side channel.

This decision changes publication exposure, not the historical research
record. It does not promote or relabel any existing Atlas interpretation.
