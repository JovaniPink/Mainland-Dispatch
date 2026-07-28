import type { MetadataRoute } from "next";
import { publishedDispatches } from "@/content/dispatches";
import { comparisons } from "@/content/comparisons";
import { traces } from "@/content/traces";
import { dossiers } from "@/content/dossiers";
import { atlasRelease, publishedAtlasReleases } from "@/content/atlas";
import { siteUrl } from "@/lib/seo";
import {
  latestNotebookEntry,
  publishedNotebookEntries,
} from "@/content/notebook";

const newest = (dates: string[]) => [...dates].sort().at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const dispatchEntries: MetadataRoute.Sitemap = publishedDispatches.map(
    (item) => ({
      url: `${siteUrl}/dispatch/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const comparisonEntries: MetadataRoute.Sitemap = comparisons.map((item) => ({
    url: `${siteUrl}/compare/${item.slug}`,
    lastModified: newest(
      item.relatedDispatchIds
        .map((id) => publishedDispatches.find((dispatch) => dispatch.id === id))
        .filter((dispatch) => dispatch !== undefined)
        .map((dispatch) => dispatch.updatedAt)
    ),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const traceEntries: MetadataRoute.Sitemap = traces.map((item) => ({
    url: `${siteUrl}/trace/${item.slug}`,
    lastModified: newest(item.entries.map((entry) => entry.date)),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const dossierEntries: MetadataRoute.Sitemap = dossiers.map((item) => ({
    url: `${siteUrl}/dossiers/${item.slug}`,
    lastModified: item.lastReviewed,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const archiveUpdated = newest(
    publishedDispatches.map((item) => item.updatedAt)
  );
  const atlasEntries: MetadataRoute.Sitemap = publishedAtlasReleases.map(
    (release) => ({
      url:
        release.slug === atlasRelease.slug
          ? `${siteUrl}/atlas`
          : `${siteUrl}/atlas?case=${encodeURIComponent(release.slug)}`,
      lastModified: release.retrievedAt,
      changeFrequency: "monthly",
      priority: 0.4,
    })
  );
  const notebookEntries: MetadataRoute.Sitemap = publishedNotebookEntries.map(
    (entry) => ({
      url: `${siteUrl}/notebook/${entry.slug}`,
      lastModified: entry.updatedAt,
      changeFrequency: "monthly",
      priority: entry.slug === latestNotebookEntry.slug ? 0.95 : 0.85,
    })
  );

  return [
    {
      url: siteUrl,
      lastModified: latestNotebookEntry.updatedAt,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...notebookEntries,
    {
      url: `${siteUrl}/archive`,
      lastModified: archiveUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...atlasEntries,
    ...dispatchEntries,
    ...comparisonEntries,
    ...traceEntries,
    ...dossierEntries,
  ];
}
