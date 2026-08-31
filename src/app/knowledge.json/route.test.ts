/** @jest-environment node */

import { GET } from "@/app/knowledge.json/route";
import { mainlandKnowledgeIndex } from "@/content/knowledge-index";

describe("public knowledge index route", () => {
  it("serves the validated public projection as JSON", async () => {
    const response = await GET();
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toEqual(mainlandKnowledgeIndex);
  });
});
