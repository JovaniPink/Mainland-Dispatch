import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, getComparison } from "@/content/comparisons";
import { getDispatchById } from "@/content/dispatches";
import { CompareColumns } from "@/components/compare/compare-columns";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const related = c.relatedDispatchIds
    .map(getDispatchById)
    .filter((d) => d !== undefined);

  return (
    <div className="px-4 py-10 sm:px-6">
      <header className="rise-in max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Crosscurrents · Compare coverage
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          {c.intro}
        </p>
      </header>

      <div className="mt-8">
        <CompareColumns comparison={c} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="border border-rule p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Shared facts
          </p>
          <ul className="mt-3 space-y-2">
            {c.sharedFacts.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed">
                <span className="text-jade" aria-hidden>
                  ●
                </span>
                {f}
              </li>
            ))}
          </ul>
        </section>
        <section className="border border-rule p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Differing emphasis
          </p>
          <ul className="mt-3 space-y-2">
            {c.differingEmphasis.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed">
                <span className="text-signal" aria-hidden>
                  ○
                </span>
                {f}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 max-w-2xl border-t border-rule pt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          Editorial notes
        </p>
        <p className="mt-3 font-serif text-lg leading-relaxed">
          {c.editorialNotes}
        </p>
      </section>

      {related.length > 0 && (
        <section className="mt-8 border-t border-rule pt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Dispatches in this comparison
          </p>
          <ul className="mt-3 space-y-2">
            {related.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/dispatch/${d.slug}`}
                  className="font-serif text-lg hover:text-signal"
                >
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
