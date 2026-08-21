"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { z } from "zod";

const EPISODE_RUNTIME_SECONDS = 65 * 60 + 30;

export const NOTEBOOK_FIVE_AUDIO_AUDIT_STORAGE_KEY =
  "md-desk-notebook-five-audio-audit-v1";
const NOTEBOOK_FIVE_AUDIO_AUDIT_CHANGE_EVENT =
  "md-desk-notebook-five-audio-audit-change";

const passageDefinitions = [
  {
    id: "first-shock-definition",
    title: "Episode's definition of the first shock",
    claimBoundary:
      "Must separate the speakers' framing from the historical labor literature",
  },
  {
    id: "second-shock-mechanism",
    title: "Mechanism behind the second shock",
    claimBoundary:
      "Must separate saving, property, policy, productivity, imports, currency, and exports",
  },
  {
    id: "distribution",
    title: "Who benefits and who loses",
    claimBoundary:
      "Must distinguish consumers, input users, firms, workers, places, and governments",
  },
  {
    id: "germany-destinations",
    title: "Germany and destination exposure",
    claimBoundary:
      "Must not convert a guest argument into settled causal attribution",
  },
  {
    id: "policy",
    title: "Tariffs, industrial policy, and coordination",
    claimBoundary:
      "Must identify the target problem and the intervention's own costs",
  },
  {
    id: "ai-software",
    title: "AI and software",
    claimBoundary:
      'May support a scenario question only, not an observed "third shock"',
  },
] as const;

type PassageId = (typeof passageDefinitions)[number]["id"];
const AuditStateSchema = z.enum(["blocked", "in-progress", "audited"]);
type AuditState = z.infer<typeof AuditStateSchema>;

type PassageDraft = {
  startTime: string;
  endTime: string;
  speakerAttribution: string;
  attributedParaphrase: string;
  boundaryAssessment: string;
  auditState: AuditState;
};

type WorksheetDraft = Record<PassageId, PassageDraft>;

const PassageDraftSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  speakerAttribution: z.string(),
  attributedParaphrase: z.string(),
  boundaryAssessment: z.string(),
  auditState: AuditStateSchema,
});

const StoredWorksheetSchema = z.object({
  version: z.literal(1),
  passages: z.record(z.string(), PassageDraftSchema),
});

const emptyPassage = (): PassageDraft => ({
  startTime: "",
  endTime: "",
  speakerAttribution: "",
  attributedParaphrase: "",
  boundaryAssessment: "",
  auditState: "blocked",
});

function createEmptyWorksheet(): WorksheetDraft {
  return {
    "first-shock-definition": emptyPassage(),
    "second-shock-mechanism": emptyPassage(),
    distribution: emptyPassage(),
    "germany-destinations": emptyPassage(),
    policy: emptyPassage(),
    "ai-software": emptyPassage(),
  };
}

function restoreWorksheet(raw: string | null): WorksheetDraft | null {
  if (!raw) return null;

  try {
    const parsed = StoredWorksheetSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return null;

    const restored = createEmptyWorksheet();
    for (const passage of passageDefinitions) {
      const savedPassage = parsed.data.passages[passage.id];
      if (savedPassage) restored[passage.id] = savedPassage;
    }
    return restored;
  } catch {
    return null;
  }
}

const serverWorksheet = createEmptyWorksheet();
let cachedWorksheetRaw: string | null | undefined;
let cachedWorksheet = serverWorksheet;

function readWorksheet(): WorksheetDraft {
  try {
    const raw = localStorage.getItem(NOTEBOOK_FIVE_AUDIO_AUDIT_STORAGE_KEY);
    if (raw === cachedWorksheetRaw) return cachedWorksheet;

    cachedWorksheetRaw = raw;
    cachedWorksheet = restoreWorksheet(raw) ?? createEmptyWorksheet();
    return cachedWorksheet;
  } catch {
    return cachedWorksheet;
  }
}

function subscribeToWorksheet(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === null ||
      event.key === NOTEBOOK_FIVE_AUDIO_AUDIT_STORAGE_KEY
    ) {
      cachedWorksheetRaw = undefined;
      callback();
    }
  };

  window.addEventListener(NOTEBOOK_FIVE_AUDIO_AUDIT_CHANGE_EVENT, callback);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(
      NOTEBOOK_FIVE_AUDIO_AUDIT_CHANGE_EVENT,
      callback
    );
    window.removeEventListener("storage", handleStorage);
  };
}

function writeWorksheet(worksheet: WorksheetDraft): boolean {
  const raw = JSON.stringify({ version: 1, passages: worksheet });
  cachedWorksheet = worksheet;
  cachedWorksheetRaw = raw;

  let persisted = true;
  try {
    localStorage.setItem(NOTEBOOK_FIVE_AUDIO_AUDIT_STORAGE_KEY, raw);
  } catch {
    persisted = false;
  }

  window.dispatchEvent(new Event(NOTEBOOK_FIVE_AUDIO_AUDIT_CHANGE_EVENT));
  return persisted;
}

function parseElapsedTime(value: string): number | null {
  const parts = value.trim().split(":");
  if (parts.length < 2 || parts.length > 3) return null;
  if (parts.some((part) => !/^\d+$/.test(part))) return null;

  const numbers = parts.map(Number);
  const seconds = numbers.at(-1) ?? 0;
  const minutes = numbers.at(-2) ?? 0;
  const hours = parts.length === 3 ? numbers[0] : 0;

  if (seconds > 59 || (parts.length === 3 && minutes > 59)) return null;

  const total = hours * 3600 + minutes * 60 + seconds;
  return total <= EPISODE_RUNTIME_SECONDS ? total : null;
}

function formatElapsedTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const minuteText = hours > 0 ? String(minutes).padStart(2, "0") : minutes;
  const secondText = String(seconds).padStart(2, "0");

  return hours > 0
    ? `${hours}:${minuteText}:${secondText}`
    : `${minuteText}:${secondText}`;
}

function normalizedElapsedTime(value: string): string | null {
  const total = parseElapsedTime(value);
  return total === null ? null : formatElapsedTime(total);
}

function spanIssue(passage: PassageDraft): string | null {
  const start = passage.startTime ? parseElapsedTime(passage.startTime) : null;
  const end = passage.endTime ? parseElapsedTime(passage.endTime) : null;

  if (passage.startTime && start === null) return "Start time is invalid.";
  if (passage.endTime && end === null) return "End time is invalid.";
  if (start !== null && end !== null && start > end) {
    return "End time must follow start time.";
  }
  return null;
}

function passageIsComplete(passage: PassageDraft): boolean {
  return (
    passage.auditState === "audited" &&
    Boolean(passage.startTime && passage.endTime) &&
    spanIssue(passage) === null &&
    Boolean(passage.speakerAttribution.trim()) &&
    Boolean(passage.attributedParaphrase.trim()) &&
    Boolean(passage.boundaryAssessment.trim())
  );
}

const inputClassName =
  "w-full border border-rule bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-signal";
const labelClassName =
  "font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted";

export function NotebookFiveAudioAudit() {
  const worksheet = useSyncExternalStore(
    subscribeToWorksheet,
    readWorksheet,
    () => serverWorksheet
  );
  const [storageStatus, setStorageStatus] = useState(
    "Changes save locally in this browser."
  );
  const [elapsedTime, setElapsedTime] = useState("");
  const [elapsedError, setElapsedError] = useState<string | null>(null);
  const [captureStatus, setCaptureStatus] = useState(
    "No elapsed time captured in this session."
  );

  const completedCount = useMemo(
    () =>
      passageDefinitions.filter((passage) =>
        passageIsComplete(worksheet[passage.id])
      ).length,
    [worksheet]
  );

  function updatePassage(id: PassageId, patch: Partial<PassageDraft>) {
    const nextWorksheet = {
      ...worksheet,
      [id]: { ...worksheet[id], ...patch },
    };
    setStorageStatus(
      writeWorksheet(nextWorksheet)
        ? "Saved locally in this browser."
        : "Local storage is unavailable; changes remain in this tab only."
    );
  }

  function captureTime(
    id: PassageId,
    title: string,
    edge: "startTime" | "endTime"
  ) {
    const normalized = normalizedElapsedTime(elapsedTime);
    if (!normalized) {
      setElapsedError("Enter a time from 00:00 through 1:05:30.");
      return;
    }

    updatePassage(id, { [edge]: normalized });
    setElapsedTime(normalized);
    setElapsedError(null);
    setCaptureStatus(
      `${normalized} captured as the ${edge === "startTime" ? "start" : "end"} for ${title}.`
    );
  }

  return (
    <section className="border border-signal bg-paper p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Withheld commission · manual evidence work
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-tight">
            Notebook Five audio audit
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
            Complete the six required passages for The Ezra Klein Show’s “The
            China Shock 2.0.” This Desk worksheet does not load audio, embed a
            player, or make a third-party request. Operate the publisher audio
            separately and enter its displayed elapsed time below.
          </p>
        </div>
        <div className="border border-rule bg-paper-warm/50 px-3 py-2 text-right font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
          <p>{completedCount} of 6 passage audits complete</p>
          <p className="mt-1 text-jade" aria-live="polite">
            {storageStatus}
          </p>
        </div>
      </div>

      <fieldset
        className="mt-5 border border-rule bg-paper-warm/30 p-3"
        aria-describedby="elapsed-time-help capture-status"
      >
        <legend className="px-1 font-mono text-xs uppercase tracking-widest text-jade">
          Elapsed-time capture
        </legend>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-end">
          <label className="grid gap-1">
            <span className={labelClassName}>Player elapsed time</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              value={elapsedTime}
              onChange={(event) => {
                setElapsedTime(event.target.value);
                setElapsedError(null);
              }}
              placeholder="MM:SS or H:MM:SS"
              aria-invalid={elapsedError ? true : undefined}
              aria-describedby={
                elapsedError
                  ? "elapsed-time-help elapsed-time-error"
                  : "elapsed-time-help"
              }
              className={inputClassName}
            />
          </label>
          <div>
            <p
              id="elapsed-time-help"
              className="text-xs leading-relaxed text-ink-muted"
            >
              Use MM:SS or H:MM:SS, through the 1:05:30 runtime boundary. Type
              the time shown by the separately opened player, then use a
              passage’s capture button. Times remain directly editable.
            </p>
            {elapsedError && (
              <p
                id="elapsed-time-error"
                role="alert"
                className="mt-1 text-xs font-medium text-ink"
              >
                {elapsedError}
              </p>
            )}
            <p
              id="capture-status"
              className="mt-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted"
              aria-live="polite"
            >
              {captureStatus}
            </p>
          </div>
        </div>
      </fieldset>

      <div className="mt-5 space-y-4">
        {passageDefinitions.map((passage, index) => {
          const draft = worksheet[passage.id];
          const issue = spanIssue(draft);
          const normalizedStart = normalizedElapsedTime(draft.startTime);
          const normalizedEnd = normalizedElapsedTime(draft.endTime);
          const hasValidSpan =
            normalizedStart && normalizedEnd && issue === null;
          const boundaryId = `${passage.id}-boundary`;
          const timeIssueId = `${passage.id}-time-issue`;

          return (
            <fieldset
              key={passage.id}
              className="border border-rule p-3 sm:p-4"
              aria-describedby={boundaryId}
            >
              <legend className="max-w-[calc(100%-1rem)] px-1 font-serif text-lg leading-snug">
                <span
                  aria-hidden="true"
                  className="mr-2 font-mono text-xs text-jade"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {passage.title}
              </legend>

              <div className="mt-2 border-l-2 border-signal pl-3">
                <p className={labelClassName}>Required claim boundary</p>
                <p
                  id={boundaryId}
                  className="mt-1 text-sm leading-relaxed text-ink-muted"
                >
                  {passage.claimBoundary}
                </p>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                <div className="grid gap-2 border border-rule bg-paper-warm/30 p-3 sm:grid-cols-2">
                  <label className="grid gap-1">
                    <span className={labelClassName}>Start time</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      spellCheck={false}
                      value={draft.startTime}
                      onChange={(event) =>
                        updatePassage(passage.id, {
                          startTime: event.target.value,
                        })
                      }
                      aria-label={`Start time for ${passage.title}`}
                      aria-invalid={
                        draft.startTime && !normalizedStart ? true : undefined
                      }
                      aria-describedby={
                        issue
                          ? `elapsed-time-help ${timeIssueId}`
                          : "elapsed-time-help"
                      }
                      placeholder="MM:SS"
                      className={inputClassName}
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className={labelClassName}>End time</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      spellCheck={false}
                      value={draft.endTime}
                      onChange={(event) =>
                        updatePassage(passage.id, {
                          endTime: event.target.value,
                        })
                      }
                      aria-label={`End time for ${passage.title}`}
                      aria-invalid={
                        draft.endTime && !normalizedEnd ? true : undefined
                      }
                      aria-describedby={
                        issue
                          ? `elapsed-time-help ${timeIssueId}`
                          : "elapsed-time-help"
                      }
                      placeholder="MM:SS"
                      className={inputClassName}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      captureTime(passage.id, passage.title, "startTime")
                    }
                    aria-label={`Capture start for ${passage.title}`}
                    className="border border-rule px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest hover:border-signal hover:text-jade"
                  >
                    Capture start
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      captureTime(passage.id, passage.title, "endTime")
                    }
                    aria-label={`Capture end for ${passage.title}`}
                    className="border border-rule px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest hover:border-signal hover:text-jade"
                  >
                    Capture end
                  </button>
                  <p className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted sm:col-span-2">
                    {hasValidSpan
                      ? `Exact span · ${normalizedStart}–${normalizedEnd}`
                      : "Exact span · not complete"}
                  </p>
                  {issue && (
                    <p
                      id={timeIssueId}
                      className="text-xs font-medium text-ink sm:col-span-2"
                    >
                      {issue}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <label className="grid gap-1">
                    <span className={labelClassName}>Speaker attribution</span>
                    <input
                      type="text"
                      value={draft.speakerAttribution}
                      onChange={(event) =>
                        updatePassage(passage.id, {
                          speakerAttribution: event.target.value,
                        })
                      }
                      aria-label={`Speaker attribution for ${passage.title}`}
                      placeholder="Speaker name and turn boundary"
                      className={inputClassName}
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className={labelClassName}>Audit state</span>
                    <select
                      value={draft.auditState}
                      onChange={(event) =>
                        updatePassage(passage.id, {
                          auditState: AuditStateSchema.parse(
                            event.target.value
                          ),
                        })
                      }
                      aria-label={`Audit state for ${passage.title}`}
                      className={inputClassName}
                    >
                      <option value="blocked">
                        Blocked pending manual audit
                      </option>
                      <option value="in-progress">In progress</option>
                      <option value="audited">Passage audited</option>
                    </select>
                  </label>
                </div>

                <label className="grid gap-1 lg:col-span-2">
                  <span className={labelClassName}>Attributed paraphrase</span>
                  <textarea
                    rows={3}
                    value={draft.attributedParaphrase}
                    onChange={(event) =>
                      updatePassage(passage.id, {
                        attributedParaphrase: event.target.value,
                      })
                    }
                    aria-label={`Attributed paraphrase for ${passage.title}`}
                    placeholder="Record a checked paraphrase, not a quotation…"
                    className={inputClassName}
                  />
                </label>

                <label className="grid gap-1 lg:col-span-2">
                  <span className={labelClassName}>
                    Claim-boundary assessment
                  </span>
                  <textarea
                    rows={3}
                    value={draft.boundaryAssessment}
                    onChange={(event) =>
                      updatePassage(passage.id, {
                        boundaryAssessment: event.target.value,
                      })
                    }
                    aria-label={`Claim-boundary assessment for ${passage.title}`}
                    placeholder="Explain what this passage supports and what it does not establish…"
                    className={inputClassName}
                  />
                </label>
              </div>
            </fieldset>
          );
        })}
      </div>

      <p className="mt-4 border-l-2 border-jade pl-3 text-xs leading-relaxed text-ink-muted">
        Local completion is an editorial working state only. It does not approve
        the commission or authorize a public Notebook route, catalog entry,
        sitemap record, transcript claim, or publication action.
      </p>
    </section>
  );
}
