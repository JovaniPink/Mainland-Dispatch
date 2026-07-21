"use client";

function formatToday(): string {
  return new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

/** Re-evaluates in the browser; suppression covers a midnight hydration edge. */
export function TodayDate() {
  return (
    <time
      dateTime={new Date().toISOString().slice(0, 10)}
      suppressHydrationWarning
    >
      {formatToday()} ·{" "}
    </time>
  );
}
