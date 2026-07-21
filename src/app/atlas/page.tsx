import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { atlasRelease } from "@/content/atlas";
import { formatDate } from "@/content/site";
import { AtlasExplorer } from "@/components/atlas/atlas-explorer";

export const metadata: Metadata = {
  title: "Evidence Atlas",
  description:
    "Trace a semiconductor-control package from rule text to locations, trade context, and company disclosure.",
};

export default function AtlasPage() {
  if (!atlasRelease) notFound();

  return (
    <div className="px-4 py-10 sm:px-6">
      <header className="rise-in grid gap-6 border-b border-rule pb-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Evidence Atlas · source snapshot
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
            {atlasRelease.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            {atlasRelease.summary}
          </p>
          <p className="mt-4 max-w-2xl font-serif text-lg italic leading-relaxed">
            <span className="editorial-underline">
              The interaction is the prototype. The source records are real; the
              editorial interpretation remains provisional.
            </span>
          </p>
          <Link
            href={`/dossiers/${atlasRelease.dossierSlug}`}
            className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
          >
            ← Return to semiconductor dossier
          </Link>
        </div>
        <dl className="self-start border border-rule bg-paper-warm/35 p-4 text-sm">
          <div className="border-b border-rule pb-3">
            <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
              Release
            </dt>
            <dd className="mt-1 font-serif">{atlasRelease.version}</dd>
          </div>
          <div className="border-b border-rule py-3">
            <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
              Retrieved
            </dt>
            <dd className="mt-1 font-serif">
              {formatDate(atlasRelease.retrievedAt)}
            </dd>
          </div>
          <div className="border-b border-rule py-3">
            <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
              Evidence through
            </dt>
            <dd className="mt-1 font-serif">
              {formatDate(atlasRelease.evidenceThrough)}
            </dd>
          </div>
          <div className="pt-3">
            <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
              Trade series through
            </dt>
            <dd className="mt-1 font-serif">
              {formatDate(atlasRelease.seriesThrough)}
            </dd>
          </div>
        </dl>
      </header>

      <section className="mt-7 max-w-3xl border-l-2 border-jade pl-4">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          Methodology
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {atlasRelease.methodology}
        </p>
      </section>

      <AtlasExplorer release={atlasRelease} />
    </div>
  );
}
