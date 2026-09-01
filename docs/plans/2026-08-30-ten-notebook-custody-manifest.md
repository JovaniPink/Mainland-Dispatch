# Ten-Notebook content, component, link, and fragment custody manifest

**Status:** Complete current-state inventory; proposed migration assignments

**Inventory revision:** `1f040f3b5327c6b635a13d2cddc5b7cc36fb2fce`

**Recorded:** August 30, 2026

## Purpose and gate

This manifest inventories the seven public Notebook entries before any proposed split. It is the loss-prevention gate for the ten-Notebook program, not authorization to edit or republish a current entry.

Every item below has one disposition: `keep`, `move`, `share`, `revise`, `correct`, or `retire-with-reason`. No item is unassigned. Move and correction rows remain proposals until a separate editorial decision authorizes the corresponding Inquiry 04/10 or Inquiry 06/09 migration.

A resource reference is one stored format, source-link, audio-canonical, or audio-media field. The inventory contains 195 stored references and 175 destinations unique within their current Notebook; the latter is not a site-wide deduplicated count.

## Inventory totals

|   Inquiry | Variant             | Formats | Sources | Stored URL references | Per-Notebook unique destinations | Current action                 |
| --------: | ------------------- | ------: | ------: | --------------------: | -------------------------------: | ------------------------------ |
|        01 | `argument-model`    |       3 |       8 |                    13 |                               13 | Preserve                       |
|        02 | `evidence-watch`    |       3 |      13 |                    24 |                               20 | Preserve                       |
|        03 | `power-balance`     |       3 |      23 |                    36 |                               32 | Preserve                       |
|        04 | `maritime-risk`     |       3 |      26 |                    31 |                               28 | Proposed correct/split with 10 |
|        05 | `trade-adjustment`  |       1 |      24 |                    29 |                               27 | Preserve                       |
|        06 | `circulation-gates` |       1 |      25 |                    45 |                               41 | Proposed correct/split with 09 |
|        07 | `economic-signals`  |       3 |      11 |                    17 |                               14 | Preserve                       |
| **Total** | -                   |  **17** | **130** |               **195** |                          **175** | -                              |

## Base identity and publication-field custody

The inventories below enumerate variant-specific prose and typed records. This
matrix assigns the shared `NotebookBaseSchema` identity and publication fields
that are otherwise easy to overlook. `Correct after decision` means the field
may change only in the separately authorized migration or correction; this
manifest does not itself authorize that public-state transition.

| Base field           | 01   | 02   | 03   | 04                     | 05   | 06                            | 07   |
| -------------------- | ---- | ---- | ---- | ---------------------- | ---- | ----------------------------- | ---- |
| `ordinal`            | keep | keep | keep | keep                   | keep | keep                          | keep |
| `slug`               | keep | keep | keep | keep                   | keep | keep                          | keep |
| `title`              | keep | keep | keep | keep                   | keep | keep                          | keep |
| `variant`            | keep | keep | keep | keep                   | keep | revise to two-domain contract | keep |
| `publishedAt`        | keep | keep | keep | keep                   | keep | keep                          | keep |
| `updatedAt`          | keep | keep | keep | correct after decision | keep | correct after decision        | keep |
| `readTime`           | keep | keep | keep | revise                 | keep | revise                        | keep |
| `tags`               | keep | keep | keep | revise                 | keep | revise                        | keep |
| `editorialStatus`    | keep | keep | keep | correct after decision | keep | correct after decision        | keep |
| `reviewState`        | keep | keep | keep | keep                   | keep | keep                          | keep |
| `unresolvedQuestion` | keep | keep | keep | revise                 | keep | revise                        | keep |

For Inquiry 04, `correct after decision` means a later authorized correction
may set a new `updatedAt` and change `editorialStatus` to `corrected`; it does
not permit an anticipatory status change here. Inquiry 06 follows the same
rule, with its variant revised only through the separately reviewed two-domain
contract. All other base fields remain with their current Notebook owners.

## Component custody

| Component or contract                                                                             | Current owner                | Proposed custody                                                                                   |
| ------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `NotebookReaderShell`, `NotebookSecondarySection`                                                 | Shared reader                | Keep shared                                                                                        |
| `NotebookFormats`, `NotebookSourceTrail`, `NotebookProse`                                         | Shared evidence presentation | Keep shared                                                                                        |
| `NotebookSectionHeading`, `NotebookSectionLink`                                                   | Shared section navigation    | Keep shared                                                                                        |
| `NotebookStatus`, `JsonLd`, metadata builders                                                     | Shared publication and SEO   | Keep shared                                                                                        |
| `NotebookAudioFacade`                                                                             | Inquiries 02, 03, 05, and 06 | Keep one consent/loading contract; Inquiry 06 retains playback ownership during the proposed split |
| `WhatToWatch`                                                                                     | Inquiry 02                   | Keep                                                                                               |
| `PairedPowerMetrics`, `ChinaConcentrationBars`, `DemographicProfiles`                             | Inquiry 03                   | Keep                                                                                               |
| `ChokepointPortfolioMap` and its XState machine                                                   | Inquiry 04                   | Share with a future Inquiry 10 route subset; do not fork consent or state behavior                 |
| `MaritimeScaleCards`, `PortfolioLogic`                                                            | Inquiry 04                   | Revise data ownership; move only Arctic-specific records                                           |
| `AdjustmentChainFigure`, `ShockComparisonFigure`, `DistributionCasesFigure`, `PolicyMatrixFigure` | Inquiry 05                   | Keep                                                                                               |
| `CirculationGatesFigure`                                                                          | Inquiry 06                   | Correct only through a separately accepted two-domain contract                                     |
| `TransshipmentEvidenceFigure`                                                                     | Inquiry 06                   | Move -> Inquiry 09 after authorization                                                             |
| `EconomicSignalsFigure`                                                                           | Inquiry 07                   | Keep                                                                                               |
| Future `EnergySystemFigure`                                                                       | Inquiry 08                   | New; no current item moves                                                                         |

Fixed component fragments also remain stable: `working-thesis-label`, `mobile-notebook-sections`, `notebook-audio-title`, `selected-watch-title`, `paired-power-title`, `concentration-title`, `demographic-title`, `maritime-scale-title`, `portfolio-logic-title`, `adjustment-chain-title`, `shock-comparison-title`, `distribution-cases-title`, `policy-matrix-title`, `circulation-gates-title`, `circulation-gates-note`, `transshipment-proof-title`, `transshipment-proof-note`, `economic-signals-title`, `economic-signals-source-roles`.

## Notebook inventories

### Inquiry 01 - What Xi Jinping Wants

Source: [`what-xi-jinping-wants.ts`](../../src/content/notebook/what-xi-jinping-wants.ts)

#### Prose and information blocks

| Field path          | Disposition |
| ------------------- | ----------- |
| `subtitle`          | keep        |
| `description`       | keep        |
| `thesis`            | keep        |
| `frontPagePreview`  | keep        |
| `sections.why`      | keep        |
| `sections.model`    | keep        |
| `sections.explains` | keep        |
| `sections.pushback` | keep        |
| `sections.context`  | keep        |
| `sections.changed`  | keep        |
| `limitations[0]`    | keep        |
| `limitations[1]`    | keep        |
| `limitations[2]`    | keep        |
| `limitations[3]`    | keep        |

#### Typed records

| Collection      | Record                                      | Disposition |
| --------------- | ------------------------------------------- | ----------- |
| `turningPoints` | `turning-rudd-ideology`                     | keep        |
| `turningPoints` | `turning-rudd-private-capital`              | keep        |
| `turningPoints` | `turning-rudd-2028`                         | keep        |
| `timeline`      | `A reported PLA readiness benchmark`        | keep        |
| `timeline`      | `Rudd’s political-miscalculation scenario`  | keep        |
| `timeline`      | `An inferred national-rejuvenation horizon` | keep        |

#### Formats and source records

| Kind                                   | ID                                           | Disposition |
| -------------------------------------- | -------------------------------------------- | ----------- |
| Format                                 | `format-rudd-listen`                         | keep        |
| Format                                 | `format-rudd-watch`                          | keep        |
| Format                                 | `format-rudd-read`                           | keep        |
| Source and public source-card fragment | `notebook-source-rudd-book-dissertation`     | keep        |
| Source and public source-card fragment | `notebook-source-blanchette-xi-thought`      | keep        |
| Source and public source-card fragment | `notebook-source-torigian-family-party`      | keep        |
| Source and public source-card fragment | `notebook-source-rudd-ambassador-context`    | keep        |
| Source and public source-card fragment | `notebook-source-cia-2027`                   | keep        |
| Source and public source-card fragment | `notebook-source-new-productive-forces`      | keep        |
| Source and public source-card fragment | `notebook-source-reunification-rejuvenation` | keep        |
| Source and public source-card fragment | `notebook-source-csis-pla-purges`            | keep        |

#### Stored resource references

| Kind   | Owner                                        | Exact publisher or media URL                                                                                     | Disposition |
| ------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| format | `format-rudd-listen`                         | https://podcasts.apple.com/us/podcast/what-xi-jinping-wants/id1548604447?i=1000776737823                         | keep        |
| format | `format-rudd-watch`                          | https://www.youtube.com/watch?v=DprKDXRlubw                                                                      | keep        |
| format | `format-rudd-read`                           | https://www.nytimes.com/2026/07/14/opinion/ezra-klein-podcast-kevin-rudd.html                                    | keep        |
| source | `notebook-source-rudd-book-dissertation`     | https://academic.oup.com/book/58156                                                                              | keep        |
| source | `notebook-source-rudd-book-dissertation`     | https://ora.ox.ac.uk/objects/uuid%3A6c63d843-6a36-486d-b6be-fe4f66a08058                                         | keep        |
| source | `notebook-source-blanchette-xi-thought`      | https://chinabooksreview.com/2024/10/17/xi-thought/                                                              | keep        |
| source | `notebook-source-blanchette-xi-thought`      | https://www.fisc-china.org/review-on-xi-jinping                                                                  | keep        |
| source | `notebook-source-torigian-family-party`      | https://uscnpm.org/interviews/family-line-party-line-w-joseph-torigian/                                          | keep        |
| source | `notebook-source-rudd-ambassador-context`    | https://www.foreignminister.gov.au/minister/penny-wong/media-release/australias-ambassador-united-states-america | keep        |
| source | `notebook-source-cia-2027`                   | https://www.cia.gov/static/Transcript-Trainor-Awards-Ceremony-IHO-WJB.pdf                                        | keep        |
| source | `notebook-source-new-productive-forces`      | https://english.www.gov.cn/news/202402/01/content_WS65bb2e23c6d0868f4e8e3b09.html                                | keep        |
| source | `notebook-source-reunification-rejuvenation` | https://english.www.gov.cn/news/topnews/202210/25/content_WS6357df20c6d0a757729e1bfc.html                        | keep        |
| source | `notebook-source-csis-pla-purges`            | https://chinapower.csis.org/data/chinese-pla-military-purges/                                                    | keep        |

#### Route fragments

| Fragment          | Disposition |
| ----------------- | ----------- |
| `#why`            | keep        |
| `#formats`        | keep        |
| `#turning-points` | keep        |
| `#model`          | keep        |
| `#explains`       | keep        |
| `#pushback`       | keep        |
| `#dates`          | keep        |
| `#context`        | keep        |
| `#sources`        | keep        |
| `#changed`        | keep        |
| `#question`       | keep        |

Every source ID above is also rendered as a source-card fragment on this route. A moved source must leave an accessible compatibility notice at its former fragment and link to the exact successor fragment; it may not disappear or become a script redirect.

### Inquiry 02 - Open Models, Closed System?

Source: [`open-models-closed-system.ts`](../../src/content/notebook/open-models-closed-system.ts)

#### Prose and information blocks

| Field path           | Disposition |
| -------------------- | ----------- |
| `subtitle`           | keep        |
| `description`        | keep        |
| `thesis`             | keep        |
| `frontPagePreview`   | keep        |
| `sections.why`       | keep        |
| `sections.proposal`  | keep        |
| `sections.strongest` | keep        |
| `sections.overreach` | keep        |
| `sections.noul`      | keep        |
| `sections.talent`    | keep        |
| `sections.changed`   | keep        |
| `limitations[0]`     | keep        |
| `limitations[1]`     | keep        |
| `limitations[2]`     | keep        |
| `limitations[3]`     | keep        |
| `limitations[4]`     | keep        |

#### Typed records

| Collection      | Record                        | Disposition |
| --------------- | ----------------------------- | ----------- |
| `turningPoints` | `turning-open-models-control` | keep        |
| `turningPoints` | `turning-open-models-noul`    | keep        |
| `turningPoints` | `turning-open-models-talent`  | keep        |
| `claimAudit`    | `audit-xi-concrete-offer`     | keep        |
| `claimAudit`    | `audit-global-order`          | keep        |
| `claimAudit`    | `audit-domestic-controls`     | keep        |
| `claimAudit`    | `audit-universal-theft`       | keep        |
| `claimAudit`    | `audit-model-obsolescence`    | keep        |
| `claimAudit`    | `audit-starlink-5g`           | keep        |
| `claimAudit`    | `audit-noul-reporting`        | keep        |
| `claimAudit`    | `audit-noul-detentions`       | keep        |
| `claimAudit`    | `audit-first-fields`          | keep        |
| `claimAudit`    | `audit-in-spite-of-china`     | keep        |
| `watchItems`    | `promise-training`            | keep        |
| `watchItems`    | `promise-centers`             | keep        |
| `watchItems`    | `promise-mazu`                | keep        |
| `watchItems`    | `promise-waico`               | keep        |
| `watchItems`    | `promise-open-models`         | keep        |
| `watchItems`    | `promise-security`            | keep        |

#### Formats and source records

| Kind                                   | ID                                     | Disposition |
| -------------------------------------- | -------------------------------------- | ----------- |
| Format                                 | `format-open-models-listen`            | keep        |
| Format                                 | `format-open-models-read`              | keep        |
| Format                                 | `format-open-models-watch`             | keep        |
| Source and public source-card fragment | `notebook-source-china-insider-191`    | keep        |
| Source and public source-card fragment | `notebook-source-hudson-context`       | keep        |
| Source and public source-card fragment | `notebook-source-xi-waic-address`      | keep        |
| Source and public source-card fragment | `notebook-source-waico-founding`       | keep        |
| Source and public source-card fragment | `notebook-source-cac-generative-ai`    | keep        |
| Source and public source-card fragment | `notebook-source-sheehan-annotated`    | keep        |
| Source and public source-card fragment | `notebook-source-stanford-ai-index`    | keep        |
| Source and public source-card fragment | `notebook-source-reuters-model-access` | keep        |
| Source and public source-card fragment | `notebook-source-ap-noul`              | keep        |
| Source and public source-card fragment | `notebook-source-xinhua-noul-record`   | keep        |
| Source and public source-card fragment | `notebook-source-imu-fields-2026`      | keep        |
| Source and public source-card fragment | `notebook-source-pku-fields`           | keep        |
| Source and public source-card fragment | `notebook-source-university-fields`    | keep        |
| Consent-gated audio metadata           | `notebook-source-china-insider-191`    | keep        |

#### Stored resource references

| Kind            | Owner                                  | Exact publisher or media URL                                                                                                                                                                                                                             | Disposition |
| --------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| format          | `format-open-models-listen`            | https://china-insider.simplecast.com/episodes/china-insider-xi-jinpings-speech-at-the-world-artificial-intelligence-conference-typhoon-noul-makes-landfall-in-southern-china-2026-fields-medal-recipients-hong-wang-and-yu-deng-5kUxKgJM                 | keep        |
| format          | `format-open-models-read`              | https://www.fmprc.gov.cn/eng/xw/zyxw/202607/t20260717_11984766.html                                                                                                                                                                                      | keep        |
| format          | `format-open-models-watch`             | https://www.youtube.com/watch?v=epKAbjsveyE                                                                                                                                                                                                              | keep        |
| audio canonical | `notebook-source-china-insider-191`    | https://china-insider.simplecast.com/episodes/china-insider-xi-jinpings-speech-at-the-world-artificial-intelligence-conference-typhoon-noul-makes-landfall-in-southern-china-2026-fields-medal-recipients-hong-wang-and-yu-deng-5kUxKgJM                 | keep        |
| audio media     | `notebook-source-china-insider-191`    | https://cdn.simplecast.com/media/audio/transcoded/8ba8b7ea-ada5-4d43-b4dd-cd106ac3d384/c74926bb-1945-46fc-a842-2ee2b1458a55/episodes/audio/group/e3039219-510f-4e98-917e-b39ba241836d/group-item/e359f4a4-1dd2-4ae2-af0e-ad8a94cc1e95/128_default_tc.mp3 | keep        |
| source          | `notebook-source-china-insider-191`    | https://china-insider.simplecast.com/episodes/china-insider-xi-jinpings-speech-at-the-world-artificial-intelligence-conference-typhoon-noul-makes-landfall-in-southern-china-2026-fields-medal-recipients-hong-wang-and-yu-deng-5kUxKgJM                 | keep        |
| source          | `notebook-source-hudson-context`       | https://www.hudson.org/experts/1356-miles-yu                                                                                                                                                                                                             | keep        |
| source          | `notebook-source-hudson-context`       | https://www.hudson.org/china-center                                                                                                                                                                                                                      | keep        |
| source          | `notebook-source-xi-waic-address`      | https://www.fmprc.gov.cn/eng/xw/zyxw/202607/t20260717_11984766.html                                                                                                                                                                                      | keep        |
| source          | `notebook-source-xi-waic-address`      | https://www.youtube.com/watch?v=epKAbjsveyE                                                                                                                                                                                                              | keep        |
| source          | `notebook-source-waico-founding`       | https://www.fmprc.gov.cn/eng/wjbzhd/202607/t20260717_11984747.html                                                                                                                                                                                       | keep        |
| source          | `notebook-source-waico-founding`       | https://www.reuters.com/world/china/twenty-nine-countries-sign-agreement-establish-global-ai-cooperation-body-2026-07-16/                                                                                                                                | keep        |
| source          | `notebook-source-cac-generative-ai`    | https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm                                                                                                                                                                                                 | keep        |
| source          | `notebook-source-sheehan-annotated`    | https://mattsheehan.substack.com/p/xi-jinpings-big-ai-speech-annotated                                                                                                                                                                                   | keep        |
| source          | `notebook-source-stanford-ai-index`    | https://hai.stanford.edu/ai-index/2026-ai-index-report                                                                                                                                                                                                   | keep        |
| source          | `notebook-source-reuters-model-access` | https://www.reuters.com/world/beijing-is-looking-curbing-overseas-access-chinas-top-ai-models-sources-say-2026-07-07/                                                                                                                                    | keep        |
| source          | `notebook-source-ap-noul`              | https://apnews.com/article/05f860066a9a75595c5bcc4df8356337                                                                                                                                                                                              | keep        |
| source          | `notebook-source-xinhua-noul-record`   | https://english.news.cn/20260726/3ea301fcdb434e3e95670bbd2f43ff1c/c.html                                                                                                                                                                                 | keep        |
| source          | `notebook-source-xinhua-noul-record`   | https://www.news.cn/20260713/23844422c45047d5a3f7a3db5ed1ca7d/c.html                                                                                                                                                                                     | keep        |
| source          | `notebook-source-imu-fields-2026`      | https://www.mathunion.org/imu-awards/fields-medal/fields-medals-2026                                                                                                                                                                                     | keep        |
| source          | `notebook-source-pku-fields`           | https://newsen.pku.edu.cn/news_events/news/focus/15623.html                                                                                                                                                                                              | keep        |
| source          | `notebook-source-university-fields`    | https://news.uchicago.edu/story/uchicago-prof-yu-deng-receives-fields-medal-highest-honor-mathematics                                                                                                                                                    | keep        |
| source          | `notebook-source-university-fields`    | https://math.nyu.edu/dynamic/news/101/                                                                                                                                                                                                                   | keep        |
| source          | `notebook-source-university-fields`    | https://www.ihes.fr/hong-wang-fields-2026/                                                                                                                                                                                                               | keep        |

#### Route fragments

| Fragment          | Disposition |
| ----------------- | ----------- |
| `#why`            | keep        |
| `#formats`        | keep        |
| `#turning-points` | keep        |
| `#proposal`       | keep        |
| `#strongest`      | keep        |
| `#overreach`      | keep        |
| `#claim-audit`    | keep        |
| `#noul`           | keep        |
| `#talent`         | keep        |
| `#what-to-watch`  | keep        |
| `#sources`        | keep        |
| `#changed`        | keep        |
| `#question`       | keep        |

Every source ID above is also rendered as a source-card fragment on this route. A moved source must leave an accessible compatibility notice at its former fragment and link to the exact successor fragment; it may not disappear or become a script redirect.

### Inquiry 03 - Dominance Is a Dashboard, Not a Crown

Source: [`dominance-is-a-dashboard.ts`](../../src/content/notebook/dominance-is-a-dashboard.ts)

#### Prose and information blocks

| Field path            | Disposition |
| --------------------- | ----------- |
| `subtitle`            | keep        |
| `description`         | keep        |
| `thesis`              | keep        |
| `frontPagePreview`    | keep        |
| `sections.why`        | keep        |
| `sections.verdict`    | keep        |
| `sections.industry`   | keep        |
| `sections.science`    | keep        |
| `sections.leverage`   | keep        |
| `sections.demography` | keep        |
| `sections.history`    | keep        |
| `sections.changed`    | keep        |
| `limitations[0]`      | keep        |
| `limitations[1]`      | keep        |
| `limitations[2]`      | keep        |
| `limitations[3]`      | keep        |
| `limitations[4]`      | keep        |
| `limitations[5]`      | keep        |

#### Typed records

| Collection            | Record                                                                | Disposition |
| --------------------- | --------------------------------------------------------------------- | ----------- |
| `turningPoints`       | `turning-dominance-industrial`                                        | keep        |
| `turningPoints`       | `turning-dominance-science`                                           | keep        |
| `turningPoints`       | `turning-dominance-demography`                                        | keep        |
| `turningPoints`       | `turning-dominance-power`                                             | keep        |
| `claimAudit`          | `audit-dominance-sector-lead`                                         | keep        |
| `claimAudit`          | `audit-dominance-seventy-percent`                                     | keep        |
| `claimAudit`          | `audit-dominance-scientists`                                          | keep        |
| `claimAudit`          | `audit-dominance-biopharma`                                           | keep        |
| `claimAudit`          | `audit-dominance-hyperfactory`                                        | keep        |
| `claimAudit`          | `audit-dominance-agriculture`                                         | keep        |
| `claimAudit`          | `audit-dominance-demographic-doom`                                    | keep        |
| `claimAudit`          | `audit-dominance-handoff`                                             | keep        |
| `comparisons`         | `metric-manufacturing-value-added`                                    | keep        |
| `comparisons`         | `metric-nominal-gdp`                                                  | keep        |
| `comparisons`         | `metric-research-development`                                         | keep        |
| `comparisons`         | `metric-science-publications`                                         | keep        |
| `comparisons`         | `metric-biopharma-programs`                                           | keep        |
| `comparisons`         | `metric-private-ai-investment`                                        | keep        |
| `comparisons`         | `metric-military-spending`                                            | keep        |
| `comparisons`         | `metric-reserve-currency`                                             | keep        |
| `concentrations`      | `concentration-ev-production`                                         | keep        |
| `concentrations`      | `concentration-battery-cells`                                         | keep        |
| `concentrations`      | `concentration-solar-capacity`                                        | keep        |
| `concentrations`      | `concentration-robot-installations`                                   | keep        |
| `concentrations`      | `concentration-critical-minerals`                                     | keep        |
| `demographicProfiles` | `0`                                                                   | keep        |
| `demographicProfiles` | `1`                                                                   | keep        |
| `timeline`            | `Beijing takes China’s United Nations seat`                           | keep        |
| `timeline`            | `Reform and opening reorganize the development model`                 | keep        |
| `timeline`            | `The United States and PRC normalize relations`                       | keep        |
| `timeline`            | `China joins the World Trade Organization`                            | keep        |
| `timeline`            | `Made in China 2025 names the upgrading project`                      | keep        |
| `timeline`            | `Section 301 tariffs harden economic competition`                     | keep        |
| `timeline`            | `The CHIPS and Science Act commits US industrial policy`              | keep        |
| `timeline`            | `Industrial lead and research near-parity become measurable together` | keep        |
| `timeline`            | `Scale meets chokepoint power`                                        | keep        |
| `timeline`            | `The dominance question reaches a mainstream interview`               | keep        |

#### Formats and source records

| Kind                                   | ID                                        | Disposition |
| -------------------------------------- | ----------------------------------------- | ----------- |
| Format                                 | `format-dominance-listen`                 | keep        |
| Format                                 | `format-dominance-transcript`             | keep        |
| Format                                 | `format-dominance-feature`                | keep        |
| Source and public source-card fragment | `notebook-source-npr-dominance`           | keep        |
| Source and public source-card fragment | `notebook-source-new-yorker-china-future` | keep        |
| Source and public source-card fragment | `notebook-source-unido-yearbook-2025`     | keep        |
| Source and public source-card fragment | `notebook-source-world-bank-us-china`     | keep        |
| Source and public source-card fragment | `notebook-source-iea-ev-2026`             | keep        |
| Source and public source-card fragment | `notebook-source-iea-etp-2026`            | keep        |
| Source and public source-card fragment | `notebook-source-ifr-robotics-2025`       | keep        |
| Source and public source-card fragment | `notebook-source-ncses-2026`              | keep        |
| Source and public source-card fragment | `notebook-source-jama-biopharma-2026`     | keep        |
| Source and public source-card fragment | `notebook-source-stanford-ai-2026`        | keep        |
| Source and public source-card fragment | `notebook-source-sipri-2026`              | keep        |
| Source and public source-card fragment | `notebook-source-imf-cofer-2026q1`        | keep        |
| Source and public source-card fragment | `notebook-source-iea-minerals-2026`       | keep        |
| Source and public source-card fragment | `notebook-source-china-nbs-2025`          | keep        |
| Source and public source-card fragment | `notebook-source-census-2025`             | keep        |
| Source and public source-card fragment | `notebook-source-pnas-scientists`         | keep        |
| Source and public source-card fragment | `notebook-source-un-resolution-2758`      | keep        |
| Source and public source-card fragment | `notebook-source-state-normalization`     | keep        |
| Source and public source-card fragment | `notebook-source-world-bank-reform`       | keep        |
| Source and public source-card fragment | `notebook-source-wto-accession`           | keep        |
| Source and public source-card fragment | `notebook-source-made-in-china-2025`      | keep        |
| Source and public source-card fragment | `notebook-source-ustr-301`                | keep        |
| Source and public source-card fragment | `notebook-source-chips-act`               | keep        |
| Consent-gated audio metadata           | `notebook-source-npr-dominance`           | keep        |

#### Stored resource references

| Kind            | Owner                                     | Exact publisher or media URL                                                                                                                                                                                                  | Disposition |
| --------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| format          | `format-dominance-listen`                 | https://www.npr.org/2026/08/12/nx-s1-5928224/has-the-u-s-lost-its-dominance-to-china                                                                                                                                          | keep        |
| format          | `format-dominance-transcript`             | https://www.npr.org/transcripts/nx-s1-5928224                                                                                                                                                                                 | keep        |
| format          | `format-dominance-feature`                | https://www.newyorker.com/magazine/2026/08/10/the-future-made-in-china                                                                                                                                                        | keep        |
| audio canonical | `notebook-source-npr-dominance`           | https://www.npr.org/2026/08/12/nx-s1-5928224/has-the-u-s-lost-its-dominance-to-china                                                                                                                                          | keep        |
| audio media     | `notebook-source-npr-dominance`           | https://ondemand.npr.org/anon.npr-mp3/npr/specials/2026/08/20260812_specials_has_the_u.s._lost_its_dominance_to_china.mp3?t=fullprog&e=g-s1-138410&p=13&seg=0&d=2669&size=42710040&sc=siteplayer&aw_0_1st.playerid=siteplayer | keep        |
| source          | `notebook-source-npr-dominance`           | https://www.npr.org/2026/08/12/nx-s1-5928224/has-the-u-s-lost-its-dominance-to-china                                                                                                                                          | keep        |
| source          | `notebook-source-npr-dominance`           | https://www.npr.org/transcripts/nx-s1-5928224                                                                                                                                                                                 | keep        |
| source          | `notebook-source-new-yorker-china-future` | https://www.newyorker.com/magazine/2026/08/10/the-future-made-in-china                                                                                                                                                        | keep        |
| source          | `notebook-source-unido-yearbook-2025`     | https://stat.unido.org/portal/storage/file/publications/yb/2025/UNIDO_IndustrialStatistics_Yearbook_2025.pdf                                                                                                                  | keep        |
| source          | `notebook-source-world-bank-us-china`     | https://data.worldbank.org/?locations=CN-US                                                                                                                                                                                   | keep        |
| source          | `notebook-source-iea-ev-2026`             | https://www.iea.org/reports/global-ev-outlook-2026/manufacturing-and-trade                                                                                                                                                    | keep        |
| source          | `notebook-source-iea-ev-2026`             | https://www.iea.org/reports/global-ev-outlook-2026/electric-vehicle-batteries                                                                                                                                                 | keep        |
| source          | `notebook-source-iea-etp-2026`            | https://www.iea.org/reports/energy-technology-perspectives-2026/supply-chain-risks-and-industrial-competitiveness                                                                                                             | keep        |
| source          | `notebook-source-ifr-robotics-2025`       | https://ifr.org/worldrobotics/report-2025                                                                                                                                                                                     | keep        |
| source          | `notebook-source-ncses-2026`              | https://ncses.nsf.gov/pubs/nsbsep20261/executive-summary                                                                                                                                                                      | keep        |
| source          | `notebook-source-ncses-2026`              | https://ncses.nsf.gov/pubs/nsbsep20261/figure/29                                                                                                                                                                              | keep        |
| source          | `notebook-source-jama-biopharma-2026`     | https://jamanetwork.com/journals/jama/fullarticle/2846875?resultClick=1                                                                                                                                                       | keep        |
| source          | `notebook-source-stanford-ai-2026`        | https://hai.stanford.edu/ai-index/2026-ai-index-report                                                                                                                                                                        | keep        |
| source          | `notebook-source-stanford-ai-2026`        | https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance                                                                                                                                                  | keep        |
| source          | `notebook-source-stanford-ai-2026`        | https://hai.stanford.edu/ai-index/2026-ai-index-report/economy                                                                                                                                                                | keep        |
| source          | `notebook-source-sipri-2026`              | https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-as-european-and-asian-expenditures-surge                                                                                               | keep        |
| source          | `notebook-source-imf-cofer-2026q1`        | https://data.imf.org/en/news/imf%20data%20brief%20july%201                                                                                                                                                                    | keep        |
| source          | `notebook-source-iea-minerals-2026`       | https://www.iea.org/reports/global-critical-minerals-outlook-2026/outlook                                                                                                                                                     | keep        |
| source          | `notebook-source-iea-minerals-2026`       | https://www.iea.org/reports/global-critical-minerals-outlook-2026/executive-summary                                                                                                                                           | keep        |
| source          | `notebook-source-china-nbs-2025`          | https://www.stats.gov.cn/english/PressRelease/202602/t20260228_1962661.html                                                                                                                                                   | keep        |
| source          | `notebook-source-census-2025`             | https://www.census.gov/data/datasets/time-series/demo/popest/2020s-national-detail.html                                                                                                                                       | keep        |
| source          | `notebook-source-census-2025`             | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/national/asrh/nc-est2025-agesex-res.csv                                                                                                                    | keep        |
| source          | `notebook-source-census-2025`             | https://www.census.gov/newsroom/press-releases/2026/population-growth-slows.html                                                                                                                                              | keep        |
| source          | `notebook-source-pnas-scientists`         | https://pubmed.ncbi.nlm.nih.gov/37368928/                                                                                                                                                                                     | keep        |
| source          | `notebook-source-un-resolution-2758`      | https://digitallibrary.un.org/record/498905/files/S_10378-EN.pdf                                                                                                                                                              | keep        |
| source          | `notebook-source-state-normalization`     | https://history.state.gov/historicaldocuments/frus1977-80v01/d104                                                                                                                                                             | keep        |
| source          | `notebook-source-world-bank-reform`       | https://openknowledge.worldbank.org/bitstream/handle/10986/37727/9781464818776.pdf                                                                                                                                            | keep        |
| source          | `notebook-source-wto-accession`           | https://www.wto.org/english/thewto_e/acc_e/a1_chine_e.htm                                                                                                                                                                     | keep        |
| source          | `notebook-source-made-in-china-2025`      | https://english.www.gov.cn/archive/state_council_gazette/2015/06/10/content_281475124447124.htm                                                                                                                               | keep        |
| source          | `notebook-source-ustr-301`                | https://ustr.gov/about-us/policy-offices/press-office/press-releases/2018/june/ustr-issues-tariffs-chinese-products                                                                                                           | keep        |
| source          | `notebook-source-chips-act`               | https://www.commerce.gov/news/press-releases/2022/08/statement-us-secretary-commerce-gina-raimondo-signing-chips-and-science                                                                                                  | keep        |

#### Route fragments

| Fragment          | Disposition |
| ----------------- | ----------- |
| `#why`            | keep        |
| `#formats`        | keep        |
| `#turning-points` | keep        |
| `#verdict`        | keep        |
| `#dashboard`      | keep        |
| `#industry`       | keep        |
| `#science`        | keep        |
| `#leverage`       | keep        |
| `#demography`     | keep        |
| `#timeline`       | keep        |
| `#claim-audit`    | keep        |
| `#sources`        | keep        |
| `#changed`        | keep        |
| `#question`       | keep        |

Every source ID above is also rendered as a source-card fragment on this route. A moved source must leave an accessible compatibility notice at its former fragment and link to the exact successor fragment; it may not disappear or become a script redirect.

### Inquiry 04 - Routing Around Risk

Source: [`routing-around-risk.ts`](../../src/content/notebook/routing-around-risk.ts)

#### Prose and information blocks

| Field path             | Disposition        |
| ---------------------- | ------------------ |
| `subtitle`             | correct            |
| `description`          | correct            |
| `thesis`               | correct            |
| `frontPagePreview`     | correct            |
| `sections.why`         | keep               |
| `sections.verdict`     | keep               |
| `sections.chokepoints` | keep               |
| `sections.portfolio`   | keep               |
| `sections.arctic`      | move -> Inquiry 10 |
| `sections.governance`  | revise             |
| `sections.history`     | keep               |
| `sections.changed`     | correct            |
| `limitations[0]`       | correct            |
| `limitations[1]`       | correct            |
| `limitations[2]`       | correct            |
| `limitations[3]`       | correct            |
| `limitations[4]`       | correct            |
| `limitations[5]`       | correct            |

#### Typed records

| Collection      | Record                                              | Disposition        |
| --------------- | --------------------------------------------------- | ------------------ |
| `turningPoints` | `turning-risk-buffer`                               | keep               |
| `turningPoints` | `turning-risk-transfer`                             | keep               |
| `turningPoints` | `turning-risk-arctic`                               | move -> Inquiry 10 |
| `turningPoints` | `turning-risk-enablement`                           | keep               |
| `claimAudit`    | `audit-risk-portfolio`                              | keep               |
| `claimAudit`    | `audit-risk-hormuz-scale`                           | keep               |
| `claimAudit`    | `audit-risk-pipelines`                              | keep               |
| `claimAudit`    | `audit-risk-sts`                                    | keep               |
| `claimAudit`    | `audit-risk-red-sea`                                | keep               |
| `claimAudit`    | `audit-risk-arctic-schedule`                        | move -> Inquiry 10 |
| `claimAudit`    | `audit-risk-transit-cargo`                          | move -> Inquiry 10 |
| `claimAudit`    | `audit-risk-container-count`                        | move -> Inquiry 10 |
| `claimAudit`    | `audit-risk-bellona-counts`                         | move -> Inquiry 10 |
| `claimAudit`    | `audit-risk-inventory`                              | keep               |
| `claimAudit`    | `audit-risk-procurement`                            | keep               |
| `claimAudit`    | `audit-risk-russian-command`                        | move -> Inquiry 10 |
| `scaleMetrics`  | `scale-risk-hormuz`                                 | keep               |
| `scaleMetrics`  | `scale-risk-inventory`                              | keep               |
| `scaleMetrics`  | `scale-risk-suez`                                   | keep               |
| `scaleMetrics`  | `scale-risk-nsr-transit`                            | move -> Inquiry 10 |
| `scaleMetrics`  | `scale-risk-nsr-total`                              | move -> Inquiry 10 |
| `scaleMetrics`  | `scale-risk-sea-legend`                             | move -> Inquiry 10 |
| `routePoints`   | `point-risk-hormuz`                                 | keep               |
| `routePoints`   | `point-risk-gulf-oman`                              | keep               |
| `routePoints`   | `point-risk-fujairah`                               | keep               |
| `routePoints`   | `point-risk-yanbu`                                  | keep               |
| `routePoints`   | `point-risk-habshan`                                | keep               |
| `routePoints`   | `point-risk-bab`                                    | keep               |
| `routePoints`   | `point-risk-suez`                                   | keep               |
| `routePoints`   | `point-risk-ningbo`                                 | move -> Inquiry 10 |
| `routePoints`   | `point-risk-bering`                                 | move -> Inquiry 10 |
| `routePoints`   | `point-risk-felixstowe`                             | move -> Inquiry 10 |
| `routes`        | `route-risk-hormuz`                                 | keep               |
| `routes`        | `route-risk-sts`                                    | keep               |
| `routes`        | `route-risk-saudi-pipeline`                         | keep               |
| `routes`        | `route-risk-uae-pipeline`                           | keep               |
| `routes`        | `route-risk-red-sea`                                | keep               |
| `routes`        | `route-risk-arctic`                                 | move -> Inquiry 10 |
| `timeline`      | `Suez opens a shorter Europe–Asia artery`           | keep               |
| `timeline`      | `The Carter Doctrine elevates Gulf access`          | keep               |
| `timeline`      | `The Tanker War begins`                             | keep               |
| `timeline`      | `China becomes an Arctic Council observer`          | move -> Inquiry 10 |
| `timeline`      | `Beijing publishes its Arctic policy`               | move -> Inquiry 10 |
| `timeline`      | `The IMO Arctic HFO prohibition takes effect`       | move -> Inquiry 10 |
| `timeline`      | `A China–Europe container trial crosses the NSR`    | move -> Inquiry 10 |
| `timeline`      | `Military action sharply constricts Hormuz`         | keep               |
| `timeline`      | `Chinese VLCC behavior shifts again in the Red Sea` | keep               |
| `timeline`      | `Sea Legend adjusts its opening Arctic sailing`     | move -> Inquiry 10 |
| `timeline`      | `Dubai Tower departs Ningbo–Zhoushan`               | move -> Inquiry 10 |

#### Formats and source records

| Kind                                   | ID                                             | Disposition        |
| -------------------------------------- | ---------------------------------------------- | ------------------ |
| Format                                 | `format-risk-cfr`                              | keep               |
| Format                                 | `format-risk-arctic`                           | move -> Inquiry 10 |
| Format                                 | `format-risk-pbs`                              | keep               |
| Source and public source-card fragment | `notebook-source-risk-eia-chokepoints`         | keep               |
| Source and public source-card fragment | `notebook-source-risk-eia-security`            | keep               |
| Source and public source-card fragment | `notebook-source-risk-iea-hormuz`              | keep               |
| Source and public source-card fragment | `notebook-source-risk-eia-bypass`              | keep               |
| Source and public source-card fragment | `notebook-source-risk-unctad-suez`             | keep               |
| Source and public source-card fragment | `notebook-source-risk-reuters-tankers`         | keep               |
| Source and public source-card fragment | `notebook-source-risk-reuters-saudi`           | keep               |
| Source and public source-card fragment | `notebook-source-risk-chnl-2025`               | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-rosatom-2025`            | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-sea-legend`              | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-global-times-sea-legend` | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-zhoushan-departure`      | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-nsidc-passage`           | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-nsidc-2026`              | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-imo-hfo`                 | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-bellona-permits`         | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-bellona-shadow`          | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-treasury`                | keep               |
| Source and public source-card fragment | `notebook-source-risk-ap-russia`               | keep               |
| Source and public source-card fragment | `notebook-source-risk-lloyds-red-sea`          | keep               |
| Source and public source-card fragment | `notebook-source-risk-cfr`                     | keep               |
| Source and public source-card fragment | `notebook-source-risk-arctic-podcast`          | move -> Inquiry 10 |
| Source and public source-card fragment | `notebook-source-risk-pbs`                     | keep               |
| Source and public source-card fragment | `notebook-source-risk-aljazeera`               | share              |
| Source and public source-card fragment | `notebook-source-risk-guardian`                | share              |
| Source and public source-card fragment | `notebook-source-risk-wapo`                    | keep               |

#### Stored resource references

| Kind   | Owner                                          | Exact publisher or media URL                                                                                                        | Disposition        |
| ------ | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| format | `format-risk-cfr`                              | https://www.cfr.org/podcasts/spillover/how-china-is-quietly-winning-the-iran-war-energy-crisis                                      | keep               |
| format | `format-risk-arctic`                           | https://www.thearcticinstitute.org/the-circumpolar-podcast-arctic-shipping-northern-sea-route/                                      | move -> Inquiry 10 |
| format | `format-risk-pbs`                              | https://www.pbs.org/video/russia-china-and-iran-the-future-of-global-energy-in-a-world-at-war-rdjpdi/                               | keep               |
| source | `notebook-source-risk-eia-chokepoints`         | https://www.eia.gov/international/content/analysis/special_topics/World_Oil_Transit_Chokepoints/                                    | keep               |
| source | `notebook-source-risk-eia-security`            | https://www.eia.gov/outlooks/steo/report/energysecurity/article.php                                                                 | keep               |
| source | `notebook-source-risk-eia-security`            | https://www.eia.gov/outlooks/steo/pdf/steo_full.pdf                                                                                 | keep               |
| source | `notebook-source-risk-iea-hormuz`              | https://www.iea.org/about/oil-security-and-emergency-response/strait-of-hormuz                                                      | keep               |
| source | `notebook-source-risk-eia-bypass`              | https://www.eia.gov/todayinenergy/detail.php?id=67804                                                                               | keep               |
| source | `notebook-source-risk-unctad-suez`             | https://unctad.org/publication/navigating-troubled-waters-impact-global-trade-disruption-shipping-routes-red-sea-black              | keep               |
| source | `notebook-source-risk-reuters-tankers`         | https://www.reuters.com/business/energy/chinas-state-shippers-deploy-oil-tankers-outside-gulf-avoid-chokepoints-sources-2026-08-18/ | keep               |
| source | `notebook-source-risk-reuters-saudi`           | https://www.reuters.com/business/energy/saudi-arabia-resumes-oil-loadings-sales-inside-strait-hormuz-2026-08-18/                    | keep               |
| source | `notebook-source-risk-chnl-2025`               | https://chnl.no/news/main-results-of-nsr-transit-navigation-in-2025/                                                                | move -> Inquiry 10 |
| source | `notebook-source-risk-rosatom-2025`            | https://report.rosatom.ru/go_eng/go_rosatom_eng_2025/rosatom_esg_2025_eng.pdf                                                       | move -> Inquiry 10 |
| source | `notebook-source-risk-sea-legend`              | https://www.xindemarinenews.com/news/2077650383913914370                                                                            | move -> Inquiry 10 |
| source | `notebook-source-risk-sea-legend`              | https://www.xindemarinenews.com/news/2080682043257425922                                                                            | move -> Inquiry 10 |
| source | `notebook-source-risk-global-times-sea-legend` | https://www.globaltimes.cn/page/202608/1367972.shtml                                                                                | move -> Inquiry 10 |
| source | `notebook-source-risk-zhoushan-departure`      | https://www.ezhejiang.gov.cn/zhoushan/2026-08/17/c_1206032.htm                                                                      | move -> Inquiry 10 |
| source | `notebook-source-risk-nsidc-passage`           | https://nsidc.org/learn/ask-scientist/when-northeast-passage-open-ship-traffic                                                      | move -> Inquiry 10 |
| source | `notebook-source-risk-nsidc-2026`              | https://nsidc.org/news-analyses/news-stories/arctic-sea-ice-record-low-maximum-strikes-again                                        | move -> Inquiry 10 |
| source | `notebook-source-risk-imo-hfo`                 | https://www.imo.org/en/mediacentre/hottopics/pages/polar-default.aspx                                                               | move -> Inquiry 10 |
| source | `notebook-source-risk-bellona-permits`         | https://etc.bellona.org/publication/vessels-on-nsr/                                                                                 | move -> Inquiry 10 |
| source | `notebook-source-risk-bellona-shadow`          | https://etc.bellona.org/2025/12/15/nsr-2025/                                                                                        | move -> Inquiry 10 |
| source | `notebook-source-risk-treasury`                | https://home.treasury.gov/news/press-releases/sb0313                                                                                | keep               |
| source | `notebook-source-risk-ap-russia`               | https://apnews.com/article/russia-iran-war-putin-ukraine-oil-8a6af4989692d66a1e5bed1bc1922efa                                       | keep               |
| source | `notebook-source-risk-lloyds-red-sea`          | https://www.lloydslist.com/LL1157990/Chinese-state-giants-pull-VLCCs-from-Red-Sea-as-safety-trumps-commercial-gains                 | keep               |
| source | `notebook-source-risk-cfr`                     | https://www.cfr.org/podcasts/spillover/how-china-is-quietly-winning-the-iran-war-energy-crisis                                      | keep               |
| source | `notebook-source-risk-arctic-podcast`          | https://www.thearcticinstitute.org/the-circumpolar-podcast-arctic-shipping-northern-sea-route/                                      | move -> Inquiry 10 |
| source | `notebook-source-risk-pbs`                     | https://www.pbs.org/video/russia-china-and-iran-the-future-of-global-energy-in-a-world-at-war-rdjpdi/                               | keep               |
| source | `notebook-source-risk-aljazeera`               | https://www.aljazeera.com/news/2026/8/18/can-chinas-new-arctic-sea-route-to-europe-replace-middle-east-chokepoints                  | share              |
| source | `notebook-source-risk-guardian`                | https://www.theguardian.com/world/2026/aug/17/strait-hormuz-alternative-china-ships-north-sea-route-arctic-ice-silk-road            | share              |
| source | `notebook-source-risk-wapo`                    | https://www.washingtonpost.com/opinions/2026/08/18/china-russia-are-fueling-irans-war-machine/                                      | keep               |

#### Route fragments

| Fragment          | Disposition                        |
| ----------------- | ---------------------------------- |
| `#why`            | keep                               |
| `#verdict`        | keep                               |
| `#map`            | keep                               |
| `#scale`          | keep                               |
| `#chokepoints`    | keep                               |
| `#portfolio`      | keep                               |
| `#arctic`         | compatibility notice -> Inquiry 10 |
| `#governance`     | keep                               |
| `#timeline`       | keep                               |
| `#claim-audit`    | keep                               |
| `#formats`        | keep                               |
| `#turning-points` | keep                               |
| `#sources`        | keep                               |
| `#changed`        | keep                               |
| `#question`       | keep                               |

Every source ID above is also rendered as a source-card fragment on this route. A moved source must leave an accessible compatibility notice at its former fragment and link to the exact successor fragment; it may not disappear or become a script redirect.

### Inquiry 05 - Who Absorbs the Shock?

Source: [`who-absorbs-the-shock.ts`](../../src/content/notebook/who-absorbs-the-shock.ts)

#### Prose and information blocks

| Field path              | Disposition |
| ----------------------- | ----------- |
| `subtitle`              | keep        |
| `description`           | keep        |
| `thesis`                | keep        |
| `frontPagePreview`      | keep        |
| `sections.why`          | keep        |
| `sections.verdict`      | keep        |
| `sections.mechanism`    | keep        |
| `sections.distribution` | keep        |
| `sections.policy`       | keep        |
| `sections.scenario`     | keep        |
| `sections.changed`      | keep        |
| `limitations[0]`        | keep        |
| `limitations[1]`        | keep        |
| `limitations[2]`        | keep        |
| `limitations[3]`        | keep        |
| `limitations[4]`        | keep        |

#### Typed records

| Collection          | Record                               | Disposition |
| ------------------- | ------------------------------------ | ----------- |
| `turningPoints`     | `turning-adjustment-first-shock`     | keep        |
| `turningPoints`     | `turning-adjustment-second-shock`    | keep        |
| `turningPoints`     | `turning-adjustment-distribution`    | keep        |
| `turningPoints`     | `turning-adjustment-policy`          | keep        |
| `turningPoints`     | `turning-adjustment-ai`              | keep        |
| `passageAudit`      | `passage-adjustment-first-shock`     | keep        |
| `passageAudit`      | `passage-adjustment-second-shock`    | keep        |
| `passageAudit`      | `passage-adjustment-distribution`    | keep        |
| `passageAudit`      | `passage-adjustment-germany`         | keep        |
| `passageAudit`      | `passage-adjustment-policy`          | keep        |
| `passageAudit`      | `passage-adjustment-ai-software`     | keep        |
| `mechanismSteps`    | `mechanism-domestic-demand`          | keep        |
| `mechanismSteps`    | `mechanism-industrial-capacity`      | keep        |
| `mechanismSteps`    | `mechanism-trade-balance`            | keep        |
| `mechanismSteps`    | `mechanism-external-absorption`      | keep        |
| `mechanismSteps`    | `mechanism-local-outcome`            | keep        |
| `shockComparisons`  | `comparison-period`                  | keep        |
| `shockComparisons`  | `comparison-starting-scale`          | keep        |
| `shockComparisons`  | `comparison-product-mix`             | keep        |
| `shockComparisons`  | `comparison-import-linkage`          | keep        |
| `shockComparisons`  | `comparison-destinations`            | keep        |
| `shockComparisons`  | `comparison-policy-environment`      | keep        |
| `distributionCases` | `distribution-chinese-households`    | keep        |
| `distributionCases` | `distribution-chinese-producers`     | keep        |
| `distributionCases` | `distribution-foreign-consumers`     | keep        |
| `distributionCases` | `distribution-input-users`           | keep        |
| `distributionCases` | `distribution-exposed-workers`       | keep        |
| `distributionCases` | `distribution-germany`               | keep        |
| `distributionCases` | `distribution-emerging-markets`      | keep        |
| `distributionCases` | `distribution-taxpayers`             | keep        |
| `policyOptions`     | `policy-consumption-reform`          | keep        |
| `policyOptions`     | `policy-exchange-rate`               | keep        |
| `policyOptions`     | `policy-targeted-defense`            | keep        |
| `policyOptions`     | `policy-industrial-policy`           | keep        |
| `policyOptions`     | `policy-allied-coordination`         | keep        |
| `policyOptions`     | `policy-localization`                | keep        |
| `policyOptions`     | `policy-diversification`             | keep        |
| `policyOptions`     | `policy-broad-tariffs`               | keep        |
| `policyOptions`     | `policy-worker-adjustment`           | keep        |
| `claimAudit`        | `audit-adjustment-renewed-surge`     | keep        |
| `claimAudit`        | `audit-adjustment-one-cause`         | keep        |
| `claimAudit`        | `audit-adjustment-households`        | keep        |
| `claimAudit`        | `audit-adjustment-no-safety-net`     | keep        |
| `claimAudit`        | `audit-adjustment-excess-capacity`   | keep        |
| `claimAudit`        | `audit-adjustment-currency`          | keep        |
| `claimAudit`        | `audit-adjustment-germany-cause`     | keep        |
| `claimAudit`        | `audit-adjustment-clean-tech-threat` | keep        |
| `claimAudit`        | `audit-adjustment-output-workers`    | keep        |
| `claimAudit`        | `audit-adjustment-repeat`            | keep        |
| `claimAudit`        | `audit-adjustment-targeted-tariffs`  | keep        |
| `claimAudit`        | `audit-adjustment-current-account`   | keep        |
| `claimAudit`        | `audit-adjustment-industrial-policy` | keep        |
| `claimAudit`        | `audit-adjustment-ai-observed`       | keep        |

#### Formats and source records

| Kind                                   | ID                                          | Disposition |
| -------------------------------------- | ------------------------------------------- | ----------- |
| Format                                 | `format-adjustment-ezra-klein`              | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-episode`        | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-transcript`     | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-fed`            | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-cer`            | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-cfr`            | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-imf-china`      | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-imf-external`   | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-imf-imbalances` | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-ecb`            | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-mofcom`         | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-iea-ev`         | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-iea-etp`        | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-ai-index`       | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-nber`           | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-annual-review`  | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-usitc`          | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-imf-germany`    | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-bundesbank`     | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-bls`            | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-wto`            | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-eu-bev`         | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-imf-us`         | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-greer`          | keep        |
| Source and public source-card fragment | `notebook-source-adjustment-reddit`         | keep        |
| Consent-gated audio metadata           | `notebook-source-adjustment-episode`        | keep        |

#### Stored resource references

| Kind            | Owner                                       | Exact publisher or media URL                                                                                                                                                                                                                | Disposition |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| format          | `format-adjustment-ezra-klein`              | https://the-ezra-klein-show.simplecast.com/episodes/brad-setser                                                                                                                                                                             | keep        |
| audio canonical | `notebook-source-adjustment-episode`        | https://the-ezra-klein-show.simplecast.com/episodes/brad-setser                                                                                                                                                                             | keep        |
| audio media     | `notebook-source-adjustment-episode`        | https://nyt.simplecastaudio.com/3026b665-46df-4d18-98e9-d1ce16bbb1df/episodes/7fd71a4d-0c28-424a-8eb3-0b4675fdeb9e/audio/128/default.mp3                                                                                                    | keep        |
| source          | `notebook-source-adjustment-episode`        | https://the-ezra-klein-show.simplecast.com/episodes/brad-setser                                                                                                                                                                             | keep        |
| source          | `notebook-source-adjustment-episode`        | https://feeds.simplecast.com/82FI35Px                                                                                                                                                                                                       | keep        |
| source          | `notebook-source-adjustment-transcript`     | https://www.nytimes.com/2026/08/21/opinion/ezra-klein-podcast-brad-setser.html                                                                                                                                                              | keep        |
| source          | `notebook-source-adjustment-fed`            | https://www.federalreserve.gov/econres/notes/feds-notes/china-shock-2-0-how-china-ongoing-export-surge-differs-from-the-early-2000s-20260529.html                                                                                           | keep        |
| source          | `notebook-source-adjustment-cer`            | https://www.cer.eu/sites/default/files/pb_BS_ST_china_shock_2.0_18.5.26.pdf                                                                                                                                                                 | keep        |
| source          | `notebook-source-adjustment-cfr`            | https://www.cfr.org/articles/is-chinas-surplus-really-shrinking                                                                                                                                                                             | keep        |
| source          | `notebook-source-adjustment-imf-china`      | https://www.imf.org/en/publications/cr/issues/2026/02/17/peoples-republic-of-china-2025-article-iv-consultation-press-release-staff-report-and-574028                                                                                       | keep        |
| source          | `notebook-source-adjustment-imf-external`   | https://www.imf.org/en/publications/esr/issues/2026/07/30/external-sector-report-2026                                                                                                                                                       | keep        |
| source          | `notebook-source-adjustment-imf-imbalances` | https://www.imf.org/en/blogs/articles/2026/04/06/global-imbalances-old-questions-new-answers                                                                                                                                                | keep        |
| source          | `notebook-source-adjustment-ecb`            | https://www.ecb.europa.eu/press/economic-bulletin/focus/2026/html/ecb.ebbox202603_02~7df7facd9a.de.html                                                                                                                                     | keep        |
| source          | `notebook-source-adjustment-mofcom`         | https://english.mofcom.gov.cn/News/SignificantNews/art/2026/art_1cc81037c291427ba64e696b6fbc0ad6.html                                                                                                                                       | keep        |
| source          | `notebook-source-adjustment-iea-ev`         | https://www.iea.org/reports/global-ev-outlook-2026/manufacturing-and-trade                                                                                                                                                                  | keep        |
| source          | `notebook-source-adjustment-iea-etp`        | https://www.iea.org/reports/energy-technology-perspectives-2026/executive-summary                                                                                                                                                           | keep        |
| source          | `notebook-source-adjustment-ai-index`       | https://hai.stanford.edu/ai-index/2026-ai-index-report                                                                                                                                                                                      | keep        |
| source          | `notebook-source-adjustment-nber`           | https://www.nber.org/papers/w21906                                                                                                                                                                                                          | keep        |
| source          | `notebook-source-adjustment-annual-review`  | https://www.annualreviews.org/content/journals/10.1146/annurev-economics-082222-082019                                                                                                                                                      | keep        |
| source          | `notebook-source-adjustment-usitc`          | https://www.usitc.gov/press_room/news_release/2023/er0315_63679.htm                                                                                                                                                                         | keep        |
| source          | `notebook-source-adjustment-imf-germany`    | https://www.elibrary.imf.org/view/journals/002/2026/036/article-A001-en.xml                                                                                                                                                                 | keep        |
| source          | `notebook-source-adjustment-bundesbank`     | https://publikationen.bundesbank.de/publikationen-en/reports-studies/monthly-reports/monthly-report-july-2026-1003480?article=what-contribution-has-diminished-price-competitiveness-made-to-the-recent-weakness-in-german-exports--1003536 | keep        |
| source          | `notebook-source-adjustment-bls`            | https://www.bls.gov/opub/ted/2026/trends-in-manufacturing-output-and-hours-worked-2007-2026.htm                                                                                                                                             | keep        |
| source          | `notebook-source-adjustment-bls`            | https://www.bls.gov/productivity/highlights/manufacturing-mining-labor-productivity.htm                                                                                                                                                     | keep        |
| source          | `notebook-source-adjustment-wto`            | https://www.wto.org/english/tratop_e/tpr_e/tp558_crc_e.htm                                                                                                                                                                                  | keep        |
| source          | `notebook-source-adjustment-eu-bev`         | https://policy.trade.ec.europa.eu/news/commission-issues-guidance-document-submission-price-undertaking-offers-battery-electric-vehicles-2026-01-12_en                                                                                      | keep        |
| source          | `notebook-source-adjustment-imf-us`         | https://www.imf.org/en/news/articles/2026/02/25/cs-02252026-united-states-of-america-staff-concluding-statement-of-the-2026-article-iv-mission                                                                                              | keep        |
| source          | `notebook-source-adjustment-greer`          | https://www.imf.org/en/publications/fandd/issues/2026/06/straight-talk-economics-for-the-real-economy                                                                                                                                       | keep        |
| source          | `notebook-source-adjustment-reddit`         | https://www.reddit.com/r/ezraklein/comments/1vueio5/china_shock_20_brad_sester/                                                                                                                                                             | keep        |

#### Route fragments

| Fragment        | Disposition |
| --------------- | ----------- |
| `#why`          | keep        |
| `#mechanism`    | keep        |
| `#comparison`   | keep        |
| `#distribution` | keep        |
| `#policy`       | keep        |
| `#scenario`     | keep        |
| `#claim-audit`  | keep        |
| `#sources`      | keep        |
| `#changed`      | keep        |
| `#question`     | keep        |

Every source ID above is also rendered as a source-card fragment on this route. A moved source must leave an accessible compatibility notice at its former fragment and link to the exact successor fragment; it may not disappear or become a script redirect.

### Inquiry 06 - What Gets Through?

Source: [`what-gets-through.ts`](../../src/content/notebook/what-gets-through.ts)

#### Prose and information blocks

| Field path         | Disposition        |
| ------------------ | ------------------ |
| `subtitle`         | correct            |
| `description`      | correct            |
| `thesis`           | correct            |
| `frontPagePreview` | correct            |
| `sections.lens`    | revise             |
| `sections.trade`   | move -> Inquiry 09 |
| `sections.culture` | keep               |
| `sections.memory`  | keep               |
| `sections.limits`  | keep               |
| `sections.changed` | correct            |
| `limitations[0]`   | correct            |
| `limitations[1]`   | correct            |
| `limitations[2]`   | correct            |
| `limitations[3]`   | correct            |
| `limitations[4]`   | correct            |

#### Typed records

| Collection      | Record                             | Disposition        |
| --------------- | ---------------------------------- | ------------------ |
| `turningPoints` | `turning-gates-trade`              | move -> Inquiry 09 |
| `turningPoints` | `turning-gates-culture`            | keep               |
| `turningPoints` | `turning-gates-memory`             | keep               |
| `gates`         | `gate-trade`                       | move -> Inquiry 09 |
| `gates`         | `gate-culture`                     | keep               |
| `gates`         | `gate-memory`                      | keep               |
| `tradeProofs`   | `proof-canadian-entry`             | move -> Inquiry 09 |
| `tradeProofs`   | `proof-canadian-production`        | move -> Inquiry 09 |
| `tradeProofs`   | `proof-usmca-origin`               | move -> Inquiry 09 |
| `tradeProofs`   | `proof-us-entry`                   | move -> Inquiry 09 |
| `tradePressure` | `pressure-canada-tariffs`          | move -> Inquiry 09 |
| `tradePressure` | `pressure-china-retaliation`       | move -> Inquiry 09 |
| `tradePressure` | `pressure-strategic-partnership`   | move -> Inquiry 09 |
| `tradePressure` | `pressure-us-drop-off-warning`     | move -> Inquiry 09 |
| `tradePressure` | `pressure-canada-china-reset`      | move -> Inquiry 09 |
| `tradePressure` | `pressure-usmca-review`            | move -> Inquiry 09 |
| `tradePressure` | `pressure-us-risk-report`          | move -> Inquiry 09 |
| `tradePressure` | `pressure-talks-suspended`         | move -> Inquiry 09 |
| `tradePressure` | `pressure-us-duties`               | move -> Inquiry 09 |
| `tradePressure` | `pressure-canada-countertariffs`   | move -> Inquiry 09 |
| `tradeFrames`   | `frame-hudson-analysis`            | move -> Inquiry 09 |
| `tradeFrames`   | `frame-section-338-action`         | move -> Inquiry 09 |
| `tradeFrames`   | `frame-white-house-risk`           | move -> Inquiry 09 |
| `tradeFrames`   | `frame-canadian-policy`            | move -> Inquiry 09 |
| `tradeFrames`   | `frame-brookings-counter`          | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-usmca-article`        | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-canada-transshipment` | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-ev-quota`             | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-tariff-cause`         | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-cpa-scale`            | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-value-added`          | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-production-fraud`     | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-article-trigger`      | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-review-timing`        | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-countertariff-timing` | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-current-transcript`   | share              |
| `claimAudit`    | `audit-gates-prior-quote-dates`    | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-tariff-currency`      | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-report-estimates`     | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-brookings-nuance`     | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-enabler-label`        | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-china-intent`         | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-drop-off-warning`     | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-china-trade-growth`   | move -> Inquiry 09 |
| `claimAudit`    | `audit-gates-niulai-start`         | keep               |
| `claimAudit`    | `audit-gates-niulai-surge`         | keep               |
| `claimAudit`    | `audit-gates-niulai-odyssey`       | keep               |
| `claimAudit`    | `audit-gates-niulai-makers`        | keep               |
| `claimAudit`    | `audit-gates-vigils-charge`        | keep               |
| `claimAudit`    | `audit-gates-unlawful-means`       | keep               |
| `claimAudit`    | `audit-gates-verdict-scope`        | keep               |
| `claimAudit`    | `audit-gates-sentencing`           | keep               |
| `claimAudit`    | `audit-gates-rights-position`      | keep               |

#### Formats and source records

| Kind                                   | ID                                                | Disposition        |
| -------------------------------------- | ------------------------------------------------- | ------------------ |
| Format                                 | `format-gates-china-insider`                      | keep               |
| Source and public source-card fragment | `notebook-source-gates-episode`                   | share              |
| Source and public source-card fragment | `notebook-source-gates-yu-prior`                  | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-white-house-transshipment` | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-ustr-origin`               | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-usmca-3210`                | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-canada-ev`                 | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-white-house-canada`        | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-brookings`                 | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-canada-china-cycle`        | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-canada-origin-measures`    | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-usmca-2026`                | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-cpa-monitor`               | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-fed-mexico`                | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-canada-countermeasures`    | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-canada-negotiations`       | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-trump-warning`             | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-canada-trade`              | move -> Inquiry 09 |
| Source and public source-card fragment | `notebook-source-gates-ap-niulai`                 | keep               |
| Source and public source-card fragment | `notebook-source-gates-sina-box-office`           | keep               |
| Source and public source-card fragment | `notebook-source-gates-guardian-niulai`           | keep               |
| Source and public source-card fragment | `notebook-source-gates-judgment`                  | keep               |
| Source and public source-card fragment | `notebook-source-gates-doj-nsl`                   | keep               |
| Source and public source-card fragment | `notebook-source-gates-hksar-verdict`             | keep               |
| Source and public source-card fragment | `notebook-source-gates-hrw`                       | keep               |
| Source and public source-card fragment | `notebook-source-gates-un-experts`                | keep               |
| Consent-gated audio metadata           | `notebook-source-gates-episode`                   | keep               |

#### Stored resource references

| Kind            | Owner                                             | Exact publisher or media URL                                                                                                                                                                                                                             | Disposition        |
| --------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| format          | `format-gates-china-insider`                      | https://china-insider.simplecast.com/episodes/china-insider-chinas-role-in-us-canada-trade-dispute-niu-lai-disrupts-chinese-cinema-hong-kong-court-convicts-tiananmen-activists-chow-hang-tung-and-lee-cheuk-yan-sQorcjNd                                | keep               |
| audio canonical | `notebook-source-gates-episode`                   | https://china-insider.simplecast.com/episodes/china-insider-chinas-role-in-us-canada-trade-dispute-niu-lai-disrupts-chinese-cinema-hong-kong-court-convicts-tiananmen-activists-chow-hang-tung-and-lee-cheuk-yan-sQorcjNd                                | keep               |
| audio media     | `notebook-source-gates-episode`                   | https://cdn.simplecast.com/media/audio/transcoded/8ba8b7ea-ada5-4d43-b4dd-cd106ac3d384/c74926bb-1945-46fc-a842-2ee2b1458a55/episodes/audio/group/e1998e38-f95f-4ad3-ae2f-39953c4a6d38/group-item/f5104778-c82b-43f5-b2b5-bcd325b54b19/128_default_tc.mp3 | keep               |
| source          | `notebook-source-gates-episode`                   | https://www.hudson.org/foreign-policy/chinas-role-us-canada-trade-dispute-niu-lai-disrupts-chinese-cinema-hong-kong-court                                                                                                                                | share              |
| source          | `notebook-source-gates-episode`                   | https://china-insider.simplecast.com/episodes/china-insider-chinas-role-in-us-canada-trade-dispute-niu-lai-disrupts-chinese-cinema-hong-kong-court-convicts-tiananmen-activists-chow-hang-tung-and-lee-cheuk-yan-sQorcjNd                                | share              |
| source          | `notebook-source-gates-episode`                   | https://feeds.simplecast.com/_0hNEGsX                                                                                                                                                                                                                    | share              |
| source          | `notebook-source-gates-yu-prior`                  | https://www.hudson.org/national-security-defense/china-insider-revisiting-us-transatlantic-relationship-new-reciprocal-miles-yu                                                                                                                          | move -> Inquiry 09 |
| source          | `notebook-source-gates-yu-prior`                  | https://www.hudson.org/economics/china-insider-us-tariffs-beijings-wolf-warrior-rhetoric-chinas-two-sessions-miles-yu                                                                                                                                    | move -> Inquiry 09 |
| source          | `notebook-source-gates-white-house-transshipment` | https://www.whitehouse.gov/wp-content/uploads/2026/08/The-Great-Transshipment-Scam.pdf                                                                                                                                                                   | move -> Inquiry 09 |
| source          | `notebook-source-gates-ustr-origin`               | https://ustr.gov/issue-areas/industry-manufacturing/industrial-tariffs/rules-origin                                                                                                                                                                      | move -> Inquiry 09 |
| source          | `notebook-source-gates-ustr-origin`               | https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement/agreement-between                                                                                                                                          | move -> Inquiry 09 |
| source          | `notebook-source-gates-usmca-3210`                | https://ustr.gov/sites/default/files/files/agreements/FTA/USMCA/Text/32_Exceptions_and_General_Provisions.pdf                                                                                                                                            | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-ev`                 | https://www.pm.gc.ca/en/news/news-releases/2026/01/16/prime-minister-carney-forges-new-strategic-partnership-peoples                                                                                                                                     | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-ev`                 | https://www.pm.gc.ca/en/news/speeches/2026/01/16/prime-minister-carney-delivers-remarks-after-forging-new-strategic                                                                                                                                      | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-ev`                 | https://www.canada.ca/en/global-affairs/news/2026/03/canada-secures-renewed-market-access-with-china-to-boost-exports-and-strengthen-economic-collaboration.html                                                                                         | move -> Inquiry 09 |
| source          | `notebook-source-gates-white-house-canada`        | https://www.whitehouse.gov/fact-sheets/2026/07/fact-sheet-president-donald-j-trump-imposes-additional-tariffs-on-canada/                                                                                                                                 | move -> Inquiry 09 |
| source          | `notebook-source-gates-white-house-canada`        | https://ustr.gov/about/policy-offices/press-office/press-releases/2026/july/ambassador-greer-issues-statement-president-trump-imposing-section-338-tariffs-canada                                                                                        | move -> Inquiry 09 |
| source          | `notebook-source-gates-white-house-canada`        | https://www.whitehouse.gov/presidential-actions/2026/08/temporary-suspension-of-additional-duties-to-offset-canadian-discrimination-against-the-commerce-of-the-united-states-with-respect-to-alcoholic-beverages-dairy-and-motor-vehicles/              | move -> Inquiry 09 |
| source          | `notebook-source-gates-brookings`                 | https://www.brookings.edu/articles/is-china-circumventing-us-tariffs-via-mexico-and-canada/                                                                                                                                                              | move -> Inquiry 09 |
| source          | `notebook-source-gates-brookings`                 | https://www.brookings.edu/wp-content/uploads/2026/03/USMCA-Forward-2026.pdf                                                                                                                                                                              | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-china-cycle`        | https://www.canada.ca/en/department-finance/news/2024/08/canada-implementing-measures-to-protect-canadian-workers-and-key-economic-sectors-from-unfair-chinese-trade-practices.html                                                                      | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-china-cycle`        | https://www.canada.ca/en/global-affairs/news/2025/03/statement-by-ministers-ng-macaulay-and-lebouthillier-on-chinas-anti-discrimination-investigation.html                                                                                               | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-china-cycle`        | https://www.canada.ca/en/global-affairs/news/2026/03/canada-secures-renewed-market-access-with-china-to-boost-exports-and-strengthen-economic-collaboration.html                                                                                         | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-origin-measures`    | https://www.canada.ca/en/department-finance/programs/international-trade-finance-policy/canadas-tariff-responses/canadas-tariffs-steel-aluminum.html                                                                                                     | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-origin-measures`    | https://www.canada.ca/en/department-finance/news/2025/07/support-for-the-canadian-steel-sector.html                                                                                                                                                      | move -> Inquiry 09 |
| source          | `notebook-source-gates-usmca-2026`                | https://ustr.gov/about/policy-offices/press-office/press-releases/2026/july/ambassador-greer-issues-statement-usmca-joint-review                                                                                                                         | move -> Inquiry 09 |
| source          | `notebook-source-gates-usmca-2026`                | https://ustr.gov/sites/default/files/files/agreements/FTA/USMCA/2026%20USMCA%20Autos%20Report%20to%20Congress_070126.pdf                                                                                                                                 | move -> Inquiry 09 |
| source          | `notebook-source-gates-usmca-2026`                | https://www.canada.ca/en/global-affairs/news/2026/07/minister-leblanc-updates-provincial-and-territorial-ministers-responsible-for-international-trade-on-cusma-joint-review.html                                                                        | move -> Inquiry 09 |
| source          | `notebook-source-gates-cpa-monitor`               | https://prosperousamerica.org/washingtons-70-billion-in-lost-protection-liberation-day-one-year-later/                                                                                                                                                   | move -> Inquiry 09 |
| source          | `notebook-source-gates-fed-mexico`                | https://www.federalreserve.gov/econres/notes/feds-notes/mexico-in-u-s-supply-chains-lessons-from-2018-19-tariffs-20260605.html                                                                                                                           | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-countermeasures`    | https://www.canada.ca/en/department-finance/news/2026/08/canada-announces-targeted-countermeasures-and-substantive-support-for-workers-and-businesses-in-response-to-us-tariffs.html                                                                     | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-negotiations`       | https://www.pm.gc.ca/en/news/statements/2026/08/21/statement-prime-minister-carney-canada-us-trade-negotiations                                                                                                                                          | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-negotiations`       | https://www.pm.gc.ca/en/news/speeches/2026/08/22/prime-minister-carney-delivers-remarks-canada-us-trade-negotiations                                                                                                                                     | move -> Inquiry 09 |
| source          | `notebook-source-gates-trump-warning`             | https://apnews.com/article/5079e910df071b45d2b16949efb8f11a                                                                                                                                                                                              | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-trade`              | https://www.canada.ca/en/global-affairs/news/2026/03/canada-secures-renewed-market-access-with-china-to-boost-exports-and-strengthen-economic-collaboration.html                                                                                         | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-trade`              | https://www.canada.ca/en/innovation-science-economic-development/news/2026/06/minister-joly-to-travel-to-china-and-japan-to-advance-canadian-interests-abroad.html                                                                                       | move -> Inquiry 09 |
| source          | `notebook-source-gates-canada-trade`              | https://ccbc.com/ccbc-update/canada-china-trade-2025-year-in-review/                                                                                                                                                                                     | move -> Inquiry 09 |
| source          | `notebook-source-gates-ap-niulai`                 | https://apnews.com/article/80a25ad38005f5c6200715a37b704bea                                                                                                                                                                                              | keep               |
| source          | `notebook-source-gates-sina-box-office`           | https://www.sina.cn/media/1864135524                                                                                                                                                                                                                     | keep               |
| source          | `notebook-source-gates-guardian-niulai`           | https://www.theguardian.com/world/2026/aug/17/niu-lai-derided-animated-film-challenges-blockbusters-at-chinese-box-office                                                                                                                                | keep               |
| source          | `notebook-source-gates-judgment`                  | https://legalref.judiciary.hk/lrs/common/ju/ju_frame.jsp?DIS=184180&currpage=T                                                                                                                                                                           | keep               |
| source          | `notebook-source-gates-doj-nsl`                   | https://www.doj.gov.hk/en/publications/national_security/hknslannot.html                                                                                                                                                                                 | keep               |
| source          | `notebook-source-gates-hksar-verdict`             | https://www.info.gov.hk/gia/general/202608/21/P2026082100408p.htm                                                                                                                                                                                        | keep               |
| source          | `notebook-source-gates-hrw`                       | https://www.hrw.org/news/2026/08/21/hong-kong-activists-convicted-for-tiananmen-vigils                                                                                                                                                                   | keep               |
| source          | `notebook-source-gates-un-experts`                | https://srdefenders.org/china-arrest-prosecution-pre-trial-detention-and-conditions-of-detention-of-chow-hang-tung-and-lee-cheuk-yan-in-hong-kong-joint-communication/                                                                                   | keep               |

#### Route fragments

| Fragment       | Disposition                        |
| -------------- | ---------------------------------- |
| `#lens`        | keep                               |
| `#trade`       | compatibility notice -> Inquiry 09 |
| `#culture`     | keep                               |
| `#memory`      | keep                               |
| `#limits`      | keep                               |
| `#claim-audit` | keep                               |
| `#sources`     | keep                               |
| `#changed`     | keep                               |
| `#question`    | keep                               |

Every source ID above is also rendered as a source-card fragment on this route. A moved source must leave an accessible compatibility notice at its former fragment and link to the exact successor fragment; it may not disappear or become a script redirect.

### Inquiry 07 - July Is Not One Number

Source: [`july-is-not-one-number.ts`](../../src/content/notebook/july-is-not-one-number.ts)

#### Prose and information blocks

| Field path            | Disposition |
| --------------------- | ----------- |
| `subtitle`            | keep        |
| `description`         | keep        |
| `thesis`              | keep        |
| `frontPagePreview`    | keep        |
| `sections.frame`      | keep        |
| `sections.production` | keep        |
| `sections.demand`     | keep        |
| `sections.investment` | keep        |
| `sections.property`   | keep        |
| `sections.synthesis`  | keep        |
| `sections.changed`    | keep        |
| `limitations[0]`      | keep        |
| `limitations[1]`      | keep        |
| `limitations[2]`      | keep        |
| `limitations[3]`      | keep        |
| `limitations[4]`      | keep        |
| `limitations[5]`      | keep        |
| `limitations[6]`      | keep        |
| `limitations[7]`      | keep        |

#### Typed records

| Collection            | Record                               | Disposition |
| --------------------- | ------------------------------------ | ----------- |
| `turningPoints`       | `turning-july-production`            | keep        |
| `turningPoints`       | `turning-july-demand-investment`     | keep        |
| `turningPoints`       | `turning-july-profit-release`        | keep        |
| `indicators`          | `indicator-july-industrial-output`   | keep        |
| `indicators`          | `indicator-july-industrial-profits`  | keep        |
| `indicators`          | `indicator-july-retail-sales`        | keep        |
| `indicators`          | `indicator-july-fixed-investment`    | keep        |
| `indicators`          | `indicator-july-property`            | keep        |
| `indicators`          | `indicator-july-manufacturing-pmi`   | keep        |
| `alternativeReadings` | `reading-july-industrial-resilience` | keep        |
| `alternativeReadings` | `reading-july-profit-concentration`  | keep        |
| `alternativeReadings` | `reading-july-property-drag`         | keep        |
| `alternativeReadings` | `reading-july-uneven-investment`     | keep        |
| `alternativeReadings` | `reading-july-outlooks`              | keep        |

#### Formats and source records

| Kind                                   | ID                                 | Disposition |
| -------------------------------------- | ---------------------------------- | ----------- |
| Format                                 | `format-july-nbs-summary`          | keep        |
| Format                                 | `format-july-world-bank`           | keep        |
| Format                                 | `format-july-oecd`                 | keep        |
| Source and public source-card fragment | `notebook-source-july-output`      | keep        |
| Source and public source-card fragment | `notebook-source-july-profits`     | keep        |
| Source and public source-card fragment | `notebook-source-july-retail`      | keep        |
| Source and public source-card fragment | `notebook-source-july-investment`  | keep        |
| Source and public source-card fragment | `notebook-source-july-property`    | keep        |
| Source and public source-card fragment | `notebook-source-july-pmi`         | keep        |
| Source and public source-card fragment | `notebook-source-july-nbs-summary` | keep        |
| Source and public source-card fragment | `notebook-source-july-world-bank`  | keep        |
| Source and public source-card fragment | `notebook-source-july-oecd`        | keep        |
| Source and public source-card fragment | `notebook-source-july-imf`         | keep        |
| Source and public source-card fragment | `notebook-source-july-bis`         | keep        |

#### Stored resource references

| Kind   | Owner                              | Exact publisher or media URL                                                                                                                          | Disposition |
| ------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| format | `format-july-nbs-summary`          | https://www.stats.gov.cn/english/PressRelease/202608/t20260817_1965057.html                                                                           | keep        |
| format | `format-july-world-bank`           | https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099713507162625724                                                    | keep        |
| format | `format-july-oecd`                 | https://www.oecd.org/en/publications/oecd-economic-outlook-volume-2026-issue-1_2d1956f0-en/full-report/china_6526c66b.html                            | keep        |
| source | `notebook-source-july-output`      | https://www.stats.gov.cn/english/PressRelease/202608/t20260818_1965071.html                                                                           | keep        |
| source | `notebook-source-july-profits`     | https://www.stats.gov.cn/sj/zxfb/202608/t20260827_1965126.html                                                                                        | keep        |
| source | `notebook-source-july-profits`     | https://www.stats.gov.cn/english/PressRelease/202608/t20260828_1965134.html                                                                           | keep        |
| source | `notebook-source-july-retail`      | https://www.stats.gov.cn/english/PressRelease/202608/t20260819_1965078.html                                                                           | keep        |
| source | `notebook-source-july-investment`  | https://www.stats.gov.cn/english/PressRelease/202608/t20260818_1965072.html                                                                           | keep        |
| source | `notebook-source-july-property`    | https://www.stats.gov.cn/english/PressRelease/202608/t20260819_1965077.html                                                                           | keep        |
| source | `notebook-source-july-pmi`         | https://www.stats.gov.cn/english/PressRelease/202608/t20260803_1964272.html                                                                           | keep        |
| source | `notebook-source-july-nbs-summary` | https://www.stats.gov.cn/english/PressRelease/202608/t20260817_1965057.html                                                                           | keep        |
| source | `notebook-source-july-world-bank`  | https://www.worldbank.org/en/news/press-release/2026/07/07/rebalancing-growth-china-economic-update                                                   | keep        |
| source | `notebook-source-july-world-bank`  | https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099713507162625724                                                    | keep        |
| source | `notebook-source-july-oecd`        | https://www.oecd.org/en/publications/oecd-economic-outlook-volume-2026-issue-1_2d1956f0-en/full-report/china_6526c66b.html                            | keep        |
| source | `notebook-source-july-imf`         | https://www.imf.org/en/publications/cr/issues/2026/02/17/peoples-republic-of-china-2025-article-iv-consultation-press-release-staff-report-and-574028 | keep        |
| source | `notebook-source-july-imf`         | https://www.imf.org/-/media/files/publications/cr/2026/english/1chnea2026001-source-pdf.pdf                                                           | keep        |
| source | `notebook-source-july-bis`         | https://www.bis.org/publications/working-paper-1319-housing-wealth-effects-china                                                                      | keep        |

#### Route fragments

| Fragment      | Disposition |
| ------------- | ----------- |
| `#frame`      | keep        |
| `#signals`    | keep        |
| `#production` | keep        |
| `#demand`     | keep        |
| `#investment` | keep        |
| `#property`   | keep        |
| `#readings`   | keep        |
| `#limits`     | keep        |
| `#sources`    | keep        |
| `#changed`    | keep        |
| `#question`   | keep        |

Every source ID above is also rendered as a source-card fragment on this route. A moved source must leave an accessible compatibility notice at its former fragment and link to the exact successor fragment; it may not disappear or become a script redirect.

## Migration acceptance

A future migration may begin only when:

1. every proposed move, share, revision, and correction has an accepted destination decision;
2. the successor union contains every current source and media URL except a separately approved `retire-with-reason` row;
3. legacy route and source fragments resolve directly or through accessible compatibility notices;
4. shared source metadata has one authority and JSON-LD citations are deduplicated;
5. audio and map tests prove zero third-party requests before consent;
6. public selectors, sitemap, canonicals, adjacent navigation, Archive relationships, and structured data remain exact; and
7. static and live audits classify failures without replacing editorial URLs.

## Explicit exclusions

This manifest does not authorize a route, status change, canonical replacement, source removal, automatic redirect following, new artwork, analytics, ingestion, Desk or Atlas exposure, or a claim that proposed Inquiries 09 and 10 exist publicly.
