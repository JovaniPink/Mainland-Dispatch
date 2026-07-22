export const site = {
  name: "Mainland Dispatch",
  tagline:
    "Curated reporting on China and the US–China relationship, with sources, context, and history preserved.",
  volume: "VOL. 001",
  nav: [
    { label: "Dispatches", href: "/" },
    { label: "Crosscurrents", href: "/compare/open-weight-release-postures" },
    { label: "Mainland Pulse", href: "/trace/open-model-release-chronology" },
    { label: "Dossiers", href: "/dossiers/open-model-release-record" },
    { label: "Evidence Atlas", href: "/atlas" },
    { label: "Saved", href: "/saved" },
  ],
  principle:
    "Every source gets context; every conclusion shows its evidence; every developing story preserves its history.",
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
