import Link from "next/link";
import { notFound } from "next/navigation";
import {
  publishedDispatches,
  getPublicDispatch,
  publicRelatedDispatches,
} from "@/content/dispatches";
import { comparisons } from "@/content/comparisons";
import { traces } from "@/content/traces";
import { formatDate, verticals } from "@/content/site";
import { MetaLine } from "@/components/dispatch/meta-line";
import { SaveButton } from "@/components/dispatch/save-button";
import { MediaFacade } from "@/components/media/media-facade";
import { DispatchVisual } from "@/components/dispatch/dispatch-visual";

export function generateStaticParams() {
  return publishedDispatches.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dispatch = getPublicDispatch(slug);
  return dispatch
    ? { title: dispatch.title, description: dispatch.summary }
    : { title: "Dispatch not found" };
}

export default async function DispatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getPublicDispatch(slug);
  if (!d) notFound();

  const related = publicRelatedDispatches(d);
  const comparison = comparisons.find((c) =>
    c.relatedDispatchIds.includes(d.id)
  );
  const trace = traces.find((t) =>
    t.entries.some((e) => e.dispatchId === d.id)
  );

  const entities = [...d.people, ...d.organizations, ...d.places];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="rise-in">
        <MetaLine dispatch={d} />
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          {d.title}
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
          Published {formatDate(d.sourceDate)} · Curated{" "}
          {formatDate(d.curatedAt)}
          {d.updatedAt !== d.curatedAt && (
            <> · Updated {formatDate(d.updatedAt)}</>
          )}
        </p>
      </div>

      {(d.kind === "video" || d.kind === "audio") && (
        <div className="mt-8">
          <MediaFacade dispatch={d} />
        </div>
      )}

      {d.kind !== "video" && d.kind !== "audio" && (
        <div className="mt-8 overflow-hidden border border-rule">
          <DispatchVisual dispatch={d} />
        </div>
      )}

      {d.kind === "document" && d.keyPassage && (
        <blockquote className="mt-8 border-l-2 border-signal bg-paper-warm/60 p-4">
          <p className="font-serif text-lg italic leading-relaxed">
            &ldquo;{d.keyPassage}&rdquo;
          </p>
          <cite className="mt-2 block font-mono text-xs uppercase tracking-widest text-ink-muted not-italic">
            {d.issuingBody} · {formatDate(d.documentDate)} · {d.pageCount} pages
          </cite>
        </blockquote>
      )}

      {d.kind === "article" && d.pullQuote && (
        <blockquote className="mt-8 border-l-2 border-signal pl-4">
          <p className="font-serif text-lg italic leading-relaxed">
            &ldquo;{d.pullQuote}&rdquo;
          </p>
        </blockquote>
      )}

      {d.kind === "data" && (
        <dl className="mt-8 grid gap-4 border-y border-rule py-4 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
              Methodology
            </dt>
            <dd className="mt-1 text-sm leading-relaxed">{d.methodology}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
              Measurement period
            </dt>
            <dd className="mt-1 text-sm leading-relaxed">
              {d.measurementPeriod}
            </dd>
          </div>
        </dl>
      )}

      {d.kind === "gallery" && (
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
          {d.imageCount} image prototype · Photographer:{" "}
          {d.photographer ?? "Not assigned"}
        </p>
      )}

      {d.kind === "social" && (
        <dl className="mt-8 grid gap-4 border-y border-rule py-4 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
              Capture
            </dt>
            <dd className="mt-1 font-serif">
              {d.platform} · {d.account} · {formatDate(d.captureDate)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
              Archival posture
            </dt>
            <dd className="mt-1 text-sm leading-relaxed">
              Prototype reference only. A published record must retain a
              verified capture.
            </dd>
          </div>
        </dl>
      )}

      <section className="mt-8 space-y-4">
        <p className="text-base leading-relaxed">{d.summary}</p>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Commentary
          </p>
          <p className="mt-2 font-serif text-lg leading-relaxed">
            {d.commentary}
          </p>
        </div>
        <div className="border border-rule bg-paper-warm/40 p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Why it matters
          </p>
          <p className="mt-2 font-serif text-lg italic leading-relaxed">
            <span className="editorial-underline">{d.whyItMatters}</span>
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-2 border-t border-rule pt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          {d.verticals
            .map((v) => verticals.find((x) => x.id === v)?.label ?? v)
            .join(" · ")}{" "}
          · {d.tags.join(" · ")}
        </p>
        {entities.length > 0 && (
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            {entities.join(" · ")}
          </p>
        )}
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={d.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper hover:border-signal hover:bg-signal"
        >
          {d.provenance === "prototype"
            ? "Preview source model ↗"
            : "Open source ↗"}
        </a>
        {comparison && (
          <Link
            href={`/compare/${comparison.slug}`}
            className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
          >
            Compare coverage
          </Link>
        )}
        {trace && (
          <Link
            href={`/trace/${trace.slug}`}
            className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
          >
            Trace topic
          </Link>
        )}
        <SaveButton id={d.id} />
      </div>

      {related.length > 0 && (
        <section className="mt-12 border-t border-rule pt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Related dispatches
          </p>
          <ul className="mt-3 space-y-3">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/dispatch/${r.slug}`}
                  className="font-serif text-lg hover:text-signal"
                >
                  {r.title}
                </Link>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                  {r.source} · {formatDate(r.sourceDate)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
