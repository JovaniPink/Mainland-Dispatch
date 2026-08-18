import { assign, setup } from "xstate";

export type ChokepointLens = "portfolio" | "gulf" | "red-sea" | "arctic";

export type ChokepointMapInput = {
  routeIds: string[];
  routeIdsByLens: Record<ChokepointLens, string[]>;
  pointIdsByRoute: Record<string, string[]>;
};

export type ChokepointMapContext = ChokepointMapInput & {
  attempt: number;
  selectedLens: ChokepointLens;
  selectedRouteId: string | null;
  selectedPointId: string | null;
};

export type ChokepointMapEvent =
  | { type: "LOAD_MAP" }
  | { type: "MAP_READY" }
  | { type: "MAP_DEGRADED" }
  | { type: "MAP_FATAL" }
  | { type: "RETRY_MAP" }
  | { type: "SELECT_LENS"; lens: ChokepointLens }
  | { type: "SELECT_ROUTE"; id: string }
  | { type: "SELECT_POINT"; routeId: string; pointId: string }
  | { type: "CLEAR_SELECTION" };

export const chokepointMapMachine = setup({
  types: {
    context: {} as ChokepointMapContext,
    input: {} as ChokepointMapInput,
    events: {} as ChokepointMapEvent,
  },
  guards: {
    routeExists: ({ context, event }) =>
      event.type === "SELECT_ROUTE" && context.routeIds.includes(event.id),
    pointExists: ({ context, event }) =>
      event.type === "SELECT_POINT" &&
      context.routeIds.includes(event.routeId) &&
      context.pointIdsByRoute[event.routeId]?.includes(event.pointId),
  },
}).createMachine({
  id: "chokepoint-portfolio-map",
  type: "parallel",
  context: ({ input }) => ({
    ...input,
    attempt: 0,
    selectedLens: "portfolio",
    selectedRouteId: null,
    selectedPointId: null,
  }),
  states: {
    map: {
      initial: "idle",
      states: {
        idle: {
          on: {
            LOAD_MAP: {
              target: "loading",
              actions: assign({
                attempt: ({ context }) => context.attempt + 1,
              }),
            },
          },
        },
        loading: {
          on: {
            MAP_READY: "ready",
            MAP_FATAL: "failed",
          },
        },
        ready: {
          on: {
            MAP_DEGRADED: "degraded",
            MAP_FATAL: "failed",
          },
        },
        degraded: {
          on: {
            RETRY_MAP: {
              target: "loading",
              actions: assign({
                attempt: ({ context }) => context.attempt + 1,
              }),
            },
            MAP_FATAL: "failed",
          },
        },
        failed: {
          on: {
            RETRY_MAP: {
              target: "loading",
              actions: assign({
                attempt: ({ context }) => context.attempt + 1,
              }),
            },
          },
        },
      },
    },
    exploration: {
      initial: "browsing",
      states: {
        browsing: {
          on: {
            SELECT_LENS: {
              actions: assign({
                selectedLens: ({ event }) => event.lens,
                selectedRouteId: null,
                selectedPointId: null,
              }),
            },
            SELECT_ROUTE: {
              guard: "routeExists",
              actions: assign({
                selectedRouteId: ({ event }) => event.id,
                selectedPointId: null,
              }),
            },
            SELECT_POINT: {
              guard: "pointExists",
              actions: assign({
                selectedRouteId: ({ event }) => event.routeId,
                selectedPointId: ({ event }) => event.pointId,
              }),
            },
            CLEAR_SELECTION: {
              actions: assign({
                selectedRouteId: null,
                selectedPointId: null,
              }),
            },
          },
        },
      },
    },
  },
});
