import Link from "next/link";
import type { Metadata } from "next";
import { publishedDispatches } from "@/content/dispatches";
import { whatXiJinpingWants as notebook } from "@/content/notebook/what-xi-jinping-wants";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.name,
    description: site.tagline,
    path: "/",
  }),
  title: { absolute: site.name },
};

export default function HomePage() {
  const selectedSources = publishedDispatches.slice(0, 3);

  return (
    <div>
      <section className="grid min-h-[34rem] gap-10 border-b border-rule px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="rise-in max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            China beyond the headline
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.04] sm:text-6xl">
            Understand the argument.
            <br />
            Follow the evidence.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
            Mainland Dispatch is a public research notebook for readers trying
            to understand contemporary China and the U.S.–China relationship.
            Each inquiry follows a consequential source into its assumptions,
            counterarguments, history, and unresolved questions—while the
            evidence archive keeps every public claim close to its source.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/notebook/${notebook.slug}`}
              className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper hover:bg-signal hover:border-signal"
            >
              Start with “What Xi Jinping Wants”
            </Link>
            <Link
              href="/archive"
              className="border border-rule px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-signal hover:text-signal"
            >
              Explore the evidence archive
            </Link>
          </div>
        </div>
        <aside className="rise-in border-l-2 border-signal bg-signal-soft/30 p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal">
            The first inquiry
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight">
            {notebook.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            {notebook.subtitle}
          </p>
          <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-jade">
            {notebook.readTime} · {notebook.sourceTrail.length} source stops
          </p>
        </aside>
      </section>

      <section className="grid gap-8 border-b border-rule px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Why this exists
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight">
            Concern begins the inquiry. It does not decide the conclusion.
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-7 text-ink-muted">
          <p>
            Mainland Dispatch began after a conversation about Xi Jinping made
            me realize how little conceptual equipment an ordinary headline
            provides. I wanted a place to reconstruct serious arguments fairly,
            test them against records and competing interpretations, and say
            what changed in my own thinking.
          </p>
          <p>
            This is intentionally irregular work. A new entry appears only when
            a source genuinely changes or complicates my understanding—and when
            its evidence trail can survive public scrutiny.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-jade">
              Interactive evidence archive
            </p>
            <h2 className="mt-2 font-serif text-2xl">
              Sources become explorable records
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
            <Link
              key={dispatch.id}
              href={`/dispatch/${dispatch.slug}`}
              className="border border-rule p-4 hover:border-jade"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
                {dispatch.verticals.join(" · ")} · {dispatch.kind}
              </p>
              <h3 className="mt-3 font-serif text-lg leading-snug">
                {dispatch.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-xs leading-6 text-ink-muted">
                {dispatch.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
