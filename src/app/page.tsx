import Link from "next/link";
import { publishedDispatches, countsByVertical } from "@/content/dispatches";
import { verticals } from "@/content/site";
import { Stream } from "@/components/dispatch/stream";

export default function HomePage() {
  const lead = publishedDispatches.reduce<
    (typeof publishedDispatches)[number] | undefined
  >(
    (latest, dispatch) =>
      !latest ||
      dispatch.canonicalSource.publishedAt > latest.canonicalSource.publishedAt
        ? dispatch
        : latest,
    undefined
  );
  const counts = countsByVertical();

  if (!lead) {
    return (
      <p className="py-16 text-center font-serif text-lg italic text-ink-muted">
        No dispatches available yet.
      </p>
    );
  }

  return (
    <div className="pb-8">
      <section className="grid gap-8 border-b border-rule px-4 py-10 sm:px-6 lg:grid-cols-[1fr_16rem]">
        <div className="rise-in">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            From the source archive
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-5xl">
            {lead.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
            {lead.summary}
          </p>
          <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed">
            <span className="editorial-underline">{lead.whyItMatters}</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/dispatch/${lead.slug}`}
              className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper hover:bg-signal hover:border-signal"
            >
              Read dispatch
            </Link>
            <Link
              href="/trace/open-model-release-chronology"
              className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
            >
              Trace story
            </Link>
          </div>
        </div>
        <aside className="rise-in self-start border border-rule bg-paper-warm/40 p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Signals today
          </p>
          <ul className="mt-3 space-y-2">
            {verticals.map((v) => (
              <li
                key={v.id}
                className="flex items-baseline justify-between border-b border-rule pb-2 last:border-0"
              >
                <span className="font-serif text-sm">{v.label}</span>
                <span className="font-mono text-xs text-ink-muted">
                  {String(counts[v.id] ?? 0).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <Stream />
    </div>
  );
}
