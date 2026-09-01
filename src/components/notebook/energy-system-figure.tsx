import type { EnergySystemNotebookEntry } from "@/content/notebook/schema";

type EnergySystemFigureProps = Readonly<{
  layers: EnergySystemNotebookEntry["energyLayers"];
  sources: EnergySystemNotebookEntry["sourceTrail"];
}>;

const evidenceLabels = {
  "official-measurement": "Official measurement",
  "independent-analysis": "Independent analysis",
  "modeled-estimate": "Modeled estimate",
  forecast: "Forecast",
} as const;

export function EnergySystemFigure({
  layers,
  sources,
}: EnergySystemFigureProps) {
  const sourcesById = new Map(sources.map((source) => [source.id, source]));
  const requireSource = (sourceId: string) => {
    const source = sourcesById.get(sourceId);
    if (!source) throw new Error(`energy system missing source ${sourceId}`);
    return source;
  };

  return (
    <figure
      aria-labelledby="energy-system-title"
      className="border border-rule bg-paper-warm/20 p-4 sm:p-6"
    >
      <figcaption id="energy-system-title" className="max-w-3xl">
        <span className="font-mono text-[0.65rem] uppercase tracking-widest text-jade">
          One system, four different questions
        </span>
        <span className="mt-2 block font-serif text-2xl leading-tight">
          Share, output, capacity, and system use are not one scale.
        </span>
        <span className="mt-3 block text-sm leading-6 text-ink-muted">
          Read each numbered band in its own unit and period. Evidence labels
          state whether a value is official, independently analyzed, modeled, or
          forecast.
        </span>
      </figcaption>

      <ol className="mt-8 grid gap-6">
        {layers.map((layer, layerIndex) => (
          <li key={layer.id} className="border-t border-rule pt-6">
            <header className="grid gap-2 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-5">
              <p className="font-mono text-3xl leading-none text-signal">
                {String(layerIndex + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-serif text-2xl leading-tight">
                  {layer.label}
                </h3>
                <p className="mt-1 text-sm leading-6 text-ink-muted">
                  {layer.question}
                </p>
              </div>
            </header>

            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {layer.measures.map((measure) => (
                <li
                  key={measure.id}
                  className="flex min-w-0 flex-col border border-rule bg-paper p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h4 className="max-w-xs font-serif text-xl leading-tight">
                      {measure.label}
                    </h4>
                    <span className="border border-jade px-2 py-1 font-mono text-[0.58rem] uppercase tracking-widest text-jade">
                      {evidenceLabels[measure.evidenceKind]}
                    </span>
                  </div>

                  <p className="mt-5 font-serif text-4xl leading-none text-signal">
                    {measure.display}
                  </p>
                  <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
                    {measure.unit} - {measure.period}
                  </p>

                  <p className="mt-5 text-sm leading-7">
                    <strong>Reading:</strong> {measure.interpretation}
                  </p>
                  <p className="mt-4 border-l-2 border-jade pl-3 text-xs leading-6 text-ink-muted">
                    <strong className="text-ink">Counter-reading:</strong>{" "}
                    {measure.counterReading}
                  </p>

                  <details className="energy-system-details mt-5 border-t border-rule">
                    <summary className="cursor-pointer py-3 font-mono text-[0.62rem] uppercase tracking-widest text-signal">
                      Comparison, method, boundary, and sources
                    </summary>
                    <div className="space-y-4 border-t border-rule pt-4 text-xs leading-6 text-ink-muted">
                      <p>
                        <strong className="text-ink">Comparison:</strong>{" "}
                        {measure.comparison}
                      </p>
                      <p>
                        <strong className="text-ink">Basis:</strong>{" "}
                        {measure.basis}
                      </p>
                      <p>
                        <strong className="text-ink">Boundary:</strong>{" "}
                        {measure.boundary}
                      </p>

                      {measure.contrasts.length > 0 && (
                        <dl className="grid gap-3 border-t border-rule pt-4">
                          {measure.contrasts.map((contrast) => (
                            <div key={contrast.id}>
                              <dt className="font-mono uppercase tracking-widest text-ink">
                                {contrast.label} - {contrast.display}
                              </dt>
                              <dd className="mt-1">
                                {evidenceLabels[contrast.evidenceKind]} -{" "}
                                {contrast.period} - {contrast.comparison}.{" "}
                                {contrast.boundary}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      <nav
                        aria-label={`${measure.label} sources`}
                        className="flex flex-wrap gap-x-4 gap-y-2 border-t border-rule pt-4"
                      >
                        {measure.sourceIds.map((sourceId) => {
                          const source = requireSource(sourceId);
                          return (
                            <a
                              key={sourceId}
                              href={`#${sourceId}`}
                              className="font-mono text-[0.6rem] uppercase tracking-widest text-signal hover:text-ink"
                            >
                              {source.role}
                            </a>
                          );
                        })}
                      </nav>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
