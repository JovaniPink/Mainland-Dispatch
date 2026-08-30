# Inquiry 07 editorial commission

**Status:** Accepted

**Effective:** August 29, 2026

**Entry:** "July Is Not One Number"

## Decision

Commission Inquiry 07 as a source-reviewed Season Zero Notebook about six
economic indicators released for July or January-July 2026: industrial output,
industrial profits, retail sales, fixed investment, property activity, and the
manufacturing purchasing managers' index.

The accepted frame is a data presentation, not a score or a one-word judgment
about China's economy. Every public number must keep its subject, observation
period, publication date, unit, comparison, price or calculation basis,
statistical coverage, source role, alternative reading, and limitation.

## Evidence decision

The six National Bureau of Statistics releases are primary sources for what the
agency measured, defined, and published. They are not independent validation of
their own tables or the government's wider economic characterization. The NBS
first-seven-months summary is an official synthesis and must remain labeled as
such.

The World Bank, OECD, and IMF records are independent institutional analyses or
forecasts. The BIS working paper supplies a technical property-to-consumption
mechanism with earlier and heterogeneous household data. None may replace the
July observations, and no forecast may be presented as a measured July result.

The August 29 live-source refresh added the August 28 NBS English translation of
the original August 27 industrial-profit release. It also found that the live
PMI page displays August 1 while the August 27 candidate ledger listed August
3. Inquiry 07 uses the publisher-displayed August 1 date, preserves July as the
observation month, and discloses the discrepancy.

## Product scope

This decision authorizes:

- one `economic-signals` Notebook schema variant;
- exactly six uniquely identified and ordered indicator records;
- exactly five uniquely identified alternative readings;
- schema enforcement for complete source resolution and the required primary,
  official, independent, and technical source roles;
- one static semantic figure that preserves periods, comparisons, bases,
  coverage, contrasts, and limits without an external request;
- a layered signal treatment that keeps the observation, alternative reading,
  and limitation visible while placing contrasts, detailed coverage, and
  source mechanics in native disclosures;
- stable source-record anchors and descendant deep links that open the
  containing source disclosure;
- one public route at `/notebook/july-is-not-one-number` with shared reader
  chrome, canonical metadata, JSON-LD citations, source trail, and a link to
  Inquiry 06;
- registration as the latest public Notebook across the homepage, Notebook
  index, Archive selector, sitemap, and shared reader-route tests; and
- desktop and mobile production-build inspection in paper and night themes.

This decision does not authorize original-reporting language, independent
verification claims, a composite economic score, a generalized data pipeline,
automated updates, promotion of private Desk records, deployment, or a
live-publication claim.

## Bounded interpretation

The evidence supports a qualified composition reading: covered industrial
output and aggregate industrial profits grew; nominal retail sales grew slowly;
fixed investment and multiple property measures fell; selected technology-
related investment categories grew; and the manufacturing PMI moved below its
50-point threshold.

The evidence does not make those measures interchangeable. Retail sales are
not total household consumption. PMI is not an output-growth rate. Several
series are cumulative rather than July-only. Fixed investment is not price
adjusted. Property investment, sales area, sales value, and financing use
different units. Sector growth rates do not disclose their weights in the
national total.

## Review boundary

Research begins with Candidate 2 in the [August 27 China news candidate
ledger](../source-notes/2026-08-27-china-news-candidate-ledger.md) and stops at
the 11 source records embedded in Inquiry 07. Revised July tables and August
data require a separately dated update on the same definitions and comparable
bases.

Repository publication requires the canonical dependency audits and
`npm run test-all` gate. Layout acceptance requires production-build inspection
at desktop and mobile widths. Neither local success nor this decision proves a
deployment or current hosted behavior.

## Presentation decision

Inquiry 07 must present the six indicators as separate statistical objects. It
must not place them on a shared or dual axis, convert their directions into a
composite score, or use color alone to imply that a movement is economically
good or bad.

The first scan shows exact values, periods, comparisons, bases, observed
readings, alternative readings, and limitations in a one-column mobile and
two-column desktop panel. Secondary contrasts, detailed coverage, and direct
source links use native `details` elements that are collapsed by default,
keyboard operable, available without client-side data requests, and expanded
for print. The institutional context cards follow the observed signals and
synthesis so forecasts and official characterizations do not lead the primary
records.

## Rollback

Rollback removes Inquiry 07's registry entry, route, schema variant, figure,
content, tests, and this decision record. The August 27 candidate ledger and all
earlier public Notebooks remain unchanged.
