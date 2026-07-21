import { assign, setup } from "xstate";
import type { AtlasLifecycleStage } from "@/content/schema";

export type AtlasMetric = "value" | "yoy";

export type AtlasMachineInput = {
  chainSlugs: string[];
  placeIds: string[];
  months: string[];
  placeIdsByChain: Record<string, string[]>;
  chainSlugsByPlace: Record<string, string[]>;
};

export type AtlasContext = AtlasMachineInput & {
  selectedChain: string;
  selectedPlace: string | null;
  selectedMonth: string | null;
  selectedStage: AtlasLifecycleStage | null;
  metric: AtlasMetric;
};

export type AtlasEvent =
  | { type: "LOAD_MAP" }
  | { type: "MAP_READY" }
  | { type: "MAP_ERROR" }
  | { type: "SELECT_CHAIN"; slug: string }
  | { type: "SELECT_PLACE"; id: string }
  | { type: "SELECT_MONTH"; month: string }
  | { type: "SELECT_STAGE"; stage: AtlasLifecycleStage }
  | { type: "SET_METRIC"; metric: AtlasMetric }
  | {
      type: "HYDRATE";
      chain?: string | null;
      place?: string | null;
      month?: string | null;
    }
  | { type: "CLEAR_PLACE" }
  | { type: "RESET" };

const lifecycleStages: AtlasLifecycleStage[] = [
  "announcement",
  "publication",
  "implementation",
  "observation",
];

export const atlasMachine = setup({
  types: {
    context: {} as AtlasContext,
    input: {} as AtlasMachineInput,
    events: {} as AtlasEvent,
  },
  guards: {
    chainExists: ({ context, event }) =>
      event.type === "SELECT_CHAIN" && context.chainSlugs.includes(event.slug),
    placeExists: ({ context, event }) =>
      event.type === "SELECT_PLACE" && context.placeIds.includes(event.id),
    monthExists: ({ context, event }) =>
      event.type === "SELECT_MONTH" && context.months.includes(event.month),
    stageExists: ({ event }) =>
      event.type === "SELECT_STAGE" && lifecycleStages.includes(event.stage),
  },
}).createMachine({
  id: "evidence-atlas",
  type: "parallel",
  context: ({ input }) => ({
    ...input,
    selectedChain: input.chainSlugs[0] ?? "",
    selectedPlace: null,
    selectedMonth: input.months.at(-1) ?? null,
    selectedStage: null,
    metric: "value",
  }),
  states: {
    map: {
      initial: "idle",
      states: {
        idle: { on: { LOAD_MAP: "loading" } },
        loading: {
          on: { MAP_READY: "ready", MAP_ERROR: "failed" },
        },
        ready: { on: { MAP_ERROR: "failed" } },
        failed: { on: { LOAD_MAP: "loading" } },
      },
    },
    exploration: {
      initial: "browsing",
      states: {
        browsing: {
          on: {
            SELECT_CHAIN: {
              guard: "chainExists",
              actions: assign({
                selectedChain: ({ event }) => event.slug,
                selectedPlace: ({ context, event }) =>
                  context.selectedPlace &&
                  context.placeIdsByChain[event.slug]?.includes(
                    context.selectedPlace
                  )
                    ? context.selectedPlace
                    : null,
                selectedStage: null,
              }),
            },
            SELECT_PLACE: {
              guard: "placeExists",
              actions: assign({
                selectedPlace: ({ event }) => event.id,
                selectedChain: ({ context, event }) =>
                  context.chainSlugsByPlace[event.id]?.includes(
                    context.selectedChain
                  )
                    ? context.selectedChain
                    : (context.chainSlugsByPlace[event.id]?.[0] ??
                      context.selectedChain),
              }),
            },
            SELECT_MONTH: {
              guard: "monthExists",
              actions: assign({ selectedMonth: ({ event }) => event.month }),
            },
            SELECT_STAGE: {
              guard: "stageExists",
              actions: assign({
                selectedStage: ({ context, event }) =>
                  context.selectedStage === event.stage ? null : event.stage,
              }),
            },
            SET_METRIC: {
              actions: assign({ metric: ({ event }) => event.metric }),
            },
            HYDRATE: {
              actions: assign({
                selectedChain: ({ context, event }) =>
                  event.chain && context.chainSlugs.includes(event.chain)
                    ? event.chain
                    : context.selectedChain,
                selectedPlace: ({ context, event }) =>
                  event.place && context.placeIds.includes(event.place)
                    ? event.place
                    : null,
                selectedMonth: ({ context, event }) =>
                  event.month && context.months.includes(event.month)
                    ? event.month
                    : context.selectedMonth,
              }),
            },
            CLEAR_PLACE: {
              actions: assign({ selectedPlace: null }),
            },
            RESET: {
              actions: assign({
                selectedChain: ({ context }) => context.chainSlugs[0] ?? "",
                selectedPlace: null,
                selectedMonth: ({ context }) => context.months.at(-1) ?? null,
                selectedStage: null,
                metric: "value",
              }),
            },
          },
        },
      },
    },
  },
});
