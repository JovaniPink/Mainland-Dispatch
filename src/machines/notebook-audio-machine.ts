import { setup } from "xstate";

export const notebookAudioMachine = setup({
  types: {
    events: {} as
      | { type: "CONSENT" }
      | { type: "CAN_PLAY" }
      | { type: "ERROR" }
      | { type: "RETRY" }
      | { type: "RESET" },
  },
}).createMachine({
  id: "notebook-audio",
  initial: "poster",
  states: {
    poster: {
      on: { CONSENT: "loading" },
    },
    loading: {
      on: { CAN_PLAY: "playing", ERROR: "failure", RESET: "poster" },
    },
    playing: {
      on: { ERROR: "failure", RESET: "poster" },
    },
    failure: {
      on: { RETRY: "loading", RESET: "poster" },
    },
  },
});
