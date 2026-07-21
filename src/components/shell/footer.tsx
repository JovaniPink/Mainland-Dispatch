import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-rule px-4 py-8 sm:px-6">
      <p className="max-w-xl font-serif text-sm italic text-ink-muted">
        {site.principle}
      </p>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
        {site.name} · {site.volume}
      </p>
    </footer>
  );
}
