"use client";

import { useEffect, useState } from "react";
import { useApp } from "../state/AppContext";

function ProgressLine({ label, value, width, color }: { label: string; value: string; width: string; color: string }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-5)", marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color: "var(--text-3)", fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,.07)", borderRadius: 2 }}>
        <div style={{ width, height: "100%", background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}

function BuddyRow({
  buddyKey,
  gradient,
  name,
  sub,
  live,
  onClick,
}: {
  buddyKey: string;
  gradient: string;
  name: string;
  sub: string;
  live: string;
  onClick: () => void;
}) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "5px 6px", borderRadius: 5 }}
      onClick={onClick}
    >
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {buddyKey === "design" && (
            <>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
            </>
          )}
          {buddyKey === "health" && (
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          )}
          {buddyKey === "vault" && (
            <>
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </>
          )}
        </svg>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--text)" }}>{name}</div>
        <div style={{ fontSize: 10, color: "var(--text-5)" }}>{sub}</div>
      </div>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: live, flexShrink: 0, marginLeft: "auto" }} />
    </div>
  );
}

export function RightRail() {
  const app = useApp();
  const { rightRail } = app.state;
  // Animate the impact ring on mount (matches original behaviour).
  const [ringOffset, setRingOffset] = useState(188.5);
  useEffect(() => {
    const t = setTimeout(() => setRingOffset(45), 300);
    return () => clearTimeout(t);
  }, []);

  if (!rightRail.rightRail) {
    return <aside className="right-rail collapsed" id="rightRail" />;
  }

  return (
    <aside className="right-rail" id="rightRail">
      {rightRail.impact && (
        <div className="rr-widget" id="rr-impact">
          <div className="rr-widget-title">Impact score</div>
          <div className="impact-ring-wrap">
            <div className="impact-ring">
              <svg viewBox="0 0 72 72">
                <circle className="ring-bg" cx="36" cy="36" r="30" />
                <circle className="ring-fill" cx="36" cy="36" r="30" strokeDasharray="188.5" strokeDashoffset={ringOffset} />
              </svg>
              <div className="impact-num">76</div>
            </div>
            <div className="impact-meta">
              <div className="trend" style={{ fontSize: 11, color: "#3DB8A8" }}>↑ +4 this week</div>
              <div className="tier" style={{ fontSize: 10.5, color: "var(--text-5)", marginTop: 2 }}>Tier: Contributor</div>
            </div>
          </div>
        </div>
      )}

      {rightRail.progress && (
        <div className="rr-widget" id="rr-progress" style={{ borderTop: "1px solid rgba(255,255,255,.04)", paddingTop: 14, marginTop: 4 }}>
          <div className="rr-widget-title">This week</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            <ProgressLine label="Tasks done" value="8 / 12" width="67%" color="#7C5CFF" />
            <ProgressLine label="Focus time" value="14h 20m" width="80%" color="#3DB8A8" />
            <ProgressLine label="Docs written" value="3" width="40%" color="#F59E0B" />
          </div>
        </div>
      )}

      {rightRail.myTasks && (
        <div className="rr-widget" id="rr-my-tasks" style={{ borderTop: "1px solid rgba(255,255,255,.04)", paddingTop: 14, marginTop: 4 }}>
          <div className="rr-widget-title" style={{ marginBottom: 8 }}>My tasks</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {["Space VI hero redesign", "Legal VI copy review", "Onboarding walkthrough", "Design system tokens"].map((t) => (
              <label className="rr-task-row" key={t}>
                <input type="checkbox" className="rr-task-cb" />
                <span className="rr-task-label">{t}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {rightRail.buddies && (
        <div className="rr-widget" id="rr-buddies" style={{ borderTop: "1px solid rgba(255,255,255,.04)", paddingTop: 14, marginTop: 4 }}>
          <div className="rr-widget-title" style={{ marginBottom: 8 }}>Buddies</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <BuddyRow buddyKey="design" gradient="linear-gradient(135deg,#7C5CFF,#A78BFA)" name="Design" sub="UI · Figma · Systems" live="#3DB8A8" onClick={() => app.openBuddy("design")} />
            <BuddyRow buddyKey="health" gradient="linear-gradient(135deg,#3DB8A8,#34D399)" name="Health" sub="Wellness · Habits" live="#3DB8A8" onClick={() => app.openBuddy("health")} />
            <BuddyRow buddyKey="vault" gradient="linear-gradient(135deg,#F59E0B,#FCD34D)" name="Vault" sub="Files · Knowledge" live="rgba(255,255,255,.2)" onClick={() => app.navigate("vault")} />
          </div>
        </div>
      )}
    </aside>
  );
}
