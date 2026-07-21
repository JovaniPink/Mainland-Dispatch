import type { Dispatch, DispatchKind, Vertical } from "@/content/schema";

export function filterDispatches(
  all: Dispatch[],
  opts: {
    vertical: Vertical | "all";
    kind: DispatchKind | "all";
    query: string;
  }
): Dispatch[] {
  const q = opts.query.trim().toLowerCase();
  return all.filter((d) => {
    if (opts.vertical !== "all" && !d.verticals.includes(opts.vertical)) {
      return false;
    }
    if (opts.kind !== "all" && d.kind !== opts.kind) return false;
    if (q) {
      const haystack = [
        d.title,
        d.summary,
        d.commentary,
        d.source,
        ...d.tags,
        ...d.people,
        ...d.organizations,
        ...d.places,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortByCuratedDesc(all: Dispatch[]): Dispatch[] {
  return [...all].sort((a, b) => b.curatedAt.localeCompare(a.curatedAt));
}
