"use client";

import { useApp } from "../state/AppContext";

const COURSES = [
  { name: "Design fundamentals", progress: 100, hours: "12/12", due: "Done", status: "complete" },
  { name: "AI-native product design", progress: 75, hours: "18/24", due: "Jul 18", status: "in-progress" },
  { name: "User research methods", progress: 60, hours: "9/15", due: "Jul 25", status: "in-progress" },
  { name: "Design systems at scale", progress: 40, hours: "6/15", due: "Aug 2", status: "pending" },
  { name: "Venture studio operations", progress: 20, hours: "3/15", due: "Aug 10", status: "pending" },
  { name: "Health tech & wellness design", progress: 0, hours: "0/12", due: "Aug 20", status: "not-started" },
];
const BRAINWRITING = [
  { name: "Brainwriting: Space VI hero concepts", status: "submitted", due: "Done", desc: "Submitted 2 ideas" },
  { name: "Brainwriting: AI onboarding flows", status: "pending", due: "Jul 15", desc: "3 ideas required" },
  { name: "Brainwriting: Legal room UX", status: "not-started", due: "Jul 22", desc: "Workshop session" },
];
const ONBOARDING_ITEMS = [
  { name: "Complete profile setup", done: true, desc: "Add avatar, bio, and role" },
  { name: "Join your first room", done: true, desc: "Design room · Done" },
  { name: "Try the Design buddy", done: true, desc: "Ask it your first question" },
  { name: "Submit a brainwriting idea", done: true, desc: "Submitted Jul 3" },
  { name: "Complete Design fundamentals masterclass", done: true, desc: "12 / 12 hrs" },
  { name: "Set your weekly focus session", done: false, desc: "Configure FloTimer" },
  { name: "Invite a teammate", done: false, desc: "Growth milestone" },
  { name: "Complete AI-native product design", done: false, desc: "18 / 24 hrs · Jul 18" },
  { name: "Explore the Vault", done: false, desc: "Upload or review a file" },
  { name: "Run your first weekly report", done: false, desc: "Cockpit → Report" },
];
const STATUS_COLOR: Record<string, string> = {
  complete: "#45D483",
  "in-progress": "#8B6BFF",
  pending: "#D98A4A",
  "not-started": "#6E7280",
};
const CARD: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "13px 16px",
  background: "var(--bg-2)",
  border: "1px solid var(--line-2)",
  borderRadius: 8,
};

export function Masterclasses() {
  const app = useApp();
  const tab = app.state.mcTab;

  return (
    <div style={{ padding: "28px 36px", overflowY: "auto", flex: 1 }}>
      <div style={{ marginBottom: 6, fontSize: 22, fontWeight: 700, letterSpacing: "-.02em", color: "var(--text)" }}>Masterclasses</div>
      <div style={{ fontSize: 12, color: "var(--text-5)", marginBottom: 24 }}>Workshops, brainwriting sessions, and guided learning.</div>
      <div style={{ display: "flex", gap: 2, background: "var(--bg-3)", borderRadius: 8, padding: 3, marginBottom: 28, width: "fit-content", border: "1px solid var(--line-2)" }}>
        {(["masterclasses", "onboarding"] as const).map((t) => (
          <button
            key={t}
            onClick={() => app.patch({ mcTab: t })}
            style={{
              padding: "7px 18px",
              borderRadius: 6,
              border: "none",
              fontSize: 12.5,
              fontWeight: 600,
              fontFamily: "var(--font)",
              cursor: "pointer",
              background: tab === t ? "var(--accent)" : "transparent",
              color: tab === t ? "#fff" : "var(--text-5)",
            }}
          >
            {t === "masterclasses" ? "Masterclasses" : "Onboarding"}
          </button>
        ))}
      </div>

      {tab === "masterclasses" ? (
        <>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: "var(--text-5)" }}>Overall progress</div>
              <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,.08)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "40%", height: "100%", background: "var(--accent)", borderRadius: 3 }} />
              </div>
              <span className="mono" style={{ fontSize: 12, color: "var(--accent-soft)" }}>48 / 120 hr</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {COURSES.map((c) => {
              const col = STATUS_COLOR[c.status] || "#6E7280";
              const label = c.status === "in-progress" ? "In progress" : c.status === "complete" ? "Done" : c.status === "not-started" ? "Not started" : "Pending";
              return (
                <div style={CARD} key={c.name}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-5)" }}>{c.hours} hrs · Due {c.due}</div>
                  </div>
                  <div style={{ width: 80, height: 4, background: "rgba(255,255,255,.08)", borderRadius: 2, flexShrink: 0 }}>
                    <div style={{ width: `${c.progress}%`, height: "100%", background: col, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: col + "22", color: col, whiteSpace: "nowrap" }}>{label}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 14 }}>Brainwriting</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {BRAINWRITING.map((b) => {
                const col = b.status === "submitted" ? "#45D483" : b.status === "pending" ? "#D98A4A" : "#6E7280";
                const label = b.status === "submitted" ? "Submitted" : b.status === "pending" ? "Pending" : "Not started";
                return (
                  <div style={CARD} key={b.name}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-5)" }}>{b.desc} · Due {b.due}</div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: col + "22", color: col }}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: "var(--text-5)" }}>Setup progress</div>
              <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,.08)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "50%", height: "100%", background: "#45D483", borderRadius: 3 }} />
              </div>
              <span className="mono" style={{ fontSize: 12, color: "#45D483" }}>5 / 10 done</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {ONBOARDING_ITEMS.map((o) => (
              <div style={{ ...CARD, padding: "12px 16px", opacity: o.done ? 0.65 : 1 }} key={o.name}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...(o.done ? { background: "#45D483" } : { border: "2px solid rgba(255,255,255,.2)" }),
                  }}
                >
                  {o.done && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", ...(o.done ? { textDecoration: "line-through", color: "var(--text-4)" } : {}) }}>{o.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-5)" }}>{o.desc}</div>
                </div>
                {!o.done && <button className="btn btn-sm" style={{ flexShrink: 0 }}>Start</button>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
