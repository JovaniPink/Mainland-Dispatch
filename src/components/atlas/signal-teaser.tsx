import Link from "next/link";
import type { AtlasRelease } from "@/content/schema";

export function SignalTeaser({ release }: { release: AtlasRelease }) {
  return (
    <section
      className="border-b border-rule px-4 py-9 sm:px-6"
      aria-labelledby="signals-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Source snapshot · {release.version}
          </p>
          <h2
            id="signals-heading"
            className="mt-2 font-serif text-2xl sm:text-3xl"
          >
            Signals together
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Follow one policy from rule text to measurable context—without
            collapsing correlation into proof.
          </p>
        </div>
        <Link
          href="/atlas"
          className="font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
        >
          Open Evidence Atlas →
        </Link>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {release.chains.map((chain) => (
          <Link
            key={chain.id}
            href={`/atlas?chain=${chain.slug}`}
            className="group border border-rule bg-paper-warm/25 p-4 hover:border-jade hover:bg-paper-warm/60"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-jade">
              {chain.eyebrow}
            </span>
            <span className="mt-2 block font-serif text-lg leading-snug group-hover:text-signal">
              {chain.title}
            </span>
            <span
              className="mt-4 grid grid-cols-4 gap-1"
              aria-label="Four linked signals"
            >
              {chain.steps.map((step) => (
                <span
                  key={step.code}
                  className="border-t border-rule pt-2 font-mono text-[0.55rem] uppercase tracking-wider text-ink-muted"
                >
                  {step.code}
                </span>
              ))}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
