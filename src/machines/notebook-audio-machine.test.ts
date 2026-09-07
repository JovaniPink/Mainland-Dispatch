import { createActor } from "xstate";
import { notebookAudioMachine } from "./notebook-audio-machine";

it("requires native playback evidence and ignores repeated readiness", () => {
  const actor = createActor(notebookAudioMachine).start();
  actor.send({ type: "PLAYING" });
  expect(actor.getSnapshot().value).toBe("poster");
  const journey = [
    ["CONSENT", "loading"],
    ["CAN_PLAY", "ready"],
    ["CAN_PLAY", "ready"],
    ["PLAYING", "playing"],
    ["CAN_PLAY", "playing"],
    ["PAUSE", "paused"],
    ["CAN_PLAY", "paused"],
    ["PLAYING", "playing"],
    ["WAITING", "buffering"],
    ["CAN_PLAY", "buffering"],
    ["PLAYING", "playing"],
    ["ENDED", "ended"],
    ["CAN_PLAY", "ended"],
    ["PLAYING", "playing"],
    ["ERROR", "failure"],
    ["RETRY", "loading"],
    ["RESET", "poster"],
  ] as const;
  for (const [type, expected] of journey) {
    actor.send({ type });
    expect(actor.getSnapshot().value).toBe(expected);
  }
});
