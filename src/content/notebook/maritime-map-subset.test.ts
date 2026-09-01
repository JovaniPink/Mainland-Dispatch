import { routingAroundRisk } from "@/content/notebook/routing-around-risk";
import {
  buildChokepointMapInput,
  parseMaritimeMapSubset,
} from "@/content/notebook/maritime-map-subset";

describe("maritime map subsets", () => {
  const arctic = routingAroundRisk.routes.find(
    (route) => route.id === "route-risk-arctic"
  );
  const hormuz = routingAroundRisk.routes.find(
    (route) => route.id === "route-risk-hormuz"
  );

  if (!arctic || !hormuz) throw new Error("expected maritime fixtures");

  it("derives route and point lookup tables only from the subset", () => {
    const subset = parseMaritimeMapSubset({
      id: "northern-sea-route",
      routes: [arctic],
      allowedLenses: ["arctic"],
      initialLens: "arctic",
    });

    expect(buildChokepointMapInput(subset)).toEqual({
      routeIds: ["route-risk-arctic"],
      routeIdsByLens: { arctic: ["route-risk-arctic"] },
      pointIdsByRoute: {
        "route-risk-arctic": arctic.points.map((point) => point.id),
      },
      allowedLenses: ["arctic"],
      initialLens: "arctic",
    });
  });

  it("rejects empty, orphaned, repeated, and invalid-initial subsets", () => {
    const base = {
      id: "northern-sea-route",
      routes: [arctic],
      allowedLenses: ["arctic"],
      initialLens: "arctic",
    } as const;

    expect(() => parseMaritimeMapSubset({ ...base, routes: [] })).toThrow();
    expect(() =>
      parseMaritimeMapSubset({
        ...base,
        routes: [arctic, arctic],
      })
    ).toThrow();
    expect(() =>
      parseMaritimeMapSubset({
        ...base,
        allowedLenses: ["gulf"],
        initialLens: "gulf",
      })
    ).toThrow("allowed lens must resolve at least one subset route");
    expect(() =>
      parseMaritimeMapSubset({
        ...base,
        initialLens: "portfolio",
      })
    ).toThrow("initial lens must be allowed");
  });

  it("does not admit a route or point from outside the selected subset", () => {
    const subset = parseMaritimeMapSubset({
      id: "northern-sea-route",
      routes: [arctic],
      allowedLenses: ["arctic"],
      initialLens: "arctic",
    });
    const input = buildChokepointMapInput(subset);

    expect(input.routeIds).not.toContain(hormuz.id);
    expect(input.pointIdsByRoute[hormuz.id]).toBeUndefined();
  });
});
