import type { Metadata } from "next";
import { site } from "@/content/site";

export const siteUrl = "https://mainlanddispatch.com";
export const socialImage = "/opengraph-image";

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function seoDescription(value: string, maxLength = 160): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const candidate = normalized.slice(0, maxLength - 1);
  const boundary = candidate.lastIndexOf(" ");
  const cut = boundary > 110 ? boundary : candidate.length;
  return `${candidate.slice(0, cut)}…`;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const conciseDescription = seoDescription(description);
  const canonical = absoluteUrl(path);

  return {
    title,
    description: conciseDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: site.name,
      title,
      description: conciseDescription,
      images: [{ url: socialImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: conciseDescription,
      images: [socialImage],
    },
  };
}
