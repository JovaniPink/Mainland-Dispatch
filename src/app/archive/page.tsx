import type { Metadata } from "next";
import { Stream } from "@/components/dispatch/stream";
import { publishedDispatches } from "@/content/dispatches";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Source Archive",
  description:
    "Reviewed source records on contemporary China, everyday life, technology, culture, labor, and the U.S.–China relationship.",
  path: "/archive",
});

export default function ArchivePage() {
  return (
    <div className="pb-8">
      <header className="border-b border-rule px-4 py-10 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Supporting collection
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-5xl">Source Archive</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
          {publishedDispatches.length} reviewed source records. Each preserves
          the canonical article, what it reports, editorial analysis, evidence
          status, and known limitations.
        </p>
      </header>
      <div className="pt-6">
        <Stream />
      </div>
    </div>
  );
}
