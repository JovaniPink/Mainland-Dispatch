import { publishedDispatches } from "@/content/dispatches";
import { latestNotebookEntry, publicNotebookEntries } from "@/content/notebook";
import { verticals } from "@/content/site";
import { evidenceStatusLabels } from "@/content/dossiers";
import {
  initialArchiveContext,
  type ArchiveContext,
} from "@/machines/archive-machine";

export function parseArchiveUrl(url: URL): {
  context: ArchiveContext;
  notice: string;
} {
  const context = {
    ...initialArchiveContext,
    inquirySlug: latestNotebookEntry.slug,
    defaultInquirySlug: latestNotebookEntry.slug,
  };
  const allowed: Record<string, readonly string[]> = {
    view: ["cards", "timeline", "relationships"],
    vertical: ["all", ...verticals.map((item) => item.id)],
    kind: ["all", ...publishedDispatches.map((item) => item.kind)],
    evidence: ["all", ...Object.keys(evidenceStatusLabels)],
    publisher: [
      "all",
      ...publishedDispatches.map((item) => item.canonicalSource.publisher),
    ],
    place: ["all", ...publishedDispatches.flatMap((item) => item.places)],
    year: [
      "all",
      ...publishedDispatches.map((item) =>
        item.canonicalSource.publishedAt.slice(0, 4)
      ),
    ],
    inquirySlug: publicNotebookEntries.map((item) => item.slug),
    focusId: publishedDispatches.map((item) => item.id),
  };
  const invalid: string[] = [];
  for (const [key, values] of Object.entries(allowed)) {
    const parameter =
      key === "inquirySlug" ? "inquiry" : key === "focusId" ? "focus" : key;
    const value = url.searchParams.get(parameter);
    if (value === null) continue;
    if (values.includes(value)) Object.assign(context, { [key]: value });
    else invalid.push(parameter);
  }
  context.query = url.searchParams.get("q") ?? "";
  return {
    context,
    notice: invalid.length
      ? "Some selections are unavailable in the public archive. Public defaults are shown."
      : "",
  };
}

export function serializeArchiveUrl(
  current: URL,
  context: ArchiveContext
): string {
  const url = new URL(current);
  const values = {
    view: context.view,
    vertical: context.vertical,
    kind: context.kind,
    evidence: context.evidence,
    publisher: context.publisher,
    place: context.place,
    year: context.year,
    q: context.query,
    focus: context.focusId,
    inquiry: context.inquirySlug,
  };
  for (const [key, value] of Object.entries(values)) {
    if (
      !value ||
      value === "all" ||
      (key === "view" && value === "cards") ||
      (key === "inquiry" &&
        context.view !== "relationships" &&
        !current.searchParams.has("inquiry"))
    )
      url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
