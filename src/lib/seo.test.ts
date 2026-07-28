import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import manifest from "@/app/manifest";
import { publishedDispatches } from "@/content/dispatches";
import { atlasRelease, publishedAtlasReleases } from "@/content/atlas";
import { whatXiJinpingWants } from "@/content/notebook/what-xi-jinping-wants";
import { openModelsClosedSystem } from "@/content/notebook/open-models-closed-system";
import { publishedNotebookEntries } from "@/content/notebook";
import { metadata as notebookTwoMetadata } from "@/app/notebook/open-models-closed-system/page";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as savedMetadata } from "@/app/saved/layout";
import { generateMetadata as generateDispatchMetadata } from "@/app/dispatch/[slug]/page";
import { absoluteUrl, pageMetadata, seoDescription, siteUrl } from "./seo";

describe("SEO publication contract", () => {
  it("creates concise descriptions without splitting early", () => {
    const long = `${"Evidence-led reporting with source context. ".repeat(8)}End.`;
    const result = seoDescription(long);

    expect(result.length).toBeLessThanOrEqual(160);
    expect(result.endsWith("…")).toBe(true);
    expect(seoDescription("  A   concise description. ")).toBe(
      "A concise description."
    );
    expect(seoDescription("x".repeat(200))).toHaveLength(160);
  });

  it("builds absolute canonicals and social metadata", () => {
    const metadata = pageMetadata({
      title: "Evidence Atlas",
      description: "A source-led evidence view.",
      path: "/atlas",
    });

    expect(absoluteUrl("/atlas")).toBe(`${siteUrl}/atlas`);
    expect(metadata.alternates).toEqual({ canonical: `${siteUrl}/atlas` });
    expect(metadata.openGraph).toMatchObject({
      url: `${siteUrl}/atlas`,
      title: "Evidence Atlas",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("indexes public editorial routes and excludes private utility routes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(siteUrl);
    expect(urls).toContain(`${siteUrl}/notebook/${whatXiJinpingWants.slug}`);
    expect(urls).toContain(
      `${siteUrl}/notebook/${openModelsClosedSystem.slug}`
    );
    expect(
      publishedNotebookEntries.every((entry) =>
        urls.includes(`${siteUrl}/notebook/${entry.slug}`)
      )
    ).toBe(true);
    expect(urls).toContain(`${siteUrl}/archive`);
    expect(urls).toContain(`${siteUrl}/atlas`);
    expect(
      publishedAtlasReleases.every((release) =>
        urls.includes(
          release.slug === atlasRelease.slug
            ? `${siteUrl}/atlas`
            : `${siteUrl}/atlas?case=${encodeURIComponent(release.slug)}`
        )
      )
    ).toBe(true);
    expect(urls).not.toContain(`${siteUrl}/saved`);
    expect(urls.some((url) => url.includes("/desk"))).toBe(false);
    expect(
      publishedDispatches.every((dispatch) =>
        urls.includes(`${siteUrl}/dispatch/${dispatch.slug}`)
      )
    ).toBe(true);
    expect(entries.every((entry) => Boolean(entry.lastModified))).toBe(true);
  });

  it("keeps Notebook Two canonical and article metadata free of query state", () => {
    expect(notebookTwoMetadata.alternates).toEqual({
      canonical: `${siteUrl}/notebook/open-models-closed-system`,
    });
    expect(notebookTwoMetadata.openGraph).toMatchObject({
      type: "article",
      url: `${siteUrl}/notebook/open-models-closed-system`,
      publishedTime: "2026-07-28T00:00:00.000Z",
    });
    expect(JSON.stringify(notebookTwoMetadata)).not.toContain("utm_");
    expect(JSON.stringify(notebookTwoMetadata)).not.toContain("promise=");
  });

  it("publishes consistent crawler and application metadata", () => {
    expect(robots()).toMatchObject({
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl,
    });
    expect(JSON.stringify(robots())).toContain("/desk");
    expect(manifest()).toMatchObject({
      id: "/",
      start_url: "/",
      scope: "/",
      lang: "en-US",
    });
    expect(homeMetadata.title).toEqual({ absolute: "Mainland Dispatch" });
    expect(savedMetadata.robots).toMatchObject({
      index: false,
      follow: false,
      noarchive: true,
    });
  });

  it("dates and attributes Dispatch metadata to the editorial page", async () => {
    const dispatch = publishedDispatches[0];
    const metadata = await generateDispatchMetadata({
      params: Promise.resolve({ slug: dispatch.slug }),
    });

    expect(metadata.alternates).toEqual({
      canonical: `${siteUrl}/dispatch/${dispatch.slug}`,
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      publishedTime: `${dispatch.curatedAt}T00:00:00.000Z`,
      authors: ["Mainland Dispatch"],
    });
  });
});
