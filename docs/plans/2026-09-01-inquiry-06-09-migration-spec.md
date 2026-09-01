# Inquiry 06 / Inquiry 09 lossless custody migration specification

**Status:** Decision-complete planning specification; implementation and
publication not authorized

**Prepared:** September 1, 2026

**Repository baseline:** `cc897867dba8b391eca63638e20b048a16b3406b`

**Proposed companion:** Inquiry 09, “Where Does Origin Change?”

## Outcome

This specification completes the planning work requested in issue #34. A later,
separately authorized migration can narrow Inquiry 06, “What Gets Through?”, to
culture and memory while moving its rules-of-origin and transshipment-proof
material to the proposed Inquiry 09 without losing content, evidence, URLs,
fragments, privacy behavior, or publication identity.

This record does not commission Inquiry 09, correct Inquiry 06, or authorize a
runtime change. Inquiry 06 remains public and unchanged. Inquiry 09 remains
proposed and absent from every public selector and route.

## Authority and evidence cutoff

The future implementation must use these records in this order:

1. The [Ten-Notebook program decision](../decisions/2026-08-30-ten-notebook-program.md)
   defines the editorial direction and requires a separate correction and
   commission.
2. The [complete custody manifest](2026-08-30-ten-notebook-custody-manifest.md)
   assigns every current Inquiry 06 field, record, source, URL, component, and
   fragment.
3. The [accepted Inquiry 06 transshipment revision](../decisions/2026-08-30-notebook-six-transshipment-revision.md)
   and its [controlling research snapshot](../source-notes/2026-08-30-us-canada-china-transshipment-follow-up.md)
   control the current public trade conclusion.
4. The [September 1 quota watch result](../source-notes/2026-09-01-canada-ev-quota-watch.md)
   adds observed first-period Canadian quota use and the operative second-period
   rule. It changes the factual scope of the admission gate, not the conclusion.
5. The standing [transshipment evidence watch](2026-08-30-transshipment-evidence-watch.md)
   remains open and controls later evidence updates.

The September 1 note is future research input, not part of the predecessor URL
union. Its Notice 1168 and utilization-report URLs may enter Inquiry 09 only
through a later source-admission and editorial review. They must not be inserted
during the mechanical custody migration merely to make the new entry appear
current.

## Reconciled current inventory

The manifest and current `what-gets-through.ts` object reconcile to the
following closed inventory:

| Inventory class                      | Current total | Future disposition                                                                                                        |
| ------------------------------------ | ------------: | ------------------------------------------------------------------------------------------------------------------------- |
| Base identity and publication fields |            11 | Keep ordinal, slug, title, publication date, and review state; revise or correct only the six fields identified below     |
| Prose and information blocks         |            15 | Keep 3, move 1, revise 1, and correct 10 only after authorization                                                         |
| Typed records                        |            53 | Keep 13, move 39, and share 1                                                                                             |
| Formats                              |             1 | Keep with Inquiry 06                                                                                                      |
| Unique source identities             |            25 | Keep 8, move 16, and share 1                                                                                              |
| Stored URL references                |            45 | Keep or move all references; no `retire-with-reason` decision exists                                                      |
| Unique URL destinations              |            41 | Predecessor union must equal the combined successor union                                                                 |
| Public route section fragments       |             9 | Keep 8 and preserve `#trade` through a compatibility notice                                                               |
| Source-card fragments                |            25 | Keep 8, share the initiating episode, and preserve all 16 moved IDs through predecessor compatibility notices             |
| Consent-gated audio ownership        |             1 | Keep canonical URL, media URL, metadata, player, and consent behavior with Inquiry 06                                     |
| Inquiry-specific figures             |             2 | Correct `CirculationGatesFigure` through a reviewed two-domain contract; move `TransshipmentEvidenceFigure` to Inquiry 09 |

### Identity and prose custody

Inquiry 06 keeps its current ordinal `6`, slug `what-gets-through`, title,
canonical derived from that slug, `publishedAt`, and `reviewState`. A separately
accepted public correction may change `variant`, `updatedAt`, `readTime`, tags,
`editorialStatus`, and `unresolvedQuestion`; none changes in this planning work.

The future correction keeps `sections.culture`, `sections.memory`, and
`sections.limits`; revises `sections.lens`; and moves `sections.trade` to Inquiry 09. The subtitle, description, thesis, front-page preview, `sections.changed`,
and five limitations require correction text because they currently describe a
three-domain article. Their exact replacement prose belongs in the later
editorial decision, not in this migration specification.

### Typed-record custody

- Inquiry 06 keeps the culture and memory turning points and gates plus nine
  culture- and memory-specific claim-audit records.
- Inquiry 09 receives `turning-gates-trade`, `gate-trade`, all four
  `tradeProofs`, all ten `tradePressure` records, all five `tradeFrames`, and the
  18 trade-specific claim-audit records enumerated in the custody manifest.
- `audit-gates-current-transcript` is one shared immutable record because it
  describes the initiating episode rather than one subject domain.
- No record is copied into independently editable objects. `share` means both
  entries reference one authoritative exported value.

### Source and resource custody

The one format, audio canonical URL, audio media URL, eight culture or memory
sources, and initiating episode remain available to Inquiry 06. Inquiry 09
receives the 16 trade source identities and their 31 stored URL references. Both
entries may reference the initiating episode's one immutable source identity and
its three publisher URLs; only Inquiry 06 may render the audio player.

The reconciliation equation for a later implementation is:

```text
predecessor unique source identities = 25
successor identity union             = 8 kept + 16 moved + 1 shared = 25

predecessor stored references        = 45
successor stored-reference set union = 41 unique destinations
predecessor URL set union             = successor URL set union = 41
retire-with-reason rows               = 0
```

Sharing the three initiating-episode publisher references can increase the
combined per-entry reference count, but it cannot change the set union. Tests
must compare cleaned publisher URL sets, not array lengths, and must separately
prove that no non-shared identity appears in both successors.

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
```

Both entries will declare reciprocal `relatedNotebooks` values:

```ts
{
  slug: "where-does-origin-change",
  relation: "companion",
  label: "Rules of origin and transshipment proof"
}
```

and:

```ts
{
  slug: "what-gets-through",
  relation: "companion",
  label: "Culture, attention, and public memory"
}
```

`legacyFragments` belong to the predecessor. Each notice is rendered as normal,
keyboard-reachable content at the old fragment. It links to the exact successor
fragment only when the successor is public. It is not an HTTP redirect,
client-side redirect, duplicate Article, hidden metadata projection, or duplicate
structured citation. Before publication, the current Inquiry 06 content remains
in place; the compatibility branch must never link to a proposed or private
successor.

### Required legacy-fragment map

| Inquiry 06 fragment                                | Inquiry 09 successor fragment                      |
| -------------------------------------------------- | -------------------------------------------------- |
| `#trade`                                           | `#trade`                                           |
| `#notebook-source-gates-yu-prior`                  | `#notebook-source-gates-yu-prior`                  |
| `#notebook-source-gates-white-house-transshipment` | `#notebook-source-gates-white-house-transshipment` |
| `#notebook-source-gates-ustr-origin`               | `#notebook-source-gates-ustr-origin`               |
| `#notebook-source-gates-usmca-3210`                | `#notebook-source-gates-usmca-3210`                |
| `#notebook-source-gates-canada-ev`                 | `#notebook-source-gates-canada-ev`                 |
| `#notebook-source-gates-white-house-canada`        | `#notebook-source-gates-white-house-canada`        |
| `#notebook-source-gates-brookings`                 | `#notebook-source-gates-brookings`                 |
| `#notebook-source-gates-canada-china-cycle`        | `#notebook-source-gates-canada-china-cycle`        |
| `#notebook-source-gates-canada-origin-measures`    | `#notebook-source-gates-canada-origin-measures`    |
| `#notebook-source-gates-usmca-2026`                | `#notebook-source-gates-usmca-2026`                |
| `#notebook-source-gates-cpa-monitor`               | `#notebook-source-gates-cpa-monitor`               |
| `#notebook-source-gates-fed-mexico`                | `#notebook-source-gates-fed-mexico`                |
| `#notebook-source-gates-canada-countermeasures`    | `#notebook-source-gates-canada-countermeasures`    |
| `#notebook-source-gates-canada-negotiations`       | `#notebook-source-gates-canada-negotiations`       |
| `#notebook-source-gates-trump-warning`             | `#notebook-source-gates-trump-warning`             |
| `#notebook-source-gates-canada-trade`              | `#notebook-source-gates-canada-trade`              |

The moved figure retains `transshipment-proof-title` and
`transshipment-proof-note` on Inquiry 09. The corrected Inquiry 06 figure retains
`circulation-gates-title` and `circulation-gates-note`. A later implementation
must audit inbound fragment references to those fixed component IDs before the
move; any public inbound reference adds a predecessor compatibility entry.

## Schema and component boundary

The existing `circulation-gates` contract requires exactly three domains. The
future implementation must not relax it to a minimum length, make trade fields
optional, or leave an impossible trade state merely to compile. The correction
requires separately reviewed schemas with explicit discriminants:

- a two-domain circulation contract for corrected Inquiry 06 that requires
  exactly culture and memory, and does not accept `tradeProofs`,
  `tradePressure`, or `tradeFrames`; and
- an origin-proof contract for Inquiry 09 that requires the trade gate, proof
  ladder, pressure chronology, frame matrix, and trade-specific claim audit.

The later code review must decide the final discriminant names and prove that
the original three-domain schema still validates the current public object until
the atomic correction. `CirculationGatesFigure` receives a typed two-domain
input; `TransshipmentEvidenceFigure` receives only the origin-proof contract.
No generic optional-field schema is acceptable.

The initiating episode will be extracted to one immutable module containing its
source identity, publisher metadata, exact URLs, retrieval record, limitation,
and shared transcript-audit record. Both entries reference that module. The
format and `NotebookAudioFacade` remain declared only by Inquiry 06, preserving
the current consent, loading, error, and retry ownership and zero-request
pre-consent behavior.

## Public absence contract before authorization

The proposed `where-does-origin-change` entry may exist later as a private or
test fixture only if all public selectors reject it. Before a separate
corrective-publication decision, it must have no:

- route or generated route parameter;
- sitemap or robots-visible URL;
- canonical, Open Graph, social image, JSON-LD Article, or metadata projection;
- homepage, Notebook index, archive, Source Archive, Atlas, saved-view, or
  knowledge projection;
- adjacency or `relatedNotebooks` link from a public entry; or
- public source-card compatibility link.

The public artifact remains Inquiry 06 exactly as it is today until corrected
Inquiry 06 and commissioned Inquiry 09 can pass their publication gates
together. Planning, schema work, or a green build is not publication authority.

## Evidence meanings that must survive the split

- Canadian quota use proves only observed admission under the Canadian quota.
  It does not establish Canadian production, USMCA qualification, US entry, or a
  customs violation.
- Canadian production requires manufacturing or assembly evidence.
- USMCA qualification requires the applicable product rule, certification, and
  content calculation.
- US entry requires an entry record tied to the vehicle or shipment.
- A violation requires a responsible determination or comparable legal record.
- Aggregate or modeled exposure cannot identify a concealed shipment, assign
  Canada-only value when the source combines countries, or establish intent.
- The September 1 derived quantity of 33,397 is arithmetic from the official
  24,500 second-period base and reported 8,897 remainder. It remains subject to
  later official revision.

## Later implementation sequence

1. Accept a separate editorial decision that supplies corrected Inquiry 06
   prose, commissions Inquiry 09, decides whether September 1 evidence is
   admitted, and names the publication cutoff.
2. Add failing contract tests for the two explicit schemas,
   `relatedNotebooks`, `legacyFragments`, custody completeness, URL equivalence,
   fragment compatibility, shared-source equality, citation deduplication, and
   audio privacy.
3. Extract the initiating episode and transcript audit to their immutable shared
   authority; keep the format and audio facade with Inquiry 06.
4. Build proposed Inquiry 09 outside every public selector, then reconcile all
   25 source identities, 45 stored references, 41 unique destinations, and 53
   typed records against this specification.
5. Correct Inquiry 06 through the explicit two-domain schema and add the legacy
   compatibility notices without changing its slug, canonical, ordinal, or
   publication date.
6. Run the complete gates and inspect both pages at desktop and mobile widths,
   including keyboard navigation, screen-reader notice context, click-to-load
   privacy, metadata, JSON-LD, sitemap, archive, and knowledge projections.
7. Publish both entries atomically only after exact-head review and the separate
   editorial authorization. Record the resulting correction and deploy SHA.
8. Observe the predecessor fragments and successor route after deployment. Keep
   issue #35 open for evidence monitoring regardless of publication state.

## Required tests and acceptance evidence

A later implementation is not mergeable until it proves all of the following:

- **Custody completeness:** the exact predecessor inventory has no missing or
  multiply owned non-shared base field, prose field, typed record, format,
  source, component, URL, media URL, or fragment.
- **URL union equality:** the cleaned predecessor URL set equals the combined
  successor set, with 41 unique destinations and zero unapproved retirements.
- **Shared identity equality:** both entries resolve the initiating episode and
  transcript audit to the same immutable source metadata and exact publisher
  URLs; mutation or divergent fixtures fail.
- **Fragment compatibility:** `#trade` and all 16 moved source IDs resolve on
  Inquiry 06 as accessible notices and link to the same exact fragments on
  Inquiry 09 after publication.
- **Citation deduplication:** each clean URL appears once in each page's JSON-LD
  citation set even when a shared source or multiple fields reference it.
- **Public-selector absence:** before the accepted publication change, the
  proposed slug is absent from route generation, sitemap, metadata, homepage,
  Notebook index, archive, knowledge projection, and adjacency.
- **Route parity:** Inquiry 06 retains its current canonical, ordinal,
  `publishedAt`, review state, and accessible public behavior until the atomic
  correction.
- **Audio privacy:** rendering, hydrating, and navigating both entries makes zero
  requests to the third-party audio origin until explicit consent; Inquiry 09
  has no audio player.
- **Evidence behavior:** static and live link audits preserve exact publisher
  URLs, and no redirect alone changes source identity.
- **Quality and presentation:** production dependency audits, complete
  repository gates, desktop/mobile layout review, keyboard review, theme review,
  metadata review, and production-build inspection all pass.

## Rollout, rollback, and stop conditions

This planning PR changes only Markdown. Its rollback is a documentation revert;
there is no runtime, route, or deployment state to restore.

For a later migration, take an exact snapshot of the current Inquiry 06 object,
route output, metadata, source set, and fragment behavior before implementation.
If any prepublication check fails, do not expose Inquiry 09 and retain the
current Inquiry 06 unchanged. If an authorized release fails after deployment,
restore the prior Inquiry 06 object and route from that exact snapshot, withdraw
Inquiry 09 from public selectors, and retain the correction decision, custody
ledger, and failure record for audit.

Stop before implementation or publication if:

- any custody row is missing or any non-shared item has two owners;
- the URL union differs without an accepted `retire-with-reason` decision;
- an old fragment cannot provide an accessible compatibility notice;
- shared source metadata, retrieval dates, limitations, or URLs can drift;
- the two-domain schema weakens the current three-domain contract;
- the proposed entry enters a public selector before authorization;
- either page requests audio before consent;
- the new quota evidence is used to infer production, origin, US entry, fraud,
  or enforcement; or
- no separate editorial decision authorizes both the Inquiry 06 correction and
  Inquiry 09 commission.

## Planning acceptance

This specification closes the planning question only. Issue #34 may close when
the reviewed documentation PR is merged because the inventory, contracts,
tests, sequence, rollback, and stop conditions are decision-complete. Issue #35
remains open. The umbrella issue #32 remains open. The next authorized action is
an editorial commission and correction decision, not runtime implementation.
