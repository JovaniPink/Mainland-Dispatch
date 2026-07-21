"use client";

import { useSaved } from "@/lib/saved";
import { publishedDispatches } from "@/content/dispatches";
import { DispatchCard } from "@/components/dispatch/dispatch-card";

export default function SavedPage() {
  const { saved } = useSaved();
  const items = publishedDispatches.filter((d) => saved.includes(d.id));

  return (
    <div className="px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Saved reading
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          Your collection
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Dispatches you have set aside, kept in this browser only.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="py-16 text-center font-serif text-lg italic text-ink-muted">
          Nothing saved yet. Use the Save button on any dispatch.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((d) => (
            <DispatchCard key={d.id} dispatch={d} />
          ))}
        </div>
      )}
    </div>
  );
}
