import { setup } from "xstate";

export const notebookAudioMachine = setup({
  types: {
    events: {} as {
      type:
        | "CONSENT"
        | "CAN_PLAY"
        | "PLAYING"
        | "PAUSE"
        | "WAITING"
        | "ENDED"
        | "ERROR"
        | "RETRY"
        | "RESET";
    },
  },
}).createMachine({
  id: "notebook-audio",
  initial: "poster",
  on: { RESET: ".poster" },
  states: {
    poster: { on: { CONSENT: "loading" } },
    loading: { on: { CAN_PLAY: "ready", ERROR: "failure" } },
    ready: {
      on: { PLAYING: "playing", WAITING: "buffering", ERROR: "failure" },
    },
    playing: {
      on: {
        PAUSE: "paused",
        WAITING: "buffering",
        ENDED: "ended",
        ERROR: "failure",
      },
    },
    paused: {
      on: {
        PLAYING: "playing",
        WAITING: "buffering",
        ENDED: "ended",
        ERROR: "failure",
      },
    },
    buffering: {
      on: {
        PLAYING: "playing",
        PAUSE: "paused",
        ENDED: "ended",
        ERROR: "failure",
      },
    },
    ended: {
      on: { PLAYING: "playing", WAITING: "buffering", ERROR: "failure" },
    },
    failure: { on: { RETRY: "loading" } },
  },
});
