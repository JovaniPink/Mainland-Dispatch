import { splitAtAntimeridian } from "./antimeridian";

describe("splitAtAntimeridian", () => {
  it("keeps ordinary routes in one segment", () => {
    expect(
      splitAtAntimeridian([
        [43.33, 12.58],
        [32.55, 29.97],
      ])
    ).toEqual([
      [
        [43.33, 12.58],
        [32.55, 29.97],
      ],
    ]);
  });

  it("splits both sides of a Bering Strait passage at matching latitudes", () => {
    const segments = splitAtAntimeridian([
      [145, 44],
      [-169, 65.8],
      [160, 70],
    ]);

    expect(segments).toHaveLength(3);
    expect(segments[0].at(-1)?.[0]).toBe(180);
    expect(segments[1][0][0]).toBe(-180);
    expect(segments[1]).toContainEqual([-169, 65.8]);
    expect(segments[1].at(-1)?.[0]).toBe(-180);
    expect(segments[2][0][0]).toBe(180);
    expect(segments[0].at(-1)?.[1]).toBeCloseTo(60.59, 2);
    expect(segments[1][0][1]).toBeCloseTo(60.59, 2);
    expect(segments[1].at(-1)?.[1]).toBeCloseTo(67.29, 2);
    expect(segments[2][0][1]).toBeCloseTo(67.29, 2);
  });
});
