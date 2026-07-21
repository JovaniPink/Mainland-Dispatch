"use client";

/**
 * Collapsible development-mode inspector: statecharts stay visible artifacts
 * rather than invisible component logic. Renders nothing in production.
 */
export function StateLab({
  title,
  state,
  lastEvent,
  nextEvents,
  history = [],
  zodResult,
}: {
  title: string;
  state: unknown;
  lastEvent: string | null;
  nextEvents: string[];
  history?: string[];
  zodResult?: { ok: boolean; issues: string[] } | null;
}) {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <details className="mt-2 border border-dashed border-jade bg-jade-soft/40 font-mono text-xs">
      <summary className="cursor-pointer px-3 py-1.5 uppercase tracking-widest text-jade">
        State Lab · {title}
      </summary>
      <div className="space-y-2 px-3 pb-3 text-ink">
        <p>
          <span className="text-ink-muted">state:</span>{" "}
          {JSON.stringify(state)}
        </p>
        <p>
          <span className="text-ink-muted">last event:</span>{" "}
          {lastEvent ?? "—"}
        </p>
        <p>
          <span className="text-ink-muted">available events:</span>{" "}
          {nextEvents.join(", ") || "—"}
        </p>
        {history.length > 0 && (
          <div>
            <p className="text-ink-muted">transition history:</p>
            <ol className="list-decimal pl-5">
              {history.slice(-8).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ol>
          </div>
        )}
        {zodResult && (
          <div>
            <p className="text-ink-muted">
              zod:{" "}
              <span className={zodResult.ok ? "text-jade" : "text-signal"}>
                {zodResult.ok ? "valid" : `${zodResult.issues.length} issue(s)`}
              </span>
            </p>
            {zodResult.issues.length > 0 && (
              <ul className="list-disc pl-5 text-signal">
                {zodResult.issues.slice(0, 10).map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </details>
  );
}
