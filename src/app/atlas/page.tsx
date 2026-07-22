import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  atlasRelease,
  getAtlasRelease,
  publishedAtlasReleases,
} from "@/content/atlas";
import { formatDate } from "@/content/site";
import { AtlasExplorer } from "@/components/atlas/atlas-explorer";

export const metadata: Metadata = {
  title: "Evidence Atlas",
  description:
    "Explore source-led evidence chains across policy, culture, and everyday life.",
};

export default async function AtlasPage({
  searchParams,
}: {
  searchParams: Promise<{ case?: string }>;
}) {
  const { case: requestedCase } = await searchParams;
  const selectedRelease = requestedCase
    ? getAtlasRelease(requestedCase)
    : atlasRelease;
  if (!selectedRelease) notFound();

  return (
    <div className="px-4 py-10 sm:px-6">
      <header className="rise-in grid gap-6 border-b border-rule pb-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Evidence Atlas · source snapshot
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
            {selectedRelease.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            {selectedRelease.summary}
          </p>
          <p className="mt-4 max-w-2xl font-serif text-lg italic leading-relaxed">
            <span className="editorial-underline">
              The interaction is the prototype. The source records are real; the
              editorial interpretation remains provisional.
            </span>
          </p>
          {selectedRelease.dossierSlug && (
            <Link
              href={`/dossiers/${selectedRelease.dossierSlug}`}
              className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
            >
              ← Return to related dossier
            </Link>
          )}
        </div>
        <dl className="self-start border border-rule bg-paper-warm/35 p-4 text-sm">
          <div className="border-b border-rule pb-3">
            <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
              Release
            </dt>
            <dd className="mt-1 font-serif">{selectedRelease.version}</dd>
          </div>
          <div className="border-b border-rule py-3">
            <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
              Retrieved
            </dt>
            <dd className="mt-1 font-serif">
              {formatDate(selectedRelease.retrievedAt)}
            </dd>
          </div>
          <div className="border-b border-rule py-3">
            <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
              Evidence through
            </dt>
            <dd className="mt-1 font-serif">
              {formatDate(selectedRelease.evidenceThrough)}
            </dd>
          </div>
          {selectedRelease.seriesThrough && (
            <div className="pt-3">
              <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
                Trade series through
              </dt>
              <dd className="mt-1 font-serif">
                {formatDate(selectedRelease.seriesThrough)}
              </dd>
            </div>
          )}
        </dl>
      </header>

      <nav aria-label="Evidence Atlas cases" className="mt-7">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          Published source snapshots
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {publishedAtlasReleases.map((release) => {
            const active = release.slug === selectedRelease.slug;
            return (
              <Link
                key={release.slug}
                href={`/atlas?case=${release.slug}`}
                aria-current={active ? "page" : undefined}
                className={`border px-3 py-2 font-mono text-xs uppercase tracking-widest ${
                  active
                    ? "border-signal bg-signal-soft text-signal"
                    : "border-rule text-ink-muted hover:border-jade hover:text-ink"
                }`}
              >
                {release.title}
              </Link>
            );
          })}
        </div>
      </nav>

      <section className="mt-7 max-w-3xl border-l-2 border-jade pl-4">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          Methodology
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {selectedRelease.methodology}
        </p>
      </section>

      <AtlasExplorer key={selectedRelease.slug} release={selectedRelease} />
    </div>
  );
}
