# Evidence Atlas source and methodology record

## Status and editorial boundary

The semiconductor Evidence Atlas is a dossier-first, single-case research
prototype. It is public and crawlable at `/atlas`, but it is not a mature
publication vertical and is deliberately absent from global navigation. Its
release remains:

```text
provenance: prototype
reviewState: source-snapshot
```

The primary records below are real. The selection, grouping, relationship
labels, conclusions, and caveats remain editorial interpretation and are not
represented as verified reporting.

## Governing source hierarchy

Atlas records identify both a source class and an evidence role. They are not
interchangeable.

| Evidence role | Meaning | Permitted use |
| --- | --- | --- |
| `controlling` | Authoritative legal text | Governs legal scope, effective dates, named parties, and compliance instructions |
| `supporting` | Primary announcement, official response, or attributed filing | Supports what the publisher or filer stated |
| `context` | Quantitative or descriptive context | Shows measured context without proving causation |
| `methodology` | Definition, API contract, classification, or revision policy | Explains how another record was obtained or interpreted |
| `enrichment` | Search, alias, or screening helper | Assists discovery but never replaces the controlling record |

Live map tiles are infrastructure and do not appear in the editorial source
ledger. The local relation diagram, location list, steps, and sources remain
usable without WebGL or a network request.

## Current source inventory

### BIS announcement

- Record: `source-bis-announcement`
- Role: supporting policy announcement
- Published: December 2, 2024
- Canonical source: [BIS announcement](https://www.bis.gov/press-release/commerce-strengthens-export-controls-restrict-chinas-capability-produce-advanced-semiconductors-military)
- Supported claims: 24 semiconductor-manufacturing-equipment categories, three
  software-tool categories, HBM controls, 140 Entity List additions, and 14
  modifications.
- Boundary: the announcement summarizes the package; it does not replace either
  Federal Register rule.

### 89 FR 96790 — technical control rule

- Record: `source-federal-register-sme-rule`
- Role: controlling legal record
- Published: December 5, 2024; effective December 2, 2024
- Canonical source: [89 FR 96790, FR Doc. 2024-28270](https://www.govinfo.gov/content/pkg/FR-2024-12-05/pdf/2024-28270.pdf)
- Scope: advanced-computing, semiconductor-manufacturing-equipment, HBM,
  Footnote 5, foreign-direct-product, software-key, and related changes.
- Compliance boundary: December 31 applies only to the amendatory instructions
  identified by the rule. It is not a blanket Entity List effective date.

### 89 FR 96830 — Entity List rule

- Record: `source-federal-register-entity-rule`
- Role: controlling legal record
- Published: December 5, 2024; effective December 2, 2024
- Canonical source: [89 FR 96830, FR Doc. 2024-28267](https://www.govinfo.gov/content/pkg/FR-2024-12-05/pdf/2024-28267.pdf)
- Scope: 140 additions and 14 modifications, including ACM Research (Shanghai)
  and ACM Research Korea.
- Compliance boundary: the December 31 date applies to Entity List requirements
  linked to Footnote 5 designations, not every newly listed party.

The original Atlas used only 89 FR 96790 for both technical controls and named
entities. That was incorrect. The release now keeps the companion rules
separate and assigns claims to the controlling document.

### PRC Ministry of Commerce response

- Record: `source-mofcom-response`
- Role: supporting official position
- Published: December 2, 2024
- Language: original Chinese
- Canonical source: [MOFCOM spokesperson response](https://www.mofcom.gov.cn/xwfb/xwfyrth/art/2024/art_be61cee67b6340e59038896021e67453.html)
- Boundary: this records the PRC government's stated position. It is not
  independent evidence of economic or supply-chain effects.

MOFCOM referred to 136 Chinese entities. BIS referred to 140 additions overall.
Those figures use different denominators: the US rule contains 136 entries
under China plus four under Japan, Singapore, and South Korea. The Atlas must
explain that distinction instead of presenting the numbers as contradictory.

MOFCOM's [December 3 dual-use export-control announcement](https://www.mofcom.gov.cn/zcfb/zc/art/2024/art_a362d9e4d4944ff3854b76c572899e7e.html)
is relevant chronological context, but it is not included as a causal step in
this release. Temporal proximity alone does not prove that one measure caused
the other.

### Consolidated Screening List

- Record: `source-trade-csl`
- Role: enrichment
- Canonical source: [Trade.gov Consolidated Screening List](https://www.trade.gov/consolidated-screening-list)
- Revision policy: refreshed daily by Trade.gov.
- Permitted use: names, aliases, fuzzy matching, and current screening context.
- Boundary: Trade.gov instructs users to consult the Federal Register and the
  source agencies' official lists before taking action. The CSL does not control
  the legal claim.

Because the CSL is continuously updated, the record has a retrieval date and
dataset vintage but no invented publication date.

### Census International Trade API contract

- Record: `source-census-hs-contract`
- Role: methodology
- Canonical sources: [HS export variables](https://api.census.gov/data/timeseries/intltrade/exports/hs/variables.html)
  and [International Trade API documentation](https://www.census.gov/data/developers/data-sets/international-trade.html)
- Supported methodology: `ALL_VAL_MO` is the monthly total-value measure;
  `E_COMMODITY` supports HS aggregation levels.
- Revision policy: current datasets update monthly and previously released
  records are revised annually with the April statistics.
- Boundary: all Census trade API queries required a personal key at the time of
  retrieval, so Census documentation is not the value source for the chart.

### UN Comtrade HS 8486 series

- Record: `source-un-comtrade-hs`
- Role: contextual trade data
- API documentation: [UN Comtrade API](https://uncomtrade.org/docs/un-comtrade-api/)
- Preview limitation: [preview results are limited and intended for quick inspection](https://uncomtrade.org/docs/what-is-data-preview/)
- Revision policy: [UN Comtrade retains the latest available version rather than a permanent archive of every revision](https://uncomtrade.org/docs/data-availability/)
- Reporter: `842` — United States
- Partner: `156` — China
- Flow: `X` — exports
- Commodity: `8486`
- Frequency: monthly
- Periods: January 2024 through December 2025

The preview API accepts only one period per request. Therefore a single URL
without `period` cannot reproduce the 24-month release. The source record stores
the endpoint, shared parameters, and all 24 `YYYYMM` periods explicitly.

On July 21, 2026, every value in the checked-in CSV was re-queried against its
one-period official preview response. All 24 values matched. Each response was
aggregate and not directly reported. The normalized series consequently keeps
`estimated: true` and is presented only as contextual correlation.

The checked-in artifact is:

```text
public/data/us-china-hs8486-2024-2025.csv
SHA-256 b10581d98a918ee41b3f96ef7e3a3fc8c21f335f7cdefda701c54014baffaa00
```

The quality gate reads every declared artifact and recomputes its SHA-256. A
missing or changed artifact fails the test. The CSV is a normalized release
artifact, not a raw immutable Comtrade response. A future source release should
also retain the original response payloads and publication metadata.

HS 8486 is a broad equipment category. The series cannot isolate controlled
advanced equipment, licensing effects, customer demand, inventory cycles, or
classification changes. It cannot establish that the December rule caused a
particular monthly movement.

### ACM Research 2025 Form 10-K

- Record: `source-sec-acmr-2025`
- Role: supporting company filing
- Filed: March 2, 2026
- Canonical source: [ACM Research 2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1680062/000162828026013231/acmr-20251231.htm)
- Supported claims: ACM Shanghai and ACM Korea were added; the company reported
  procurement effects and changes to policies, practices, and supply-chain
  measures.
- Boundary: these are company statements. They remain `reported`, not
  `independentlyObserved`.

## Excluded evidence and relationships

The earlier release drew a Veldhoven-to-Shanghai line using ASML's 2024 Form
20-F and ACM Research's filing. The ASML filing supports Veldhoven as ASML's
headquarters and describes China market exposure, but it does not document a
direct Veldhoven–Shanghai, ASML–ACM, or shipment relationship. The source,
place, and edge have therefore been removed from this case.

The optional map now receives only a selected step's declared places and
documented relations. The current geographic relation is an editorial diagram
of regulatory reach between the Washington rulemaking record and a named
Shanghai entity. It is not a route, flow, facility connection, or proof of
physical movement.

OpenFreeMap supplies optional Positron and Dark basemap styles after explicit
reader consent. It is a runtime service dependency, not an evidence source, and
does not appear in the source ledger. See the
[OpenFreeMap quick start](https://openfreemap.org/quick_start/) for the style and
container contract.

## Provenance fields

Each source record carries:

- stable source and record identifiers;
- publisher, source class, and evidence role;
- canonical URL;
- publication date when the source has a real publication date;
- retrieval date and dataset vintage;
- revision policy when the source can change;
- language and translation status;
- notes defining what the source supports and what it cannot establish;
- a structured API query when values were extracted programmatically; and
- a local artifact path plus verified SHA-256 when an artifact is actually
  stored.

An absent artifact is not described as a snapshot. Record identifiers are not
presented as integrity hashes. Continuously updated sources do not receive a
fabricated publication date.

The release header keeps its own dates separate: `publishedAt` is the Atlas
release date, `retrievedAt` is the source-audit retrieval date,
`evidenceThrough` is the latest filing or evidentiary record considered, and
`seriesThrough` is the final month represented in the trade series. A single
ambiguous "data through" date is not used.

## Reader behavior

The source ledger is derived from the selected step, its declared events and
relations, the selected place, and the selected chart observation. Unrelated
sources do not remain visible merely because they belong to the release.

The chart appears only on a step that explicitly references a series. Month is
a chart cursor and does not reconstruct the evidence available as of that date.
The local relation diagram and semantic relationship list remain the primary
spatial explanation. MapLibre is optional, consent-gated, and disposable.

## Release threshold and deferred work

Atlas should return to global navigation only after a separately reviewed
culture or everyday-life case demonstrates that the model generalizes beyond
semiconductor controls.

Before promoting this case from `prototype` or `source-snapshot`:

1. Archive raw source artifacts where licensing and redistribution permit it.
2. Store raw Comtrade responses or replace the preview with a keyed, pinned
   Census extraction.
3. Record artifact retrieval tooling and transformation code.
4. Review Chinese-language translations and expose translation methodology.
5. Add independently observed outcome evidence before changing any company
   statement from `reported`.
6. Review every conclusion and caveat through the publication workflow.
