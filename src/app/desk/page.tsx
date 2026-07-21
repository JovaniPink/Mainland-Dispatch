import type { Metadata } from "next";
import { Composer } from "@/components/desk/composer";
import { ReviewQueue } from "@/components/desk/review-queue";

export const metadata: Metadata = {
  title: "Desk · Mainland Dispatch",
  robots: { index: false },
};

export default function DeskPage() {
  return (
    <div className="px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Desk · private editorial mode
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          The editorial desk
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Add links, correct metadata, and move entries through review. In this
          prototype the composer validates against the Dispatch schema and
          produces JSON to paste into the content files.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        <Composer />
        <ReviewQueue />
      </div>
    </div>
  );
}
