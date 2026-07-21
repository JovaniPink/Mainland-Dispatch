import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dossiers, getDossier, evidenceStatusLabels } from "@/content/dossiers";
import { getDispatchById } from "@/content/dispatches";
import { formatDate } from "@/content/site";
import { MetaLine } from "@/components/dispatch/meta-line";
import type { EvidenceStatus } from "@/content/schema";
import { getAtlasReleaseForDossier } from "@/content/atlas";

export function generateStaticParams() {
  return dossiers.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dossier = getDossier(slug);
  return dossier
    ? { title: dossier.title, description: dossier.summary }
    : { title: "Dossier not found" };
}

const statusTone: Record<EvidenceStatus, string> = {
  reported: "border-rule text-ink-muted",
  officiallyAnnounced: "border-jade text-jade",
  implemented: "border-jade bg-jade-soft text-jade",
  independentlyObserved: "border-jade bg-jade-soft text-jade",
  contested: "border-signal bg-signal-soft text-signal",
  superseded: "border-rule text-ink-muted line-through",
  corrected: "border-signal text-signal",
};

export default async function DossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dossier = getDossier(slug);
  if (!dossier) notFound();
  const evidenceRelease = getAtlasReleaseForDossier(slug);

  const latest = dossier.dispatchIds
    .map(getDispatchById)
    .filter((d) => d !== undefined)
    .sort((a, b) => b.curatedAt.localeCompare(a.curatedAt));

  const { people, organizations, places } = dossier.principalEntities;

  return (
    <div className="px-4 py-10 sm:px-6">
      <header className="rise-in max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Dossier
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          {dossier.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          {dossier.summary}
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
          Last reviewed {formatDate(dossier.lastReviewed)}
        </p>
      </header>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          What is established, developing, or disputed
        </p>
        <ul className="mt-3 space-y-3">
          {dossier.claims.map((claim, i) => (
            <li
              key={i}
              className="flex flex-col gap-2 border-b border-rule pb-3 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <p className="font-serif text-lg leading-snug">{claim.text}</p>
              <span
                className={`shrink-0 self-start border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest ${statusTone[claim.status]}`}
              >
                {evidenceStatusLabels[claim.status]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {evidenceRelease && (
        <section className="mt-10 border-y border-rule bg-paper-warm/30 py-6 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Evidence view · source snapshot
          </p>
          <div className="mt-2 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl">
                {evidenceRelease.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {evidenceRelease.summary}
              </p>
              <p className="mt-4 border-l-2 border-signal pl-3 text-sm leading-relaxed text-ink-muted">
                The source records are real; this interpretation remains a
                provisional prototype and is not verified reporting.
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                Enter through a chain
              </p>
              <ul className="mt-2 divide-y divide-rule border-y border-rule">
                {evidenceRelease.chains.map((chain) => (
                  <li key={chain.id}>
                    <Link
                      href={`/atlas?chain=${chain.slug}&step=${chain.steps[0].id}`}
                      className="flex items-baseline justify-between gap-4 py-3 font-serif text-lg hover:text-signal"
                    >
                      <span>{chain.title}</span>
                      <span aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <section className="border border-rule p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Principal entities
          </p>
          <dl className="mt-3 space-y-2 text-sm">
            {people.length > 0 && (
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                  People
                </dt>
                <dd className="font-serif">{people.join(" · ")}</dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                Organizations
              </dt>
              <dd className="font-serif">{organizations.join(" · ")}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                Places
              </dt>
              <dd className="font-serif">{places.join(" · ")}</dd>
            </div>
          </dl>
        </section>

        <section className="border border-rule p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Primary documents
          </p>
          <ul className="mt-3 space-y-2">
            {dossier.primaryDocuments.map((doc) => (
              <li key={doc.url}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-base hover:text-signal"
                >
                  {doc.label} ↗
                </a>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                  {formatDate(doc.date)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-10 border border-signal bg-signal-soft/50 p-4">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Unresolved questions
        </p>
        <ul className="mt-3 space-y-2">
          {dossier.unresolvedQuestions.map((q, i) => (
            <li key={i} className="font-serif text-base italic leading-relaxed">
              {q}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Latest dispatches
          </p>
          {dossier.traceSlug && (
            <Link
              href={`/trace/${dossier.traceSlug}`}
              className="font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-signal"
            >
              Full chronology →
            </Link>
          )}
        </div>
        <ul className="mt-3 space-y-4">
          {latest.map((d) => (
            <li key={d.id} className="border-b border-rule pb-4">
              <MetaLine dispatch={d} />
              <Link
                href={`/dispatch/${d.slug}`}
                className="mt-1 block font-serif text-xl leading-snug hover:text-signal"
              >
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
