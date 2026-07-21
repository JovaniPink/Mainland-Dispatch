import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { TodayDate } from "./today-date";

export function Masthead() {
  return (
    <header className="border-b border-rule">
      <div className="flex items-baseline justify-between gap-4 px-4 py-5 sm:px-6">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {site.name.toUpperCase()}
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-xs tracking-widest text-ink-muted sm:inline">
            <TodayDate />
            {site.volume}
          </span>
          <ThemeToggle />
        </div>
      </div>
      <nav className="chip-row overflow-x-auto border-t border-rule px-4 sm:px-6">
        <ul className="flex gap-6 py-2.5 whitespace-nowrap">
          {site.nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-signal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
