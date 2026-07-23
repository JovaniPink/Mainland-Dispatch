export const site = {
  name: "Mainland Dispatch",
  url: "https://mainlanddispatch.com",
  tagline:
    "A public research notebook following consequential conversations about China into their sources, assumptions, and unresolved questions.",
  volume: "VOL. 001",
  nav: [
    { label: "Notebook", href: "/" },
    { label: "Source Archive", href: "/archive" },
    { label: "Saved", href: "/saved" },
  ],
  principle:
    "Concern begins the inquiry; sources, counterarguments, and uncertainty keep it honest.",
} as const;

export const verticals = [
  { id: "bilateral", label: "Bilateral" },
  { id: "culture", label: "Culture" },
  { id: "mainland", label: "Mainland" },
  { id: "technology", label: "Technology" },
  { id: "economy", label: "Economy" },
] as const;

export type VerticalId = (typeof verticals)[number]["id"];

export const kindLabels: Record<string, string> = {
  article: "Article",
  video: "Video",
  audio: "Audio",
  document: "Document",
  social: "Social",
  gallery: "Gallery",
  data: "Data",
  original: "Original",
};

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      timeZone: "UTC",
    })
    .toUpperCase();
}
