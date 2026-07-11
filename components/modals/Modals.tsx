"use client";

import { useState } from "react";
import { useApp } from "../state/AppContext";
import { ACCOUNTS, TIMER_ENTRIES } from "@/data";

function ModalShell({
  id,
  width,
  children,
}: {
  id: string;
  width?: number;
  children: React.ReactNode;
}) {
  const app = useApp();
  return (
    <div
      className="modal-overlay open"
      id={id}
      onClick={(e) => {
        if (e.target === e.currentTarget) app.patch({ modal: null });
      }}
    >
      <div className="modal" style={width ? { width } : undefined}>
        {children}
      </div>
    </div>
  );
}

function AssignModal() {
  const app = useApp();
  return (
    <ModalShell id="assignModal">
      <h2>
        Assign task to <span id="amName">{app.state.assignTarget || "team member"}</span>
      </h2>
      <div className="tp-field">
        <label className="tp-label">Task name</label>
        <input className="input" placeholder="e.g. Refresh /careers hero copy" />
      </div>
      <div className="grid-2 gap-sm">
        <div className="tp-field">
          <label className="tp-label">Priority</label>
          <select className="input" defaultValue="med">
            <option value="high">High</option>
            <option value="med">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="tp-field">
          <label className="tp-label">Due date</label>
          <input className="input" placeholder="Wed · Jul 5" />
        </div>
      </div>
      <div className="tp-field">
        <label className="tp-label">Description</label>
        <textarea className="input" placeholder="Context, links, acceptance criteria…" />
      </div>
      <div className="modal-actions">
        <button className="btn" onClick={() => app.patch({ modal: null })}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={() => app.submitAssign()}>
          Assign
        </button>
      </div>
    </ModalShell>
  );
}

function AccountsModal() {
  const app = useApp();
  return (
    <ModalShell id="manageAccountsModal">
      <h2>Manage accounts</h2>
      <div id="accountList">
        {ACCOUNTS.map((a) => (
          <div className="row-item" key={a.email} style={{ padding: "10px 0" }}>
            <div className="av-sm" style={{ background: "var(--gradient)", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff" }}>
              {a.init}
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: 13 }}>{a.name}</strong>
              <div className="text-muted" style={{ fontSize: 11 }}>
                {a.email}
              </div>
            </div>
            {a.active ? (
              <span className="pill pill-green">Active</span>
            ) : (
              <button className="btn btn-sm" onClick={() => app.toast("Switched to " + a.name)}>
                Switch
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="modal-actions">
        <button className="btn" onClick={() => app.patch({ modal: null })}>
          Close
        </button>
      </div>
    </ModalShell>
  );
}

function PinAnnModal() {
  const app = useApp();
  const [text, setText] = useState("Priority this week: Space VI + Legal VI redesigns before Wednesday meeting.");
  return (
    <ModalShell id="pinAnnModal">
      <h2>Pin announcement</h2>
      <textarea
        className="input"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Post a pinned announcement to the team…"
      />
      <div className="modal-actions">
        <button className="btn" onClick={() => app.patch({ modal: null })}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={() => app.postAnnouncement(text)}>
          Pin
        </button>
      </div>
    </ModalShell>
  );
}

function TimerDetailsModal() {
  const app = useApp();
  return (
    <ModalShell id="timerDetailsModal" width={520}>
      <h2>FloTimer details</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Session</th>
            <th>Duration</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {TIMER_ENTRIES.map((e, i) => (
            <tr key={i}>
              <td>{e.session}</td>
              <td className="mono">{e.duration}</td>
              <td className="mono">{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal-actions">
        <button className="btn" onClick={() => app.patch({ modal: null })}>
          Close
        </button>
      </div>
    </ModalShell>
  );
}

function ShortcutsModal() {
  const app = useApp();
  const nav = [
    ["Command palette", "⌘K"],
    ["Global search", "⌘/"],
    ["Spaces home", "⌘1"],
    ["Cockpit", "⌘2"],
    ["Toggle inbox", "⌘I"],
    ["Focus mode", "⌘."],
  ];
  const actions = [
    ["Shortcuts", "?"],
    ["Close overlay", "Esc"],
  ];
  const kbd: React.CSSProperties = { fontSize: 10, padding: "2px 6px", background: "var(--bg-5)", borderRadius: 4 };
  return (
    <ModalShell id="shortcutsModal" width={520}>
      <h2>Keyboard shortcuts</h2>
      <div className="grid-2" style={{ gap: 24 }}>
        <div>
          <div className="rr-widget-title">Navigation</div>
          {nav.map(([l, k]) => (
            <div className="commission-row" key={l}>
              <span>{l}</span>
              <span className="mono" style={kbd}>
                {k}
              </span>
            </div>
          ))}
        </div>
        <div>
          <div className="rr-widget-title">Actions</div>
          {actions.map(([l, k]) => (
            <div className="commission-row" key={l}>
              <span>{l}</span>
              <span className="mono" style={kbd}>
                {k}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="modal-actions">
        <button className="btn" onClick={() => app.patch({ modal: null })}>
          Close
        </button>
      </div>
    </ModalShell>
  );
}

export function Modals() {
  const { state } = useApp();
  switch (state.modal) {
    case "assign":
      return <AssignModal />;
    case "accounts":
      return <AccountsModal />;
    case "pinAnn":
      return <PinAnnModal />;
    case "timerDetails":
      return <TimerDetailsModal />;
    case "shortcuts":
      return <ShortcutsModal />;
    default:
      return null;
  }
}
