# Inquiry 10 commission and Inquiry 04 correction

**Status:** Accepted commission and paired corrective-publication decision

**Effective:** September 1, 2026

**Implementation tracker:** [#44](https://github.com/JovaniPink/Mainland-Dispatch/issues/44)

## Decision

Commission Inquiry 10, "The Arctic Is Not a Shortcut", as a source-reviewed
Notebook and authorize its publication only in the same release that corrects
Inquiry 04, "Routing Around Risk", to its non-Arctic portfolio scope.

Inquiry 10 explains the Northern Sea Route as a bounded seasonal container
corridor. It is not a reliable substitute for Hormuz energy flows or Suez-scale
container traffic, and it introduces ice, Russian-administration, rescue,
insurance, sanctions, and environmental dependencies. The article does not
claim that a planned or departed ship completed the route, that a particular
passage is safe, that the service is reliable, or that the route has lower
lifecycle impact.

The controlling custody contract is the [Inquiry 04 / Inquiry 10 migration
specification](../plans/2026-09-01-inquiry-04-10-migration-spec.md). Its closed
inventory must reconcile before either public object changes.

## Source cutoff and recheck

The publication cutoff is September 1, 2026. The required voyage, ice, and IMO
recheck is preserved in the [publication refresh](../source-notes/2026-09-01-inquiry-10-publication-refresh.md).
It found a later official summary that *Dubai Tower* departed Qingdao, its final
Chinese port, on August 19. It found no public arrival or completed-transit
record. NSIDC still provides no guarantee that any passage segment will be
ice-free, and the IMO Arctic heavy-fuel-oil rule still includes protected-tank
and coastal-state transition provisions through 2029.

Those results do not invalidate the thesis. The new departure and IMO committee
URLs remain research-addendum context, not newly admitted public source
identities. The authorized public source union therefore stays exactly at 26
identities and 28 unique URL destinations.

## Exact Inquiry 04 correction

Inquiry 04 retains ordinal `4`, slug `routing-around-risk`, title, canonical,
original `publishedAt`, review state, and the non-Arctic source and map
identities. Set `updatedAt` to `2026-09-01`, `editorialStatus` to `corrected`,
and `readTime` to `20 min`.

Use these replacement base fields:

- **Subtitle:** "China's response to the Hormuz and Red Sea crisis is a portfolio of inventories, pipelines, tanker handoffs, selective passage, and supplier relationships. Every workaround relocates risk rather than removing it."
- **Description:** "A source-audited field guide to China's non-Arctic chokepoint portfolio: oil inventories, bypass pipelines, tanker handoffs, Red Sea exposure, sanctions, and the limits of substitution."
- **Thesis:** "China is not escaping maritime chokepoints. It is distributing exposure across estimated oil inventories, pipeline capacity, offshore cargo handoffs, state-linked shipping, supplier diversity, and selective passage. Those measures buy time and relocate risk; none replaces the energy function of Hormuz or the container scale of Suez."
- **Front-page finding:** "China's deepest near-term buffer is estimated crude inventory on land; pipelines, tanker handoffs, passage arrangements, and supplier diversity relocate narrower parts of the exposure."
- **Front-page caveat:** "Inventory is estimated, pipeline capacity is not realized flow, and reported routing behavior does not establish a universal policy or a risk-free corridor."
- **Tags:** `China`, `Strait of Hormuz`, `Red Sea`, `Energy security`, and `Maritime trade`.
- **Unresolved question:** "Can a portfolio designed to buy weeks or months of resilience become durable without replacing one chokepoint dependency with new capacity, counterparty, and sanctions exposure?"

Keep the existing `why`, `verdict`, `chokepoints`, `portfolio`, and `history`
sections, including their cross-domain comparisons, but remove any sentence
that makes the NSR evidence part of Inquiry 04's own portfolio. Move the full
`arctic` section to Inquiry 10. Replace `governance` with:

1. "Sanctions, procurement, permissiveness, intelligence enablement, and operational command are different propositions. Treasury names PRC-linked procurement networks serving an Iranian missile-propellant producer. AP reports a US assessment that Russia shared potentially useful information while also reporting no evidence that Russia directed Iran's use. The public record supports concern about enablement, not a claim that every shipment or strike followed top-level Chinese or Russian command."
2. "Portfolio passage remains contingent on counterparties, flag and ownership structures, insurance, sanctions exposure, and changing security conditions. A reported company decision, voyage, or cargo handoff cannot establish a universal Chinese policy or a durable route guarantee."

Replace `sections.changed` with:

1. "September 1 correction: the Northern Sea Route evidence moved to Inquiry 10, The Arctic Is Not a Shortcut, with its route, points, scale measures, chronology, source identities, and limitations preserved."
2. "Inquiry 04 now uses a non-Arctic portfolio contract for Hormuz, the Gulf of Oman, Saudi and Emirati bypass pipelines, Bab el-Mandeb, and Suez. The map implementation and privacy boundary are shared, but this page exposes only portfolio, Gulf, and Red Sea lenses."
3. "The correction preserves the original URL and publication date. Old Arctic and moved-source fragments remain as accessible notices that point to the exact companion fragments without redirecting the article or duplicating its citations."

Use these limitations:

1. "The war and shipping picture changes daily; this corrected inquiry stops at September 1, 2026."
2. "The interactive map uses schematic corridor geometry, not AIS tracks, navigational routes, live security guidance, or proof of a named vessel's movement."
3. "Reuters' ship-to-ship volumes, company counts, routing guidance, schedules, and margins were not independently reconstructed from proprietary data."
4. "Chinese inventory figures are EIA estimates because China does not publish a complete government-plus-commercial crude-stock series."
5. "Available, nameplate, export, crude, and total-liquids pipeline measures are not interchangeable and do not establish realized crisis throughput."
6. "Northern Sea Route material now belongs to Inquiry 10; compatibility notices preserve predecessor fragments without making Inquiry 04 a duplicate Arctic article."

## Inquiry 10 editorial contract

Publish ordinal `10`, slug `the-arctic-is-not-a-shortcut`, title "The Arctic Is
Not a Shortcut", `publishedAt` and `updatedAt` `2026-09-01`, `readTime` `16
min`, `editorialStatus` `published`, and `reviewState` `source-reviewed`.

Use this thesis:

"The Northern Sea Route is a bounded seasonal container corridor, not a
reliable substitute for Hormuz energy flows or Suez-scale container traffic. A
shorter advertised distance still depends on ice conditions, Russian
administration and rescue capacity, insurance, sanctions, vessel capability,
and environmental rules, while a planned or departed voyage remains different
from completed and repeatable service."

The article must proceed through `frame`, `scale`, `season`, `governance`,
`environment`, `limits`, and `changed` sections. It preserves the one Arctic
turning point, five Arctic claim audits, three non-additive scale measures, the
one three-point route, six chronological events, and its source-backed
counter-reading. It may report the August 15 port-backed departure already in
the admitted custody set. The later August 19 final-port departure belongs only
to the dated refresh unless separately admitted.

Inquiry 10 owns one Arctic Institute format but no publisher audio player,
embedded media surface, AIS data, live ice feed, voyage tracker, safety advice,
or route recommendation. Its map exposes only the Arctic lens through the same
consent-gated implementation and XState machine used by Inquiry 04.

## Public identity, compatibility, and knowledge

- The predecessor inventory remains exactly 26 source identities, 31 stored references, 28 unique destinations, and 49 typed records.
- Inquiry 04 contains 13 kept and two shared source identities; Inquiry 10 contains 11 moved and the same two shared source identities.
- The Al Jazeera and Guardian records have one immutable metadata authority each, with separate scope-specific use records in the two publications.
- Inquiry 04 must expose compatibility notices for `#arctic` and the 11 moved source fragments named by the custody specification.
- Moved and shared knowledge source IDs retain their predecessor public identity. Each shared source emits one public knowledge object referenced by both publications.
- Companion relationships are reciprocal and appear publicly only when both entries are public.

## Release, rollback, and stop conditions

The correction and new entry are one atomic runtime release. Required evidence
includes both dependency audits, both TypeScript compiler lines, the complete
test and build gate, static and live link audits, desktop/mobile Paper and Night
review, keyboard and fragment review, zero pre-consent map requests, exact-head
Node 22 and Node 24 hosted checks, exact merge identity, and production
readback.

If any prepublication gate fails, retain Inquiry 04 unchanged and keep Inquiry
10 absent from public selectors. If the paired release fails after deployment,
restore the exact predecessor Inquiry 04 object and withdraw Inquiry 10 from
public selectors together. Preserve this decision, source notes, custody
ledger, and failure evidence.

Stop on any custody mismatch, unapproved URL loss, duplicate non-shared source,
broken legacy fragment, divergent shared metadata, invalid route subset, early
public exposure, pre-consent map request, or language that infers voyage
completion, service reliability, safe passage, Suez- or Hormuz-scale
substitution, or lower lifecycle impact from the reviewed record.
