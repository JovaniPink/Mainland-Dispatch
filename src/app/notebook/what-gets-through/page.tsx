import type { Metadata } from "next";
import Link from "next/link";
import { CirculationGatesFigure } from "@/components/notebook/circulation-gates-figure";
import { NotebookAudioFacade } from "@/components/notebook/notebook-audio-facade";
import {
  NotebookFormats,
  NotebookProse,
  NotebookSectionHeading,
  NotebookSourceTrail,
} from "@/components/notebook/notebook-components";
import {
  NotebookReaderShell,
  type NotebookSectionLink,
  NotebookSecondarySection,
} from "@/components/notebook/notebook-reader";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import { TransshipmentEvidenceFigure } from "@/components/notebook/transshipment-evidence-figure";
import { JsonLd } from "@/components/seo/json-ld";
import { evidenceStatusLabels } from "@/content/dossiers";
import { whatGetsThrough as entry } from "@/content/notebook/what-gets-through";
import { site } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const pagePath = `/notebook/${entry.slug}`;
const sectionLinks = [
  ["lens", "The circulation lens"],
  ["trade", "Trade: origin"],
  ["culture", "Culture: attention"],
  ["memory", "Memory: legality"],
  ["limits", "Comparison limits"],
  ["claim-audit", `${entry.claimAudit.length} claim checks`],
  ["sources", `${entry.sourceTrail.length} source stops`],
  ["changed", "What changed"],
  ["question", "Unresolved question"],
] as const satisfies readonly NotebookSectionLink[];

const articleMetadata = pageMetadata({
  title: entry.title,
  description: entry.description,
  path: pagePath,
});

export const metadata: Metadata = {
  ...articleMetadata,
  openGraph: {
    ...articleMetadata.openGraph,
    type: "article",
    publishedTime: `${entry.publishedAt}T00:00:00.000Z`,
    modifiedTime: `${entry.updatedAt}T00:00:00.000Z`,
    authors: [site.name],
    tags: entry.tags,
  },
};

export default function WhatGetsThroughPage() {
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

      <NotebookReaderShell
        ordinal={entry.ordinal}
        title={entry.title}
        subtitle={entry.subtitle}
        thesis={entry.thesis}
        publishedAt={entry.publishedAt}
        updatedAt={entry.updatedAt}
        readTime={entry.readTime}
        tags={entry.tags}
        editorialLabel="Source-backed interpretation"
        path={pagePath}
        campaign={entry.slug}
        sections={sectionLinks}
        readingRule="Compare the mechanics, not the moral weight. Origin, attention, and criminal liability use different authority and evidence."
        contentClassName="lg:max-w-[58rem]"
      >
        <section className="mt-12">
          <NotebookSectionHeading
            id="lens"
            eyebrow="One question - three mechanisms"
          >
            The circulation lens
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.lens} />
          </div>

          <div className="mt-9">
            <CirculationGatesFigure gates={entry.gates} />
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-2xl leading-tight">
              Listen at the publisher
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
              The publisher record has no transcript or chapters. Loading the
              audio is optional; no Simplecast media request occurs before
              consent.
            </p>
            <div className="mt-5">
              <NotebookFormats formats={entry.formats} />
            </div>
            <div className="mt-4">
              <NotebookAudioFacade
                title={entry.formats[0].title}
                audio={entry.audio}
              />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-2xl leading-tight">
              Three audited turns in the full episode
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
              These manual locators mark the start of Miles Yu&apos;s answer in
              each segment. Paraphrases are checked against the publisher audio;
              they are not quotations or a substitute transcript.
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {entry.turningPoints.map((point, index) => (
                <li
                  key={point.id}
                  className="flex min-w-0 flex-col border border-rule bg-paper-warm/25 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-signal">
                      {String(index + 1).padStart(2, "0")} - {point.timecode}
                    </span>
                    <NotebookStatus status={point.status} />
                  </div>
                  <h4 className="mt-4 font-serif text-xl leading-snug">
                    {point.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7">
                    <strong className="font-semibold">Episode:</strong>{" "}
                    {point.argument}
                  </p>
                  <p className="mt-3 border-l-2 border-jade pl-3 text-sm leading-7 text-ink-muted">
                    <strong className="font-semibold text-ink">Audit:</strong>{" "}
                    {point.reading}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="trade"
            eyebrow="Gate 01 - Rules of origin"
          >
            Trade: physical movement is not legal origin
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.trade} />
          </div>
          <div className="mt-9">
            <TransshipmentEvidenceFigure
              proofs={entry.tradeProofs}
              pressure={entry.tradePressure}
              frames={entry.tradeFrames}
            />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="culture"
            eyebrow="Gate 02 - Networked attention"
          >
            Culture: ridicule can become distribution
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.culture} />
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <article className="border border-jade bg-jade-soft/25 p-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
                Verified reversal - August 17
              </p>
              <p className="mt-3 font-serif text-xl leading-relaxed">
                8.2 million yuan that day, nearly 300,000 admissions, and 17.1
                million yuan cumulative, according to AP&apos;s dated Maoyan
                snapshot.
              </p>
            </article>
            <article className="border border-signal bg-signal-soft/25 p-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-signal">
                Corrected comparison - August 16
              </p>
              <p className="mt-3 font-serif text-xl leading-relaxed">
                About 6 million yuan for Niu Lai versus 65 million yuan for The
                Odyssey in the same preliminary daily snapshot.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="memory"
            eyebrow="Gate 03 - National-security law"
          >
            Memory: the legal label changes the civic space
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.memory} />
          </div>
        </section>

        <section className="mt-12">
          <NotebookSectionHeading
            id="limits"
            eyebrow="Mechanism is not equivalence"
          >
            Where the comparison stops
          </NotebookSectionHeading>
          <div className="mt-6">
            <NotebookProse paragraphs={entry.sections.limits} />
          </div>
        </section>

        <NotebookSecondarySection
          id="claim-audit"
          eyebrow="Claim discipline"
          title="What survives the source audit"
          summary="The correction is part of the finding. Excluded claims are shown only as rejected formulations; they do not enter the thesis, the figure, or the gate outcomes."
          actionLabel={`Examine ${entry.claimAudit.length} claim checks`}
        >
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {entry.claimAudit.map((item) => (
              <article
                key={item.id}
                className="flex min-w-0 flex-col border border-rule p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
                    {evidenceStatusLabels[item.status]}
                  </span>
                  <span className="border border-rule px-2 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-ink-muted">
                    {item.decision}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-lg leading-snug">
                  {item.decision === "exclude"
                    ? "Excluded overstatement"
                    : item.claim}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">
                  {item.assessment}
                </p>
                <p className="mt-auto pt-4 font-mono text-[0.58rem] uppercase tracking-widest text-jade">
                  {item.sourceIds.length} displayed{" "}
                  {item.sourceIds.length === 1 ? "source" : "sources"}
                </p>
              </article>
            ))}
          </div>
        </NotebookSecondarySection>

        <NotebookSecondarySection
          id="sources"
          legacyIds={["source-trail", "source-trail-heading"]}
          eyebrow={`${entry.sourceTrail.length} bounded stops`}
          title="Source trail and review boundary"
          summary="Primary records control legal and policy claims. Dated reporting preserves its denominator, attribution, and limitation instead of becoming generic support."
          actionLabel={`Examine ${entry.sourceTrail.length} sources`}
        >
          <div className="mt-6">
            <NotebookSourceTrail sources={entry.sourceTrail} />
          </div>
        </NotebookSecondarySection>

        <section className="mt-12">
          <NotebookSectionHeading id="changed" eyebrow="Synthesis">
            What the source audit changes
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
                  -
                </span>
                <span>{limitation}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav
          aria-label="Continue reading"
          className="mt-12 grid gap-3 border-t border-rule pt-6 sm:grid-cols-2"
        >
          <Link
            href="/archive?view=relationships&inquiry=what-gets-through"
            className="border border-ink bg-ink px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-paper hover:border-signal hover:bg-signal"
          >
            Explore its source relationships
          </Link>
          <Link
            href="/notebook/who-absorbs-the-shock"
            className="border border-rule px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-jade hover:text-ink"
          >
            Read Inquiry 05
          </Link>
        </nav>
      </NotebookReaderShell>
    </article>
  );
}
