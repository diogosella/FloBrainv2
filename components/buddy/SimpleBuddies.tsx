"use client";

import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";
import type { Buddy } from "@/data";

export function BuddyHeader({ b, extra }: { b: Buddy; extra?: string }) {
  return (
    <div className="buddy-header fade-up">
      <div className="bh-av" style={{ background: b.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={b.icon} size={22} />
      </div>
      <div>
        <div className="bh-name">{b.name}</div>
        <div className="bh-domain">{b.domain}{extra ? " · " + extra : ""}</div>
      </div>
    </div>
  );
}

function Composer({ b }: { b: Buddy }) {
  return (
    <div className="ai-composer">
      <input className="input" placeholder={`Ask ${b.name.toLowerCase()}…`} />
      <button className="btn btn-primary">Send</button>
    </div>
  );
}

export function GenericBuddy({ b }: { b: Buddy }) {
  const app = useApp();
  return (
    <>
      <BuddyHeader b={b} />
      <div className="buddy-prompts fade-up">
        {b.prompts.map((p) => (
          <span className="suggestion-chip" key={p} onClick={() => app.toast(`${p}…`)}>
            {p}
          </span>
        ))}
      </div>
      <div className="page fade-up">
        <div className="ai-chat-wrap" style={{ height: 500 }}>
          <div className="ai-messages">
            <div className="ai-msg bot">
              Hello! I&apos;m {b.name}. I specialize in {b.domain.toLowerCase()}. How can I help?
            </div>
          </div>
          <Composer b={b} />
        </div>
      </div>
    </>
  );
}

export function TravelBuddy({ b }: { b: Buddy }) {
  return (
    <>
      <BuddyHeader b={b} extra="Dubai trip Mar 18–24" />
      <div className="buddy-prompts fade-up">
        {b.prompts.map((p) => (
          <span className="suggestion-chip" key={p}>
            {p}
          </span>
        ))}
      </div>
      <div className="page fade-up">
        <div className="grid-2 mb-md">
          <div className="card">
            <div className="card-title">Upcoming: Dubai</div>
            <div className="text-muted" style={{ fontSize: 12 }}>Mar 18 – 24, 2026</div>
            <div className="commission-row mt-sm"><span>Flight</span><span className="mono">EK202 · $612</span></div>
            <div className="commission-row"><span>Hotel</span><span className="mono">Marriott Marina · 6 nights</span></div>
            <div className="commission-row"><span>Status</span><span className="pill pill-amber">Seat 7A held until 6 PM</span></div>
          </div>
          <div className="card">
            <div className="card-title">Itinerary draft</div>
            <div className="row-item" style={{ padding: "6px 0" }}><span>Day 1</span>Arrival · Check-in · Team dinner</div>
            <div className="row-item" style={{ padding: "6px 0" }}><span>Day 2</span>Bernard demo · Space VI presentation</div>
            <div className="row-item" style={{ padding: "6px 0" }}><span>Day 3</span>CAIPO partnership meetings</div>
          </div>
        </div>
        <div className="ai-composer">
          <input className="input" placeholder="Ask travel buddy…" />
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </>
  );
}

export function DataBuddy({ b }: { b: Buddy }) {
  const stats = [
    { l: "Weekly active users", v: "2,847", t: "↑ 12%" },
    { l: "Task completion", v: "78%", t: "↑ 4%" },
    { l: "Avg impact", v: "76", t: "Stable" },
    { l: "Vault uploads", v: "34", t: "↑ 8" },
  ];
  return (
    <>
      <BuddyHeader b={b} />
      <div className="page fade-up">
        <div className="grid-4 mb-md">
          {stats.map((s) => (
            <div className="stat-card" key={s.l}>
              <div className="label">{s.l}</div>
              <div className="value">{s.v}</div>
              <div className="sub" style={{ color: "var(--success)" }}>{s.t}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Trending down</div>
          <div className="row-item">
            <span style={{ display: "flex", alignItems: "center" }}><Icon name="trenddown" size={14} /></span>
            Masterclass completion rate — 48% vs 55% target
          </div>
          <div className="row-item">
            <span style={{ display: "flex", alignItems: "center" }}><Icon name="trenddown" size={14} /></span>
            Onboarding step 9 — 2 members behind schedule
          </div>
        </div>
      </div>
    </>
  );
}

export function LegalBuddy({ b }: { b: Buddy }) {
  return (
    <>
      <div className="buddy-header fade-up">
        <div className="bh-av" style={{ background: b.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={b.icon} size={22} />
        </div>
        <div>
          <div className="bh-name">{b.name}</div>
          <div className="bh-domain">Compliance &amp; ethics · Governance &amp; safety</div>
        </div>
      </div>
      <div className="page fade-up">
        <div className="card mb-md">
          <div className="card-title">Pending compliance items</div>
          <div className="row-item">
            <span>📋</span>
            <div><strong>Partnership MOU redline</strong><div className="text-muted" style={{ fontSize: 11 }}>Section 4 open questions · Due Wed</div></div>
            <span className="pill pill-amber">In review</span>
          </div>
          <div className="row-item">
            <span>📋</span>
            <div><strong>Vendor requirements brief</strong><div className="text-muted" style={{ fontSize: 11 }}>Awaiting legal sign-off</div></div>
            <span className="pill pill-grey">Pending</span>
          </div>
          <div className="row-item">
            <span>📋</span>
            <div><strong>Data privacy training</strong><div className="text-muted" style={{ fontSize: 11 }}>3 team members incomplete</div></div>
            <span className="pill pill-red">Overdue</span>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Governance &amp; safety</div>
          <p style={{ fontSize: 12.5, color: "var(--text-4)" }}>
            All AI buddies operate within scoped context. No cross-buddy data sharing without explicit user consent.
          </p>
        </div>
      </div>
    </>
  );
}

export function VaultBuddy({ b }: { b: Buddy }) {
  const app = useApp();
  return (
    <>
      <BuddyHeader b={b} />
      <div className="page fade-up">
        <div className="card mb-md">
          <div className="card-title">Files needing review</div>
          <div className="row-item" onClick={() => app.navigate("vault")}>
            <span className="file-type-icon ft-figma" style={{ width: 28, height: 28, fontSize: 8 }}>FIG</span>
            <div><strong>Wireframe dashboard v4.fig</strong><div className="text-muted" style={{ fontSize: 11 }}>Dina Tarek · v4</div></div>
            <span className="pill pill-amber">In review</span>
          </div>
          <div className="row-item" onClick={() => app.navigate("vault")}>
            <span className="file-type-icon ft-docx" style={{ width: 28, height: 28, fontSize: 8 }}>DOC</span>
            <div><strong>Vendor requirements brief.docx</strong></div>
            <span className="pill pill-amber">In review</span>
          </div>
          <div className="row-item" onClick={() => app.navigate("vault")}>
            <span className="file-type-icon ft-html" style={{ width: 28, height: 28, fontSize: 8 }}>HTM</span>
            <div><strong>Onboarding flow notes.html</strong></div>
            <span className="pill pill-grey">Pending</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => app.navigate("vault")}>
          Open FloVault
        </button>
      </div>
    </>
  );
}
