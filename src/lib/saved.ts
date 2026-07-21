"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "md-saved";
const CHANGE_EVENT = "md-saved-change";
const EMPTY: string[] = [];
let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cachedRaw) return cachedIds;
    cachedRaw = raw;
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedIds = Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : EMPTY;
    return cachedIds;
  } catch {
    return EMPTY;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function write(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
    cachedRaw = null;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {}
}

/** Saved-reading collection backed by localStorage. */
export function useSaved() {
  const saved = useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggle = useCallback((id: string) => {
    const current = read();
    write(
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    );
  }, []);

  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);

  return { saved, toggle, isSaved };
}
