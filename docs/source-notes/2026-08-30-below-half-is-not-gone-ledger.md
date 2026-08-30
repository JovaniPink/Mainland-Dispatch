# "Below Half Is Not Gone" - Inquiry 08 source ledger

## Ledger metadata

- Research origin: Candidate 1 in the [August 27 China news candidate
  ledger](2026-08-27-china-news-candidate-ledger.md)
- Dedicated review date: August 30, 2026
- Retrieval date for every admitted record: August 30, 2026
- Coverage window: 2025 through the first half of 2026, with July 2026 fuel and
  thermal-generation context
- Editorial state: Commissioned research ledger; not a published site article
- Provenance: Source-reviewed interpretation, not verified original reporting
- Working entry: Inquiry 08, "Below Half Is Not Gone"

This ledger promotes the electricity candidate into its own publication record
without changing the August 27 candidate ledger. It preserves publisher URLs,
measurement periods, units, evidence kinds, calculations, alternative readings,
and material limitations.

## Research question

How can coal-fired generation fall below half of China's electricity mix while
absolute coal generation and coal-generating capacity still rise?

The evidence supports a systems explanation: electricity demand and clean
generation can grow faster than coal output, reducing coal's share even as a
larger coal fleet produces more electricity in total. It does not support a
simple conclusion that coal has disappeared, that renewable capacity equals
renewable generation, or that one first-half share establishes an emissions
trajectory.

## Admitted source inventory

| ID                        | Publisher and record                                                                                                                                                                                                                                                                                              | Published                                                        | Evidence kind                             | Measurement or use                                                                                                                                                                                           | Source-specific limitation                                                                                                                                                                                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `energy-nea-h1`           | National Energy Administration, [first-half press-conference hub](https://www.nea.gov.cn/xwfb/202603zb/index.htm)                                                                                                                                                                                                 | July 30, 2026                                                    | Official measurement                      | Controlling Chinese-language conference record for first-half energy conditions, electricity demand, renewable integration, storage, and market statements                                                   | The hub contains multiple records and Chinese-language definitions; each public number must resolve to its underlying conference item rather than treating the hub as one independent dataset.                                                                          |
| `energy-state-council-h1` | State Council / Xinhua, [coal-fired output share falls below 50%](https://english.www.gov.cn/archive/statistics/202607/30/content_WS6a6b131ac6d00ca5f9a0c7c4.html)                                                                                                                                                | July 30, 2026                                                    | Official summary                          | Reports 49.7% coal generation share, 2.5 trillion kWh coal generation, 1.95 billion kW wind-and-solar capacity, nearly 2 trillion kWh renewable generation, and 41.2% renewable generation share for H1 2026 | This is an official English-language summary of NEA data, not independent validation. Share, generation, and capacity are different measures, and coal plus renewables do not exhaust the complete mix.                                                                 |
| `energy-nbs-july`         | National Bureau of Statistics, [July energy production](https://www.stats.gov.cn/english/PressRelease/202608/t20260819_1965079.html)                                                                                                                                                                              | August 18, 2026                                                  | Official measurement                      | Reports July raw-coal production of 340 million tonnes, down 10.1% year over year; January-July production of 2.70 billion tonnes, down 2.9%; and a 3.5% decline in reported thermal generation              | Raw-coal production, thermal generation, coal-fired generation, capacity, consumption, and emissions are not interchangeable. July and January-July periods do not replace the H1 electricity frame.                                                                    |
| `energy-crea-gem-h1`      | Centre for Research on Energy and Clean Air / Global Energy Monitor, [Built for backup, contracted to run](https://globalenergymonitor.org/research/built-backup-contracted-run) and [complete report PDF](https://globalenergymonitor.org/sites/default/files/2026-08/CREA_GEM_China_Coal%20power_H1%202026.pdf) | August 2026                                                      | Independent analysis and modeled estimate | Reports H1 coal generation up 3.4%, 30 GW commissioned, 2.7 GW retired, 25.4 GW starting construction, 1,998 utilization hours, and an estimated 360 TWh of wind-and-solar curtailment                       | CREA is an advocacy/research organization and GEM supplies tracker data. The curtailment total combines reported values with modeled unreported output; it is not an official observation, and not every curtailed unit could displace coal at the same time and place. |
| `energy-gcpt`             | Global Energy Monitor, [Global Coal Plant Tracker](https://globalenergymonitor.org/projects/global-coal-plant-tracker)                                                                                                                                                                                            | Current biannual tracker; July 2026 update used by the H1 report | Independent dataset                       | Unit-level status for known coal-fired units of 30 MW or more and projects proposed since January 1, 2010                                                                                                    | Tracker status depends on sourced project records and periodic classification. A proposed, permitted, or construction-stage unit is not proof of completion, operation, utilization, retirement timing, or motive.                                                      |
| `energy-iea-review`       | International Energy Agency, [Global Energy Review 2026 - Coal](https://www.iea.org/reports/global-energy-review-2026/coal)                                                                                                                                                                                       | 2026                                                             | Independent historical analysis           | Reports that China coal-fired generation fell about 1.5% in 2025 while almost 80 GW of coal capacity was commissioned                                                                                        | This is annual 2025 context, not an H1 2026 measurement, and its reported decline must not be substituted for CREA/GEM's differently bounded first-half 2026 change.                                                                                                    |
| `energy-iea-midyear`      | International Energy Agency, [Electricity Mid-Year Update 2026](https://www.iea.org/reports/electricity-mid-year-update-2026/executive-summary)                                                                                                                                                                   | 2026                                                             | Forecast                                  | Forecasts China electricity-demand growth of 5.5% in 2026, compared with 5.2% in 2025                                                                                                                        | The value is a forecast, not an observed full-year result and not a sufficient causal explanation for the observed first-half generation mix.                                                                                                                           |
| `energy-crea-gem-2025`    | Centre for Research on Energy and Clean Air / Global Energy Monitor, [Built to peak?](https://globalenergymonitor.org/research/built-peak-coal-power-expansion-runs-out-room-china)                                                                                                                               | February 2026                                                    | Independent historical analysis           | Reports 161 GW of coal capacity proposed and 78 GW commissioned during 2025                                                                                                                                  | This is prior-year context. Proposals are not operating capacity, gross commissioning is not net fleet growth, and neither measure proves future utilization.                                                                                                           |

All eight public endpoints returned direct successful responses during the
August 30 refresh. Availability is an access observation, not evidence that a
claim is correct, and HTTP state will not be stored in future editorial
content.

## Measurement register

| Layer              | Measure                             | Period and unit                                  | Evidence kind        | Calculation or comparison                                          | Boundary                                                                                                                          |
| ------------------ | ----------------------------------- | ------------------------------------------------ | -------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Generation mix     | Coal share: 49.7%                   | H1 2026; percent of total electricity output     | Official measurement | Publisher-reported share                                           | Not a full-year share, output level, capacity value, or emissions measure                                                         |
| Generation mix     | Renewable share: 41.2%              | H1 2026; percent of total electricity generation | Official measurement | Publisher-reported share                                           | Does not imply that coal and renewables are the entire generation mix                                                             |
| Generation volume  | Coal generation: 2.5 trillion kWh   | H1 2026; kilowatt-hours                          | Official measurement | Publisher-reported output                                          | Not capacity and not an emissions total                                                                                           |
| Generation volume  | Coal generation change: +3.4%       | H1 2026 versus H1 2025; percent                  | Independent analysis | CREA/GEM year-over-year comparison                                 | Uses the analysts' bounded series; it must not be merged with the IEA's annual 2025 comparison                                    |
| Installed capacity | Wind and solar: 1.95 billion kW     | End of June 2026; kilowatts                      | Official measurement | Combined installed capacity, up 16.8% year over year               | Installed capacity is not generated electricity or realized utilization                                                           |
| Installed capacity | Coal commissioned: 30 GW            | H1 2026; gigawatts                               | Independent analysis | Gross units entering operation; +43% year over year                | Not net growth; contrast with 2.7 GW retired and 25.4 GW starting construction                                                    |
| System use         | Coal utilization: 1,998 hours       | H1 2026; average utilization hours               | Independent analysis | Down from 2,056 hours, or 2.9%, in H1 2025                         | Not a full-year capacity factor or a direct measure of reliability value                                                          |
| System use         | Wind and solar curtailment: 360 TWh | H1 2026; terawatt-hours                          | Modeled estimate     | Reported and estimated unreported curtailment; +49% year over year | Not an official observed total; modeled values depend on data availability, weather regressions, and spatial/temporal constraints |

## Curtailment methodology review

The complete 18-page CREA/GEM report, not only its landing page, controls this
ledger's representation of 360 TWh. Its data appendix states that:

- coal-project status comes from the July 2026 Global Coal Plant Tracker update
  and historical 2014-2025 tracker information;
- wind and solar generation is calculated from provincial monthly capacity and
  utilization data reported by the China Electricity Council;
- where utilization and reported curtailment were unavailable, the analysis
  uses the complement of provincial monthly offtake rates from the National New
  Energy Consumption Monitoring and Early Warning Center;
- reported curtailment and regression-estimated values are combined;
- regression models use reported monthly utilization and weather conditions
  from 2020-2023;
- weather inputs include hourly temperature, wind speed, solar irradiation,
  and humidity from NASA POWER and CFSv2; and
- plant locations come from Global Energy Monitor.

The report compares 360 TWh with 258 TWh of electricity-demand growth and says
available clean electricity was sufficient at national scale to permit coal
generation to fall. It separately cautions that not every curtailed unit could
have displaced coal at the same time and place. Mainland Dispatch therefore
classifies the value as `modeled-estimate`, attributes it to CREA/GEM, and does
not present the comparison as a dispatch proof or a one-for-one counterfactual.

## Four alternative readings

1. **Structural milestone.** Coal below half of generation is meaningful
   because non-coal sources are serving a larger share of a growing system.
2. **Absolute-level caution.** Share can fall while coal generation rises, so
   the milestone does not establish declining output, capacity, or emissions.
3. **Portfolio and incentive explanation.** Reliability planning, provincial
   investment incentives, long-term contracts, capacity payments, legacy
   approvals, and grid constraints may overlap; the reviewed record does not
   isolate one cause.
4. **Integration constraint.** Curtailment and falling coal utilization suggest
   that grid, dispatch, storage, and market design matter alongside the pace of
   renewable-capacity construction, but the curtailment magnitude is modeled.

## Publication-day refresh register

Before the entry changes from draft to public, record a new dated row for each
check rather than overwriting this August 30 snapshot.

| Check                     | Required readback                                                      | Effect if changed                                                         |
| ------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| NEA figures               | Underlying conference records, definitions, and any correction         | Reconcile every affected measure or stop publication                      |
| NBS series                | Later July table correction or differently defined coal/thermal series | Preserve the revised definition and prevent relabeling                    |
| CREA/GEM report           | Landing page, full PDF, data appendix, and any correction notice       | Reproduce the estimate or remove it from the proposed primary measures    |
| Global Coal Plant Tracker | Current methodology and status vintage                                 | Record the exact vintage; never silently substitute a newer project state |
| IEA records               | Forecast revision and annual-series definition                         | Keep forecast and observation labels separate                             |
| Full-year data            | Any release superseding the H1 frame                                   | Return to the editor before changing the commissioned period              |

## Unresolved questions

- How much of the apparent conflict between coal capacity and coal utilization
  follows national policy, provincial incentives, reliability planning,
  financing already committed during the 2022-2023 approval surge, or other
  causes?
- What portion of modeled curtailment can be reconciled to reported provincial
  values, and how sensitive is the national estimate to the regression window?
- How do additions, retirements, mothballing, and plant conversions change net
  coal-fleet capacity after H1 2026?
- What comparable official series can connect generation changes to electricity
  sector emissions without inferring emissions from share alone?
- Do later 2026 releases preserve or supersede the first-half below-50% frame?

## Stopping point

The dedicated review stopped on August 30 after all eight endpoints were
reachable, the official summary and complete CREA/GEM report were read, the
curtailment model was bounded, and the IEA demand number was confirmed as a
forecast. This ledger commissions no public route and proves no deployment.
Publication still requires the source-level reproduction, schema, content,
accessibility, canonical build, link, and hosted verification gates in the
[Inquiry 08 decision](../decisions/2026-08-30-notebook-eight.md).
