"use client";

import { useApp } from "../state/AppContext";
import type { RightRailPrefs } from "../state/AppContext";

const LAYOUT: { key: keyof RightRailPrefs; label: string }[] = [
  { key: "leftCol", label: "Show left column" },
  { key: "rightRail", label: "Show right rail" },
  { key: "compact", label: "Compact density" },
  { key: "fullWidth", label: "Full-width content" },
];
const WIDGETS: { key: keyof RightRailPrefs; label: string }[] = [
  { key: "impact", label: "Impact score" },
  { key: "progress", label: "My progress" },
  { key: "myTasks", label: "My tasks" },
  { key: "buddies", label: "Buddies" },
];

export function CustomizeDrawer() {
  const app = useApp();
  const { drawerOpen, rightRail } = app.state;

  const setPref = (key: keyof RightRailPrefs, value: boolean) => {
    const next = { ...rightRail, [key]: value };
    app.patch({ rightRail: next });
    const out: Record<string, number> = {};
    (Object.keys(next) as (keyof RightRailPrefs)[]).forEach((k) => (out[k] = next[k] ? 1 : 0));
    localStorage.setItem("fb_customize2", JSON.stringify(out));
  };

  return (
    <>
      <div className={`drawer-overlay${drawerOpen ? " open" : ""}`} onClick={() => app.patch({ drawerOpen: false })} />
      <div className={`drawer${drawerOpen ? " open" : ""}`} id="customizeDrawer">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: "-.02em" }}>Customize</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => app.patch({ drawerOpen: false })}>
            Done
          </button>
        </div>

        <div className="drawer-section">
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 10 }}>Layout</div>
          {LAYOUT.map((l) => (
            <label className="check-row" key={l.key}>
              <input type="checkbox" checked={!!rightRail[l.key]} onChange={(e) => setPref(l.key, e.target.checked)} /> {l.label}
            </label>
          ))}
        </div>

        <div className="drawer-section" style={{ marginTop: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 10 }}>Right rail widgets</div>
          {WIDGETS.map((w) => (
            <label className="check-row" key={w.key}>
              <input type="checkbox" checked={!!rightRail[w.key]} onChange={(e) => setPref(w.key, e.target.checked)} /> {w.label}
            </label>
          ))}
        </div>

        <div className="drawer-section" style={{ marginTop: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 10 }}>Default cockpit tab</div>
          <select className="input" defaultValue="ai">
            <option value="ai">AI chat</option>
            <option value="tasks">Tasks</option>
            <option value="report">Report</option>
            <option value="docs">Docs</option>
          </select>
        </div>
      </div>
    </>
  );
}
