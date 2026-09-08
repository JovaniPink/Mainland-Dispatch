# Connected reading implementation

Status: Package 1 is implemented for review; acceptance is pending. Packages 2–4
remain queued behind its gate. No merge or production release is authorized.

## Package 1: correctness, accessibility, dates, and media

Base: `0c0b200`. Review branch: `codex/connected-reading-correctness`.

PR #52's three commits were rebased onto the base on this separate branch. The
original PR branch is unchanged. The audio-element regression and dated demo
record remain intact; the documentation index retains its newer September 6
date. Issue #53 remains the native Safari acceptance requirement. PR #51 and
issue #35 are separate work.

Implemented:

- Shared Archive URL parser/serializer with public selection validation, latest
  inquiry input, explicit inquiry identity, preserved unrelated query parameters
  and fragments, push for explicit changes, replace for search, and history
  restoration without a write effect. Invalid public selections produce a
  visible fallback notice.
- Focus record label association; wrapped Archive/Compare controls; persistent
  navigation location; bounded mobile section menus; 44px standalone controls.
- Separate vermilion text, fill, and focus tokens. Public component metadata is
  at least 12px, shared source limitations at least 14px, and shared prose 18px
  with 1.65 line height and a 70-character maximum measure.
- Full historical date years and partial-date formatting; required Trace
  `assessmentAsOf` seeded from its documented July 22, 2026 assessment; optional
  Notebook `presentationUpdatedAt` without changing evidence-review dates.
- One consented audio node across loading, readiness, playing, pause, buffering,
  and completion. Native media events drive reader-facing status. Error and
  unload remove the node; retry creates a new one. Fixed media colors and focus
  prevent theme inversion.

Evidence so far:

- Before the fix, the new Arctic reload test failed because serialization
  removed its inquiry parameter. It passes after the repair.
- Tests cover URL round trips, invalid selections, history restoration, audio
  node/position continuity and all playback states, unrounded contrast ratios,
  navigation ownership, and partial dates. Existing content and compatibility
  inventories are retained.
- Install-script review found no unreviewed scripts; both dependency audits
  returned zero vulnerabilities.
- Local canonical validation passes checks before production compilation, but
  Turbopack cannot create its PostCSS process/port (`Operation not permitted`).
  Retrying outside the sandbox produced the same restriction.
- A webpack production build completed as a diagnostic. This does not substitute
  for the canonical build gate or prove visual/native acceptance.
- Local browser access was blocked by the browser client. Responsive visual,
  keyboard, VoiceOver, zoom, native Safari audio, and performance acceptance
  remain unverified.

The draft review package must pass hosted canonical CI and the affected
production-browser journeys before Package 2 begins. Do not mark issue #53
complete using simulated media events or headless WebKit.

## Remaining packages

2. Typed public Inquiry/Source/Dispatch discovery, source identities with all
   contextual uses, mutually exclusive relationship explorers, shared-source
   anchors, and mixed browser-local Saved reading with storage-failure feedback.
3. Homepage, shared reader shell, About and public GitHub correction form, plus
   Inquiry 08 as the production-rendered design reference. Review the reference
   before extending the design.
4. Refine all ten openings and repeated terminology with an original/replacement
   evidence-boundary ledger. Complete distinct explanatory diagrams, retain
   legacy fragments and sources, and standardize companion/adjacent navigation.

Every package runs the AGENTS.md gates and the approved acceptance matrix. The
later packages must preserve the public selectors, knowledge IDs, source and
claim inventories, browser-local saved references, existing URLs/fragments,
consent boundary, and historical research records. No new reporting or source
promotion is included.

## Review and rollback

Review state/URL compatibility and native audio lifetime first, then inspect
Paper/Night focus, contrast, wrapping, and dates. Preserve source publication
precision and distinguish presentation revisions from evidence review.

Revert each package's implementation commit separately. Retain the rebased PR
#52 repair unless its owner explicitly decides otherwise. Later Saved work must
retain unknown stored references even when a target is no longer public.

Standards used: [WCAG contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[WCAG target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html),
and [native playing events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event).
