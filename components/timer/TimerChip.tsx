"use client";

import { useApp } from "../state/AppContext";
import { TIMER_ENTRIES } from "@/data";
import { Icon } from "../ui/Icon";

const TAGS: { tag: string; color: string }[] = [
  { tag: "Brainwriting", color: "#9B6DFF" },
  { tag: "Checking emails", color: "#E85D8C" },
  { tag: "Go-To-Market Team", color: "#8E9099" },
  { tag: "Masterclass", color: "#3DB8A8" },
  { tag: "Onboarding", color: "#E85D8C" },
  { tag: "Recordings of meetings", color: "#D4A04A" },
  { tag: "Research", color: "#7C5CFF" },
  { tag: "Team calls", color: "#5B9BD5" },
  { tag: "Team chats", color: "#D98A4A" },
  { tag: "Team meetings", color: "#E85D8C" },
];

function fmt(sec: number) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function TimerChip() {
  const app = useApp();
  const { state } = app;
  const open = state.timerDropdownOpen;

  const timeStr = fmt(state.timerSeconds);

  const stateBar =
    state.timerState === "running"
      ? { dot: "#45D483", shadow: "0 0 0 3px rgba(69,212,131,.2)", label: `Tracking · ${state.timerSession}${state.timerTag ? " · " + state.timerTag : ""}`, labelColor: "#45D483" }
      : state.timerState === "paused"
      ? { dot: "#D98A4A", shadow: "0 0 0 3px rgba(217,138,74,.2)", label: "Paused", labelColor: "#D98A4A" }
      : state.timerTag
      ? { dot: state.timerTagColor || "var(--text-5)", shadow: "none", label: "Tag: " + state.timerTag, labelColor: state.timerTagColor || "var(--text-5)" }
      : { dot: "var(--text-5)", shadow: "none", label: "No active session", labelColor: "var(--text-5)" };

  const mainLabel = state.timerState === "running" ? "Pause" : state.timerState === "paused" ? "Resume" : "Start";
  const mainStyle =
    state.timerState === "running"
      ? { background: "rgba(217,138,74,.15)", color: "#D98A4A", borderColor: "rgba(217,138,74,.3)" }
      : state.timerState === "paused"
      ? { background: "rgba(69,212,131,.12)", color: "#45D483", borderColor: "rgba(69,212,131,.25)" }
      : {};

  return (
    <div className="timer-wrap">
      <div
        className="timer-chip"
        id="timerChip"
        onClick={() => app.patch({ timerDropdownOpen: !open })}
      >
        <button
          className={`timer-play${state.timerState !== "running" ? " paused" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            app.timerMain();
          }}
        >
          <Icon name={state.timerState === "running" ? "pauseico" : "playico"} size={10} />
        </button>
        <span className="time mono" id="timerDisplay">
          {state.timerState === "idle" ? "00:00" : timeStr}
        </span>
        <span className="session" id="timerSession">
          {state.timerSession}
        </span>
      </div>
      <div className={`timer-dropdown${open ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="td-head" style={{ marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>FloTimer</span>
          <button className="btn btn-ghost btn-sm" onClick={() => app.patch({ modal: "timerDetails", timerDropdownOpen: false })}>
            History
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 12px",
            background: "var(--bg-3)",
            border: "1px solid var(--line-2)",
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: stateBar.dot, boxShadow: stateBar.shadow, flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: stateBar.labelColor, flex: 1 }}>{stateBar.label}</span>
          <span className="mono" style={{ fontSize: 12, color: "var(--text-3)" }}>
            {state.timerState === "idle" ? "00:00" : timeStr}
          </span>
        </div>
        <input
          className="input mb-md"
          value={state.timerSession}
          onChange={(e) => app.patch({ timerSession: e.target.value })}
          placeholder="Session label…"
          style={{ fontSize: 12 }}
        />
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 7 }}>
            Tag
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 180, overflowY: "auto", paddingRight: 2 }}>
            {TAGS.map((t) => {
              const active = state.timerTag === t.tag;
              return (
                <div
                  key={t.tag}
                  className="timer-tag-opt"
                  onClick={() => app.selectTimerTag(t.tag, t.color)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "5px 8px",
                    borderRadius: 6,
                    cursor: "pointer",
                    background: active ? "rgba(255,255,255,.06)" : undefined,
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: active ? "#F4F5F9" : "var(--text-3)" }}>{t.tag}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-primary btn-sm" style={{ flex: 1, ...mainStyle }} onClick={() => app.timerMain()}>
            {mainLabel}
          </button>
          {state.timerState !== "idle" && (
            <button className="btn btn-sm" style={{ padding: "6px 10px" }} title="Stop tracking" onClick={() => app.timerStop()}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="3" />
              </svg>
            </button>
          )}
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", margin: "14px 0 6px" }}>
          Recent sessions
        </div>
        <div id="timerEntries">
          {TIMER_ENTRIES.map((e, i) => (
            <div className="td-entry" key={i}>
              <span>{e.session}</span>
              <span className="dur">{e.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
