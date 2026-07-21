import { createActor } from "xstate";
import { compareMachine, traceMachine } from "./explorer-machines";

describe("explorer machines", () => {
  it("selects a valid comparison source and ignores an invalid index", () => {
    const actor = createActor(compareMachine, {
      input: { sourceCount: 3 },
    }).start();
    actor.send({ type: "SELECT_SOURCE", index: 2 });
    expect(actor.getSnapshot().context.selectedIndex).toBe(2);
    actor.send({ type: "SELECT_SOURCE", index: 9 });
    expect(actor.getSnapshot().context.selectedIndex).toBe(2);
  });

  it("selects only entries present in the trace", () => {
    const actor = createActor(traceMachine, {
      input: { initialId: "t-01", entryIds: ["t-01", "t-02"] },
    }).start();
    actor.send({ type: "SELECT_ENTRY", id: "t-02" });
    expect(actor.getSnapshot().context.selectedId).toBe("t-02");
    actor.send({ type: "SELECT_ENTRY", id: "missing" });
    expect(actor.getSnapshot().context.selectedId).toBe("t-02");
  });
});
