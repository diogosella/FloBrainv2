"use client";

import { useState } from "react";
import { Icon } from "../ui/Icon";

const VITALS_1 = [
  { l: "Heart rate", v: "72", u: "bpm", t: "Stable", c: "trend-stable" },
  { l: "Blood pressure", v: "118/76", u: "mmHg", t: "Normal", c: "trend-up" },
  { l: "Oxygen saturation", v: "98", u: "%", t: "Normal", c: "trend-up" },
  { l: "HRV", v: "48", u: "ms", t: "↑ +2", c: "trend-up" },
];
const VITALS_2 = [
  { l: "Weight", v: "68.2", u: "kg", t: "↓ -0.3" },
  { l: "Body fat %", v: "22.4", u: "%", t: "Stable" },
  { l: "Muscle mass", v: "31.8", u: "kg", t: "↑ +0.2" },
  { l: "Body water %", v: "58.1", u: "%", t: "Normal" },
];
const WELLNESS = [
  { l: "Recovery score", v: "78", c: "var(--buddy-health)" },
  { l: "Average sleep", v: "7.2h", c: "var(--buddy-travel)" },
  { l: "Hydration", v: "2.1L", c: "var(--buddy-data)" },
  { l: "Mood & energy", v: "7.5/10", c: "var(--warn)" },
  { l: "Stress level", v: "Low", c: "var(--success)" },
  { l: "Lean mass", v: "52.8 kg", c: "var(--text-3)" },
];
const LABS = [
  { t: "Lipid panel", r: "Normal", ref: "< 200 mg/dL", f: "Normal" },
  { t: "A1C", r: "6.2%", ref: "< 5.7%", f: "Borderline" },
  { t: "Cholesterol LDL", r: "118 mg/dL", ref: "< 100", f: "Borderline" },
  { t: "Cholesterol HDL", r: "52 mg/dL", ref: "> 40", f: "Normal" },
  { t: "Vitamin D", r: "32 ng/mL", ref: "30-100", f: "Normal" },
];
const VISITS = [
  { type: "Primary care", date: "Feb 28, 2026", reason: "Annual checkup", assessment: "Overall health stable. Continue current medications.", next: "Follow-up in 6 months", risk: "Low" },
  { type: "Cardiology", date: "Jan 15, 2026", reason: "Blood pressure monitoring", assessment: "BP well-controlled on current regimen.", next: "Next visit in 3 months", risk: "Low" },
  { type: "Urgent care", date: "Dec 3, 2025", reason: "Seasonal allergy flare-up", assessment: "Mild allergic rhinitis.", next: "As needed", risk: "Low" },
];

function RowIcon({ name, children, size = 14 }: { name: string; children: React.ReactNode; size?: number }) {
  return (
    <div className="row-item" style={{ padding: "6px 0" }}>
      <span style={{ display: "flex", alignItems: "center" }}>
        <Icon name={name} size={size} />
      </span>
      {children}
    </div>
  );
}

export function HealthDashboard() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  return (
    <>
      <div className="buddy-header fade-up">
        <div className="bh-av" style={{ background: "var(--buddy-health)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="heartbeat" size={22} />
        </div>
        <div>
          <div className="bh-name">My health dashboard</div>
          <div className="bh-domain">Health storybook · Wellness &amp; vitals</div>
        </div>
      </div>
      <div className="page fade-up">
        <div className="health-hero">
          <div className="flex-between">
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Overall wellness score</div>
              <div className="mono" style={{ fontSize: 36, fontWeight: 700, color: "var(--buddy-health)" }}>82</div>
              <div className="text-muted" style={{ fontSize: 12 }}>↑ +3 from last week</div>
            </div>
            <div className="health-toggle">
              <button className={period === "week" ? "active" : ""} onClick={() => setPeriod("week")}>This week</button>
              <button className={period === "month" ? "active" : ""} onClick={() => setPeriod("month")}>This month</button>
            </div>
          </div>
        </div>

        <div className="section-heading" style={{ fontSize: 16 }}>Current vitals</div>
        <div className="grid-4 mb-md" style={{ marginTop: 12 }}>
          {VITALS_1.map((v) => (
            <div className="vital-card" key={v.l}>
              <div className="v-label">{v.l}</div>
              <div className="v-value">{v.v}</div>
              <div className="v-unit">{v.u}</div>
              <div className={`v-trend ${v.c}`}>{v.t}</div>
            </div>
          ))}
        </div>
        <div className="grid-4 mb-md">
          {VITALS_2.map((v) => (
            <div className="vital-card" key={v.l}>
              <div className="v-label">{v.l}</div>
              <div className="v-value">{v.v}</div>
              <div className="v-unit">{v.u}</div>
              <div className="v-trend trend-stable">{v.t}</div>
            </div>
          ))}
        </div>

        <div className="section-heading" style={{ fontSize: 16 }}>Wellness metrics</div>
        <div className="grid-3 mb-md" style={{ marginTop: 12 }}>
          {WELLNESS.map((w) => (
            <div className="stat-card" key={w.l}>
              <div className="label">{w.l}</div>
              <div className="value" style={{ color: w.c }}>{w.v}</div>
            </div>
          ))}
        </div>

        <div className="grid-2 mb-md">
          <div className="card">
            <div className="card-title">Conditions</div>
            {[
              { n: "Hypertension", s: "Managed", c: "pill-green" },
              { n: "Type 2 diabetes", s: "Controlled", c: "pill-green" },
              { n: "Seasonal allergies", s: "Active", c: "pill-amber" },
            ].map((c) => (
              <div className="commission-row" key={c.n}>
                <span>{c.n}</span>
                <span className={`pill ${c.c}`}>{c.s}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">Allergies</div>
            <div className="chip-row">
              <span className="pill pill-red">Penicillin</span>
              <span className="pill pill-amber">Pollen</span>
              <span className="pill pill-amber">Dust mites</span>
            </div>
          </div>
        </div>

        <div className="card mb-md">
          <div className="card-title">Medication history</div>
          <table className="data-table">
            <thead>
              <tr><th>Medication</th><th>Dosage</th><th>Frequency</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>Lisinopril</td><td className="mono">10 mg</td><td>Daily</td><td>Blood pressure management</td></tr>
              <tr><td>Metformin</td><td className="mono">500 mg</td><td>Twice daily</td><td>Blood sugar control</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card mb-md">
          <div className="card-title">Lab results</div>
          <table className="data-table">
            <thead>
              <tr><th>Test</th><th>Result</th><th>Reference</th><th>Flag</th></tr>
            </thead>
            <tbody>
              {LABS.map((l) => (
                <tr key={l.t}>
                  <td>{l.t}</td>
                  <td className="mono">{l.r}</td>
                  <td className="text-muted">{l.ref}</td>
                  <td><span className={`pill ${l.f === "Normal" ? "pill-green" : "pill-amber"}`}>{l.f}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card mb-md">
          <div className="card-title">Visit summaries</div>
          {VISITS.map((v) => (
            <div key={v.type} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
              <div className="flex-between">
                <strong style={{ fontSize: 13 }}>{v.type}</strong>
                <span className="text-muted" style={{ fontSize: 11 }}>{v.date}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-4)", marginTop: 4 }}><strong>Reason:</strong> {v.reason}</div>
              <div style={{ fontSize: 12, color: "var(--text-4)" }}><strong>Assessment:</strong> {v.assessment}</div>
              <div style={{ fontSize: 12, color: "var(--text-4)" }}><strong>Next:</strong> {v.next} · <span className="pill pill-green">{v.risk} risk</span></div>
            </div>
          ))}
        </div>

        <div className="grid-2 mb-md">
          <div className="card">
            <div className="card-title">Family history</div>
            <RowIcon name="user">Father — Hypertension, Type 2 diabetes</RowIcon>
            <RowIcon name="user">Mother — Thyroid condition</RowIcon>
            <RowIcon name="user">Grandfather — Heart disease</RowIcon>
          </div>
          <div className="card">
            <div className="card-title">Surgeries &amp; immunizations</div>
            <div className="row-item" style={{ padding: "6px 0" }}>Appendectomy — 2018</div>
            <div className="row-item" style={{ padding: "6px 0" }}>COVID-19 vaccine — Booster Jan 2026</div>
            <div className="row-item" style={{ padding: "6px 0" }}>Flu shot — Oct 2025</div>
          </div>
        </div>

        <div className="card mb-md">
          <div className="card-title">Wearables sync</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div className="wearable-chip" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="activity" size={14} /> Apple Watch Series 9 <span className="sync">Synced 2 min ago</span>
            </div>
            <div className="wearable-chip" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="activity" size={14} /> Garmin Forerunner <span className="sync">Synced 15 min ago</span>
            </div>
            <div className="wearable-chip" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="drop" size={14} /> Smart water bottle <span className="sync">Synced 1h ago</span>
            </div>
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Recommended actions</div>
            <RowIcon name="pill">Schedule A1C follow-up test</RowIcon>
            <RowIcon name="activity">Increase daily steps to 8,000</RowIcon>
            <RowIcon name="drop">Maintain hydration above 2.5L</RowIcon>
          </div>
          <div className="card">
            <div className="card-title">Questions for provider</div>
            <RowIcon name="help">Should I adjust Metformin dosage?</RowIcon>
            <RowIcon name="help">Vitamin D supplementation needed?</RowIcon>
            <RowIcon name="help">Exercise plan for BP management</RowIcon>
          </div>
        </div>
      </div>
    </>
  );
}
