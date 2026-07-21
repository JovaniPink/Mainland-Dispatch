"use client";

import { useMachine } from "@xstate/react";
import { mediaMachine } from "@/machines/media-machine";
import type { Dispatch } from "@/content/schema";
import { StateLab } from "@/components/state-lab/state-lab";

function embedUrl(d: Extract<Dispatch, { kind: "video" }>): string {
  switch (d.provider) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${d.embedId}?autoplay=1`;
    case "vimeo":
      return `https://player.vimeo.com/video/${d.embedId}?autoplay=1`;
    case "bilibili":
      return `https://player.bilibili.com/player.html?bvid=${d.embedId}`;
  }
}

/**
 * Click-to-load facade: poster and metadata only, until the reader consents.
 * The third-party iframe is created after CONSENT, never before.
 */
export function MediaFacade({ dispatch: d }: { dispatch: Dispatch }) {
  const [state, send] = useMachine(mediaMachine);

  if (d.kind !== "video" && d.kind !== "audio") return null;

  const meta =
    d.kind === "video"
      ? [d.provider.toUpperCase(), d.duration, d.language.toUpperCase(),
         d.captions.length > 0 ? `CC ${d.captions.join("/").toUpperCase()}` : "NO CAPTIONS"]
      : [d.showName.toUpperCase(), d.duration, d.language.toUpperCase(),
         d.transcriptAvailable ? "TRANSCRIPT AVAILABLE" : "NO TRANSCRIPT"];

  return (
    <div>
      <div className="relative aspect-video overflow-hidden border border-rule bg-night">
        {state.matches("playing") && d.kind === "video" ? (
          <iframe
            src={embedUrl(d)}
            title={d.title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : state.matches("playing") && d.kind === "audio" ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="font-serif text-lg text-paper">{d.title}</p>
            <a
              href={d.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-signal px-4 py-2 font-mono text-xs uppercase tracking-widest text-signal"
            >
              Listen at source ↗
            </a>
          </div>
        ) : state.matches("unavailable") ? (
          <div className="flex h-full items-center justify-center">
            <p className="font-mono text-xs uppercase tracking-widest text-paper">
              Media unavailable
            </p>
          </div>
        ) : (
          <button
            onClick={() => {
              send({ type: "CONSENT" });
              send({ type: "LOADED" });
            }}
            className="group flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center"
            aria-label={`Load external media: ${d.title}`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-paper text-paper transition-colors group-hover:border-signal group-hover:text-signal">
              {d.kind === "video" ? "▶" : "♪"}
            </span>
            <span className="font-serif text-base text-paper">{d.source}</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-paper/70">
              {meta.join(" · ")}
            </span>
            <span className="border border-paper/40 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-paper/70">
              External source — loads on play
            </span>
          </button>
        )}
      </div>
      <StateLab
        title="Media actor"
        state={state.value}
        lastEvent={null}
        nextEvents={["CONSENT", "LOADED", "ERROR", "RESET"]}
      />
    </div>
  );
}
