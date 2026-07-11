"use client";

import { useApp } from "../state/AppContext";
import { chatIdFor } from "../ui/DmChip";
import { TEAM } from "@/data";
import type { Member } from "@/data";

const statusColor = (s: string) => (s === "online" ? "#45D483" : s === "away" ? "#D98A4A" : "#6E7280");
const statusLabel = (s: string) => (s === "online" ? "Online" : s === "away" ? "Away" : "Offline");

function SelfProfile() {
  const app = useApp();
  const u: Member =
    app.state.user === "sandeep"
      ? { name: "Sandeep", init: "SC", role: "COO", status: "online", color: "#3DB8A8" }
      : { name: "Diogo Sela", init: "DS", role: "Design intern", status: "online", color: "#7C5CFF" };
  return (
    <>
      <div style={{ height: 72, background: `linear-gradient(135deg,${u.color},${u.color}88)`, borderRadius: "var(--r-md)", marginBottom: 36, position: "relative" }}>
        <div style={{ position: "absolute", bottom: -24, left: 20, width: 52, height: 52, borderRadius: "50%", background: u.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: "#fff", border: "3px solid var(--bg-2)" }}>
          {u.init}
        </div>
      </div>
      <div style={{ paddingLeft: 20, marginBottom: 16 }}>
        <strong style={{ fontSize: 17 }}>{u.name}</strong>
        <span className="status-dot status-online" style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", marginLeft: 6, background: "var(--success)" }} />
        <div className="text-muted" style={{ fontSize: 12.5, marginTop: 2 }}>{u.role} · FloLabs</div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "0 20px", marginBottom: 20 }}>
        <button className="btn btn-primary btn-sm">Edit profile</button>
        <button className="btn btn-sm" onClick={() => app.toast("Settings")}>Settings</button>
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ padding: 14, background: "var(--bg-3)", border: "1px solid var(--line-2)", borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 8 }}>Current focus</div>
          <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>FloBrain V2 architecture redesign</div>
        </div>
        <div style={{ padding: 14, background: "var(--bg-3)", border: "1px solid var(--line-2)", borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 8 }}>My tasks</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 5 }}>· Update design system tokens</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 5 }}>· FloBrain V2 mockup review</div>
          <div style={{ fontSize: 12, color: "var(--text-3)" }}>· Wireframe v4 feedback</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-sm" style={{ flex: 1 }} onClick={() => { app.closeProfile(); app.navigate("tasks"); }}>My tasks</button>
          <button className="btn btn-sm" style={{ flex: 1 }} onClick={() => { app.closeProfile(); app.navigate("cockpit"); }}>Open cockpit</button>
        </div>
      </div>
    </>
  );
}

function MemberProfile({ name }: { name: string }) {
  const app = useApp();
  const m: Member =
    TEAM.find((t) => t.name === name) ||
    ({ name, init: name.split(" ").map((w) => w[0]).join(""), role: "Team member", status: "online", color: "#7C5CFF" } as Member);
  const chatId = chatIdFor(name) || name.split(" ")[0].toLowerCase();
  return (
    <>
      <div style={{ height: 80, background: `linear-gradient(135deg,${m.color},${m.color}88)`, borderRadius: "var(--r-md)", marginBottom: 40, position: "relative" }}>
        <div style={{ position: "absolute", bottom: -24, left: 20, width: 56, height: 56, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", border: "3px solid var(--bg-2)" }}>
          {m.init}
        </div>
      </div>
      <div style={{ padding: "0 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <strong style={{ fontSize: 18, letterSpacing: "-.02em" }}>{m.name}</strong>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor(m.status), display: "inline-block" }} />
          <span style={{ fontSize: 11, color: "var(--text-5)" }}>{statusLabel(m.status)}</span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--text-5)", marginBottom: 4 }}>{m.role}</div>
        <div style={{ fontSize: 11, color: "var(--accent-soft)" }}>Space ventures</div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "0 20px", marginBottom: 24 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { app.closeProfile(); app.toggleChat(chatId); }}>Message</button>
        <button className="btn" style={{ flex: 1 }} onClick={() => { app.closeProfile(); app.openAssign(m.name); }}>Assign task</button>
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ padding: 14, background: "var(--bg-3)", border: "1px solid var(--line-2)", borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 8 }}>Focus</div>
          <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>Design system tokens · Space VI</div>
        </div>
        <div style={{ padding: 14, background: "var(--bg-3)", border: "1px solid var(--line-2)", borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 8 }}>Recent tasks</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 6 }}>· Update design system tokens</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 6 }}>· FloBrain V2 mockup review</div>
          <div style={{ fontSize: 12, color: "var(--text-3)" }}>· Wireframe v4 feedback</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-sm" style={{ flex: 1 }} onClick={() => { app.closeProfile(); app.navigate("rooms"); }}>Schedule meeting</button>
          <button className="btn btn-sm" style={{ flex: 1 }} onClick={() => { app.closeProfile(); app.navigate("tasks"); }}>Open tasks</button>
        </div>
      </div>
    </>
  );
}

export function ProfilePanel() {
  const app = useApp();
  const profile = app.state.profile;
  const open = !!profile;
  return (
    <>
      <div className={`drawer-overlay${open ? " open" : ""}`} onClick={() => app.closeProfile()} />
      <div className={`drawer${open ? " open" : ""}`} id="profilePanel" style={{ width: 400 }}>
        {profile?.type === "member" && profile.name ? <MemberProfile name={profile.name} /> : profile ? <SelfProfile /> : null}
      </div>
    </>
  );
}
