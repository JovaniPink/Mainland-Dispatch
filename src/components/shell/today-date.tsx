"use client";

import { useEffect, useState } from "react";

/**
 * The masthead date must reflect the reader's day, not the build day, so it
 * renders client-side after mount (statically prerendered pages would
 * otherwise freeze new Date() at build time).
 */
export function TodayDate() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(
      new Date()
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase()
    );
  }, []);

  if (!label) return null;
  return <>{label} · </>;
}
