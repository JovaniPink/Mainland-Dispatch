"use client";

import { useSaved } from "@/lib/saved";

export function SaveButton({ id }: { id: string }) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(id);
  return (
    <button
      onClick={() => toggle(id)}
      className={`font-mono text-xs uppercase tracking-widest border px-2 py-1 ${
        saved
          ? "border-signal text-signal"
          : "border-rule text-ink-muted hover:text-ink"
      }`}
      aria-pressed={saved}
    >
      {saved ? "Saved ✓" : "Save"}
    </button>
  );
}
