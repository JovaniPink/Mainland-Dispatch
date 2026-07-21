/** @jest-environment node */

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { atlasReleases } from "./atlas";

describe("Atlas source artifacts", () => {
  it("stores every declared artifact and verifies its SHA-256 checksum", async () => {
    const artifacts = atlasReleases.flatMap((release) =>
      release.sources.flatMap((source) =>
        source.artifact ? [{ sourceId: source.id, ...source.artifact }] : []
      )
    );

    expect(artifacts.length).toBeGreaterThan(0);

    for (const artifact of artifacts) {
      const bytes = await readFile(path.join(process.cwd(), artifact.path));
      const checksum = createHash("sha256").update(bytes).digest("hex");
      expect({ sourceId: artifact.sourceId, checksum }).toEqual({
        sourceId: artifact.sourceId,
        checksum: artifact.sha256,
      });
    }
  });
});
