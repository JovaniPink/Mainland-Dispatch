# Evidence Atlas source and methodology record

## Status and editorial boundary

The Evidence Atlas is a three-case research prototype: one dossier-linked
policy case, one culture/everyday-life case, and one open-model release-state
case built from the source-review queue. It is public, crawlable, and linked at
`/atlas`, but it is still a source lab rather than a mature publication
vertical. All three releases remain:

```text
provenance: prototype
reviewState: source-snapshot
```

The primary records below are real. The selection, grouping, relationship
labels, conclusions, and caveats remain editorial interpretation and are not
represented as verified reporting. Publishing an Atlas source does not publish
the related Desk record: review-stage Dispatches remain excluded from public
lookups, relations, and route generation.

## Source-review promotion boundary

The culture and open-model releases use the source-lead inbox as an intake
boundary, not as a public feed. A lead may enter an Atlas source ledger only
when:

1. its `reviewState` is `source-read`;
2. the Atlas record preserves the reviewed canonical URL;
3. the Atlas record states the source's evidentiary role and limitations; and
4. every public event, place, step, and relation resolves to that source record.

The catalog validates the first two conditions at build time. Leads marked
`supplied` or `metadata-checked` cannot be promoted through a `sourceLeadId`.
Both source-review-derived releases deliberately have no `relatedDispatchIds`:
their backfile cards remain in `sourceReview` and are not exposed by the Atlas.

## Governing source hierarchy

Atlas records identify both a source class and an evidence role. They are not
interchangeable.

| Evidence role | Meaning                                                       | Permitted use                                                                    |
| ------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `controlling` | Authoritative legal text                                      | Governs legal scope, effective dates, named parties, and compliance instructions |
| `supporting`  | Primary announcement, official response, or attributed filing | Supports what the publisher or filer stated                                      |
| `context`     | Quantitative or descriptive context                           | Shows measured context without proving causation                                 |
| `methodology` | Definition, API contract, classification, or revision policy  | Explains how another record was obtained or interpreted                          |
| `enrichment`  | Search, alias, or screening helper                            | Assists discovery but never replaces the controlling record                      |

Live map tiles are infrastructure and do not appear in the editorial source
ledger. The local relation diagram, location list, steps, and sources remain
usable without WebGL or a network request.

## Current source inventory

### Open-model release-state ledger

The release `open-model-release-ledger` turns the supplied research sourcebook
into a set of questions, not a public evidence source. Its seven public source
records all resolve to leads already marked `evidence-reviewed`; the sourcebook
itself, review-stage Dispatches, supplied-only links, and informal research
prompts remain outside the release.

The case asks three narrower questions:

1. Which release state is actually evidenced: announcement, product or API
   access, downloadable weights, license, technical disclosure, or independent
   evaluation?
2. Which precedents are present in the reviewed chronology without converting
   chronology into a US-versus-China scoreboard?
3. Which claims belong to an official policy text, an individual company, or a
   founder's attributed account?

The release intentionally has no places, geographic relations, or quantitative
series. Model-company nationality is not a source-backed route, API pricing is
not total deployment cost, and first-party benchmark tables are not a comparable
independent dataset. Empty structures are more accurate than manufactured map
lines or a false-precision leaderboard.

#### Completed release precedents

- [Meta's Llama 2 release](https://ai.meta.com/blog/llama-2/) supports the July
  18, 2023 release of weights and starting code for research and most commercial
  use. Meta's “open source” label is preserved as its language; the Atlas uses
  the narrower `open-weight` description because separate license and use-policy
  conditions still require review.
- [DeepSeek-V2's technical paper](https://arxiv.org/abs/2405.04434) supports the
  architecture and experiment description, including the stated mixture-of-
  experts configuration. Comparative performance and efficiency results remain
  author-reported until reproduced independently.
- [Qwen2's release post](https://qwenlm.github.io/blog/qwen2/) links five model
  sizes to GitHub, Hugging Face, and ModelScope. Those links support artifact
  availability; the post's benchmark tables remain vendor evaluation.
- [Meta's Llama 3.1 release](https://ai.meta.com/blog/meta-llama-3-1/) supports
  downloadable 8B, 70B, and 405B models, partner availability, supporting tools,
  and changed derivative-use terms. Capability, cost, safety, and download-count
  statements remain attributed to Meta.

#### Strategy and policy context

- [ChinaTalk's annotated DeepSeek interview translation](https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas)
  preserves Liang Wenfeng's first-person account of research, pricing, talent,
  and open-release strategy. His statements establish a stated position, not
  independently verified motive or industry-wide behavior; translator notes are
  commentary.
- The [official English World AI Conference address](https://english.scio.gov.cn/topnews/2026-07/18/content_118605932.html)
  records policy language advocating openness, collaboration, application, and
  international governance. It does not establish why a lab released a model,
  what a license permits, or whether an artifact shipped.

#### Kimi K3 checkpoint

The [July 16, 2026 Kimi K3 launch post](https://www.kimi.com/blog/kimi-k3)
supports product and API availability and Moonshot's promise to release full
weights by July 27 with a technical report. This Atlas snapshot predates that
date. It therefore does **not** report the weights, license, model card,
inference code, checksums, or report as shipped and does not convert vendor
performance or economics claims into independent findings.

The source record has an explicit revision policy: recheck on or after July 27,
inspect the actual artifacts and legal terms, and require independent workload
or safety evidence before making a verification claim. The future date appears
as a review obligation in prose, not as a completed timeline event.

### Culture and everyday-life release

The release `rural-creator-platform-chain` uses three reviewed leads and no
downloaded media, scraped audience dataset, or review-stage Dispatch artifact.

#### Li Ziqi and the managed creator brand

- Record: `source-li-ziqi-platform-economy`
- Role: supporting reported essay
- Published: November 1, 2021
- Canonical source: [Rest of World on Li Ziqi](https://restofworld.org/2021/tiktok-china-influencer-liziqi/)
- Supported relationship: rural Mianyang creator setting to Hangzhou Weinian's
  reported management of social campaigns and the food brand.
- Boundary: the article's account of the setting, management relationship,
  e-commerce operation, hiatus, and lawsuit is reported evidence. Its framing
  of pastoral fantasy, politics, and freedom remains attributed analysis. The
  Atlas does not adjudicate the dispute or generalize from Li to all rural
  creators.

#### Factory TikTok and cross-border marketing

- Record: `source-factory-tiktok`
- Role: supporting reporting
- Published: June 24, 2021
- Canonical source: [Rest of World on Factory TikTok](https://restofworld.org/2021/the-chinese-content-farms-behind-factory-tiktok/)
- Supported relationship: a spokesperson's account of a Hubei-based Bioa Mall
  operation whose largest customer base was in North America, specifically the
  United States.
- Boundary: the team size, account count, view count, filming practice, and
  customer geography are attributed period claims. They are not a durable
  quantitative series and do not establish the scale or labor conditions of
  Factory TikTok as a whole.

#### Algorithmic recommendation provisions

- Record: `source-algorithm-provisions-translation`
- Role: supporting bilingual legal translation
- Published: January 10, 2022; effective March 1, 2022
- Canonical source: [DigiChina translation and Chinese text](https://digichina.stanford.edu/work/translation-internet-information-service-algorithmic-recommendation-management-provisions-effective-march-1-2022/)
- Supported claims: mainland scope; disclosure of basic recommendation
  mechanisms; a non-personalized or disable option; complaint channels; and the
  effective date.
- Boundary: the Chinese original controls legal interpretation. The rules
  postdate both 2021 reports and are a separate legal layer, not evidence that
  regulation caused either creator case or that a platform complied.

The two geographic lines are source-backed editorial diagrams. Mianyang to
Hangzhou means the reported creator-management relationship. Hubei to the
United States means the spokesperson's reported customer-market relationship.
Neither line is a physical route, shipment record, traffic measurement, or
claim about every creator or factory account.

### Semiconductor release

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

The source ledger is derived from the selected step and its declared events,
relations, places, and chart observation when those structures exist. Unrelated
sources do not remain visible merely because they belong to the release. A case
does not gain empty map or chart controls merely to match another release.

The chart appears only on a step that explicitly references a series. Month is
a chart cursor and does not reconstruct the evidence available as of that date.
The local relation diagram and semantic relationship list remain the primary
spatial explanation. MapLibre is optional, consent-gated, and disposable.

## Release threshold and deferred work

The additional cases demonstrate that the interaction can represent a culture
and everyday-life chain or a non-geographic release-state ledger without
requiring a dossier or manufacturing a quantitative series. That implementation
milestone does not itself authorize a global-navigation change: all three cases
remain `prototype` / `source-snapshot` and need a separate publication review.

Before promoting this case from `prototype` or `source-snapshot`:

1. Archive raw source artifacts where licensing and redistribution permit it.
2. Store raw Comtrade responses or replace the preview with a keyed, pinned
   Census extraction.
3. Record artifact retrieval tooling and transformation code.
4. Review Chinese-language translations and expose translation methodology.
5. Add independently observed outcome evidence before changing any company
   statement from `reported`.
6. Review every conclusion and caveat through the publication workflow.
7. Add Chinese-language or first-party companion sources for the culture case
   where they materially strengthen a relationship or legal interpretation.
8. Re-audit the Kimi K3 source on or after July 27, 2026, and add artifacts only
   after directly reviewing their availability, terms, and technical contents.
