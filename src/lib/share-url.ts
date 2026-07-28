import { absoluteUrl, siteUrl } from "@/lib/seo";

export type ShareChannel = "copy" | "email" | "linkedin" | "bluesky";
export type ShareMedium = "reader-share" | "social";

const socialChannels = new Set<ShareChannel>(["linkedin", "bluesky"]);

export function buildNotebookShareUrl({
  path,
  campaign,
  channel,
  content,
  promiseId,
}: {
  path: string;
  campaign: string;
  channel: ShareChannel;
  content: string;
  promiseId?: string;
}): string {
  const url = new URL(absoluteUrl(path));
  if (url.origin !== new URL(siteUrl).origin) {
    throw new Error("Share URLs must point to Mainland Dispatch");
  }
  if (promiseId) url.searchParams.set("promise", promiseId);
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_source", channel);
  url.searchParams.set(
    "utm_medium",
    socialChannels.has(channel) ? "social" : "reader-share"
  );
  url.searchParams.set("utm_content", content);
  return url.toString();
}

export function shareActionUrl({
  channel,
  url,
  title,
}: {
  channel: Exclude<ShareChannel, "copy">;
  url: string;
  title: string;
}): string {
  if (channel === "email") {
    const params = new URLSearchParams({
      subject: title,
      body: `${title}\n\n${url}`,
    });
    return `mailto:?${params.toString()}`;
  }
  if (channel === "linkedin") {
    return `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url })}`;
  }
  return `https://bsky.app/intent/compose?${new URLSearchParams({ text: `${title}\n${url}` })}`;
}
