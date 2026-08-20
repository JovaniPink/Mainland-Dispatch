export type LongitudeLatitude = [number, number];

/**
 * Split a geographic line at the antimeridian so a renderer does not draw the
 * short Pacific crossing across the full map instead.
 */
export function splitAtAntimeridian(
  coordinates: LongitudeLatitude[]
): LongitudeLatitude[][] {
  if (coordinates.length < 2) return [coordinates.map((point) => [...point])];

  const segments: LongitudeLatitude[][] = [[[...coordinates[0]]]];

  for (let index = 1; index < coordinates.length; index += 1) {
    const previous = coordinates[index - 1];
    const next = coordinates[index];
    const longitudeDelta = next[0] - previous[0];
    const current = segments[segments.length - 1];

    if (Math.abs(longitudeDelta) <= 180) {
      current.push([...next]);
      continue;
    }

    const boundaryLongitude = longitudeDelta > 180 ? -180 : 180;
    const adjustedNextLongitude =
      longitudeDelta > 180 ? next[0] - 360 : next[0] + 360;
    const crossingRatio =
      (boundaryLongitude - previous[0]) / (adjustedNextLongitude - previous[0]);
    const crossingLatitude =
      previous[1] + (next[1] - previous[1]) * crossingRatio;
    const oppositeBoundary = boundaryLongitude === 180 ? -180 : 180;

    current.push([boundaryLongitude, crossingLatitude]);
    segments.push([[oppositeBoundary, crossingLatitude], [...next]]);
  }

  return segments;
}
