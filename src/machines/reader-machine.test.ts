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

  it("tracks focus modes and clears on BACK", () => {
    const actor = createActor(readerMachine).start();
    actor.send({ type: "FOCUS", slug: "some-dispatch" });
    expect(actor.getSnapshot().value).toEqual({ focused: "reading" });
    actor.send({ type: "COMPARE" });
    expect(actor.getSnapshot().value).toEqual({ focused: "comparing" });
    actor.send({ type: "TRACE" });
    expect(actor.getSnapshot().value).toEqual({ focused: "tracing" });
    actor.send({ type: "BACK" });
    expect(actor.getSnapshot().context.focusedSlug).toBeNull();
  });
});
