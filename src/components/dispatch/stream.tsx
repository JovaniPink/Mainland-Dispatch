"use client";

import { useRef, useState } from "react";
import { useMachine } from "@xstate/react";
import { readerMachine } from "@/machines/reader-machine";
import { filterDispatches, sortByCuratedDesc } from "@/lib/filters";
import { dispatches } from "@/content/dispatches";
import { verticals, kindLabels } from "@/content/site";
import type { DispatchKind, Vertical } from "@/content/schema";
import { DispatchCard } from "./dispatch-card";
import { StateLab } from "@/components/state-lab/state-lab";

const kinds = Object.keys(kindLabels) as DispatchKind[];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap border px-3 py-1 font-mono text-xs uppercase tracking-widest ${
        active
          ? "border-signal bg-signal-soft text-signal"
          : "border-rule text-ink-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

export function Stream() {
  const [state, send] = useMachine(readerMachine);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const historyRef = useRef<string[]>([]);

  function dispatch(event: Parameters<typeof send>[0]) {
    send(event);
    setLastEvent(event.type);
    historyRef.current.push(`${event.type} → ${JSON.stringify(state.value)}`);
  }

  const { vertical, kind, query } = state.context;
  const visible = sortByCuratedDesc(
    filterDispatches(dispatches, { vertical, kind, query })
  );

  return (
    <section className="px-4 sm:px-6">
      <div className="chip-row -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 border-y border-rule py-3">
          <Chip
            label="All"
            active={vertical === "all" && kind === "all"}
            onClick={() => {
              dispatch({ type: "FILTER_VERTICAL", vertical: "all" });
              dispatch({ type: "FILTER_KIND", kind: "all" });
            }}
          />
          {verticals.map((v) => (
            <Chip
              key={v.id}
              label={v.label}
              active={vertical === v.id}
              onClick={() =>
                dispatch({
                  type: "FILTER_VERTICAL",
                  vertical: vertical === v.id ? "all" : (v.id as Vertical),
                })
              }
            />
          ))}
          <span className="mx-1 border-l border-rule" aria-hidden />
          {kinds.map((k) => (
            <Chip
              key={k}
              label={kindLabels[k]}
              active={kind === k}
              onClick={() =>
                dispatch({ type: "FILTER_KIND", kind: kind === k ? "all" : k })
              }
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-3">
        <input
          type="search"
          value={query}
          placeholder="Search dispatches…"
          onChange={(e) =>
            e.target.value
              ? dispatch({ type: "SEARCH", query: e.target.value })
              : dispatch({ type: "CLEAR_SEARCH" })
          }
          className="w-full max-w-xs border border-rule bg-paper px-3 py-1.5 font-mono text-xs tracking-wide placeholder:text-ink-muted focus:border-jade focus:outline-none"
        />
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          {visible.length} / {dispatches.length}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((d) => (
          <DispatchCard key={d.id} dispatch={d} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="py-12 text-center font-serif italic text-ink-muted">
          No dispatches match the current filters.
        </p>
      )}

      <StateLab
        title="Reader machine"
        state={state.value}
        lastEvent={lastEvent}
        nextEvents={[
          "FILTER_VERTICAL",
          "FILTER_KIND",
          "SEARCH",
          "CLEAR_SEARCH",
          "FOCUS",
        ]}
        history={historyRef.current}
      />
    </section>
  );
}
