import { createActor } from "xstate";
import {
  chokepointMapMachine,
  type ChokepointMapInput,
} from "./chokepoint-map-machine";

const input: ChokepointMapInput = {
  routeIds: ["route-risk-hormuz", "route-risk-arctic"],
  routeIdsByLens: {
    portfolio: ["route-risk-hormuz", "route-risk-arctic"],
    gulf: ["route-risk-hormuz"],
    "red-sea": [],
    arctic: ["route-risk-arctic"],
  },
  pointIdsByRoute: {
    "route-risk-hormuz": ["point-risk-hormuz"],
    "route-risk-arctic": ["point-risk-ningbo"],
  },
};

describe("chokepoint portfolio map machine", () => {
  it("owns consent, verified readiness, degradation, and retry", () => {
    const actor = createActor(chokepointMapMachine, { input }).start();

    expect(actor.getSnapshot().matches({ map: "idle" })).toBe(true);
    expect(actor.getSnapshot().context.attempt).toBe(0);
    actor.send({ type: "LOAD_MAP" });
    expect(actor.getSnapshot().matches({ map: "loading" })).toBe(true);
    expect(actor.getSnapshot().context.attempt).toBe(1);
    actor.send({ type: "MAP_READY" });
    expect(actor.getSnapshot().matches({ map: "ready" })).toBe(true);
    actor.send({ type: "MAP_DEGRADED" });
    expect(actor.getSnapshot().matches({ map: "degraded" })).toBe(true);
    actor.send({ type: "RETRY_MAP" });
    expect(actor.getSnapshot().matches({ map: "loading" })).toBe(true);
    expect(actor.getSnapshot().context.attempt).toBe(2);
    actor.send({ type: "MAP_FATAL" });
    expect(actor.getSnapshot().matches({ map: "failed" })).toBe(true);
    actor.send({ type: "RETRY_MAP" });
    expect(actor.getSnapshot().matches({ map: "loading" })).toBe(true);
    expect(actor.getSnapshot().context.attempt).toBe(3);
  });

  it("keeps corridor filters and selections inside validated machine context", () => {
    const actor = createActor(chokepointMapMachine, { input }).start();

    actor.send({ type: "SELECT_LENS", lens: "arctic" });
    expect(actor.getSnapshot().context.selectedLens).toBe("arctic");
    actor.send({ type: "SELECT_ROUTE", id: "route-missing" });
    expect(actor.getSnapshot().context.selectedRouteId).toBeNull();

    actor.send({ type: "SELECT_ROUTE", id: "route-risk-arctic" });
    expect(actor.getSnapshot().context.selectedRouteId).toBe(
      "route-risk-arctic"
    );
    actor.send({
      type: "SELECT_POINT",
      routeId: "route-risk-arctic",
      pointId: "point-risk-ningbo",
    });
    expect(actor.getSnapshot().context.selectedPointId).toBe(
      "point-risk-ningbo"
    );

    actor.send({ type: "SELECT_LENS", lens: "gulf" });
    expect(actor.getSnapshot().context).toMatchObject({
      selectedLens: "gulf",
      selectedRouteId: null,
      selectedPointId: null,
    });
  });
});
