import { formatDate, formatDateShort } from "./site";

describe("editorial date formatting", () => {
  it("uses deterministic month labels across server and browser runtimes", () => {
    expect(formatDate("2026-09-17")).toBe("17 SEP 2026");
    expect(formatDateShort("2026-09-17")).toBe("17 SEP");
  });

  it("rejects malformed dates instead of formatting them inconsistently", () => {
    expect(() => formatDate("not-a-date")).toThrow(/Expected an ISO date/);
  });
});
