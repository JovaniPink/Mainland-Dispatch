import { setup } from "xstate";

/** Click-to-load media facade: no third-party iframe until the reader consents. */
export const mediaMachine = setup({
  types: {
    events: {} as
      | { type: "CONSENT" }
      | { type: "LOADED" }
      | { type: "ERROR" }
      | { type: "RESET" },
  },
}).createMachine({
  id: "media",
  initial: "poster",
  states: {
    poster: {
      on: { CONSENT: "consented" },
    },
    consented: {
      always: "loading",
    },
    loading: {
      on: { LOADED: "playing", ERROR: "unavailable" },
    },
    playing: {
      on: { RESET: "poster" },
    },
    unavailable: {
      on: { RESET: "poster" },
    },
  },
});
