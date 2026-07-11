"use client";

import { useState } from "react";
import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";

function IconSpan({ name, size = 14 }: { name: string; size?: number }) {
  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      <Icon name={name} size={size} />
    </span>
  );
}

/* ── Home ── */
export function Home() {
  const app = useApp();
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setChecks((c) => ({ ...c, [i]: !c[i] }));
  const todos = [
    "Update design system color scales",
    "Review wireframe v4 feedback",
    "Connect Claude to GitHub",
  ];
  return (
    <>
      <div className="page-hero">Good morning, Diogo</div>
      <div className="page-sub">Here&apos;s what&apos;s happening in your personal space today.</div>
      <div className="card mb-md">
        <div className="card-title">Quick tips</div>
        <div className="card-sub">
          Complete your onboarding checklist — 2 steps remaining. Review the design system audit before Thursday&apos;s meeting.
        </div>
      </div>
      <div className="card-title">Browse recent documents &amp; tasks</div>
      <div className="row-item">
        <IconSpan name="file" />
        <div>
          <strong>Design system audit</strong>
          <div className="text-muted" style={{ fontSize: 11 }}>Updated by Dina · 2h ago</div>
        </div>
      </div>
      <div className="row-item">
        <IconSpan name="file" />
        <div>
          <strong>Vendor requirements brief</strong>
          <div className="text-muted" style={{ fontSize: 11 }}>In review · v2</div>
        </div>
      </div>
      <div className="row-item">
        <IconSpan name="check" />
        <div>
          <strong>Update design system tokens</strong>
          <div className="text-muted" style={{ fontSize: 11 }}>Due Thursday</div>
        </div>
      </div>
      <div className="card-title mt-md">Personal to-do</div>
      {todos.map((t, i) => (
        <div className={`check-row${checks[i] ? " done" : ""}`} key={t}>
          <input type="checkbox" checked={!!checks[i]} onChange={() => toggle(i)} />
          <span className={checks[i] ? "done" : ""}>{t}</span>
        </div>
      ))}
      <div className="check-row done">
        <input type="checkbox" checked readOnly className="done" />
        <span className="done">Submit brainwriting idea</span>
      </div>
      <button className="btn btn-sm mt-sm" onClick={() => app.toast("New to-do added")}>
        Add to-do task
      </button>
    </>
  );
}

/* ── Progress ── */
export function Progress() {
  return (
    <>
      <div className="page-hero">Progress tracker</div>
      <div className="page-sub">Overall internship progress against 500-hour goal</div>
      <div className="grid-3 mb-md">
        <div className="stat-card">
          <div className="label">Program hours</div>
          <div className="value">127</div>
          <div className="sub">of 450 target</div>
        </div>
        <div className="stat-card">
          <div className="label">Hours remaining</div>
          <div className="value">323</div>
          <div className="sub">to 500-hour goal</div>
        </div>
        <div className="stat-card">
          <div className="label">Impact score</div>
          <div className="value" style={{ color: "var(--accent-soft)" }}>76</div>
          <div className="sub">Contributor tier</div>
        </div>
      </div>
      <div className="card mb-md">
        <div className="card-title">Hours breakdown</div>
        <div className="commission-row"><span>Onboarding</span><span className="mono">12 hr</span></div>
        <div className="commission-row"><span>Masterclass</span><span className="mono">31 hr</span></div>
        <div className="commission-row"><span>Projects</span><span className="mono">84 hr</span></div>
        <div className="progress-bar mt-sm" style={{ height: 8 }}>
          <div className="fill" style={{ width: "28%" }} />
        </div>
      </div>
      <div className="grid-2">
        <div className="stat-card">
          <div className="label">This week tasks</div>
          <div className="value">
            8<span style={{ fontSize: 14, color: "var(--text-5)" }}> / 12</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="label">Streak</div>
          <div className="value" style={{ color: "var(--warn)" }}>
            14<span style={{ fontSize: 14 }}> days</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Documents ── */
export function Documents() {
  const app = useApp();
  const docs = [
    "Design system",
    "Design system audit",
    "Design system color scales",
    "Style guide scope",
    "Vendor requirements brief/checklist",
    "User research findings",
    "Onboarding flow notes",
  ];
  return (
    <>
      <div className="page-hero">Documents</div>
      <div className="page-sub">Create, edit, and manage project documents</div>
      <button className="btn btn-primary mb-md" onClick={() => app.toast("New document created")}>
        Create a new document
      </button>
      <div className="grid-2">
        {docs.map((d) => (
          <div className="card row-item" key={d} style={{ borderRadius: "var(--r-md)", cursor: "pointer" }} onClick={() => app.toast(`Opened: ${d}`)}>
            <span>📄</span>
            <div>
              <strong style={{ fontSize: 13 }}>{d.charAt(0).toUpperCase() + d.slice(1)}</strong>
              <div className="text-muted" style={{ fontSize: 11 }}>Last edited recently</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card mt-md">
        <div className="card-title">Document editor</div>
        <input className="input mb-md" placeholder="Document title" defaultValue="Design system audit" />
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Heading 1</div>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "var(--text-3)" }}>Heading 2</div>
        <p style={{ color: "var(--text-4)", marginBottom: 12 }}>Start writing…</p>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", margin: "12px 0 4px" }}>Description</div>
        <div className="input" style={{ minHeight: 40 }}>
          Comprehensive audit of the FloLabs design system against industry standards.
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", margin: "12px 0 4px" }}>Acceptance criteria</div>
        <div className="input" style={{ minHeight: 40 }}>
          All components documented, color scales verified, accessibility checked.
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", margin: "12px 0 4px" }}>Figma links</div>
        <div className="input" style={{ minHeight: 30 }}>https://figma.com/file/design-system-v4</div>
      </div>
    </>
  );
}

/* ── Meetings ── */
export function Meetings() {
  const app = useApp();
  return (
    <>
      <div className="page-hero">Meetings &amp; recordings</div>
      <div className="page-sub">Meeting notes, recordings, and leadership syncs</div>
      <div className="card mb-md">
        <div className="card-title">Meeting notes</div>
        <div className="row-item">
          <IconSpan name="file" />
          <div>
            <strong>Design review — Mar 12</strong>
            <div className="text-muted" style={{ fontSize: 11 }}>Attendees: Dina, Diogo, Ceren</div>
          </div>
        </div>
        <div className="row-item">
          <IconSpan name="file" />
          <div>
            <strong>Leadership sync — Mar 10</strong>
            <div className="text-muted" style={{ fontSize: 11 }}>Attendees: Muhammad, Sandeep, Rebecca</div>
          </div>
        </div>
      </div>
      <div className="card-title">Recordings</div>
      <div className="grid-3">
        {[
          { t: "Standup recording.mp4", d: "Mar 12 · 24 min", viewed: true },
          { t: "Design review.mp4", d: "Mar 10 · 45 min", viewed: false },
          { t: "Leadership sync.mp4", d: "Mar 8 · 38 min", viewed: false },
        ].map((r) => (
          <div className="card" key={r.t} style={{ textAlign: "center", cursor: "pointer", padding: 20 }} onClick={() => app.toast(`Playing: ${r.t}`)}>
            <div style={{ marginBottom: 12, color: "var(--text-3)", display: "flex", justifyContent: "center" }}>
              <Icon name="video" size={36} />
            </div>
            <strong style={{ fontSize: 13 }}>{r.t}</strong>
            <div className="text-muted" style={{ fontSize: 11, marginTop: 4 }}>{r.d}</div>
            {r.viewed && <span className="pill pill-green mt-sm">Viewed</span>}
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Calendar ── */
export function Calendar() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells = [];
  for (let i = 0; i < 35; i++) {
    const day = i - 2;
    const isToday = day === 1;
    cells.push(
      <div className={`cal-day ${isToday ? "today" : ""}`} key={i}>
        <div className="day-num">{day > 0 && day <= 31 ? day : ""}</div>
        {day === 1 && <div className="event">Design review 2pm</div>}
        {day === 3 && <div className="event">Bernard demo</div>}
        {day === 5 && <div className="event">Sprint retro</div>}
      </div>
    );
  }
  return (
    <>
      <div className="page-hero">Calendar</div>
      <div className="cal-header">
        <button className="btn btn-sm">← Previous</button>
        <span className="month-label">July 2026</span>
        <button className="btn btn-sm">Next →</button>
        <button className="btn btn-sm btn-primary">Today</button>
      </div>
      <div className="cal-grid">
        {days.map((d) => (
          <div key={d} style={{ background: "var(--bg-2)", padding: "6px 8px", fontSize: 11, fontWeight: 600, color: "var(--text-4)" }}>
            {d}
          </div>
        ))}
        {cells}
      </div>
      <div className="card mt-md">
        <div className="card-title">New event</div>
        <div className="grid-2 gap-sm">
          <input className="input" placeholder="Start time" defaultValue="2:00 PM" />
          <input className="input" placeholder="End time" defaultValue="3:00 PM" />
        </div>
        <input className="input mt-sm" placeholder="e.g. Design review" />
      </div>
    </>
  );
}

/* ── Leaderboard ── */
export function Leaderboard() {
  const ranks = [
    { name: "Dina Tarek", init: "DT", score: 94, color: "#5B9BD5" },
    { name: "Sandeep", init: "SC", score: 91, color: "#3DB8A8" },
    { name: "Meryll Robles", init: "MR", score: 88, color: "#6B7FD7" },
    { name: "Diogo Sela", init: "DS", score: 76, color: "#7C5CFF" },
    { name: "Kendra Avery", init: "KA", score: 72, color: "#D4A04A" },
    { name: "Amara Okafor", init: "AO", score: 68, color: "#5CB87A" },
    { name: "Liam Chen", init: "LC", score: 65, color: "#3DB8A8" },
    { name: "Sam Rivera", init: "SR", score: 61, color: "#D4A04A" },
  ];
  const medals = ["gold", "silver", "bronze"];
  return (
    <>
      <div className="page-hero">Leaderboard</div>
      <div className="page-sub">Member ranking by impact and contribution</div>
      <div className="card">
        {ranks.map((r, i) => (
          <div className="lb-row" key={r.name}>
            <span className={`lb-rank ${medals[i] || ""}`}>{i + 1}</span>
            <div className="lb-av" style={{ background: r.color }}>{r.init}</div>
            <span className="lb-name">{r.name}</span>
            <span className="lb-score">{r.score}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Policies ── */
export function Policies() {
  return (
    <>
      <div className="page-hero">Policies</div>
      <div className="page-sub">Company policies &amp; guidelines</div>
      <div className="card mb-md">
        <div className="card-title">Company policies &amp; guidelines</div>
        <div className="row-item">
          <IconSpan name="scroll" />
          <div>
            <strong>Permissions guide.pdf</strong>
            <div className="text-muted" style={{ fontSize: 11 }}>Updated Jan 2026</div>
          </div>
          <span className="pill pill-green">Acknowledged</span>
        </div>
        <div className="row-item">
          <IconSpan name="scroll" />
          <div>
            <strong>Code of conduct</strong>
            <div className="text-muted" style={{ fontSize: 11 }}>All team members</div>
          </div>
          <span className="pill pill-green">Acknowledged</span>
        </div>
        <div className="row-item">
          <IconSpan name="scroll" />
          <div>
            <strong>Remote work policy</strong>
            <div className="text-muted" style={{ fontSize: 11 }}>Effective Mar 2026</div>
          </div>
          <span className="pill pill-amber">Pending review</span>
        </div>
        <div className="row-item">
          <span>📜</span>
          <div>
            <strong>Data privacy &amp; security</strong>
            <div className="text-muted" style={{ fontSize: 11 }}>Required for all</div>
          </div>
          <span className="pill pill-green">Acknowledged</span>
        </div>
      </div>
    </>
  );
}

/* ── Profile ── */
export function Profile() {
  const app = useApp();
  return (
    <>
      <div className="page-hero">Profile &amp; settings</div>
      <div className="card mb-md">
        <div className="flex-between mb-md">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 600, color: "#fff" }}>
              DS
            </div>
            <div>
              <strong style={{ fontSize: 16 }}>Diogo Sela</strong>
              <div className="text-muted">Design intern · Space ventures</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", marginBottom: 4 }}>I am currently working in this role</div>
        <input className="input mb-md" defaultValue="Design intern — FloLabs Innovations Group" />
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", marginBottom: 4 }}>Experience</div>
        <input className="input mb-md" defaultValue="UI/UX Design, Figma, Design Systems, User Research" />
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", marginBottom: 4 }}>LinkedIn</div>
        <input className="input mb-md" defaultValue="linkedin.com/in/diogosela" />
        <button className="btn btn-sm" onClick={() => app.toast("GitHub connected")}>
          Connect my Claude to my GitHub
        </button>
      </div>
      <div className="card">
        <div className="card-title">Settings</div>
        <div className="check-row"><input type="checkbox" defaultChecked /> Email notifications</div>
        <div className="check-row"><input type="checkbox" defaultChecked /> Desktop notifications</div>
        <div className="check-row"><input type="checkbox" /> Weekly digest</div>
      </div>
    </>
  );
}

/* ── Favorites ── */
export function Favorites() {
  const app = useApp();
  const items = [
    { icon: "file", title: "Design system audit", sub: "Document" },
    { icon: "db", title: "Design System v4.fig", sub: "Vault · Figma" },
    { icon: "grad", title: "AI-native product design", sub: "Masterclass · 75%" },
    { icon: "bulb", title: "AI-powered design review assistant", sub: "Brainwriting" },
  ];
  return (
    <>
      <div className="page-hero">Favorites</div>
      <div className="page-sub">Your pinned documents, files, and tools</div>
      {items.map((it) => (
        <div className="row-item" key={it.title}>
          <IconSpan name={it.icon} />
          <div>
            <strong>{it.title}</strong>
            <div className="text-muted" style={{ fontSize: 11 }}>{it.sub}</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => app.toast("Removed from favorites")}>
            Remove
          </button>
        </div>
      ))}
    </>
  );
}

/* ── Brainwriting ── */
export function Brainwriting() {
  const app = useApp();
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <div className="page-hero">My brainwriting</div>
      <div className="page-sub">Capture and submit innovation ideas for the venture studio.</div>
      <button className="btn btn-primary mb-md" onClick={() => setFormOpen((v) => !v)}>
        Open your brainwriting
      </button>
      {formOpen && (
        <div className="card mb-md" id="bwForm">
          <div className="card-title">New submission</div>
          {[
            ["Idea title", "AI-powered design review assistant", false],
            ["Objective", "What problem does this solve?", true],
            ["Context", "Background and motivation…", true],
            ["Steps", "How would you implement this?", true],
            ["Important things to note", "Risks, dependencies, open questions…", true],
          ].map(([label, ph, area]) => (
            <div className="tp-field" key={label as string}>
              <label className="tp-label">{label}</label>
              {area ? <textarea className="input" placeholder={ph as string} /> : <input className="input" placeholder={ph as string} />}
            </div>
          ))}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              app.toast("Brainwriting submitted");
              setFormOpen(false);
            }}
          >
            Submit idea
          </button>
        </div>
      )}
      <div className="card mb-md">
        <div className="card-title">AI-powered design review assistant</div>
        <div style={{ fontSize: 12, color: "var(--text-4)", marginBottom: 4 }}>
          <strong>Objective:</strong> Build an AI tool that reviews design submissions against the FloLabs design system.
        </div>
        <div style={{ fontSize: 12, color: "var(--text-4)", marginBottom: 4 }}>
          <strong>Context:</strong> Design interns submit work that needs consistent review. Manual review is slow.
        </div>
        <div style={{ fontSize: 12, color: "var(--text-4)" }}>
          <strong>Steps:</strong> Train on design system tokens → integrate with Vault → surface in review workflow.
        </div>
        <span className="pill pill-amber mt-sm">In review</span>
      </div>
      <div className="card">
        <div className="card-title">Contextual onboarding flow</div>
        <div style={{ fontSize: 12, color: "var(--text-4)" }}>
          <strong>Objective:</strong> Redesign onboarding to adapt based on role and venture assignment.
        </div>
        <span className="pill pill-green mt-sm">Approved</span>
      </div>
    </>
  );
}
