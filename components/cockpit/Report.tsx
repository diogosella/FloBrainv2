"use client";

import { Icon } from "../ui/Icon";

const TEAM_ROWS = [
  { n: "Dina Tarek", h: 38, t: 9, i: 94, s: "On track" },
  { n: "Diogo Sela", h: 32, t: 8, i: 76, s: "On track" },
  { n: "Meryll Robles", h: 35, t: 7, i: 88, s: "On track" },
  { n: "Kendra Avery", h: 28, t: 6, i: 72, s: "At risk" },
  { n: "Amara Okafor", h: 30, t: 5, i: 68, s: "On track" },
];

function RowIcon({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="row-item" style={{ padding: "6px 0" }}>
      <span style={{ display: "flex", alignItems: "center" }}>
        <Icon name={name} size={14} />
      </span>
      {children}
    </div>
  );
}

export function Report() {
  return (
    <div className="page" style={{ padding: 16 }}>
      <div className="grid-4 mb-md">
        <div className="stat-card">
          <div className="label">Total hours</div>
          <div className="value">
            127<span style={{ fontSize: 14, color: "var(--text-5)" }}> / 450</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="label">Tasks done</div>
          <div className="value">
            8<span style={{ fontSize: 14, color: "var(--text-5)" }}> / 12</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="label">Avg impact</div>
          <div className="value" style={{ color: "var(--accent-soft)" }}>
            76<span style={{ fontSize: 14, color: "var(--text-5)" }}> / 100</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="label">Blocked tasks</div>
          <div className="value" style={{ color: "var(--danger)" }}>
            2
          </div>
          <div className="sub">Need attention</div>
        </div>
      </div>

      <div className="card mb-md">
        <div className="card-title">Team performance · This week</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Hours</th>
              <th>Tasks</th>
              <th>Impact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {TEAM_ROWS.map((r) => (
              <tr key={r.n}>
                <td>{r.n}</td>
                <td className="mono">{r.h}</td>
                <td className="mono">{r.t}</td>
                <td className="mono" style={{ color: "var(--accent-soft)" }}>
                  {r.i}
                </td>
                <td>
                  <span className={`pill ${r.s === "On track" ? "pill-green" : "pill-amber"}`}>{r.s}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Top accomplishments</div>
          <RowIcon name="checkmark">Design system audit 80% complete</RowIcon>
          <RowIcon name="checkmark">FloBrain V2 mockup delivered</RowIcon>
          <RowIcon name="checkmark">3 brainwriting ideas approved</RowIcon>
        </div>
        <div className="card">
          <div className="card-title">Blockers</div>
          <RowIcon name="alertico">Vendor brief awaiting legal review</RowIcon>
          <RowIcon name="alertico">API spec blocked on architecture decision</RowIcon>
        </div>
      </div>

      <div className="card mt-md">
        <div className="card-title">Upcoming deadlines</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Due</th>
              <th>Owner</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Design system tokens</td>
              <td className="mono">Jul 3</td>
              <td>Diogo</td>
              <td>
                <span className="pill pill-violet">High</span>
              </td>
            </tr>
            <tr>
              <td>Vendor brief review</td>
              <td className="mono">Jul 5</td>
              <td>Diogo</td>
              <td>
                <span className="pill pill-amber">Medium</span>
              </td>
            </tr>
            <tr>
              <td>Bernard demo prep</td>
              <td className="mono">Jul 4</td>
              <td>Team</td>
              <td>
                <span className="pill pill-violet">High</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
