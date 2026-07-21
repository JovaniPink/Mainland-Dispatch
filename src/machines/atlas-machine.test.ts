import { createActor } from "xstate";
import { atlasMachine } from "./atlas-machine";

const input = {
  chainSlugs: ["rule-to-reach", "exposure-to-response"],
  placeIds: ["place-washington", "place-shanghai"],
  months: ["2024-12", "2025-01"],
  placeIdsByChain: {
    "rule-to-reach": ["place-washington", "place-shanghai"],
    "exposure-to-response": ["place-shanghai"],
  },
  chainSlugsByPlace: {
    "place-washington": ["rule-to-reach"],
    "place-shanghai": ["rule-to-reach", "exposure-to-response"],
  },
};

describe("atlasMachine", () => {
  it("owns map loading and failure evidence", () => {
    const actor = createActor(atlasMachine, { input }).start();
    expect(actor.getSnapshot().matches({ map: "idle" })).toBe(true);
    actor.send({ type: "LOAD_MAP" });
    expect(actor.getSnapshot().matches({ map: "loading" })).toBe(true);
    actor.send({ type: "MAP_ERROR" });
    expect(actor.getSnapshot().matches({ map: "failed" })).toBe(true);
  });

  it("synchronizes valid chains and places", () => {
    const actor = createActor(atlasMachine, { input }).start();
    actor.send({ type: "SELECT_PLACE", id: "place-shanghai" });
    actor.send({ type: "SELECT_CHAIN", slug: "exposure-to-response" });
    expect(actor.getSnapshot().context.selectedPlace).toBe("place-shanghai");
    expect(actor.getSnapshot().context.selectedChain).toBe(
      "exposure-to-response"
    );

    actor.send({ type: "SELECT_PLACE", id: "place-washington" });
    expect(actor.getSnapshot().context.selectedChain).toBe("rule-to-reach");
  });

  it("hydrates only valid query values", () => {
    const actor = createActor(atlasMachine, { input }).start();
    actor.send({
      type: "HYDRATE",
      chain: "exposure-to-response",
      place: "missing",
      month: "2024-12",
    });
    expect(actor.getSnapshot().context).toMatchObject({
      selectedChain: "exposure-to-response",
      selectedPlace: null,
      selectedMonth: "2024-12",
    });
  });

  it("toggles lifecycle stages and resets exploration", () => {
    const actor = createActor(atlasMachine, { input }).start();
    actor.send({ type: "SELECT_STAGE", stage: "implementation" });
    expect(actor.getSnapshot().context.selectedStage).toBe("implementation");
    actor.send({ type: "SELECT_STAGE", stage: "implementation" });
    expect(actor.getSnapshot().context.selectedStage).toBeNull();
    actor.send({ type: "SET_METRIC", metric: "yoy" });
    actor.send({ type: "RESET" });
    expect(actor.getSnapshot().context.metric).toBe("value");
    expect(actor.getSnapshot().context.selectedMonth).toBe("2025-01");
  });
});
