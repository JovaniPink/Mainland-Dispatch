"use client";

import { useState } from "react";
import Link from "next/link";
import { dispatches } from "@/content/dispatches";
import { formatDate } from "@/content/site";
import type { EditorialStatus } from "@/content/schema";
import { MetaLine, metaParts } from "@/components/dispatch/meta-line";

const stages: { id: EditorialStatus; label: string }[] = [
  { id: "draft", label: "Draft" },
  { id: "metadataCheck", label: "Metadata check" },
  { id: "editorialReview", label: "Editorial review" },
  { id: "sourceReview", label: "Source review" },
  { id: "ready", label: "Ready" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
  { id: "corrected", label: "Corrected" },
  { id: "archived", label: "Archived" },
];

/** ADP-style queue/detail split: the selected entry opens its evidence beside the queue. */
export function ReviewQueue() {
  const [selectedId, setSelectedId] = useState<string | null>(
    dispatches.find((d) => d.editorialStatus !== "published")?.id ?? null
  );
  const selected = dispatches.find((d) => d.id === selectedId) ?? null;

  const activeStages = stages.filter((s) =>
    dispatches.some((d) => d.editorialStatus === s.id)
  );

  return (
    <section className="border border-rule p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        Review queue
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {activeStages.map((stage) => {
            const items = dispatches.filter(
              (d) => d.editorialStatus === stage.id
            );
            return (
              <div key={stage.id}>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                  {stage.label} · {items.length}
                </p>
                <ul className="mt-1 divide-y divide-rule border border-rule">
                  {items.map((d) => (
                    <li key={d.id}>
                      <button
                        onClick={() => setSelectedId(d.id)}
                        className={`block w-full px-3 py-2 text-left font-serif text-sm leading-snug ${
                          selectedId === d.id
                            ? "bg-signal-soft text-signal"
                            : "hover:bg-paper-warm"
                        }`}
                      >
                        {d.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <aside className="self-start border border-rule bg-paper-warm/40 p-4 lg:sticky lg:top-4">
          {selected ? (
            <div className="space-y-3">
              <MetaLine dispatch={selected} />
              <h3 className="font-serif text-xl leading-snug">
                {selected.title}
              </h3>
              <dl className="space-y-2 font-mono text-xs">
                <div>
                  <dt className="uppercase tracking-widest text-ink-muted">
                    Status
                  </dt>
                  <dd className="text-signal uppercase tracking-widest">
                    {selected.editorialStatus}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-muted">
                    Metadata
                  </dt>
                  <dd>{metaParts(selected).join(" · ")}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-muted">
                    Dates
                  </dt>
                  <dd>
                    Published {formatDate(selected.sourceDate)} · Curated{" "}
                    {formatDate(selected.curatedAt)}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-muted">
                    Source URL
                  </dt>
                  <dd className="break-all">{selected.sourceUrl}</dd>
                </div>
              </dl>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                  Commentary
                </p>
                <p className="mt-1 font-serif text-sm leading-relaxed">
                  {selected.commentary}
                </p>
              </div>
              <Link
                href={`/dispatch/${selected.slug}`}
                className="inline-block border border-rule px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-signal"
              >
                Preview presentation →
              </Link>
            </div>
          ) : (
            <p className="font-serif italic text-ink-muted">
              Select an entry to inspect its metadata and evidence.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
