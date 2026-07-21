import { assign, setup } from "xstate";

export const compareMachine = setup({
  types: {
    context: {} as { selectedIndex: number; sourceCount: number },
    input: {} as { sourceCount: number },
    events: {} as { type: "SELECT_SOURCE"; index: number },
  },
  guards: {
    sourceExists: ({ context, event }) =>
      event.index >= 0 && event.index < context.sourceCount,
  },
}).createMachine({
  id: "compare",
  initial: "inspecting",
  context: ({ input }) => ({
    selectedIndex: 0,
    sourceCount: input.sourceCount,
  }),
  states: {
    inspecting: {
      on: {
        SELECT_SOURCE: {
          guard: "sourceExists",
          actions: assign({ selectedIndex: ({ event }) => event.index }),
        },
      },
    },
  },
});

export const traceMachine = setup({
  types: {
    context: {} as { selectedId: string; entryIds: string[] },
    input: {} as { initialId: string; entryIds: string[] },
    events: {} as { type: "SELECT_ENTRY"; id: string },
  },
  guards: {
    entryExists: ({ context, event }) => context.entryIds.includes(event.id),
  },
}).createMachine({
  id: "trace",
  initial: "reviewing",
  context: ({ input }) => ({
    selectedId: input.initialId,
    entryIds: input.entryIds,
  }),
  states: {
    reviewing: {
      on: {
        SELECT_ENTRY: {
          guard: "entryExists",
          actions: assign({ selectedId: ({ event }) => event.id }),
        },
      },
    },
  },
});
