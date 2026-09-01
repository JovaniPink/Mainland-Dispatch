# Inquiry 04 / Inquiry 10 lossless custody migration specification

**Status:** Decision-complete planning specification; implementation and
publication not authorized

**Prepared:** September 1, 2026

**Repository baseline:** `916247970aedeeb29f00a68369d7396dc1d5a80d`

**Proposed companion:** Inquiry 10, “The Arctic Is Not a Shortcut”

## Outcome

This specification completes the planning work requested in issue #36. A later,
separately authorized migration can keep the non-Arctic chokepoint portfolio in
Inquiry 04, “Routing Around Risk,” while moving Northern Sea Route evidence and
constraints to the proposed Inquiry 10 without losing prose, typed data, source
custody, URL identity, fragments, map behavior, or publication identity.

This record does not commission Inquiry 10, correct Inquiry 04, or authorize a
runtime change. Inquiry 04 remains public and unchanged. Inquiry 10 remains
proposed and absent from every public selector and route.

## Authority and evidence cutoff

The future implementation must use these records in this order:

1. The [Ten-Notebook program decision](../decisions/2026-08-30-ten-notebook-program.md)
   defines the editorial direction and requires a separate correction and
   commission.
2. The [complete custody manifest](2026-08-30-ten-notebook-custody-manifest.md)
   assigns every current Inquiry 04 field, route point, route, metric, timeline
   event, source, URL, component, and fragment.
3. The [Inquiry 04 commission](../decisions/2026-08-18-notebook-four.md) and
   [controlling research ledger](../source-notes/2026-08-18-strategic-rebalancing-research-ledger.md)
   control the current public interpretation and source cutoff.

A September 1 primary-source recheck found no invalidation of the current Arctic
constraint record:

- The [International Maritime Organization polar-shipping record](https://www.imo.org/en/mediacentre/hottopics/pages/polar-default.aspx)
  still describes the July 2024 Arctic heavy-fuel-oil prohibition together with
  protected-fuel-tank provisions and coastal-state waivers that can delay full
  effect for parts of the fleet until July 2029.
- The [National Snow and Ice Data Center route explainer](https://nsidc.org/learn/ask-scientist/when-northeast-passage-open-ship-traffic)
  still describes a broad July-to-October navigation window, with mid-September
  often most favorable and no segment guaranteed ice-free.

These records reinforce the existing seasonal and regulatory limits. They do
not establish a completed voyage, route reliability, cargo particulars, safe
passage for a vessel, or authority to commission Inquiry 10.

## Reconciled current inventory

The manifest and current `routing-around-risk.ts` object reconcile to the
following closed inventory:

| Inventory class                      | Current total | Future disposition                                                                                                           |
| ------------------------------------ | ------------: | ---------------------------------------------------------------------------------------------------------------------------- |
| Base identity and publication fields |            11 | Keep 6; revise 3 and correct 2 only after authorization                                                                      |
| Prose and information blocks         |            18 | Keep 5, move 1, revise 1, and correct 11 only after authorization                                                            |
| Typed records                        |            49 | Keep 30 and move 19                                                                                                          |
| Formats                              |             3 | Keep 2 and move the Arctic format                                                                                            |
| Unique source identities             |            26 | Keep 13, move 11, and share 2                                                                                                |
| Stored URL references                |            31 | Keep, move, or share every reference; no `retire-with-reason` decision exists                                                |
| Unique URL destinations              |            28 | Predecessor union must equal the combined successor union                                                                    |
| Public route section fragments       |            15 | Keep 14 and preserve `#arctic` through a compatibility notice                                                                |
| Source-card fragments                |            26 | Keep 13, share 2, and preserve all 11 moved IDs through predecessor compatibility notices                                    |
| Map implementation and state machine |             1 | Share one typed subset-capable `ChokepointPortfolioMap` and one XState machine; do not fork state, consent, or tile behavior |
| Maritime evidence figures            |             2 | Revise data ownership in `MaritimeScaleCards` and `PortfolioLogic`; keep one shared presentation implementation where useful |

### Identity and prose custody

Inquiry 04 keeps its current ordinal `4`, slug `routing-around-risk`, title,
variant, canonical derived from that slug, `publishedAt`, and `reviewState`. A
separately accepted public correction may change `updatedAt`, `readTime`, tags,
`editorialStatus`, and `unresolvedQuestion`; none changes in this planning work.

The future correction keeps `sections.why`, `sections.verdict`,
`sections.chokepoints`, `sections.portfolio`, and `sections.history`; moves
`sections.arctic`; and revises `sections.governance`. The current governance
array is split by meaning:

- Russian permits, ice information, rescue and icebreaker dependence, Polar
  Code and heavy-fuel-oil transition provisions, Arctic insurance, and Arctic
  shadow-fleet constraints move to Inquiry 10.
- Non-Arctic sanctions, procurement, permissiveness, intelligence enablement,
  operational-command distinctions, and portfolio passage logic remain with
  Inquiry 04.

The subtitle, description, thesis, front-page preview, `sections.changed`, and
six limitations require correction text because they currently describe the
combined portfolio. Their exact replacement prose belongs in the later
editorial decision. Cross-domain comparison lines in the five kept sections
remain owned by Inquiry 04; Inquiry 10 may link to that analysis but may not
silently copy it into independently drifting prose.

### Typed-record custody

- Inquiry 04 keeps three non-Arctic turning points, seven non-Arctic claim
  audits, three non-Arctic scale metrics, seven non-Arctic route points, five
  non-Arctic routes, and five non-Arctic timeline events.
- Inquiry 10 receives `turning-risk-arctic`; five Arctic claim audits; all three
  NSR and Sea Legend scale metrics; `point-risk-ningbo`,
  `point-risk-bering`, and `point-risk-felixstowe`; `route-risk-arctic`; and six
  Arctic timeline events.
- The Arctic route and its three points move as one referential unit. A point
  cannot remain without its route, a route cannot reference a point outside its
  subset, and no moved timeline event may remain only as prose.

### Source and resource custody

Inquiry 04 keeps the CFR and PBS formats, 13 non-Arctic source identities, and
their exact publisher URLs. Inquiry 10 receives the Arctic Institute format,
11 Arctic source identities, and their exact publisher URLs. The Al Jazeera and
Guardian source identities are shared because each report directly compares the
Arctic proposition with Middle East chokepoints.

Shared means one immutable metadata authority for `id`, role, title, publisher,
publication date, retrieval date, and exact links. Each Notebook may supply a
separate typed use record with scope-specific context and limitation text. The
non-Arctic use explains what the report claims about Hormuz, Suez, and portfolio
substitution. The Arctic use explains the operator schedule, seasonal limits,
environmental qualifications, and absence of voyage proof. Contextual prose may
differ; source identity and publisher metadata may not drift.

The reconciliation equation for a later implementation is:

```text
predecessor unique source identities = 26
successor identity union             = 13 kept + 11 moved + 2 shared = 26

predecessor stored references        = 31
successor stored-reference set union = 28 unique destinations
predecessor URL set union             = successor URL set union = 28
retire-with-reason rows               = 0
```

Inquiry 04 will contain 16 kept references plus the two shared references;
Inquiry 10 will contain 13 moved references plus those same two shared
references. The combined per-entry count can therefore rise from 31 to 33 while
the destination union remains exactly 28. Tests must compare cleaned URL sets
and must separately prove that no source other than the two declared shared
identities appears in both successors.

## Proposed runtime contracts for a later implementation

The following interfaces are decisions for a future authorized change. They are
not added by this planning PR.

```ts
type RelatedNotebook = {
  slug: string;
  relation: "companion";
  label: string;
};

type LegacyFragment = {
  id: string;
  successorSlug: string;
  successorFragment: string;
  notice: string;
};

type MaritimeMapSubset = {
  id: "non-arctic-portfolio" | "northern-sea-route";
  routes: readonly MaritimeRoute[];
  allowedLenses: readonly ChokepointLens[];
  initialLens: ChokepointLens;
};
```

Both entries will declare reciprocal `relatedNotebooks` values:

```ts
{
  slug: "the-arctic-is-not-a-shortcut",
  relation: "companion",
  label: "Northern Sea Route constraints"
}
```

and:

```ts
{
  slug: "routing-around-risk",
  relation: "companion",
  label: "The non-Arctic chokepoint portfolio"
}
```

`legacyFragments` belong to the predecessor. Each notice is rendered as normal,
keyboard-reachable content at the old fragment. It links to the exact successor
fragment only when the successor is public. It is not an HTTP redirect,
client-side redirect, duplicate Article, hidden metadata projection, or duplicate
structured citation. Before publication, the current Inquiry 04 content remains
in place; the compatibility branch must never link to a proposed or private
successor.

### Required legacy-fragment map

| Inquiry 04 fragment                             | Inquiry 10 successor fragment                   |
| ----------------------------------------------- | ----------------------------------------------- |
| `#arctic`                                       | `#arctic`                                       |
| `#notebook-source-risk-chnl-2025`               | `#notebook-source-risk-chnl-2025`               |
| `#notebook-source-risk-rosatom-2025`            | `#notebook-source-risk-rosatom-2025`            |
| `#notebook-source-risk-sea-legend`              | `#notebook-source-risk-sea-legend`              |
| `#notebook-source-risk-global-times-sea-legend` | `#notebook-source-risk-global-times-sea-legend` |
| `#notebook-source-risk-zhoushan-departure`      | `#notebook-source-risk-zhoushan-departure`      |
| `#notebook-source-risk-nsidc-passage`           | `#notebook-source-risk-nsidc-passage`           |
| `#notebook-source-risk-nsidc-2026`              | `#notebook-source-risk-nsidc-2026`              |
| `#notebook-source-risk-imo-hfo`                 | `#notebook-source-risk-imo-hfo`                 |
| `#notebook-source-risk-bellona-permits`         | `#notebook-source-risk-bellona-permits`         |
| `#notebook-source-risk-bellona-shadow`          | `#notebook-source-risk-bellona-shadow`          |
| `#notebook-source-risk-arctic-podcast`          | `#notebook-source-risk-arctic-podcast`          |

The Al Jazeera and Guardian source-card fragments remain on Inquiry 04 because
their identities are shared, and the same IDs may resolve on Inquiry 10. The
later implementation must audit public inbound references to fixed component
IDs such as `maritime-scale-title` and `portfolio-logic-title`; any moved public
target adds a predecessor compatibility entry.

## One map, two typed subsets

`ChokepointPortfolioMap` and `chokepointMapMachine` remain one implementation.
The future component receives a validated `MaritimeMapSubset` and derives
`routeIds`, `routeIdsByLens`, and `pointIdsByRoute` from that subset rather than
duplicating them by hand.

The non-Arctic subset contains:

- `route-risk-hormuz`, `route-risk-sts`, `route-risk-saudi-pipeline`,
  `route-risk-uae-pipeline`, and `route-risk-red-sea`; and
- the seven retained Hormuz, Gulf of Oman, Fujairah, Yanbu, Habshan, Bab
  el-Mandeb, and Suez points.

The Arctic subset contains only `route-risk-arctic` and its Ningbo, Bering, and
Felixstowe points. A Zod refinement and a focused contract test must reject
orphan points, unknown route IDs, an empty subset, a lens with an out-of-subset
route, or an initial lens not in `allowedLenses`.

The same XState chart retains `idle`, `loading`, `ready`, `degraded`, and
`failed` map behavior; retry attempts; and lens, route, point, and clear-selection
events. If subset support adds `allowedLenses` and `initialLens` to machine input,
it adds guards and data, not a second chart or different state semantics. Inquiry
04 keeps portfolio, Gulf, and Red Sea lenses. Inquiry 10 uses the Arctic lens.

Click-to-load remains authoritative: before explicit consent there is no
MapLibre dynamic import, OpenFreeMap style request, tile request, worker request,
or other third-party map network activity. The same loading timeout, degraded
tile behavior, fatal state, retry action, route cards, and no-map fallback remain
available on both entries. Paper and Night themes use the same map color logic.

Both pages must state that route lines are schematic and source-backed, not AIS
tracks, live security conditions, ice certification, vessel monitoring, or
navigation advice. This migration adds no AIS provider, live shipping monitor,
new tile provider, voyage tracker, safety promise, or routing recommendation.

## Public absence contract before authorization

The proposed `the-arctic-is-not-a-shortcut` entry may exist later as a private
or test fixture only if all public selectors reject it. Before a separate
corrective-publication decision, it must have no:

- route or generated route parameter;
- sitemap or robots-visible URL;
- canonical, Open Graph, social image, JSON-LD Article, or metadata projection;
- homepage, Notebook index, archive, Source Archive, Atlas, saved-view, or
  knowledge projection;
- adjacency or `relatedNotebooks` link from a public entry; or
- public source-card compatibility link.

The public artifact remains Inquiry 04 exactly as it is today until corrected
Inquiry 04 and commissioned Inquiry 10 can pass their publication gates
together. Planning, schema work, a map rendering, or a green build is not
publication authority.

## Evidence meanings that must survive the split

- Total NSR cargo is not transit cargo. The current record keeps Rosatom's
  37.02-million-tonne total distinct from CHNL's roughly 3.2-million-tonne
  transit subset.
- Transit cargo is not container cargo. Voyage and container-ship counts retain
  their own denominators and periods.
- A planned or departed voyage is not an arrived or completed transit. The
  Zhoushan departure record does not provide AIS geometry, cargo particulars,
  arrival, schedule reliability, or proof of later sailings.
- A July-to-October climatic window and mid-September optimum do not certify
  conditions for a particular ship or guarantee an ice-free segment.
- The 2024 HFO prohibition is incomplete without protected-tank provisions and
  coastal-state waivers through 2029. It does not quantify route-wide fuel use
  or spill risk.
- A permit is not a completed voyage. Bellona's 2024 permit count and separate
  2025 sanctioned or shadow-vessel count are different populations even when
  both use the number 100.
- A shorter container route does not replace Hormuz energy throughput or Suez
  container scale, prove lower lifecycle emissions, or remove Russian permit,
  sanctions, insurance, rescue, and ice dependencies.
- Al Jazeera and Guardian are explanatory reporting. Operator schedules and
  advocacy claims remain attributed and are not independent voyage evidence.

## Later implementation sequence

1. Accept a separate editorial decision that supplies corrected Inquiry 04
   prose, commissions Inquiry 10, and names the source and publication cutoff.
2. Add failing contract tests for `relatedNotebooks`, `legacyFragments`, custody
   completeness, URL equivalence, shared metadata, scoped source use, route
   subsets, fragment compatibility, citation deduplication, public absence, and
   map privacy.
3. Extract the Al Jazeera and Guardian identities to immutable shared metadata
   and give each Notebook explicit, scope-specific context and limitations.
4. Make the existing map and machine accept validated subsets without changing
   the current Inquiry 04 behavior or initiating any pre-consent network request.
5. Build proposed Inquiry 10 outside every public selector, then reconcile all
   26 source identities, 31 stored references, 28 unique destinations, and 49
   typed records against this specification.
6. Correct Inquiry 04, split governance prose by meaning, and add legacy
   compatibility notices without changing its slug, canonical, ordinal,
   publication date, or map privacy contract.
7. Run complete gates and inspect both pages at desktop and mobile widths in
   Paper and Night themes, including keyboard navigation, overflow, map consent,
   loading, degraded, failure, retry, lens, route, point, metadata, JSON-LD,
   sitemap, archive, and knowledge projections.
8. Publish both entries atomically only after exact-head review and the separate
   editorial authorization. Record the resulting correction and deploy SHA.
9. Observe the predecessor fragments, successor route, and zero-pre-consent
   request boundary after deployment.

## Required tests and acceptance evidence

A later implementation is not mergeable until it proves all of the following:

- **Custody completeness:** the exact predecessor inventory has no missing or
  multiply owned non-shared base field, prose field, typed record, format,
  source, component, URL, route, nested point, event, metric, or fragment.
- **URL union equality:** the cleaned predecessor URL set equals the combined
  successor set, with 28 unique destinations and zero unapproved retirements.
- **Shared metadata equality:** both entries resolve Al Jazeera and Guardian to
  the same immutable identity, dates, publisher, and exact links while retaining
  explicit scope-specific context and limitations.
- **Route-subset integrity:** every route and point appears in exactly one
  subset, all point-to-route references resolve, and each lens exposes only its
  subset routes.
- **Fragment compatibility:** `#arctic` and all 11 moved source IDs resolve on
  Inquiry 04 as accessible notices and link to the same exact fragments on
  Inquiry 10 after publication.
- **Citation deduplication:** each clean URL appears once in each page's JSON-LD
  citation set even when shared reporting or multiple fields reference it.
- **Public-selector absence:** before the accepted publication change, the
  proposed slug is absent from route generation, sitemap, metadata, homepage,
  Notebook index, archive, knowledge projection, and adjacency.
- **Route parity:** Inquiry 04 retains its current canonical, ordinal,
  `publishedAt`, review state, and accessible public behavior until the atomic
  correction.
- **Map privacy:** rendering, hydrating, navigating, changing theme, and
  selecting non-map content cause zero OpenFreeMap or MapLibre network requests
  before consent on both pages.
- **Map state parity:** one machine covers consent, loading, ready, degraded,
  failure, retry, lens, route, point, invalid-selection, and clear-selection
  behavior for both subsets; current Inquiry 04 transition tests remain green.
- **Presentation safety:** both maps retain the schematic, non-AIS,
  non-live-security, and non-navigation labels in full and degraded modes.
- **Evidence behavior:** static and live link audits preserve exact publisher
  URLs, and no redirect alone changes source identity.
- **Quality and presentation:** production dependency audits, complete
  repository gates, desktop/mobile Paper/Night review, keyboard review, overflow
  review, degraded-map review, metadata review, and production-build inspection
  all pass.

## Rollout, rollback, and stop conditions

This planning PR changes only Markdown. Its rollback is a documentation revert;
there is no runtime, route, map, tile, or deployment state to restore.

For a later migration, take an exact snapshot of the current Inquiry 04 object,
route output, metadata, URL set, fragment behavior, map data, and state-machine
tests before implementation. If any prepublication check fails, do not expose
Inquiry 10 and retain the current Inquiry 04 unchanged. If an authorized release
fails after deployment, restore the prior Inquiry 04 object and route from that
exact snapshot, withdraw Inquiry 10 from public selectors, and retain the
correction decision, custody ledger, and failure record for audit.

Stop before implementation or publication if:

- any nested route point, timeline event, metric, source, or prose segment is
  unassigned or multiply owned without an explicit share decision;
- the URL union differs without an accepted `retire-with-reason` decision;
- total NSR cargo and transit cargo lose their separate denominators;
- a route or point subset cannot be validated without weakening the schema;
- map behavior, privacy, or fallback behavior would require a forked machine;
- any map, module, style, tile, or worker request occurs before consent;
- an old fragment cannot provide an accessible compatibility notice;
- shared metadata, dates, limitations, or URLs can drift;
- the proposed entry enters a public selector before authorization;
- the presentation implies AIS, live conditions, ice certification, navigation
  advice, or reliable replacement of Hormuz or Suez; or
- no separate editorial decision authorizes both the Inquiry 04 correction and
  Inquiry 10 commission.

## Planning acceptance

This specification closes the planning question only. Issue #36 may close when
the reviewed documentation PR is merged because the inventory, interfaces,
tests, sequence, rollback, and stop conditions are decision-complete. The
umbrella issue #32 remains open. The next authorized action is an editorial
commission and correction decision, not runtime implementation.
