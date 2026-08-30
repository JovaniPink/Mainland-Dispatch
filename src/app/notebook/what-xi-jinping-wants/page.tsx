import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import {
  NotebookFormats,
  NotebookProse,
  NotebookSectionHeading,
  NotebookSourceTrail,
} from "@/components/notebook/notebook-components";
import {
  NotebookReaderShell,
  NotebookSecondarySection,
} from "@/components/notebook/notebook-reader";
import { whatXiJinpingWants as entry } from "@/content/notebook/what-xi-jinping-wants";
import { requirePublicNotebookEntry } from "@/lib/notebook-route";
import { notebookArticleJsonLd, notebookArticleMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["why", "Why this stayed with me"],
  ["turning-points", "Three turning points"],
  ["model", "Rudd’s model"],
  ["explains", "What it explains"],
  ["pushback", "Where I push back"],
  ["context", "Who Rudd is"],
  ["sources", "A short source trail"],
  ["changed", "What changed"],
  ["question", "An open question"],
] as const;

export function generateMetadata(): Metadata {
  return notebookArticleMetadata(requirePublicNotebookEntry(entry));
}

export default function WhatXiJinpingWantsPage() {
  requirePublicNotebookEntry(entry);
  return (
    <article>
      <JsonLd data={notebookArticleJsonLd(entry)} />

      <NotebookReaderShell
        ordinal={entry.ordinal}
        title={entry.title}
        subtitle={entry.subtitle}
        thesis={entry.thesis}
        publishedAt={entry.publishedAt}
        updatedAt={entry.updatedAt}
        readTime={entry.readTime}
        tags={entry.tags}
        editorialLabel="Public research notebook"
        path={pagePath}
        campaign={entry.slug}
        sections={sectionLinks}
        readingRule="A persuasive model is not the same thing as a settled fact."
        contentClassName="lg:max-w-[44rem]"
      >
        <section>
          <NotebookSectionHeading id="why" eyebrow="The starting point">
            Why this stayed with me
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.why} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="formats"
            eyebrow="One conversation · three formats"
          >
            Listen, watch, or read
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookFormats formats={entry.formats} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="turning-points"
            eyebrow="Timecoded argument map"
          >
            Three turning points
          </NotebookSectionHeading>
          <div className="mt-6 space-y-4">
            {entry.turningPoints.map((point, index) => (
              <article
                key={point.timecode}
                className="border border-rule bg-paper-warm/25 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`https://www.youtube.com/watch?v=DprKDXRlubw&t=${point.seconds}s`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
                  >
                    {String(index + 1).padStart(2, "0")} · {point.timecode} ↗
                  </a>
                  <NotebookStatus status={point.status} />
                </div>
                <h3 className="mt-4 font-serif text-xl leading-snug">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-7">
                  <strong className="font-semibold">Rudd’s argument:</strong>{" "}
                  {point.argument}
                </p>
                <p className="mt-3 border-l-2 border-jade pl-3 text-sm leading-7 text-ink-muted">
                  <strong className="font-semibold text-ink">
                    My reading:
                  </strong>{" "}
                  {point.reading}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="model" eyebrow="Reconstruction">
            Rudd’s model of Xi
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.model} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="explains" eyebrow="Explanatory value">
            What the model explains well
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.explains} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="pushback" eyebrow="Friction">
            Where I would push back
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.pushback} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="dates"
            eyebrow="Do not collapse these dates"
          >
            2027, 2028, and 2049 are different claims
          </NotebookSectionHeading>
          <div className="mt-6 grid gap-3">
            {entry.timeline.map((item) => (
              <article
                key={item.year}
                className="grid gap-3 border border-rule p-4 sm:grid-cols-[5rem_minmax(0,1fr)]"
              >
                <div>
                  <p className="font-serif text-3xl text-signal">{item.year}</p>
                  <div className="mt-2">
                    <NotebookStatus status={item.status} />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg">{item.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-muted">
                    {item.explanation}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading id="context" eyebrow="Source provenance">
            Who Rudd is, and why that context matters
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.context} />
          </div>
        </section>

        <NotebookSecondarySection
          id="sources"
          legacyIds={["source-trail"]}
          eyebrow={`${entry.sourceTrail.length} reviewed source stops`}
          title="A short, real source trail"
          summary="The source trail preserves the supporting record, context, and limits behind this inquiry."
          actionLabel="Examine sources"
        >
          <NotebookSourceTrail sources={entry.sourceTrail} />
        </NotebookSecondarySection>

        <section className="mt-12">
          <NotebookSectionHeading id="changed" eyebrow="Synthesis">
            What I understand differently now
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.changed} />
          </div>
        </section>

        <section
          id="question"
          className="mt-12 scroll-mt-32 border-y border-rule bg-jade-soft/35 px-5 py-8"
        >
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
            One unresolved question
          </p>
          <p className="mt-4 font-serif text-2xl italic leading-relaxed">
            <span className="editorial-underline">
              {entry.unresolvedQuestion}
            </span>
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
            Review limitations
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-muted">
            {entry.limitations.map((limitation) => (
              <li key={limitation} className="flex gap-3">
                <span className="text-signal" aria-hidden>
                  •
                </span>
                <span>{limitation}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav
          aria-label="Continue reading"
          className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row"
        >
          <Link
            href="/archive"
            className="border border-ink bg-ink px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-paper hover:border-signal hover:bg-signal"
          >
            Explore the source archive
          </Link>
          <Link
            href="/notebook/open-models-closed-system"
            className="border border-rule px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-jade hover:text-ink"
          >
            Read Inquiry 02
          </Link>
        </nav>
      </NotebookReaderShell>
    </article>
  );
}
