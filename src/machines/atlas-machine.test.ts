import { createActor } from "xstate";
import { atlasMachine } from "./atlas-machine";

const input = {
  chainSlugs: ["rule-to-reach", "exposure-to-response"],
  stepIdsByChain: {
    "rule-to-reach": ["step-rule", "step-trade"],
    "exposure-to-response": ["step-company"],
  },
  placeIdsByStep: {
    "step-rule": ["place-washington", "place-shanghai"],
    "step-trade": ["place-washington", "place-shanghai"],
    "step-company": ["place-shanghai"],
  },
  monthsByStep: {
    "step-rule": [],
    "step-trade": ["2024-12", "2025-01"],
    "step-company": [],
  },
};

describe("atlasMachine", () => {
  it("models every reachable map lifecycle path", () => {
    const actor = createActor(atlasMachine, { input }).start();
    expect(actor.getSnapshot().matches({ map: "closed" })).toBe(true);
    actor.send({ type: "OPEN_MAP" });
    expect(actor.getSnapshot().matches({ map: "loading" })).toBe(true);
    actor.send({ type: "MAP_READY" });
    expect(actor.getSnapshot().matches({ map: "ready" })).toBe(true);
    actor.send({ type: "MAP_DEGRADED" });
    expect(actor.getSnapshot().matches({ map: "degraded" })).toBe(true);
    actor.send({ type: "RETRY_MAP" });
    actor.send({ type: "MAP_FATAL" });
    expect(actor.getSnapshot().matches({ map: "failed" })).toBe(true);
    actor.send({ type: "RETRY_MAP" });
    expect(actor.getSnapshot().matches({ map: "loading" })).toBe(true);
    actor.send({ type: "CLOSE_MAP" });
    expect(actor.getSnapshot().matches({ map: "closed" })).toBe(true);
  });

  it("selects the first step and clears incompatible place and month on chain change", () => {
    const actor = createActor(atlasMachine, { input }).start();
    actor.send({ type: "SELECT_STEP", id: "step-trade" });
    actor.send({ type: "SELECT_PLACE", id: "place-shanghai" });
    expect(actor.getSnapshot().context.selectedMonth).toBe("2025-01");

    actor.send({ type: "SELECT_CHAIN", slug: "exposure-to-response" });
    expect(actor.getSnapshot().context).toMatchObject({
      selectedChain: "exposure-to-response",
      selectedStepId: "step-company",
      selectedPlace: null,
      selectedMonth: null,
    });
  });

  it("clears place and month when changing steps", () => {
    const actor = createActor(atlasMachine, { input }).start();
    actor.send({ type: "SELECT_PLACE", id: "place-shanghai" });
    actor.send({ type: "SELECT_STEP", id: "step-trade" });
    expect(actor.getSnapshot().context).toMatchObject({
      selectedStepId: "step-trade",
      selectedPlace: null,
      selectedMonth: "2025-01",
    });
    actor.send({ type: "SELECT_STEP", id: "step-rule" });
    expect(actor.getSnapshot().context.selectedMonth).toBeNull();
  });

  it("hydrates only values compatible with the selected step", () => {
    const actor = createActor(atlasMachine, { input }).start();
    actor.send({
      type: "HYDRATE",
      chain: "rule-to-reach",
      step: "step-trade",
      place: "place-shanghai",
      month: "2024-12",
    });
    expect(actor.getSnapshot().context).toMatchObject({
      selectedStepId: "step-trade",
      selectedPlace: "place-shanghai",
      selectedMonth: "2024-12",
    });

    actor.send({
      type: "HYDRATE",
      chain: "exposure-to-response",
      step: "step-trade",
      place: "place-washington",
      month: "2025-01",
    });
    expect(actor.getSnapshot().context).toMatchObject({
      selectedChain: "exposure-to-response",
      selectedStepId: "step-company",
      selectedPlace: null,
      selectedMonth: null,
    });
  });

  it("ignores selections outside the active step and resets exploration", () => {
    const actor = createActor(atlasMachine, { input }).start();
    actor.send({ type: "SELECT_MONTH", month: "2024-12" });
    expect(actor.getSnapshot().context.selectedMonth).toBeNull();
    actor.send({ type: "SELECT_STEP", id: "step-trade" });
    actor.send({ type: "SET_METRIC", metric: "yoy" });
    actor.send({ type: "RESET" });
    expect(actor.getSnapshot().context).toMatchObject({
      selectedChain: "rule-to-reach",
      selectedStepId: "step-rule",
      selectedMonth: null,
      metric: "value",
    });
  });
});
