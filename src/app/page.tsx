import Link from "next/link";
import type { Metadata } from "next";
import type { Dispatch } from "@/content/schema";
import { publishedDispatches } from "@/content/dispatches";
import {
  latestNotebookEntry as notebook,
  publishedNotebookEntries,
} from "@/content/notebook";
import { formatDate, site } from "@/content/site";
import { NotebookStatus } from "@/components/notebook/notebook-status";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.name,
    description: site.tagline,
    path: "/",
  }),
  title: { absolute: site.name },
};

function relevanceScore(dispatch: Dispatch): number {
  const notebookTerms = new Set(
    notebook.tags
      .flatMap((tag) => tag.toLowerCase().match(/[a-z0-9]+/g) ?? [])
      .filter((term) => term.length > 2)
  );
  const dispatchTerms = [
    ...dispatch.tags,
    ...dispatch.verticals,
    ...dispatch.places,
    ...dispatch.organizations,
  ].flatMap((value) => value.toLowerCase().match(/[a-z0-9]+/g) ?? []);

  return dispatchTerms.reduce(
    (score, term) => score + (notebookTerms.has(term) ? 1 : 0),
    0
  );
}

function selectArchiveRecords(): Dispatch[] {
  return [...publishedDispatches]
    .sort((a, b) => {
      const relevance = relevanceScore(b) - relevanceScore(a);
      return relevance || b.updatedAt.localeCompare(a.updatedAt);
    })
    .slice(0, 3);
}

export default function HomePage() {
  const selectedSources = selectArchiveRecords();
  const previousNotebooks = publishedNotebookEntries
    .slice(0, -1)
    .slice(-2)
    .reverse();
  const previewSources = notebook.frontPagePreview.sourceIds.map((sourceId) => {
    const source = notebook.sourceTrail.find((item) => item.id === sourceId);
    if (!source) throw new Error(`Missing front-page source: ${sourceId}`);
    return source;
  });

  return (
    <div>
      <section className="grid gap-7 border-b border-rule px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)] lg:items-start lg:gap-10">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Notebook · Inquiry {String(notebook.ordinal).padStart(2, "0")}
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.03] sm:text-6xl">
            {notebook.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
            {notebook.subtitle}
          </p>
          <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-jade">
            {formatDate(notebook.publishedAt)} · {notebook.readTime} ·{" "}
            {notebook.sourceTrail.length} source stops
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/notebook/${notebook.slug}`}
              className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper hover:border-signal hover:bg-signal"
            >
              Read the inquiry
            </Link>
            <Link
              href={`/notebook/${notebook.slug}#sources`}
              className="border border-rule px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-signal hover:text-signal"
            >
              Examine the sources
            </Link>
          </div>
        </div>

        <aside
          data-testid="latest-evidence-preview"
          className="border-l-2 border-signal bg-signal-soft/30 p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal">
              Evidence preview
            </p>
            <NotebookStatus status={notebook.frontPagePreview.status} />
          </div>
          <p className="mt-4 font-serif text-xl leading-7">
            {notebook.frontPagePreview.finding}
          </p>
          <p className="mt-4 border-t border-rule pt-3 text-xs leading-6 text-ink-muted">
            <span className="font-mono uppercase tracking-widest">Limit: </span>
            {notebook.frontPagePreview.caveat}
          </p>
          <div className="mt-4 flex flex-col items-start gap-2">
            {previewSources.map((source) => (
              <a
                key={source.id}
                href={source.links[0].url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[0.65rem] uppercase tracking-widest text-signal hover:text-ink"
              >
                {source.publisher}: {source.links[0].label} ↗
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section
        data-testid="previous-inquiries"
        className="border-b border-rule px-4 py-9 sm:px-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Previous inquiries
            </p>
            <h2 className="mt-2 font-serif text-2xl">
              Continue through the Notebook
            </h2>
          </div>
          <Link
            href="/notebooks"
            className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
          >
            Browse all Notebooks ↗
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {previousNotebooks.map((entry) => (
            <article key={entry.slug} className="border border-rule p-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                Inquiry {String(entry.ordinal).padStart(2, "0")} ·{" "}
                {entry.readTime}
              </p>
              <h3 className="mt-3 font-serif text-2xl leading-tight">
                <Link
                  href={`/notebook/${entry.slug}`}
                  className="hover:text-signal"
                >
                  {entry.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">
                {entry.subtitle}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        data-testid="home-archive-preview"
        className="border-b border-rule px-4 py-9 sm:px-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              From the evidence archive
            </p>
            <h2 className="mt-2 font-serif text-2xl">
              Three records to explore next
            </h2>
          </div>
          <Link
            href="/archive"
            className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
          >
            Explore {publishedDispatches.length} published records ↗
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {selectedSources.map((dispatch) => (
            <article
              key={dispatch.id}
              className="border border-rule p-4 hover:border-jade"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
                {dispatch.canonicalSource.publisher} · {dispatch.kind}
              </p>
              <h3 className="mt-3 font-serif text-lg leading-snug">
                <Link
                  href={`/dispatch/${dispatch.slug}`}
                  className="hover:text-signal"
                >
                  {dispatch.title}
                </Link>
              </h3>
              <p className="mt-3 line-clamp-3 text-xs leading-6 text-ink-muted">
                {dispatch.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Why Mainland Dispatch exists
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight">
            Concern begins the inquiry. It does not decide the conclusion.
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-7 text-ink-muted">
          <p>
            Each inquiry reconstructs a consequential argument, tests it against
            records and competing interpretations, and states what remains
            unresolved.
          </p>
          <p>
            The work appears only when its evidence trail can survive public
            scrutiny.{" "}
            <Link
              href="/archive"
              className="text-signal underline-offset-4 hover:underline"
            >
              Read the evidence method.
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
