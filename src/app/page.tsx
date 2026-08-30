import Link from "next/link";
import type { Metadata } from "next";
import type { Dispatch } from "@/content/schema";
import { publishedDispatches } from "@/content/dispatches";
import {
  latestNotebookEntry as notebook,
  publicNotebookEntries,
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

const primaryLinkClass =
  "inline-flex border border-ink bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-paper hover:border-signal hover:bg-signal";

const secondaryLinkClass =
  "inline-flex border border-rule px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-signal hover:text-signal";

type HomeEntryPoint = Readonly<{
  number: "01" | "02" | "03";
  href: `/notebook/${string}` | "/notebooks" | "/archive";
  title: string;
  description: string;
}>;

const homeEntryPoints = [
  {
    number: "01",
    href: `/notebook/${notebook.slug}`,
    title: "Latest inquiry",
    description: "One guided argument, with claims and limits kept in view.",
  },
  {
    number: "02",
    href: "/notebooks",
    title: "Notebook index",
    description: `${publicNotebookEntries.length} inquiries, arranged as a continuing body of work.`,
  },
  {
    number: "03",
    href: "/archive",
    title: "Evidence archive",
    description: `${publishedDispatches.length} published records with source and limitation notes.`,
  },
] as const satisfies readonly HomeEntryPoint[];

export default function HomePage() {
  const selectedSources = selectArchiveRecords();
  const previousNotebooks = publicNotebookEntries
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
      <section
        data-testid="home-introduction"
        className="grid gap-8 border-b border-rule px-4 py-9 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)] lg:gap-14 lg:py-16"
      >
        <div className="max-w-3xl">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-signal">
            A public research notebook
          </p>
          <h1 className="mt-4 max-w-[20ch] font-serif text-4xl leading-[1.02] sm:text-6xl">
            Contemporary China, examined in public.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
            Follow consequential arguments through primary records, reporting,
            data, and competing interpretations. Every inquiry shows its
            sources, limits, and open questions.
          </p>
        </div>

        <nav
          aria-label="Ways into Mainland Dispatch"
          data-testid="home-entry-points"
          className="border-t-2 border-jade pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-1"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-jade">
            Start here
          </p>
          <ol className="mt-4 divide-y divide-rule border-y border-rule">
            {homeEntryPoints.map((entry) => (
              <li key={entry.number}>
                <Link
                  href={entry.href}
                  className="group grid grid-cols-[2rem_1fr] gap-3 py-4"
                >
                  <span className="font-mono text-[0.65rem] text-signal">
                    {entry.number}
                  </span>
                  <span>
                    <span className="block font-serif text-xl group-hover:text-signal">
                      {entry.title}
                    </span>
                    <span className="mt-1 hidden text-xs leading-5 text-ink-muted sm:block">
                      {entry.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <section
        data-testid="latest-inquiry"
        className="border-b border-rule px-4 py-9 sm:px-6 sm:py-12"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Latest Notebook
            </p>
            <p className="mt-2 font-serif text-xl text-ink-muted">
              Start with the current inquiry
            </p>
          </div>
          <Link
            href="/notebooks"
            className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
          >
            Browse all Notebooks -&gt;
          </Link>
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)] lg:items-start lg:gap-10">
          <article className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              Inquiry {String(notebook.ordinal).padStart(2, "0")}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.03] sm:text-6xl">
              {notebook.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
              {notebook.subtitle}
            </p>
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-jade">
              {formatDate(notebook.publishedAt)} / {notebook.readTime} /{" "}
              {notebook.sourceTrail.length} source stops
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/notebook/${notebook.slug}`}
                className={primaryLinkClass}
              >
                Read Inquiry {String(notebook.ordinal).padStart(2, "0")}
              </Link>
              <Link
                href={`/notebook/${notebook.slug}#sources`}
                className={secondaryLinkClass}
              >
                Examine the sources
              </Link>
            </div>
          </article>

          <aside
            data-testid="latest-evidence-preview"
            className="border-l-2 border-signal bg-signal-soft/30 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal">
                What the inquiry finds
              </p>
              <NotebookStatus status={notebook.frontPagePreview.status} />
            </div>
            <p className="mt-4 font-serif text-xl leading-7">
              {notebook.frontPagePreview.finding}
            </p>
            <p className="mt-4 border-t border-rule pt-3 text-xs leading-6 text-ink-muted">
              <span className="font-mono uppercase tracking-widest">
                Limit:{" "}
              </span>
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
                  {source.publisher}: {source.links[0].label} -&gt;
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        aria-label="Continue exploring Mainland Dispatch"
        className="grid border-b border-rule lg:grid-cols-2"
      >
        <div
          data-testid="previous-inquiries"
          className="border-b border-rule px-4 py-9 sm:px-6 lg:border-b-0 lg:border-r"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Continue through the Notebook
          </p>
          <h2 className="mt-2 font-serif text-3xl">Previous inquiries</h2>
          <div className="mt-6 divide-y divide-rule border-y border-rule">
            {previousNotebooks.map((entry) => (
              <article key={entry.slug} className="py-5 first:pt-4 last:pb-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
                  Inquiry {String(entry.ordinal).padStart(2, "0")} /{" "}
                  {entry.readTime}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-tight">
                  <Link
                    href={`/notebook/${entry.slug}`}
                    className="hover:text-signal"
                  >
                    {entry.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {entry.subtitle}
                </p>
              </article>
            ))}
          </div>
          <Link
            href="/notebooks"
            className="mt-5 inline-flex font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
          >
            See the full Notebook index -&gt;
          </Link>
        </div>

        <div data-testid="home-archive-preview" className="px-4 py-9 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Work from the source outward
          </p>
          <h2 className="mt-2 font-serif text-3xl">
            Inside the evidence archive
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink-muted">
            Published records preserve the source claim, editorial reading, and
            limits separately.
          </p>
          <div className="mt-6 divide-y divide-rule border-y border-rule">
            {selectedSources.map((dispatch, index) => (
              <article
                key={dispatch.id}
                className="grid grid-cols-[2rem_1fr] gap-3 py-4"
              >
                <span className="font-mono text-[0.65rem] text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
                    {dispatch.canonicalSource.publisher} / {dispatch.kind}
                  </p>
                  <h3 className="mt-2 font-serif text-lg leading-snug">
                    <Link
                      href={`/dispatch/${dispatch.slug}`}
                      className="hover:text-signal"
                    >
                      {dispatch.title}
                    </Link>
                  </h3>
                </div>
              </article>
            ))}
          </div>
          <Link
            href="/archive"
            className="mt-5 inline-flex font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
          >
            Explore {publishedDispatches.length} published records -&gt;
          </Link>
        </div>
      </section>
    </div>
  );
}
