"use client";

import { useMemo, useState } from "react";
import { sourceLeads } from "@/content/source-leads";
import type { SourceLead } from "@/content/schema";

const yearFor = (publishedAt?: string, publicationYear?: number) =>
  publishedAt ? Number(publishedAt.slice(0, 4)) : publicationYear;

const decadeFor = (publishedAt?: string, publicationYear?: number) => {
  const year = yearFor(publishedAt, publicationYear);
  return year ? `${Math.floor(year / 10) * 10}s` : "Date pending";
};

export function SourceLeadInbox() {
  const [query, setQuery] = useState("");
  const [reviewState, setReviewState] = useState<
    "all" | SourceLead["reviewState"]
  >("all");
  const [disposition, setDisposition] = useState<
    "all" | SourceLead["disposition"]
  >("all");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredLeads = useMemo(
    () =>
      sourceLeads.filter((lead) => {
        const matchesReviewState =
          reviewState === "all" || lead.reviewState === reviewState;
        const matchesDisposition =
          disposition === "all" || lead.disposition === disposition;
        const searchable = [
          lead.title,
          lead.publisher,
          lead.notes,
          ...lead.topics,
        ]
          .join(" ")
          .toLowerCase();
        return (
          matchesReviewState &&
          matchesDisposition &&
          (!normalizedQuery || searchable.includes(normalizedQuery))
        );
      }),
    [disposition, normalizedQuery, reviewState]
  );

  const groups = new Map<string, typeof filteredLeads>();
  for (const lead of filteredLeads) {
    const decade = decadeFor(lead.publishedAt, lead.publicationYear);
    groups.set(decade, [...(groups.get(decade) ?? []), lead]);
  }

  const orderedGroups = [...groups.entries()].sort(([left], [right]) =>
    left === "Date pending"
      ? 1
      : right === "Date pending"
        ? -1
        : left.localeCompare(right)
  );
  const isFiltering =
    Boolean(normalizedQuery) || reviewState !== "all" || disposition !== "all";

  return (
    <section className="border border-rule p-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Article candidates · chronological inbox
          </p>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-ink-muted">
            {sourceLeads.length} article-source candidates. A supplied URL is
            not treated as publisher-canonical until that status is checked.
            Every article remains outside the public archive until its full
            text, evidence, limitations, and Dispatch linkage pass review.
          </p>
        </div>
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
          Candidate URLs · fail closed
        </p>
      </div>

      <div className="mt-4 grid gap-3 border-y border-rule py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <label className="grid gap-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
          Search source leads
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title, publisher, topic, or note…"
            className="min-w-0 border border-rule bg-paper px-3 py-2 font-sans text-sm normal-case tracking-normal text-ink outline-none focus:border-signal"
          />
        </label>
        <label className="grid gap-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
          Review state
          <select
            value={reviewState}
            onChange={(event) =>
              setReviewState(
                event.target.value as "all" | SourceLead["reviewState"]
              )
            }
            className="border border-rule bg-paper px-3 py-2 font-sans text-sm normal-case tracking-normal text-ink outline-none focus:border-signal"
          >
            <option value="all">All states</option>
            <option value="supplied">Supplied</option>
            <option value="metadata-checked">Metadata checked</option>
            <option value="source-read">Source read</option>
            <option value="evidence-reviewed">Evidence reviewed</option>
          </select>
        </label>
        <label className="grid gap-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
          Disposition
          <select
            value={disposition}
            onChange={(event) =>
              setDisposition(
                event.target.value as "all" | SourceLead["disposition"]
              )
            }
            className="border border-rule bg-paper px-3 py-2 font-sans text-sm normal-case tracking-normal text-ink outline-none focus:border-signal"
          >
            <option value="all">All dispositions</option>
            <option value="pending">Pending</option>
            <option value="drafted">Drafted</option>
            <option value="withheld">Withheld</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <p
          className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted sm:col-span-3"
          aria-live="polite"
        >
          {filteredLeads.length} of {sourceLeads.length} leads shown
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {orderedGroups.length === 0 && (
          <p className="border border-dashed border-rule p-4 font-serif italic text-ink-muted lg:col-span-2">
            No source leads match this editorial filter.
          </p>
        )}
        {orderedGroups.map(([decade, leads]) => (
          <details
            key={decade}
            open={isFiltering || undefined}
            className="group border border-rule"
          >
            <summary className="cursor-pointer list-none px-3 py-3 font-mono text-xs uppercase tracking-widest hover:bg-paper-warm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
              <span className="flex items-center justify-between gap-3">
                <span>{decade}</span>
                <span className="text-ink-muted">{leads.length} links · +</span>
              </span>
            </summary>
            <ul className="divide-y divide-rule border-t border-rule">
              {leads
                .toSorted((left, right) => {
                  const leftYear = yearFor(
                    left.publishedAt,
                    left.publicationYear
                  );
                  const rightYear = yearFor(
                    right.publishedAt,
                    right.publicationYear
                  );
                  return (
                    (leftYear ?? 9999) - (rightYear ?? 9999) ||
                    (left.publishedAt ?? "").localeCompare(
                      right.publishedAt ?? ""
                    ) ||
                    left.title.localeCompare(right.title)
                  );
                })
                .map((lead) => (
                  <li key={lead.id} className="p-3">
                    <a
                      href={lead.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-sm leading-snug hover:text-signal"
                    >
                      {lead.title} ↗
                    </a>
                    <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-widest text-ink-muted">
                      {yearFor(lead.publishedAt, lead.publicationYear) ??
                        "Date pending"}{" "}
                      · {lead.publisher} · {lead.contentType} ·{" "}
                      {lead.reviewState} · {lead.disposition} ·{" "}
                      {lead.accessStatus} · {lead.urlStatus}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      {lead.notes}
                    </p>
                    {lead.decisionReason && (
                      <p className="mt-2 border-l-2 border-rule pl-2 text-xs leading-relaxed text-ink-muted">
                        Decision: {lead.decisionReason}
                      </p>
                    )}
                    {lead.dispatchId && (
                      <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-widest text-jade">
                        Linked Dispatch · {lead.dispatchId}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
