# Inquiry 09 commission and Inquiry 06 correction

**Status:** Accepted commission and paired corrective-publication decision

**Effective:** September 1, 2026

**Implementation tracker:** [#43](https://github.com/JovaniPink/Mainland-Dispatch/issues/43)

## Decision

Commission Inquiry 09, "Where Does Origin Change?", as a source-reviewed
Notebook and authorize its publication only in the same release that corrects
Inquiry 06, "What Gets Through?", to its culture-and-memory scope.

Inquiry 09 explains a proof sequence. Crossing into Canada changes admission
status; it does not automatically change product origin. Canadian production,
USMCA qualification, certification, and entry into the United States remain
separate evidentiary gates. The article does not allege that a named vehicle,
shipment, firm, or government committed customs fraud.

The controlling custody contract is the [Inquiry 06 / Inquiry 09 migration
specification](../plans/2026-09-01-inquiry-06-09-migration-spec.md). Its legacy
inventory must reconcile before either public object changes.

## Source cutoff and admission

The publication cutoff is September 1, 2026. Admit the two primary records from
the [September quota watch](../source-notes/2026-09-01-canada-ev-quota-watch.md)
as a separate post-migration evidence cohort:

1. Global Affairs Canada Notice to Importers No. 1168, which sets the September
   1, 2026 through February 28, 2027 second period at a base of 24,500 vehicles
   plus unused first-period volume.
2. The Export and Import Controls System utilization report, updated August 28,
   which reports 15,603 first-period uses and 8,897 remaining.

The second-period quantity of 33,397 is derived arithmetic: 24,500 plus 8,897.
It is not an independently published total and remains subject to official
revision or cancellation. These records establish aggregate Canadian quota use
and an operative Canadian permit rule. They do not establish production in
Canada, USMCA qualification, entry into the United States, or a violation.

The September 8 Canadian countertariffs are future-effective at this cutoff and
concern products imported from the United States. Keep that record in the
manual evidence watch rather than use it as proof of China-origin
transshipment. If publication occurs on or after September 8, a new dated watch
review and decision addendum are mandatory.

## Exact Inquiry 06 correction

Inquiry 06 retains ordinal `6`, slug `what-gets-through`, title, canonical,
publication date, review state, publisher audio, consent behavior, culture and
memory source custody, and initiating-episode identity. Set `updatedAt` to
`2026-09-01`, `editorialStatus` to `corrected`, and `readTime` to `16 min`.

Use these replacement base fields:

- **Subtitle:** "Networked attention and national-security law are different gates on whether culture reaches an audience and public memory remains sayable."
- **Description:** "A source-audited inquiry into how networked attention and national-security law shape what reaches an audience or remains publicly sayable."
- **Thesis:** "Networked attention and national-security law both shape circulation, but by different authority and with radically different stakes: audiences and cinemas allocate attention, while courts assign criminal meaning to political advocacy. The comparison clarifies those mechanics without treating box-office visibility and loss of liberty as morally equivalent."
- **Front-page finding:** "Culture and public memory move through different institutions: audiences can reverse a film's visibility, while law can narrow the space for political remembrance."
- **Front-page caveat:** "The film figures are dated snapshots, the Hong Kong convictions remain distinct from sentencing, and the two mechanisms are not morally equivalent."
- **Tags:** `China`, `Niu Lai`, `Hong Kong`, `Networked attention`, and `Public memory`.
- **Unresolved question:** "When institutions restrict circulation, which forms of public evidence can distinguish a temporary distribution failure from a durable narrowing of civic space?"

Replace `sections.lens` with:

1. "The original inquiry compared three gates: customs origin, networked attention, and national-security law. The rules-of-origin material now has its own companion because its legal proof sequence was obscured by a three-domain comparison. This corrected article keeps the two domains that ask how speech and culture become publicly reachable."
2. "The mechanisms still must not be collapsed. A film can gain screens when attention changes a commercial demand signal. Political remembrance can become evidence in a criminal case when a court assigns legal meaning to advocacy. One is a distribution reversal; the other carries state coercion and loss of liberty."

Replace `sections.changed` with:

1. "September 1 correction: the rules-of-origin and transshipment-proof material moved to Inquiry 09, Where Does Origin Change?, with its source identities, chronology, claim checks, and figure preserved."
2. "Inquiry 06 now uses an explicit two-domain contract for culture and memory. Its initiating audio remains here because this is the canonical publisher-audio experience and no second playback surface was authorized."
3. "The correction preserves the original URL and publication date. Old trade and source fragments remain as accessible notices that point to the exact companion fragment without redirecting the article or duplicating its citations."

Use these limitations:

1. "The publisher provides no transcript or chapter record; the culture and memory locators were audited manually against the complete audio."
2. "The Niu Lai box-office figures are dated Maoyan snapshots rather than a final gross or a common-period lifetime comparison."
3. "The Hong Kong judgment, prosecution position, rights criticism, conviction, mitigation, and sentencing are distinct records."
4. "The culture and memory mechanisms are compared for structure, not moral equivalence or common consequence."
5. "Rules-of-origin material now belongs to Inquiry 09; compatibility notices preserve the predecessor fragments without making Inquiry 06 a duplicate trade article."

## Inquiry 09 editorial contract

Publish ordinal `9`, slug `where-does-origin-change`, title "Where Does Origin
Change?", `publishedAt` and `updatedAt` `2026-09-01`, `readTime` `19 min`,
`editorialStatus` `published`, and `reviewState` `source-reviewed`.

Use this thesis:

"A vehicle admitted to Canada does not become Canadian-origin merely by crossing the border. Production, product-specific USMCA qualification, certification, and US entry are separate proof gates; the reviewed public record documents aggregate Canadian admission but not a quota vehicle that completed the later gates or violated customs law."

The article must proceed through `frame`, `admission`, `production`,
`qualification`, `entry`, `pressure`, `limits`, and `changed` sections. It must
preserve the four-step proof figure, the policy-pressure chronology, the source
frame matrix, and the counter-reading. The 15,603 utilization total and 33,397
derived capacity belong in the admission section and claim audit, not in a
production, origin, or enforcement conclusion.

Inquiry 09 has no format record, audio player, transcript claim, map, live data,
or automated evidence feed. It links back to Inquiry 06 as its culture and
memory companion.

## Public identity, compatibility, and knowledge

- The legacy migration cohort remains exactly 25 source identities, 45 stored
  references, 41 unique destinations, and 53 typed records.
- The two new sources produce a final successor union of 27 source identities,
  43 unique destinations, and 56 typed records.
- Inquiry 06 must expose compatibility notices for `#trade`, all 16 moved source
  fragments, `#transshipment-proof-title`, and
  `#transshipment-proof-note`.
- The initiating episode and transcript audit have one immutable authority.
  Only Inquiry 06 owns the format, audio metadata, player, and consent state.
- Moved and shared knowledge source IDs retain their predecessor public
  identity. The shared episode emits one public source object referenced by
  both publications.
- Companion relationships are reciprocal and appear publicly only when both
  entries are public.

## Release, rollback, and stop conditions

The correction and new entry are one atomic runtime release. Required evidence
includes both dependency audits, both TypeScript compiler lines, the complete
test and build gate, static and live link audits, desktop/mobile Paper and Night
review, keyboard and fragment review, zero pre-consent Simplecast requests,
exact-head hosted checks, exact merge identity, and production readback.

If any prepublication gate fails, retain the current Inquiry 06 unchanged and
keep Inquiry 09 absent from public selectors. If the paired release fails after
deployment, restore the exact predecessor Inquiry 06 object and withdraw
Inquiry 09 from public selectors together. Preserve this decision, source
notes, custody ledger, and failure evidence.

Stop on any custody mismatch, unapproved URL loss, duplicate non-shared source,
broken legacy fragment, divergent shared metadata, early public exposure,
pre-consent media request, or language that infers production, USMCA origin,
US entry, or fraud from Canadian quota admission.
