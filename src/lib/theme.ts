export type Theme = "paper" | "night";

export const THEME_STORAGE_KEY = "md-theme";
export const THEME_EVENT = "md-theme-change";
export const PAPER_THEME_COLOR = "#f3f0e8";
export const NIGHT_THEME_COLOR = "#17201d";

export function normalizeTheme(value: string | null): Theme {
  return value === "night" ? "night" : "paper";
}

export function applyDocumentTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme =
    theme === "night" ? "dark" : "light";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute(
      "content",
      theme === "night" ? NIGHT_THEME_COLOR : PAPER_THEME_COLOR
    );
}

export function initializeDocumentTheme(): void {
  let storedTheme: string | null = null;
  try {
    storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch {}
  applyDocumentTheme(normalizeTheme(storedTheme));
}

export const THEME_INIT_SCRIPT = `(()=>{try{var t=localStorage.getItem("${THEME_STORAGE_KEY}")==="night"?"night":"paper";var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t==="night"?"dark":"light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==="night"?"${NIGHT_THEME_COLOR}":"${PAPER_THEME_COLOR}"}catch(e){}})()`;
