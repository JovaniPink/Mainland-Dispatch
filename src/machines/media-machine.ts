import { setup } from "xstate";

/** Click-to-load media facade: no third-party iframe until the reader consents. */
export const mediaMachine = setup({
  types: {
    events: {} as
      | { type: "CONSENT" }
      | { type: "LOADED" }
      | { type: "ERROR" }
      | { type: "RETRY" }
      | { type: "RESET" },
  },
}).createMachine({
  id: "media",
  initial: "poster",
  states: {
    poster: {
      on: { CONSENT: "loading" },
    },
    loading: {
      on: { LOADED: "playing", ERROR: "unavailable" },
    },
    playing: {
      on: { RESET: "poster" },
    },
    unavailable: {
      on: { RETRY: "loading", RESET: "poster" },
    },
  },
});
