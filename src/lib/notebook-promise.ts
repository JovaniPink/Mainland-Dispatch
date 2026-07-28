export function resolvePromiseSelection({
  search,
  validIds,
  fallbackId,
}: {
  search: string;
  validIds: ReadonlySet<string>;
  fallbackId: string;
}): {
  selectedId: string;
  invalidValue: boolean;
} {
  const value = new URLSearchParams(search).get("promise");
  if (!value) return { selectedId: fallbackId, invalidValue: false };
  if (validIds.has(value)) {
    return { selectedId: value, invalidValue: false };
  }
  return { selectedId: fallbackId, invalidValue: true };
}

export function setPromiseSelection({
  href,
  promiseId,
}: {
  href: string;
  promiseId: string | null;
}): string {
  const url = new URL(href);
  if (promiseId) {
    url.searchParams.set("promise", promiseId);
  } else {
    url.searchParams.delete("promise");
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

export const promiseSelectionEvent = "mainland:promise-selection";

export function subscribeToPromiseState(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(promiseSelectionEvent, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(promiseSelectionEvent, callback);
  };
}

export function notifyPromiseSelection() {
  window.dispatchEvent(new Event(promiseSelectionEvent));
}
