import { createActor } from "xstate";
import { archiveMachine } from "./archive-machine";

describe("archiveMachine", () => {
  it("owns view and evidence-filter transitions", () => {
    const actor = createActor(archiveMachine).start();

    actor.send({ type: "SET_VIEW", view: "timeline" });
    actor.send({ type: "FILTER_EVIDENCE", evidence: "contested" });

    expect(actor.getSnapshot().context).toEqual(
      expect.objectContaining({
        view: "timeline",
        evidence: "contested",
      })
    );
  });

  it("hydrates shareable filters and resets to the public default", () => {
    const actor = createActor(archiveMachine).start();

    actor.send({
      type: "HYDRATE",
      filters: {
        view: "relationships",
        publisher: "ChinaFile",
        year: "2016",
        inquirySlug: "what-xi-jinping-wants",
      },
    });
    expect(actor.getSnapshot().context).toEqual(
      expect.objectContaining({
        view: "relationships",
        publisher: "ChinaFile",
        year: "2016",
        inquirySlug: "what-xi-jinping-wants",
      })
    );

    actor.send({ type: "RESET" });
    expect(actor.getSnapshot().context).toEqual(
      expect.objectContaining({
        view: "cards",
        publisher: "all",
        year: "all",
        inquirySlug: "open-models-closed-system",
      })
    );
  });

  it("owns Notebook inquiry selection", () => {
    const actor = createActor(archiveMachine).start();

    actor.send({
      type: "SELECT_INQUIRY",
      inquirySlug: "what-xi-jinping-wants",
    });

    expect(actor.getSnapshot().context.inquirySlug).toBe(
      "what-xi-jinping-wants"
    );
  });
});
