# Inquiry 08 editorial commission

**Status:** Accepted

**Effective:** August 30, 2026

**Entry:** "Below Half Is Not Gone"

**Ordinal:** 08

**Slug:** `below-half-is-not-gone`

## Decision

Commission Inquiry 08 as a source-reviewed Season Zero Notebook about China's
electricity transition. The inquiry asks how coal can fall below half of
electricity generation while absolute coal generation and coal-generating
capacity still rise.

The accepted thesis is that share, output, capacity, utilization, curtailment,
demand, fuel production, and emissions are different measurements. A falling
coal share can coexist with rising coal output when total electricity demand
and non-coal generation grow faster. The page must not turn that coexistence
into a verdict that China has either completed or failed its energy transition.

This commission authorizes the dedicated research ledger, typed content model,
semantic evidence figure, draft content, tests, and an atomic public route and
publication-status change after every evidence and repository gate passes. It
does not make a draft public, establish a deployment, or authorize any other
Notebook migration.

## Evidence decision

The public entry must use exactly eight source-trail records from the dedicated
[Inquiry 08 ledger](../source-notes/2026-08-30-below-half-is-not-gone-ledger.md)
and exactly three context formats:

1. the National Energy Administration first-half press-conference record;
2. the complete CREA/Global Energy Monitor first-half coal-power analysis; and
3. the IEA Electricity Mid-Year Update 2026.

The National Energy Administration and National Bureau of Statistics are
primary authorities for the measurements they publish. The State Council/Xinhua
record is an official English-language summary, not independent validation.
CREA and Global Energy Monitor supply independent analysis, unit-level tracker
context, and a modeled curtailment estimate. The IEA supplies historical and
forecast context that must not be presented as an observed first-half result.

The full CREA/GEM report was reviewed on August 30. Its 360 TWh value combines
reported curtailment with estimates of unreported curtailment. The estimates
use provincial capacity and utilization data, monitoring-center offtake and
curtailment records where available, regression models trained on 2020-2023
utilization and weather, NASA POWER and CFSv2 weather inputs, and Global Energy
Monitor plant locations. The report also states that not every curtailed unit
could have displaced coal at the same time and place. Both facts must remain
visible wherever the estimate appears.

## Measurement contract

The future `energy-system` Notebook variant must contain exactly four ordered
layers with exactly two primary measures in each layer:

| Order | Layer                | Primary measures                                                                                                                       |
| ----: | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
|     1 | `generation-mix`     | Coal generation share of 49.7%; renewable generation share of 41.2%                                                                    |
|     2 | `generation-volume`  | Coal generation of 2.5 trillion kWh; CREA/GEM year-over-year coal-generation change of +3.4%                                           |
|     3 | `installed-capacity` | Wind and solar capacity of 1.95 billion kW; 30 GW of coal capacity commissioned, with retirements and construction starts as contrasts |
|     4 | `system-use`         | Coal utilization of 1,998 hours; CREA/GEM estimated wind-and-solar curtailment of 360 TWh                                              |

Each measure must carry a stable ID, layer, label, display value, numeric value,
unit, observation period, comparison and calculation basis, evidence kind,
interpretation, counter-reading, explicit boundary, and resolved source IDs.
Permitted evidence kinds are `official-measurement`, `independent-analysis`,
`modeled-estimate`, and `forecast`. Optional contrasts must preserve their own
units and periods.

The entry must contain exactly four alternative readings and prose sections for
frame, mix, output, capacity, constraints, synthesis, and what changed.

## Required boundaries

- 49.7% is a first-half generation share, not a full-year result.
- 2.5 trillion kWh is generated electricity, not installed capacity.
- 1.95 billion kW is wind-and-solar capacity, not actual generation.
- 30 GW commissioned is gross capacity entering service, not net fleet growth,
  utilization, or proof that every plant will operate for its design life.
- 1,998 hours is first-half utilization, not a direct measure of reliability
  value.
- 360 TWh is a CREA/GEM modeled estimate that includes unreported curtailment;
  it is not an official observed total or a claim that every unit could have
  displaced coal contemporaneously.
- The IEA's 5.5% demand-growth figure is a forecast.
- July raw-coal production and reported thermal generation may not be relabeled
  as coal-fired generation.
- Generation share alone cannot establish an emissions trajectory.
- The reviewed evidence does not establish one exclusive motive for continued
  coal construction.

## Presentation decision

Create a static semantic figure titled "One system, four different questions."
It uses four stacked bands, one column on mobile and two columns at wider
widths. Every displayed value retains its period, unit, evidence kind, source,
and boundary.

The figure must not use a shared axis, imply that coal and renewables exhaust
the generation mix, use color as the only status cue, or apply a green/red
success judgment. Modeled and forecast values receive visible text labels.
Native `details` elements may contain contrasts and source mechanics, and print
output must expose essential evidence. The figure makes no client-side request
and adds no third-party visualization dependency.

## Publication boundary

Inquiry 08 begins as `editorialStatus: "draft"` and receives no public route or
metadata while it is a draft. The route, registry entry, and transition to
`published` occur in one final change. Public selectors then control the
homepage, Notebook index, Archive relationship, adjacent navigation, sitemap,
canonical, Open Graph, and JSON-LD output.

The public implementation must reuse the shared Notebook reader, format cards,
source trail, status component, metadata builders, and JSON-LD builders. It does
not authorize a generalized data pipeline, automated source updates, unique
social artwork, Desk or Atlas exposure, or private reader-state collection.

## Acceptance and stopping conditions

Before publication, reproduce the central figures from the controlling records,
verify every source URL, date, unit, definition, retrieval date, and limitation,
and rerun the repository, static-link, live-link, desktop, mobile, theme,
keyboard, and screen-reader-oriented gates.

Stop before publication if the CREA/GEM methodology cannot support the 360 TWh
representation, official and independent generation figures cannot be
reconciled by period and definition, a newer release supersedes the first-half
frame, documentary support is missing for a required date or limitation, the
work requires a generalized pipeline or exceeds the Season Zero per-entry time
box, a private boundary would be crossed, or the canonical build or public-route
contract fails.

## Rollback

Rollback removes the future Inquiry 08 route and public registry entry while
retaining this commission and the source ledger as research history. A factual
problem found after publication uses `editorialStatus: "corrected"` and a dated
revision chronology rather than silent withdrawal.
