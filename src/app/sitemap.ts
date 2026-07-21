import type { MetadataRoute } from "next";
import { publishedDispatches } from "@/content/dispatches";
import { comparisons } from "@/content/comparisons";
import { traces } from "@/content/traces";
import { dossiers } from "@/content/dossiers";

const baseUrl = "https://mainlanddispatch.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/saved",
    ...publishedDispatches.map((item) => `/dispatch/${item.slug}`),
    ...comparisons.map((item) => `/compare/${item.slug}`),
    ...traces.map((item) => `/trace/${item.slug}`),
    ...dossiers.map((item) => `/dossiers/${item.slug}`),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
  }));
}
