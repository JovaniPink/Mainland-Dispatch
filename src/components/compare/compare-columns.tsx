"use client";

import { useState } from "react";
import type { Comparison } from "@/content/schema";
import { formatDate } from "@/content/site";
import { cn } from "@/lib/utils";

const roleLabels: Record<string, string> = {
  mainland: "Mainland source",
  us: "US source",
  primary: "Primary document",
};

function SourceColumn({ source }: { source: Comparison["sources"][number] }) {
  return (
    <div className="flex flex-col gap-3 border border-rule bg-paper-warm/40 p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        {roleLabels[source.role]}
      </p>
      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
        {source.outlet} · {formatDate(source.publishedAt)} ·{" "}
        {source.language.toUpperCase()}
      </p>
      <h3 className="font-serif text-lg leading-snug">{source.headline}</h3>
      <blockquote className="border-l-2 border-jade pl-3 font-serif text-sm italic leading-relaxed">
        &ldquo;{source.keyQuote}&rdquo;
      </blockquote>
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
          Framing
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          {source.framing}
        </p>
      </div>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto self-start font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-signal"
      >
        Open source ↗
      </a>
    </div>
  );
}

/** Side-by-side on desktop; stacked behind source tabs on mobile. */
export function CompareColumns({ comparison }: { comparison: Comparison }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="chip-row flex gap-2 overflow-x-auto md:hidden">
        {comparison.sources.map((s, i) => (
          <button
            key={s.role}
            onClick={() => setActiveTab(i)}
            className={cn(
              "whitespace-nowrap border px-3 py-1 font-mono text-xs uppercase tracking-widest",
              activeTab === i
                ? "border-signal bg-signal-soft text-signal"
                : "border-rule text-ink-muted"
            )}
          >
            {roleLabels[s.role]}
          </button>
        ))}
      </div>
      <div className="mt-3 md:hidden">
        <SourceColumn source={comparison.sources[activeTab]} />
      </div>
      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {comparison.sources.map((s) => (
          <SourceColumn key={s.role} source={s} />
        ))}
      </div>
    </div>
  );
}
