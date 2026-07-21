"use client";

import { useSyncExternalStore } from "react";

type Theme = "paper" | "night";

const THEME_EVENT = "md-theme-change";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "night" ? "night" : "paper";
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "paper");

  function toggle() {
    const next: Theme = readTheme() === "paper" ? "night" : "paper";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("md-theme", next);
    } catch {}
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      onClick={toggle}
      className="border border-rule px-2 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-ink"
      aria-label={`Switch to ${theme === "paper" ? "Night" : "Paper"} theme`}
    >
      {theme === "paper" ? "Night" : "Paper"}
    </button>
  );
}
