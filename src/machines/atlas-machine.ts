import { assign, setup } from "xstate";

export type AtlasMetric = "value" | "yoy";

export type AtlasMachineInput = {
  chainSlugs: string[];
  stepIdsByChain: Record<string, string[]>;
  placeIdsByStep: Record<string, string[]>;
  monthsByStep: Record<string, string[]>;
};

export type AtlasContext = AtlasMachineInput & {
  selectedChain: string;
  selectedStepId: string;
  selectedPlace: string | null;
  selectedMonth: string | null;
  metric: AtlasMetric;
};

export type AtlasEvent =
  | { type: "OPEN_MAP" }
  | { type: "CLOSE_MAP" }
  | { type: "MAP_READY" }
  | { type: "MAP_FATAL" }
  | { type: "MAP_DEGRADED" }
  | { type: "RETRY_MAP" }
  | { type: "SELECT_CHAIN"; slug: string }
  | { type: "SELECT_STEP"; id: string }
  | { type: "SELECT_PLACE"; id: string }
  | { type: "SELECT_MONTH"; month: string }
  | { type: "SET_METRIC"; metric: AtlasMetric }
  | {
      type: "HYDRATE";
      chain?: string | null;
      step?: string | null;
      place?: string | null;
      month?: string | null;
    }
  | { type: "CLEAR_PLACE" }
  | { type: "RESET" };

function firstStep(context: AtlasMachineInput, chain: string) {
  return context.stepIdsByChain[chain]?.[0] ?? "";
}

function latestMonth(context: AtlasMachineInput, step: string) {
  return context.monthsByStep[step]?.at(-1) ?? null;
}

export const atlasMachine = setup({
  types: {
    context: {} as AtlasContext,
    input: {} as AtlasMachineInput,
    events: {} as AtlasEvent,
  },
  guards: {
    chainExists: ({ context, event }) =>
      event.type === "SELECT_CHAIN" && context.chainSlugs.includes(event.slug),
    stepExistsForChain: ({ context, event }) =>
      event.type === "SELECT_STEP" &&
      context.stepIdsByChain[context.selectedChain]?.includes(event.id),
    placeExistsForStep: ({ context, event }) =>
      event.type === "SELECT_PLACE" &&
      context.placeIdsByStep[context.selectedStepId]?.includes(event.id),
    monthExistsForStep: ({ context, event }) =>
      event.type === "SELECT_MONTH" &&
      context.monthsByStep[context.selectedStepId]?.includes(event.month),
  },
}).createMachine({
  id: "evidence-atlas",
  type: "parallel",
  context: ({ input }) => {
    const selectedChain = input.chainSlugs[0] ?? "";
    const selectedStepId = firstStep(input, selectedChain);
    return {
      ...input,
      selectedChain,
      selectedStepId,
      selectedPlace: null,
      selectedMonth: latestMonth(input, selectedStepId),
      metric: "value",
    };
  },
  states: {
    map: {
      initial: "closed",
      states: {
        closed: { on: { OPEN_MAP: "loading" } },
        loading: {
          on: {
            MAP_READY: "ready",
            MAP_FATAL: "failed",
            CLOSE_MAP: "closed",
          },
        },
        ready: {
          on: {
            MAP_DEGRADED: "degraded",
            MAP_FATAL: "failed",
            CLOSE_MAP: "closed",
          },
        },
        degraded: {
          on: { RETRY_MAP: "loading", CLOSE_MAP: "closed" },
        },
        failed: {
          on: { RETRY_MAP: "loading", CLOSE_MAP: "closed" },
        },
      },
    },
    exploration: {
      initial: "browsing",
      states: {
        browsing: {
          on: {
            SELECT_CHAIN: {
              guard: "chainExists",
              actions: assign(({ context, event }) => {
                const selectedStepId = firstStep(context, event.slug);
                return {
                  selectedChain: event.slug,
                  selectedStepId,
                  selectedPlace: null,
                  selectedMonth: latestMonth(context, selectedStepId),
                  metric: "value" as const,
                };
              }),
            },
            SELECT_STEP: {
              guard: "stepExistsForChain",
              actions: assign(({ context, event }) => ({
                selectedStepId: event.id,
                selectedPlace: null,
                selectedMonth: latestMonth(context, event.id),
                metric: "value" as const,
              })),
            },
            SELECT_PLACE: {
              guard: "placeExistsForStep",
              actions: assign({ selectedPlace: ({ event }) => event.id }),
            },
            SELECT_MONTH: {
              guard: "monthExistsForStep",
              actions: assign({ selectedMonth: ({ event }) => event.month }),
            },
            SET_METRIC: {
              actions: assign({ metric: ({ event }) => event.metric }),
            },
            HYDRATE: {
              actions: assign(({ context, event }) => {
                const selectedChain =
                  event.chain && context.chainSlugs.includes(event.chain)
                    ? event.chain
                    : context.selectedChain;
                const fallbackStep = firstStep(context, selectedChain);
                const selectedStepId =
                  event.step &&
                  context.stepIdsByChain[selectedChain]?.includes(event.step)
                    ? event.step
                    : fallbackStep;
                const selectedPlace =
                  event.place &&
                  context.placeIdsByStep[selectedStepId]?.includes(event.place)
                    ? event.place
                    : null;
                const selectedMonth =
                  event.month &&
                  context.monthsByStep[selectedStepId]?.includes(event.month)
                    ? event.month
                    : latestMonth(context, selectedStepId);
                return {
                  selectedChain,
                  selectedStepId,
                  selectedPlace,
                  selectedMonth,
                };
              }),
            },
            CLEAR_PLACE: {
              actions: assign({ selectedPlace: null }),
            },
            RESET: {
              actions: assign(({ context }) => {
                const selectedChain = context.chainSlugs[0] ?? "";
                const selectedStepId = firstStep(context, selectedChain);
                return {
                  selectedChain,
                  selectedStepId,
                  selectedPlace: null,
                  selectedMonth: latestMonth(context, selectedStepId),
                  metric: "value" as const,
                };
              }),
            },
          },
        },
      },
    },
  },
});
