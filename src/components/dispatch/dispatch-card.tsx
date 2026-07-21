import Link from "next/link";
import type { Dispatch } from "@/content/schema";
import { formatDateShort, verticals } from "@/content/site";
import { MetaLine } from "./meta-line";
import { SaveButton } from "./save-button";

export function DispatchCard({ dispatch: d }: { dispatch: Dispatch }) {
  const verticalLabels: string[] = [
    ...d.verticals.map((v) => verticals.find((x) => x.id === v)?.label ?? v),
    ...d.tags.slice(0, 2),
  ];

  return (
    <article className="rise-in flex flex-col gap-3 border border-rule bg-paper-warm/40 p-4">
      <MetaLine dispatch={d} />
      <h3 className="font-serif text-xl leading-snug">
        <Link href={`/dispatch/${d.slug}`} className="hover:text-signal">
          {d.title}
        </Link>
      </h3>
      <p className="text-sm leading-relaxed text-ink-muted">{d.summary}</p>
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal">
          Why it matters
        </p>
        <p className="mt-1 font-serif text-sm italic leading-relaxed">
          {d.whyItMatters}
        </p>
      </div>
      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
        {verticalLabels.join(" · ")}
      </p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
          Published {formatDateShort(d.sourceDate)} · Curated{" "}
          {formatDateShort(d.curatedAt)}
        </p>
        <SaveButton id={d.id} />
      </div>
    </article>
  );
}
