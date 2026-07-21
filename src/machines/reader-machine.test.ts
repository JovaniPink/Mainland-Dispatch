import { createActor } from "xstate";
import { readerMachine } from "./reader-machine";

describe("readerMachine", () => {
  it("moves between browsing, filtering, and searching", () => {
    const actor = createActor(readerMachine).start();
    actor.send({ type: "FILTER_VERTICAL", vertical: "culture" });
    expect(actor.getSnapshot().value).toEqual({ browsing: "filtering" });
    actor.send({ type: "SEARCH", query: "smic" });
    expect(actor.getSnapshot().value).toBe("searching");
    actor.send({ type: "CLEAR_SEARCH" });
    expect(actor.getSnapshot().context.query).toBe("");
  });

  it("accepts filter events while searching so search and filters combine", () => {
    const actor = createActor(readerMachine).start();
    actor.send({ type: "SEARCH", query: "export" });
    actor.send({ type: "FILTER_VERTICAL", vertical: "technology" });
    actor.send({ type: "FILTER_KIND", kind: "document" });
    const snap = actor.getSnapshot();
    expect(snap.value).toBe("searching");
    expect(snap.context).toMatchObject({
      query: "export",
      vertical: "technology",
      kind: "document",
    });
  });

  it("resets search and filters in one event", () => {
    const actor = createActor(readerMachine).start();
    actor.send({ type: "FILTER_VERTICAL", vertical: "culture" });
    actor.send({ type: "SEARCH", query: "film" });
    actor.send({ type: "RESET_FILTERS" });
    expect(actor.getSnapshot().context).toEqual({
      vertical: "all",
      kind: "all",
      query: "",
    });
  });
});
