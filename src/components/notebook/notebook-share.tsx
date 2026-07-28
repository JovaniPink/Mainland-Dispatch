"use client";

import { useState, useSyncExternalStore } from "react";
import { subscribeToPromiseState } from "@/lib/notebook-promise";
import {
  buildNotebookShareUrl,
  shareActionUrl,
  type ShareChannel,
} from "@/lib/share-url";

const channels: Array<Exclude<ShareChannel, "copy">> = [
  "email",
  "linkedin",
  "bluesky",
];

export function NotebookShare({
  title,
  path,
  campaign,
  content = "notebook-header",
  promiseId,
}: {
  title: string;
  path: string;
  campaign: string;
  content?: string;
  promiseId?: string;
}) {
  const [copied, setCopied] = useState(false);
  const search = useSyncExternalStore(
    subscribeToPromiseState,
    () => window.location.search,
    () => ""
  );

  function selectedPromise(): string | undefined {
    return new URLSearchParams(search).get("promise") ?? undefined;
  }

  function trackedUrl(channel: ShareChannel) {
    return buildNotebookShareUrl({
      path,
      campaign,
      channel,
      content,
      promiseId: promiseId ?? selectedPromise(),
    });
  }

  async function copyLink() {
    await navigator.clipboard.writeText(trackedUrl("copy"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label="Share inquiry"
    >
      <button
        type="button"
        onClick={copyLink}
        className="border border-rule px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest hover:border-signal"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
      {channels.map((channel) => {
        const url = trackedUrl(channel);
        return (
          <a
            key={channel}
            href={shareActionUrl({ channel, url, title })}
            target={channel === "email" ? undefined : "_blank"}
            rel={channel === "email" ? undefined : "noreferrer"}
            className="border border-rule px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest hover:border-signal"
          >
            {channel}
          </a>
        );
      })}
      <span className="sr-only" aria-live="polite">
        {copied ? "Tracked share link copied." : ""}
      </span>
    </div>
  );
}
