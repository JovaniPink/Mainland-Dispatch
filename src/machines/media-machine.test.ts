import { createActor } from "xstate";
import { mediaMachine } from "./media-machine";

describe("mediaMachine", () => {
  it("waits in loading until the media reports readiness", () => {
    const actor = createActor(mediaMachine).start();
    actor.send({ type: "CONSENT" });
    expect(actor.getSnapshot().value).toBe("loading");
    actor.send({ type: "LOADED" });
    expect(actor.getSnapshot().value).toBe("playing");
  });

  it("supports error, retry, and reset paths", () => {
    const actor = createActor(mediaMachine).start();
    actor.send({ type: "CONSENT" });
    actor.send({ type: "ERROR" });
    expect(actor.getSnapshot().value).toBe("unavailable");
    actor.send({ type: "RETRY" });
    expect(actor.getSnapshot().value).toBe("loading");
    actor.send({ type: "LOADED" });
    actor.send({ type: "RESET" });
    expect(actor.getSnapshot().value).toBe("poster");
  });
});
