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
import { whatXiJinpingWants as entry } from "@/content/notebook/what-xi-jinping-wants";
import { formatDate, site } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["why", "Why this stayed with me"],
  ["turning-points", "Three turning points"],
  ["model", "Rudd’s model"],
  ["explains", "What it explains"],
  ["pushback", "Where I push back"],
  ["context", "Who Rudd is"],
  ["source-trail", "A short source trail"],
  ["changed", "What changed"],
  ["question", "An open question"],
] as const;

export const metadata: Metadata = {
  ...pageMetadata({
    title: entry.title,
    description: entry.description,
    path: pagePath,
  }),
  openGraph: {
    ...pageMetadata({
      title: entry.title,
      description: entry.description,
      path: pagePath,
    }).openGraph,
    type: "article",
    publishedTime: `${entry.publishedAt}T00:00:00.000Z`,
    modifiedTime: `${entry.updatedAt}T00:00:00.000Z`,
    authors: [site.name],
    tags: entry.tags,
  },
};

export default function WhatXiJinpingWantsPage() {
  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.title,
          description: entry.description,
          datePublished: entry.publishedAt,
          dateModified: entry.updatedAt,
          mainEntityOfPage: absoluteUrl(pagePath),
          url: absoluteUrl(pagePath),
          author: {
            "@type": "Organization",
            name: site.name,
            url: absoluteUrl("/"),
          },
          publisher: {
            "@type": "Organization",
            name: site.name,
            url: absoluteUrl("/"),
          },
          about: entry.tags,
          citation: [
            ...entry.formats.map((format) => format.url),
            ...entry.sourceTrail.flatMap((source) =>
              source.links.map((link) => link.url)
            ),
          ],
          inLanguage: "en-US",
        }}
      />

      <header className="rise-in border-b border-rule px-4 py-10 sm:px-6 sm:py-14">
        <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            Notebook · Founding inquiry
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-6xl">
            {entry.title}
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-xl italic leading-relaxed text-ink-muted sm:text-2xl">
            {entry.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
            <span>{formatDate(entry.publishedAt)}</span>
            <span aria-hidden>·</span>
            <span>{entry.readTime}</span>
            <span aria-hidden>·</span>
            <span>Public research notebook</span>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
            {entry.tags.map((tag) => (
              <li
                key={tag}
                className="border border-rule px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="grid gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[13rem_minmax(0,44rem)] lg:justify-between lg:gap-16">
        <aside className="self-start lg:sticky lg:top-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
            In this inquiry
          </p>
          <nav aria-label="Notebook sections">
            <ol className="mt-3 grid gap-2 border-l border-rule pl-3">
              {sectionLinks.map(([id, label], index) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="font-serif text-sm leading-snug text-ink-muted hover:text-signal"
                  >
                    <span className="mr-2 font-mono text-[0.6rem] text-jade">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-6 border-l-2 border-signal bg-signal-soft/30 p-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-signal">
              Reading rule
            </p>
            <p className="mt-2 font-serif text-sm italic leading-relaxed">
              A persuasive model is not the same thing as a settled fact.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
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
                    <p className="font-serif text-3xl text-signal">
                      {item.year}
                    </p>
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

          <section className="mt-12">
            <NotebookSectionHeading
              id="source-trail"
              eyebrow="Eight places to continue"
            >
              A short, real source trail
            </NotebookSectionHeading>
            <div className="mt-6">
              <NotebookSourceTrail sources={entry.sourceTrail} />
            </div>
          </section>

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
        </div>
      </div>
    </article>
  );
}
