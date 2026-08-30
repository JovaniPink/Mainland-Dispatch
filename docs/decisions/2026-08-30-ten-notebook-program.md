# Ten-Notebook editorial program

**Status:** Accepted program direction; migrations proposed

**Effective:** August 30, 2026

## Decision

Extend the Season Zero planning ceiling to ten source-reviewed Notebook entries.
This decision supersedes only the July 23 ceiling of three entries in 90 days.
It retains the per-entry 8-10 hour discipline, the public/private boundary, the
source-review standard, irregular publication, and the requirement for an
explicit editorial commission before a new or materially corrected entry
crosses the publication boundary.

Inquiry 08 is commissioned by the separate [August 30
decision](2026-08-30-notebook-eight.md). The proposed Inquiry 04/10 and Inquiry
06/09 migrations are planning work only. Neither split is authorized for
implementation or publication until its complete custody manifest is reviewed
and a separate corrective-publication decision is accepted.

## Target set and authority

| Inquiry | Title                                 | Target state                                                   | Authority on August 30                             |
| ------: | ------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------- |
|      01 | What Xi Jinping Wants                 | Preserve                                                       | Public                                             |
|      02 | Open Models, Closed System?           | Preserve                                                       | Public                                             |
|      03 | Dominance Is a Dashboard, Not a Crown | Preserve                                                       | Public                                             |
|      04 | Routing Around Risk                   | Correct and narrow to the non-Arctic chokepoint portfolio      | Proposed; blocked on custody and correction review |
|      05 | Who Absorbs the Shock?                | Preserve                                                       | Public                                             |
|      06 | What Gets Through?                    | Correct and narrow to culture and memory                       | Proposed; blocked on custody and correction review |
|      07 | July Is Not One Number                | Preserve                                                       | Public                                             |
|      08 | Below Half Is Not Gone                | Research, build, and publish through the normal gate           | Accepted commission; not yet a public entry        |
|      09 | Where Does Origin Change?             | Proposed companion for rules of origin and transshipment proof | Proposed; not commissioned                         |
|      10 | The Arctic Is Not a Shortcut          | Proposed companion for Northern Sea Route constraints          | Proposed; not commissioned                         |

Ordinal identity remains editorial sequence rather than publication-date
sorting. All seven existing slugs, routes, canonicals, publication dates, and
ordinal numbers remain unchanged. A correction updates `updatedAt` and uses the
public `corrected` status; it does not create a replacement canonical.

## Lossless migration rule

The [custody
manifest](../plans/2026-08-30-ten-notebook-custody-manifest.md) controls future
split planning. Every existing prose field, typed record, format, source record,
resource URL, media URL, component, and public fragment receives exactly one
disposition:

- `keep`: remains in its current Notebook;
- `move`: transfers to one named companion;
- `share`: one immutable evidence identity supports more than one Notebook;
- `revise`: wording or presentation changes without changing the evidence
  identity;
- `correct`: a material public change follows the correction policy; or
- `retire-with-reason`: removal requires a recorded editorial justification.

No unassigned item may cross the migration gate. Redirects, restricted
responses, or transient link failures do not authorize source replacement or
removal. Shared source metadata must have one authority so title, publisher,
dates, URLs, retrieval record, and limitation cannot drift between entries.

## Inquiry 06 / Inquiry 09 proposal

Inquiry 06 keeps culture, memory, the initiating audio experience, and its
existing canonical identity. The proposed Inquiry 09 receives the trade proof
path, policy-pressure chronology, source-position matrix, trade-specific claim
audits, and `TransshipmentEvidenceFigure`.

The initiating episode may be shared as an immutable source record, but the
audio player remains owned by Inquiry 06 unless a later commission explicitly
authorizes another playback surface. Trade-specific source records move;
culture and memory records stay. The current three-domain circulation schema
must not be weakened merely to make the split compile: a separately reviewed
two-domain correction is required.

The existing `#trade` and any moved source-card fragments remain resolvable on
Inquiry 06 through accessible compatibility notices that link to the exact
companion fragment. Compatibility notices are content, not client-side
redirects, duplicate Articles, or duplicate structured citations.

## Inquiry 04 / Inquiry 10 proposal

Inquiry 04 keeps Hormuz, Suez, Red Sea, bypass-pipeline, tanker, sanctions, and
non-Arctic portfolio material. The proposed Inquiry 10 receives Northern Sea
Route data, ice and seasonal-access evidence, Russian permit and governance
constraints, Polar Code and heavy-fuel-oil records, Arctic shadow-fleet
evidence, Arctic formats, and the Arctic-specific route, scale, chronology, and
claim records.

The current MapLibre and XState consent, loading, ready, degraded, failed,
retry, lens, route-selection, and point-selection behavior remains one shared
implementation. A future Arctic presentation may use typed route subsets or a
thin wrapper; it must not fork the privacy or state-machine contract.

The existing `#arctic` and moved source-card fragments remain resolvable on
Inquiry 04 through the same accessible compatibility rule.

## Future interfaces

- Add an `energy-system` variant only for the accepted Inquiry 08 contract.
- Add a typed `relatedNotebooks` relation before companion entries replace
  hardcoded adjacency assumptions.
- Add a typed `legacyFragments` contract before any public section or source
  fragment moves.
- Prefer shared immutable source modules where one publisher record supports
  multiple Notebooks; deduplicate JSON-LD citations by clean URL.
- Reuse the Notebook reader, formats, source trail, status, audio, metadata,
  JSON-LD, and map foundations.

These interfaces are recorded for later implementation. This documentation
decision does not add them to the runtime.

## Non-goals

This program does not authorize new ingestion, a generalized CMS or data
pipeline, analytics, Search Console changes, unique article artwork,
breadcrumbs, Desk or Atlas exposure, private-reader-state publication,
automatic evidence replacement, or a claim that any proposed or commissioned
entry is deployed.

## Review and rollback

Each future work package must identify its exact source revision, public-route
contract, test evidence, visual review, deployment state, and rollback. A
failed custody or fragment check stops the split without affecting the current
seven-entry public set.

Rollback of this program decision restores the earlier planning ceiling but
does not erase the seven public entries, the accepted Inquiry 08 research
record, or either immutable August source note. Any already published factual
correction remains part of editorial history.
