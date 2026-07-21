"use client";

import { useEffect, useState } from "react";

type Theme = "paper" | "night";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("paper");

  useEffect(() => {
    const stored = document.documentElement.dataset.theme;
    if (stored === "night") setTheme("night");
  }, []);

  function toggle() {
    const next: Theme = theme === "paper" ? "night" : "paper";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("md-theme", next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      className="font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-ink border border-rule px-2 py-1"
      aria-label={`Switch to ${theme === "paper" ? "Night" : "Paper"} theme`}
    >
      {theme === "paper" ? "Night" : "Paper"}
    </button>
  );
}
