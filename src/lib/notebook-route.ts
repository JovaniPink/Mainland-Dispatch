import { notFound } from "next/navigation";
import { isPublicNotebookEntry } from "@/content/notebook";
import type { NotebookEntry } from "@/content/notebook/schema";

export function requirePublicNotebookEntry(
  entry: NotebookEntry
): NotebookEntry {
  if (!isPublicNotebookEntry(entry)) notFound();
  return entry;
}
