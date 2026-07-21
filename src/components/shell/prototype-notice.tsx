export function PrototypeNotice() {
  return (
    <aside
      className="prototype-notice mx-4 mt-4 flex flex-col gap-1 border-l-2 border-signal bg-signal-soft/45 px-4 py-3 sm:mx-6 sm:flex-row sm:items-baseline sm:justify-between"
      aria-label="Prototype content notice"
    >
      <p className="font-serif text-sm leading-relaxed">
        <strong className="font-semibold">
          Editorial interface prototype.
        </strong>{" "}
        Headlines, dates, quotations, bylines, figures, and links are
        fictionalized samples—not published reporting.
      </p>
      <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-widest text-signal">
        Demo content
      </span>
    </aside>
  );
}
