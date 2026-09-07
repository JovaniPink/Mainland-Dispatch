import type { ArcticRouteNotebookEntry } from "@/content/notebook/schema";
import { FigureSources } from "./figure-sources";
import { MaritimeScaleCards } from "./maritime-risk-graphics";

export function ArcticCorridorFigure({
  entry,
}: {
  entry: ArcticRouteNotebookEntry;
}) {
  const route = entry.routes[0];
  const xs = route.path.map(([x]) => x);
  const ys = route.path.map(([, y]) => y);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs);
  const minY = Math.min(...ys),
    maxY = Math.max(...ys);
  const points = route.path
    .map(
      ([x, y]) =>
        `${30 + ((x - minX) / (maxX - minX || 1)) * 660},${110 - ((y - minY) / (maxY - minY || 1)) * 80}`
    )
    .join(" ");
  return (
    <figure
      aria-labelledby="arctic-corridor-title"
      className="border-y border-rule py-6"
    >
      <figcaption id="arctic-corridor-title">
        <span className="font-mono text-xs uppercase tracking-widest text-jade">
          Seasonal corridor · interpretation
        </span>
        <span className="mt-3 block font-serif text-2xl">
          A shorter line still has a limited operating window
        </span>
      </figcaption>
      <svg
        viewBox="0 0 720 140"
        aria-hidden="true"
        className="mt-5 w-full text-jade"
      >
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8 5"
        />
      </svg>
      <p className="text-sm leading-6">
        {route.label}. The schematic follows the admitted route geometry; it is
        not a vessel track or evidence of completed passage.
      </p>
      <div className="mt-5 border-l-2 border-jade pl-4">
        <p className="font-mono text-xs uppercase tracking-widest text-jade">
          Scientific route guidance
        </p>
        <p className="mt-2 text-lg">
          Broad July–October window · mid-September optimum
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          Climatological guidance does not certify conditions for a particular
          vessel or voyage. Local ice risk persists.
        </p>
      </div>
      <FigureSources
        ids={[
          ...new Set([
            ...route.sourceIds,
            ...entry.scaleMetrics.flatMap((metric) => metric.sourceIds),
            "notebook-source-risk-nsidc-passage",
          ]),
        ]}
        sources={entry.sourceTrail}
      />
      <div className="mt-7">
        <MaritimeScaleCards metrics={entry.scaleMetrics} />
      </div>
    </figure>
  );
}
