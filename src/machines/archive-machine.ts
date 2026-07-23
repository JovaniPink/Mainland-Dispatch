import { assign, setup } from "xstate";
import type { DispatchKind, EvidenceStatus, Vertical } from "@/content/schema";

export type ArchiveView = "cards" | "timeline" | "relationships";

export type ArchiveContext = {
  view: ArchiveView;
  vertical: Vertical | "all";
  kind: DispatchKind | "all";
  evidence: EvidenceStatus | "all";
  publisher: string;
  place: string;
  year: string;
  query: string;
  focusId: string;
};

export type ArchiveEvent =
  | { type: "SET_VIEW"; view: ArchiveView }
  | { type: "FILTER_VERTICAL"; vertical: Vertical | "all" }
  | { type: "FILTER_KIND"; kind: DispatchKind | "all" }
  | { type: "FILTER_EVIDENCE"; evidence: EvidenceStatus | "all" }
  | { type: "FILTER_PUBLISHER"; publisher: string }
  | { type: "FILTER_PLACE"; place: string }
  | { type: "FILTER_YEAR"; year: string }
  | { type: "SEARCH"; query: string }
  | { type: "SELECT_FOCUS"; focusId: string }
  | { type: "RESET" }
  | {
      type: "HYDRATE";
      filters: Partial<ArchiveContext>;
    };

const initialContext: ArchiveContext = {
  view: "cards",
  vertical: "all",
  kind: "all",
  evidence: "all",
  publisher: "all",
  place: "all",
  year: "all",
  query: "",
  focusId: "",
};

export const archiveMachine = setup({
  types: {
    context: {} as ArchiveContext,
    events: {} as ArchiveEvent,
  },
}).createMachine({
  id: "archive",
  initial: "ready",
  context: initialContext,
  states: {
    ready: {
      on: {
        SET_VIEW: {
          actions: assign({ view: ({ event }) => event.view }),
        },
        FILTER_VERTICAL: {
          actions: assign({ vertical: ({ event }) => event.vertical }),
        },
        FILTER_KIND: {
          actions: assign({ kind: ({ event }) => event.kind }),
        },
        FILTER_EVIDENCE: {
          actions: assign({ evidence: ({ event }) => event.evidence }),
        },
        FILTER_PUBLISHER: {
          actions: assign({ publisher: ({ event }) => event.publisher }),
        },
        FILTER_PLACE: {
          actions: assign({ place: ({ event }) => event.place }),
        },
        FILTER_YEAR: {
          actions: assign({ year: ({ event }) => event.year }),
        },
        SEARCH: {
          actions: assign({ query: ({ event }) => event.query }),
        },
        SELECT_FOCUS: {
          actions: assign({ focusId: ({ event }) => event.focusId }),
        },
        HYDRATE: {
          actions: assign(({ context, event }) => ({
            ...context,
            ...event.filters,
          })),
        },
        RESET: {
          actions: assign(initialContext),
        },
      },
    },
  },
});
