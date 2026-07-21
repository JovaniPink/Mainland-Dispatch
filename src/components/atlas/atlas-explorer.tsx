"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMachine } from "@xstate/react";
import type {
  AtlasLifecycleStage,
  AtlasRelease,
  EvidenceStatus,
} from "@/content/schema";
import { evidenceStatusLabels } from "@/content/dossiers";
import { atlasMachine, type AtlasEvent } from "@/machines/atlas-machine";
import { formatDate } from "@/content/site";
import { StateLab } from "@/components/state-lab/state-lab";
import { ContextMap } from "./context-map";
import { TradeChart } from "./trade-chart";

const stageLabels: Record<AtlasLifecycleStage, string> = {
  announcement: "Announced",
  publication: "Published",
  implementation: "Implemented",
  observation: "Observed",
};

const statusTone: Record<EvidenceStatus, string> = {
  reported: "border-rule text-ink-muted",
  officiallyAnnounced: "border-jade text-jade",
  implemented: "border-jade bg-jade-soft text-jade",
  independentlyObserved: "border-jade bg-jade-soft text-jade",
  contested: "border-signal bg-signal-soft text-signal",
  superseded: "border-rule text-ink-muted line-through",
  corrected: "border-signal text-signal",
};

function unique(values: string[]) {
  return [...new Set(values)];
}

export function AtlasExplorer({ release }: { release: AtlasRelease }) {
  const input = useMemo(() => {
    const placeIdsByChain = Object.fromEntries(
      release.chains.map((chain) => [chain.slug, chain.placeIds])
    );
    const chainSlugsByPlace = Object.fromEntries(
      release.places.map((place) => [
        place.id,
        release.chains
          .filter((chain) => chain.placeIds.includes(place.id))
          .map((chain) => chain.slug),
      ])
    );
    return {
      chainSlugs: release.chains.map((chain) => chain.slug),
      placeIds: release.places.map((place) => place.id),
      months: release.series[0]?.observations.map((item) => item.month) ?? [],
      placeIdsByChain,
      chainSlugsByPlace,
    };
  }, [release]);
  const [state, send] = useMachine(atlasMachine, { input });
  const [hydrated, setHydrated] = useState(false);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const pendingEvent = useRef<string | null>(null);
  const hydratedRef = useRef(false);

  function dispatch(event: AtlasEvent) {
    send(event);
    setLastEvent(event.type);
    pendingEvent.current = event.type;
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const event: AtlasEvent = {
        type: "HYDRATE",
        chain: params.get("chain"),
        place: params.get("place"),
        month: params.get("month"),
      };
      send(event);
      setLastEvent(event.type);
      pendingEvent.current = event.type;
      hydratedRef.current = true;
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [send]);

  const { selectedChain, selectedPlace, selectedMonth, selectedStage, metric } =
    state.context;

  useEffect(() => {
    if (!pendingEvent.current) return;
    const event = pendingEvent.current;
    pendingEvent.current = null;
    setHistory((items) => [
      ...items.slice(-7),
      `${event} → ${JSON.stringify(state.value)}`,
    ]);
  }, [
    metric,
    selectedChain,
    selectedMonth,
    selectedPlace,
    selectedStage,
    state.value,
  ]);

  useEffect(() => {
    if (!hydrated || !hydratedRef.current) return;
    const url = new URL(window.location.href);
    url.searchParams.set("chain", selectedChain);
    if (selectedPlace) url.searchParams.set("place", selectedPlace);
    else url.searchParams.delete("place");
    if (selectedMonth) url.searchParams.set("month", selectedMonth);
    else url.searchParams.delete("month");
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  }, [hydrated, selectedChain, selectedMonth, selectedPlace]);

  const chain =
    release.chains.find((item) => item.slug === selectedChain) ??
    release.chains[0];
  const chainEvents = release.events.filter((event) =>
    event.chainSlugs.includes(chain.slug)
  );
  const visibleEvents = selectedStage
    ? chainEvents.filter((event) => event.stage === selectedStage)
    : chainEvents;
  const stagePlaceIds = selectedStage
    ? unique(visibleEvents.flatMap((event) => event.placeIds))
    : chain.placeIds;
  const activePlaceIds =
    stagePlaceIds.length > 0 ? stagePlaceIds : chain.placeIds;
  const place = release.places.find((item) => item.id === selectedPlace);
  const series = release.series[0];

  const sourceIds = unique([
    ...chain.sourceIds,
    ...visibleEvents.flatMap((event) => event.sourceIds),
    ...(place?.sourceIds ?? []),
    ...(series?.observations.find((item) => item.month === selectedMonth)
      ?.sourceIds ?? []),
  ]);
  const sources = release.sources.filter((source) =>
    sourceIds.includes(source.id)
  );
  const mapStatus = state.matches({ map: "idle" })
    ? "idle"
    : state.matches({ map: "loading" })
      ? "loading"
      : state.matches({ map: "ready" })
        ? "ready"
        : "failed";

  return (
    <div className="mt-10 space-y-12">
      <section aria-labelledby="chain-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Signals together
            </p>
            <h2
              id="chain-heading"
              className="mt-2 font-serif text-2xl sm:text-3xl"
            >
              Choose an evidence chain
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: "RESET" })}
            className="border border-rule px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-signal hover:text-signal"
          >
            Reset atlas
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {release.chains.map((item, index) => {
            const active = item.slug === chain.slug;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  dispatch({ type: "SELECT_CHAIN", slug: item.slug })
                }
                className={`rise-in group text-left border p-4 transition-colors ${
                  active
                    ? "border-signal bg-signal-soft/40"
                    : "border-rule bg-paper-warm/25 hover:bg-paper-warm/60"
                }`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                  {item.eyebrow}
                </span>
                <span className="mt-2 block font-serif text-xl leading-snug group-hover:text-signal">
                  {item.title}
                </span>
                <span className="mt-3 grid grid-cols-4 gap-1" aria-hidden>
                  {item.steps.map((step) => (
                    <span
                      key={step.code}
                      className="border-t border-rule pt-2 font-mono text-[0.55rem] uppercase tracking-wider text-ink-muted"
                    >
                      {step.code}
                    </span>
                  ))}
                </span>
                <span
                  className={`mt-4 inline-block border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest ${statusTone[item.evidenceStatus]}`}
                >
                  {evidenceStatusLabels[item.evidenceStatus]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="lifecycle-heading">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          Policy lifecycle
        </p>
        <h2 id="lifecycle-heading" className="mt-2 font-serif text-2xl">
          Announcement to observable record
        </h2>
        <div className="chip-row scroll-affordance -mx-4 mt-5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ol className="grid min-w-[44rem] grid-cols-4 border-y border-rule sm:min-w-0">
            {release.events.map((event, index) => {
              const active = selectedStage === event.stage;
              const relevant = event.chainSlugs.includes(chain.slug);
              return (
                <li key={event.id} className="relative">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      dispatch({ type: "SELECT_STAGE", stage: event.stage })
                    }
                    className={`h-full w-full border-r border-rule px-4 py-4 text-left last:border-r-0 ${
                      active
                        ? "bg-signal-soft/55"
                        : relevant
                          ? "hover:bg-paper-warm/60"
                          : "opacity-55"
                    }`}
                  >
                    <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
                      0{index + 1} · {formatDate(event.date)}
                    </span>
                    <span className="mt-2 block font-serif text-base leading-snug">
                      {stageLabels[event.stage]}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-ink-muted">
                      {event.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section aria-labelledby="map-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Context atlas
            </p>
            <h2
              id="map-heading"
              className="mt-2 font-serif text-2xl sm:text-3xl"
            >
              Where this chain reaches
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-ink-muted">
            City-level points come from disclosed relationships. Map geography
            is context, not evidence of a physical shipment.
          </p>
        </div>

        <div className="mt-5 grid overflow-hidden border border-rule lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.75fr)]">
          <ContextMap
            places={release.places}
            relations={release.relations}
            activeIds={activePlaceIds}
            selectedId={selectedPlace}
            status={mapStatus}
            onSelect={(id) => dispatch({ type: "SELECT_PLACE", id })}
            onReady={() => dispatch({ type: "MAP_READY" })}
            onError={() => dispatch({ type: "MAP_ERROR" })}
            onConsent={() => dispatch({ type: "LOAD_MAP" })}
          />

          <aside className="border-t border-rule bg-paper p-5 lg:border-t-0 lg:border-l">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              Focused evidence
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-snug">
              {place?.label ?? chain.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {place?.role ?? chain.summary}
            </p>

            <ul className="mt-5 space-y-2" aria-label="Atlas locations">
              {release.places.map((item) => {
                const active = item.id === selectedPlace;
                const inChain = activePlaceIds.includes(item.id);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        dispatch({ type: "SELECT_PLACE", id: item.id })
                      }
                      className={`flex w-full items-baseline justify-between gap-3 border-b border-rule py-2 text-left ${
                        active
                          ? "text-signal"
                          : inChain
                            ? "hover:text-signal"
                            : "text-ink-muted"
                      }`}
                    >
                      <span className="font-serif text-base">{item.label}</span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-widest">
                        {item.precision}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {selectedPlace && (
              <button
                type="button"
                onClick={() => dispatch({ type: "CLEAR_PLACE" })}
                className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-signal"
              >
                Show the full chain →
              </button>
            )}

            <div className="mt-6 border-t border-rule pt-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                What the combination supports
              </p>
              <p className="mt-2 font-serif text-base leading-relaxed">
                {chain.conclusion}
              </p>
              <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-signal">
                What it does not prove
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {chain.caveat}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {series && (
        <section aria-labelledby="notebook-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-jade">
                Trade notebook
              </p>
              <h2
                id="notebook-heading"
                className="mt-2 font-serif text-2xl sm:text-3xl"
              >
                {series.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {series.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(["value", "yoy"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={metric === item}
                  onClick={() => dispatch({ type: "SET_METRIC", metric: item })}
                  className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-widest ${
                    metric === item
                      ? "border-signal bg-signal-soft text-signal"
                      : "border-rule text-ink-muted hover:text-ink"
                  }`}
                >
                  {item === "value" ? "Monthly value" : "Year over year"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <TradeChart
              series={series}
              metric={metric}
              selectedMonth={selectedMonth}
              onSelectMonth={(month) =>
                dispatch({ type: "SELECT_MONTH", month })
              }
            />
          </div>

          <div className="mt-5 grid gap-4 border-y border-rule py-4 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal">
                Interpretation boundary
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
                The public preview flags these aggregate observations as
                estimated. A decline after December 2024 is temporal context,
                not proof that the rule caused it; demand, licensing,
                classification, and revisions remain competing explanations.
              </p>
            </div>
            <a
              href={series.downloadPath}
              download
              className="self-start border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
            >
              Download snapshot ↓
            </a>
          </div>
        </section>
      )}

      <section aria-labelledby="sources-heading">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          Source ledger
        </p>
        <h2
          id="sources-heading"
          className="mt-2 font-serif text-2xl sm:text-3xl"
        >
          Evidence in the current view
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Every item identifies its role, vintage, retrieval date, and local
          normalized snapshot. The Federal Register remains controlling for
          legal interpretation.
        </p>

        <div className="mt-5 divide-y divide-rule border-y border-rule">
          {sources.map((source) => (
            <details key={source.id} className="group py-4">
              <summary className="cursor-pointer list-none sm:flex sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-serif text-lg group-open:text-signal">
                  {source.label}
                </span>
                <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted sm:mt-0">
                  {source.sourceClass} · {source.publisher}
                </span>
              </summary>
              <div className="mt-4 grid gap-4 border-l-2 border-jade pl-4 text-sm sm:grid-cols-[1fr_1.25fr]">
                <dl className="space-y-2">
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
                      Published
                    </dt>
                    <dd>{formatDate(source.publishedAt)}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
                      Retrieved · vintage
                    </dt>
                    <dd>
                      {formatDate(source.retrievedAt)} · {source.datasetVintage}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
                      Snapshot
                    </dt>
                    <dd className="break-all font-mono text-xs">
                      {source.snapshotId} ·{" "}
                      {source.snapshotChecksum.slice(0, 12)}…
                    </dd>
                  </div>
                </dl>
                <div>
                  <p className="leading-relaxed text-ink-muted">
                    {source.notes}
                  </p>
                  <a
                    href={source.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
                  >
                    Open canonical source ↗
                  </a>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <p className="sr-only" aria-live="polite">
        Viewing {chain.title}
        {place ? ` at ${place.label}` : ""}
        {selectedMonth ? ` for ${selectedMonth}` : ""}.
      </p>

      <StateLab
        title="Evidence Atlas"
        state={state.value}
        lastEvent={lastEvent}
        nextEvents={[
          "SELECT_CHAIN",
          "SELECT_PLACE",
          "SELECT_STAGE",
          "SELECT_MONTH",
          "SET_METRIC",
          "RESET",
        ]}
        history={history}
      />
    </div>
  );
}
