import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeToggle } from "./theme-toggle";
import {
  applyDocumentTheme,
  initializeDocumentTheme,
  NIGHT_THEME_COLOR,
  PAPER_THEME_COLOR,
} from "@/lib/theme";

describe("theme authority", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.removeProperty("color-scheme");
    document.head.innerHTML = '<meta name="theme-color" content="#000000">';
  });

  it("initializes the saved theme across the page and browser chrome", () => {
    localStorage.setItem("md-theme", "night");

    initializeDocumentTheme();

    expect(document.documentElement.dataset.theme).toBe("night");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      NIGHT_THEME_COLOR
    );
  });

  it("uses Paper when no saved preference exists", () => {
    initializeDocumentTheme();

    expect(document.documentElement.dataset.theme).toBe("paper");
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      PAPER_THEME_COLOR
    );
  });

  it("keeps the toggle, saved preference, and browser chrome in sync", () => {
    applyDocumentTheme("paper");
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: /switch to night/i }));

    expect(localStorage.getItem("md-theme")).toBe("night");
    expect(document.documentElement.dataset.theme).toBe("night");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      NIGHT_THEME_COLOR
    );
  });

  it("applies theme changes saved by another tab", () => {
    applyDocumentTheme("night");
    render(<ThemeToggle />);

    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "md-theme",
        newValue: "paper",
      })
    );

    expect(document.documentElement.dataset.theme).toBe("paper");
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      PAPER_THEME_COLOR
    );
  });
});
