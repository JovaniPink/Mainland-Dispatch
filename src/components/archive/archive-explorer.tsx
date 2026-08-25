"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMachine } from "@xstate/react";
import { publishedDispatches } from "@/content/dispatches";
import { evidenceStatusLabels } from "@/content/dossiers";
import {
  latestNotebookEntry,
  publishedNotebookEntries,
} from "@/content/notebook";
import type { NotebookEntry } from "@/content/notebook/schema";
import {
  type Dispatch,
  type DispatchKind,
  type EvidenceStatus,
  type Vertical,
} from "@/content/schema";
import { kindLabels, verticals } from "@/content/site";
import {
  archiveMachine,
  type ArchiveEvent,
  type ArchiveFilterKey,
  type ArchiveView,
} from "@/machines/archive-machine";
import { cn } from "@/lib/utils";
import { ArchiveRecordCard } from "@/components/archive/archive-record-card";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import { StateLab } from "@/components/state-lab/state-lab";

const views: { id: ArchiveView; label: string; note: string }[] = [
  { id: "cards", label: "Records", note: "Read the reviewed source cards" },
  { id: "timeline", label: "Time", note: "See coverage accumulate" },
  {
    id: "relationships",
    label: "Relationships",
    note: "Follow claims and connected records",
  },
];

const evidenceStatuses = Object.keys(evidenceStatusLabels) as EvidenceStatus[];

function unique(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

const publishers = unique(
  publishedDispatches.map((dispatch) => dispatch.canonicalSource.publisher)
);
const places = unique(
  publishedDispatches.flatMap((dispatch) => dispatch.places)
);
const years = unique(
  publishedDispatches.map((dispatch) =>
    dispatch.canonicalSource.publishedAt.slice(0, 4)
  )
).reverse();
const kinds = unique(
  publishedDispatches.map((dispatch) => dispatch.kind)
) as DispatchKind[];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "whitespace-nowrap border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest",
        active
          ? "border-signal bg-signal-soft/60 text-signal"
          : "border-rule text-ink-muted hover:border-jade hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="grid gap-1">
      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 border border-rule bg-paper px-3 py-2 text-xs text-ink focus:border-jade focus:outline-none"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function dispatchMatchesQuery(dispatch: Dispatch, query: string) {
  if (!query) return true;
  const haystack = [
    dispatch.title,
    dispatch.summary,
    dispatch.commentary,
    dispatch.whyItMatters,
    dispatch.canonicalSource.publisher,
    ...dispatch.tags,
    ...dispatch.people,
    ...dispatch.organizations,
    ...dispatch.places,
    ...dispatch.claims.flatMap((claim) => [
      claim.statement,
      ...claim.limitations,
    ]),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function Timeline({ records }: { records: Dispatch[] }) {
  const groups = useMemo(() => {
    const byYear = new Map<string, Dispatch[]>();
    for (const record of records) {
      const year = record.canonicalSource.publishedAt.slice(0, 4);
      byYear.set(year, [...(byYear.get(year) ?? []), record]);
    }
    return [...byYear.entries()].sort(([a], [b]) => b.localeCompare(a));
  }, [records]);
  const max = Math.max(1, ...groups.map(([, items]) => items.length));

  if (groups.length === 0) {
    return (
      <p className="border border-rule px-4 py-12 text-center font-serif italic text-ink-muted">
        No reviewed records match these timeline filters.
      </p>
    );
  }

  return (
    <div className="border-y border-rule">
      {groups.map(([year, items]) => (
        <section
          key={year}
          className="grid gap-4 border-b border-rule py-5 last:border-b-0 sm:grid-cols-[6rem_minmax(0,1fr)]"
        >
          <div>
            <p className="font-serif text-3xl text-signal">{year}</p>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
              {items.length} {items.length === 1 ? "record" : "records"}
            </p>
          </div>
          <div>
            <div className="h-1 bg-rule" aria-hidden>
              <div
                className="h-full bg-jade"
                style={{ width: `${Math.max(8, (items.length / max) * 100)}%` }}
              />
            </div>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/dispatch/${item.slug}`}
                    className="group block border-l-2 border-rule pl-3 hover:border-signal"
                  >
                    <span className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
                      {item.canonicalSource.publisher}
                    </span>
                    <span className="mt-1 block font-serif leading-snug group-hover:text-signal">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}
    </div>
  );
}

function NotebookInquiryMap({ entry }: { entry: NotebookEntry }) {
  return (
    <section className="border border-rule bg-paper-warm/20 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal">
            Notebook inquiry center
          </p>
          <h3 className="mt-2 font-serif text-2xl">{entry.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            The Notebook keeps a consequential conversation connected to its
            interpretations, corrections, source trail, and unresolved question.
          </p>
        </div>
        <Link
          href={`/notebook/${entry.slug}`}
          className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
        >
          Open the inquiry
        </Link>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,0.8fr)_2rem_minmax(0,1.6fr)] lg:items-center">
        <div className="border-2 border-ink bg-paper p-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
            Root source
          </p>
          <p className="mt-2 font-serif text-xl">{entry.formats[0].title}</p>
          <p className="mt-2 text-xs leading-5 text-ink-muted">
            {entry.formats[0].publisher}
          </p>
        </div>
        <div
          className="hidden text-center font-mono text-xl text-signal lg:block"
          aria-hidden
        >
          -&gt;
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {entry.turningPoints.map((point) => (
            <article key={point.id} className="border border-rule p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[0.6rem] text-signal">
                  {point.timecode}
                </span>
                <NotebookStatus status={point.status} />
              </div>
              <h4 className="mt-3 font-serif leading-snug">{point.title}</h4>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-rule pt-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
          Evidence trail - {entry.sourceTrail.length} source stops
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {entry.sourceTrail.map((source) => (
            <span
              key={source.id}
              className="border border-rule px-2 py-1 text-xs text-ink-muted"
            >
              {source.role}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublishedRelationshipMap({
  records,
  focusId,
  onSelect,
}: {
  records: Dispatch[];
  focusId: string;
  onSelect: (id: string) => void;
}) {
  const focus =
    records.find((record) => record.id === focusId) ??
    records.find((record) =>
      record.relatedDispatchIds.some((id) =>
        records.some((candidate) => candidate.id === id)
      )
    ) ??
    records[0];

  if (!focus) {
    return (
      <p className="border border-rule px-4 py-12 text-center font-serif italic text-ink-muted">
        No reviewed records match these relationship filters.
      </p>
    );
  }

  const related = focus.relatedDispatchIds
    .map((id) => records.find((record) => record.id === id))
    .filter((record): record is Dispatch => Boolean(record));

  return (
    <section className="mt-6 border border-rule p-4 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-end">
        <label className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
          Focus record
        </label>
        <select
          value={focus.id}
          onChange={(event) => onSelect(event.target.value)}
          className="min-w-0 border border-rule bg-paper px-3 py-2 text-sm focus:border-jade focus:outline-none"
        >
          {records.map((record) => (
            <option key={record.id} value={record.id}>
              {record.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1.2fr)] lg:items-center">
        <article className="border-2 border-signal bg-signal-soft/25 p-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-signal">
            Selected record
          </p>
          <h3 className="mt-2 font-serif text-xl leading-snug">
            <Link
              href={`/dispatch/${focus.slug}`}
              className="hover:text-signal"
            >
              {focus.title}
            </Link>
          </h3>
          <p className="mt-3 text-xs leading-5 text-ink-muted">
            {focus.claims.length} classified{" "}
            {focus.claims.length === 1 ? "claim" : "claims"} -{" "}
            {focus.supportingSources.length + 1} cited{" "}
            {focus.supportingSources.length === 0 ? "source" : "sources"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {unique(focus.claims.map((claim) => claim.status)).map((status) => (
              <span
                key={status}
                className="border border-rule px-2 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-ink-muted"
              >
                {evidenceStatusLabels[status]}
              </span>
            ))}
          </div>
        </article>
        <div
          className="hidden text-center font-mono text-xl text-jade lg:block"
          aria-hidden
        >
          &lt;-&gt;
        </div>
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
            Explicit public relationships
          </p>
          {related.length > 0 ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {related.map((record) => (
                <button
                  type="button"
                  key={record.id}
                  onClick={() => onSelect(record.id)}
                  className="border border-rule p-3 text-left hover:border-jade"
                >
                  <span className="font-mono text-[0.55rem] uppercase tracking-widest text-jade">
                    {record.canonicalSource.publisher}
                  </span>
                  <span className="mt-2 block font-serif leading-snug">
                    {record.title}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 border-l-2 border-rule pl-3 text-sm leading-6 text-ink-muted">
              No related reviewed record is currently public. The absence is
              visible rather than filled with an inferred connection.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function ArchiveExplorer() {
  const [state, send] = useMachine(archiveMachine);
  const [hydrated, setHydrated] = useState(false);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const pendingEvent = useRef<string | null>(null);

  function dispatch(event: ArchiveEvent) {
    send(event);
    setLastEvent(event.type);
    pendingEvent.current = event.type;
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const view = params.get("view");
      const evidence = params.get("evidence");
      const vertical = params.get("vertical");
      const kind = params.get("kind");
      const filters = {
        ...(views.some((item) => item.id === view)
          ? { view: view as ArchiveView }
          : {}),
        ...(evidenceStatuses.includes(evidence as EvidenceStatus)
          ? { evidence: evidence as EvidenceStatus }
          : {}),
        ...(verticals.some((item) => item.id === vertical)
          ? { vertical: vertical as Vertical }
          : {}),
        ...(kinds.includes(kind as DispatchKind)
          ? { kind: kind as DispatchKind }
          : {}),
        ...(publishers.includes(params.get("publisher") ?? "")
          ? { publisher: params.get("publisher")! }
          : {}),
        ...(places.includes(params.get("place") ?? "")
          ? { place: params.get("place")! }
          : {}),
        ...(years.includes(params.get("year") ?? "")
          ? { year: params.get("year")! }
          : {}),
        ...(params.get("q") ? { query: params.get("q")! } : {}),
        ...(publishedDispatches.some(
          (record) => record.id === params.get("focus")
        )
          ? { focusId: params.get("focus")! }
          : {}),
        ...(publishedNotebookEntries.some(
          (entry) => entry.slug === params.get("inquiry")
        )
          ? { inquirySlug: params.get("inquiry")! }
          : {}),
      };
      dispatch({ type: "HYDRATE", filters });
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
    // Query hydration is intentionally a one-time machine event.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = state.context;

  useEffect(() => {
    if (!hydrated) return;
    const url = new URL(window.location.href);
    const values: Record<string, string> = {
      view: context.view,
      vertical: context.vertical,
      kind: context.kind,
      evidence: context.evidence,
      publisher: context.publisher,
      place: context.place,
      year: context.year,
      q: context.query,
      focus: context.focusId,
      inquiry: context.inquirySlug,
    };
    for (const [key, value] of Object.entries(values)) {
      if (
        !value ||
        value === "all" ||
        (key === "view" && value === "cards") ||
        (key === "inquiry" && value === latestNotebookEntry.slug)
      ) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  }, [context, hydrated]);

  useEffect(() => {
    if (!pendingEvent.current) return;
    const event = pendingEvent.current;
    pendingEvent.current = null;
    setHistory((items) => [...items.slice(-7), event]);
  }, [context]);

  useEffect(() => {
    const closeFiltersOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && context.filterPanelOpen) {
        dispatch({ type: "CLOSE_FILTER_PANEL" });
      }
    };
    window.addEventListener("keydown", closeFiltersOnEscape);
    return () => window.removeEventListener("keydown", closeFiltersOnEscape);
    // The machine context is the authority for the panel's visible state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.filterPanelOpen]);

  const visible = useMemo(
    () =>
      publishedDispatches
        .filter((dispatchRecord) => {
          if (
            context.vertical !== "all" &&
            !dispatchRecord.verticals.includes(context.vertical)
          ) {
            return false;
          }
          if (context.kind !== "all" && dispatchRecord.kind !== context.kind) {
            return false;
          }
          if (
            context.evidence !== "all" &&
            !dispatchRecord.claims.some(
              (claim) => claim.status === context.evidence
            )
          ) {
            return false;
          }
          if (
            context.publisher !== "all" &&
            dispatchRecord.canonicalSource.publisher !== context.publisher
          ) {
            return false;
          }
          if (
            context.place !== "all" &&
            !dispatchRecord.places.includes(context.place)
          ) {
            return false;
          }
          if (
            context.year !== "all" &&
            !dispatchRecord.canonicalSource.publishedAt.startsWith(context.year)
          ) {
            return false;
          }
          return dispatchMatchesQuery(dispatchRecord, context.query.trim());
        })
        .sort((a, b) =>
          b.canonicalSource.publishedAt.localeCompare(
            a.canonicalSource.publishedAt
          )
        ),
    [context]
  );

  const filtersActive =
    [
      context.vertical,
      context.kind,
      context.evidence,
      context.publisher,
      context.place,
      context.year,
    ].some((value) => value !== "all") || Boolean(context.query);
  const appliedFilters: Array<{
    filter: ArchiveFilterKey;
    label: string;
  }> = [
    ...(context.query
      ? [{ filter: "query" as const, label: `Search: ${context.query}` }]
      : []),
    ...(context.evidence !== "all"
      ? [
          {
            filter: "evidence" as const,
            label: `Evidence: ${evidenceStatusLabels[context.evidence]}`,
          },
        ]
      : []),
    ...(context.year !== "all"
      ? [{ filter: "year" as const, label: `Year: ${context.year}` }]
      : []),
    ...(context.vertical !== "all"
      ? [
          {
            filter: "vertical" as const,
            label: `Topic: ${
              verticals.find((item) => item.id === context.vertical)?.label ??
              context.vertical
            }`,
          },
        ]
      : []),
    ...(context.kind !== "all"
      ? [
          {
            filter: "kind" as const,
            label: `Format: ${kindLabels[context.kind]}`,
          },
        ]
      : []),
    ...(context.publisher !== "all"
      ? [
          {
            filter: "publisher" as const,
            label: `Publisher: ${context.publisher}`,
          },
        ]
      : []),
    ...(context.place !== "all"
      ? [{ filter: "place" as const, label: `Place: ${context.place}` }]
      : []),
  ];
  const selectedInquiry =
    publishedNotebookEntries.find(
      (entry) => entry.slug === context.inquirySlug
    ) ?? latestNotebookEntry;

  return (
    <section aria-labelledby="archive-explorer-title">
      <div className="border-y border-rule bg-paper-warm/20 px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
              Interactive evidence archive
            </p>
            <h2
              id="archive-explorer-title"
              className="mt-2 font-serif text-2xl sm:text-3xl"
            >
              Explore reviewed records
            </h2>
          </div>
          <p
            className="font-mono text-xs uppercase tracking-widest text-ink-muted"
            aria-live="polite"
          >
            {visible.length} of {publishedDispatches.length} public
          </p>
        </div>

        <label className="mt-5 grid gap-1">
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
            Search
          </span>
          <input
            type="search"
            value={context.query}
            placeholder="Sources, claims, people, places..."
            onChange={(event) =>
              dispatch({ type: "SEARCH", query: event.target.value })
            }
            className="min-w-0 border border-rule bg-paper px-3 py-3 text-sm placeholder:text-ink-muted focus:border-jade focus:outline-none"
          />
        </label>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="chip-row scroll-affordance min-w-0 overflow-x-auto">
            <div className="flex gap-2">
              {views.map((view) => (
                <Chip
                  key={view.id}
                  active={context.view === view.id}
                  onClick={() => dispatch({ type: "SET_VIEW", view: view.id })}
                >
                  {view.label}
                </Chip>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-expanded={context.filterPanelOpen}
            aria-controls="archive-filter-panel"
            onClick={() => dispatch({ type: "TOGGLE_FILTER_PANEL" })}
            className="shrink-0 border border-rule px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest hover:border-signal lg:hidden"
          >
            Filters ({appliedFilters.length})
          </button>
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          {views.find((view) => view.id === context.view)?.note}
        </p>

        <div
          id="archive-filter-panel"
          data-testid="archive-filter-panel"
          data-state={context.filterPanelOpen ? "open" : "closed"}
          className={cn(
            "mt-5 gap-3 sm:grid-cols-2 lg:grid lg:grid-cols-3",
            context.filterPanelOpen ? "grid" : "hidden"
          )}
        >
          <SelectFilter
            label="Evidence"
            value={context.evidence}
            onChange={(evidence) =>
              dispatch({
                type: "FILTER_EVIDENCE",
                evidence: evidence as EvidenceStatus | "all",
              })
            }
            options={evidenceStatuses.map((status) => ({
              value: status,
              label: evidenceStatusLabels[status],
            }))}
          />
          <SelectFilter
            label="Year"
            value={context.year}
            onChange={(year) => dispatch({ type: "FILTER_YEAR", year })}
            options={years.map((year) => ({ value: year, label: year }))}
          />
          <SelectFilter
            label="Topic"
            value={context.vertical}
            onChange={(vertical) =>
              dispatch({
                type: "FILTER_VERTICAL",
                vertical: vertical as Vertical | "all",
              })
            }
            options={verticals.map((vertical) => ({
              value: vertical.id,
              label: vertical.label,
            }))}
          />
          <SelectFilter
            label="Format"
            value={context.kind}
            onChange={(kind) =>
              dispatch({
                type: "FILTER_KIND",
                kind: kind as DispatchKind | "all",
              })
            }
            options={kinds.map((kind) => ({
              value: kind,
              label: kindLabels[kind],
            }))}
          />
          <SelectFilter
            label="Publisher"
            value={context.publisher}
            onChange={(publisher) =>
              dispatch({ type: "FILTER_PUBLISHER", publisher })
            }
            options={publishers.map((publisher) => ({
              value: publisher,
              label: publisher,
            }))}
          />
          <SelectFilter
            label="Place"
            value={context.place}
            onChange={(place) => dispatch({ type: "FILTER_PLACE", place })}
            options={places.map((place) => ({ value: place, label: place }))}
          />
        </div>

        {filtersActive && (
          <div className="mt-4" aria-label="Applied filters">
            <div className="flex flex-wrap gap-2">
              {appliedFilters.map((item) => (
                <button
                  key={item.filter}
                  type="button"
                  aria-label={`Remove ${item.label}`}
                  onClick={() =>
                    dispatch({ type: "CLEAR_FILTER", filter: item.filter })
                  }
                  className="border border-signal bg-signal-soft/30 px-2 py-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-signal hover:bg-signal-soft/60"
                >
                  {item.label} x
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: "CLEAR_ALL_FILTERS" })}
              className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-signal hover:text-ink"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <div className="px-4 py-6 sm:px-6">
        {context.view === "cards" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((record) => (
                <ArchiveRecordCard key={record.id} record={record} />
              ))}
            </div>
            {visible.length === 0 && (
              <p className="border border-rule px-4 py-12 text-center font-serif italic text-ink-muted">
                No reviewed records match these filters.
              </p>
            )}
          </>
        )}
        {context.view === "timeline" && <Timeline records={visible} />}
        {context.view === "relationships" && (
          <>
            <div className="mb-4 grid gap-2 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-end">
              <label
                htmlFor="archive-inquiry"
                className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted"
              >
                Notebook inquiry
              </label>
              <select
                id="archive-inquiry"
                value={selectedInquiry.slug}
                onChange={(event) =>
                  dispatch({
                    type: "SELECT_INQUIRY",
                    inquirySlug: event.target.value,
                  })
                }
                className="min-w-0 border border-rule bg-paper px-3 py-2 text-sm focus:border-jade focus:outline-none"
              >
                {publishedNotebookEntries.map((entry) => (
                  <option key={entry.slug} value={entry.slug}>
                    Inquiry {String(entry.ordinal).padStart(2, "0")} -{" "}
                    {entry.title}
                  </option>
                ))}
              </select>
            </div>
            <NotebookInquiryMap entry={selectedInquiry} />
            <PublishedRelationshipMap
              records={visible}
              focusId={context.focusId}
              onSelect={(focusId) =>
                dispatch({ type: "SELECT_FOCUS", focusId })
              }
            />
          </>
        )}
      </div>

      <StateLab
        title="Archive explorer machine"
        state={state.value}
        lastEvent={lastEvent}
        nextEvents={[
          "SET_VIEW",
          "FILTER_VERTICAL",
          "FILTER_KIND",
          "FILTER_EVIDENCE",
          "FILTER_PUBLISHER",
          "FILTER_PLACE",
          "FILTER_YEAR",
          "SEARCH",
          "SELECT_FOCUS",
          "SELECT_INQUIRY",
          "OPEN_FILTER_PANEL",
          "CLOSE_FILTER_PANEL",
          "TOGGLE_FILTER_PANEL",
          "CLEAR_FILTER",
          "CLEAR_ALL_FILTERS",
          "RESET",
        ]}
        history={history}
      />
    </section>
  );
}
