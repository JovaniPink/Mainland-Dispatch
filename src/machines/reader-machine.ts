import { assign, setup } from "xstate";
import type { DispatchKind, Vertical } from "@/content/schema";

export type ReaderContext = {
  vertical: Vertical | "all";
  kind: DispatchKind | "all";
  query: string;
};

export type ReaderEvent =
  | { type: "FILTER_VERTICAL"; vertical: Vertical | "all" }
  | { type: "FILTER_KIND"; kind: DispatchKind | "all" }
  | { type: "SEARCH"; query: string }
  | { type: "CLEAR_SEARCH" }
  | { type: "RESET_FILTERS" };

/**
 * The public stream statechart. Compare and Trace own their own selection
 * machines; route navigation is intentionally left to Next.js.
 */
export const readerMachine = setup({
  types: {
    context: {} as ReaderContext,
    events: {} as ReaderEvent,
  },
}).createMachine({
  id: "reader",
  initial: "browsing",
  context: {
    vertical: "all",
    kind: "all",
    query: "",
  },
  states: {
    browsing: {
      initial: "idle",
      on: {
        FILTER_VERTICAL: {
          target: ".filtering",
          actions: assign({ vertical: ({ event }) => event.vertical }),
        },
        FILTER_KIND: {
          target: ".filtering",
          actions: assign({ kind: ({ event }) => event.kind }),
        },
        SEARCH: {
          target: "searching",
          actions: assign({ query: ({ event }) => event.query }),
        },
        RESET_FILTERS: {
          target: ".idle",
          actions: assign({ vertical: "all", kind: "all", query: "" }),
        },
      },
      states: {
        idle: {},
        filtering: {},
      },
    },
    searching: {
      on: {
        SEARCH: {
          actions: assign({ query: ({ event }) => event.query }),
        },
        FILTER_VERTICAL: {
          actions: assign({ vertical: ({ event }) => event.vertical }),
        },
        FILTER_KIND: {
          actions: assign({ kind: ({ event }) => event.kind }),
        },
        CLEAR_SEARCH: {
          target: "browsing",
          actions: assign({ query: "" }),
        },
        RESET_FILTERS: {
          target: "browsing",
          actions: assign({ vertical: "all", kind: "all", query: "" }),
        },
      },
    },
  },
});
