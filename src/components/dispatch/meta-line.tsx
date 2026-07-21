import type { Dispatch } from "@/content/schema";
import { kindLabels } from "@/content/site";

export function metaParts(d: Dispatch): string[] {
  const parts = [kindLabels[d.kind], d.source, d.language];
  if (d.kind === "video" || d.kind === "audio") parts.push(d.duration);
  if (d.kind === "document") parts.push(`${d.pageCount} PP`);
  if (d.kind === "gallery") parts.push(`${d.imageCount} IMAGES`);
  return parts;
}

export function MetaLine({ dispatch }: { dispatch: Dispatch }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-jade">
      {metaParts(dispatch).join(" · ")}
    </p>
  );
}
