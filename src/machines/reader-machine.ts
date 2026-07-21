import { assign, setup } from "xstate";
import type { DispatchKind, Vertical } from "@/content/schema";

export type ReaderContext = {
  vertical: Vertical | "all";
  kind: DispatchKind | "all";
  query: string;
  focusedSlug: string | null;
};

export type ReaderEvent =
  | { type: "FILTER_VERTICAL"; vertical: Vertical | "all" }
  | { type: "FILTER_KIND"; kind: DispatchKind | "all" }
  | { type: "SEARCH"; query: string }
  | { type: "CLEAR_SEARCH" }
  | { type: "FOCUS"; slug: string }
  | { type: "COMPARE" }
  | { type: "TRACE" }
  | { type: "READ" }
  | { type: "BACK" };

/**
 * The reading session as a statechart:
 * browsing → filtering / searching, and focused → reading | comparing | tracing.
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
    focusedSlug: null,
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
        FOCUS: {
          target: "focused",
          actions: assign({ focusedSlug: ({ event }) => event.slug }),
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
        FOCUS: {
          target: "focused",
          actions: assign({ focusedSlug: ({ event }) => event.slug }),
        },
      },
    },
    focused: {
      initial: "reading",
      on: {
        BACK: {
          target: "browsing",
          actions: assign({ focusedSlug: null }),
        },
      },
      states: {
        reading: {
          on: { COMPARE: "comparing", TRACE: "tracing" },
        },
        comparing: {
          on: { READ: "reading", TRACE: "tracing" },
        },
        tracing: {
          on: { READ: "reading", COMPARE: "comparing" },
        },
      },
    },
  },
});
