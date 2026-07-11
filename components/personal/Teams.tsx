"use client";

import { useApp } from "../state/AppContext";
import { chatIdFor } from "../ui/DmChip";
import { TEAM, TEAMS } from "@/data";

function TeamsIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const statusColor = (s: string) => (s === "online" ? "#45D483" : s === "away" ? "#D98A4A" : "#6E7280");
const statusLabel = (s: string) => (s === "online" ? "Online" : s === "away" ? "Away" : "Offline");

export function Teams() {
  const app = useApp();
  const activeTeam = app.state.activeTeam;

  if (activeTeam) {
    const team = TEAMS.find((t) => t.id === activeTeam);
    if (!team) {
      app.patch({ activeTeam: null });
      return null;
    }
    const members = TEAM.filter((m) => team.members.indexOf(m.name) !== -1);
    return (
      <div style={{ padding: "28px 36px", flex: 1, overflowY: "auto" }}>
        <button
          onClick={() => app.patch({ activeTeam: null })}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: "var(--text-5)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font)", marginBottom: 20, padding: 0 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Teams
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--line)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: team.color + "22", border: `1px solid ${team.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <TeamsIcon size={22} color={team.color} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-.02em", color: "var(--text)", marginBottom: 3 }}>{team.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-5)" }}>
              {team.desc} · {members.length} members{team.activity ? " · " + team.activity : ""}
            </div>
          </div>
          <button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }}>
            + Invite member
          </button>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-5)", marginBottom: 12 }}>
          Team members
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {members.length === 0 && (
            <div style={{ fontSize: 12.5, color: "var(--text-5)", padding: "18px 0" }}>No members assigned to this team yet.</div>
          )}
          {members.map((m) => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#fff", flexShrink: 0, position: "relative" }}>
                {m.init}
                <span style={{ position: "absolute", bottom: 0, right: 0, width: 8, height: 8, borderRadius: "50%", background: statusColor(m.status), border: "2px solid var(--bg-2)" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{m.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-5)" }}>
                  {m.role} · {statusLabel(m.status)}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button className="btn btn-sm" style={{ fontSize: 11 }} onClick={() => app.openMemberProfile(m.name)}>
                  View profile
                </button>
                <button
                  className="btn btn-sm"
                  style={{ fontSize: 11 }}
                  onClick={() => app.toggleChat(chatIdFor(m.name) || m.name.split(" ")[0].toLowerCase())}
                >
                  Message
                </button>
                <button className="btn btn-sm" style={{ fontSize: 11 }} onClick={() => app.openAssign(m.name)}>
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Team list view
  return (
    <div style={{ padding: "28px 36px", flex: 1, overflowY: "auto" }}>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.02em", color: "var(--text)", marginBottom: 4 }}>Teams</div>
      <div style={{ fontSize: 12, color: "var(--text-5)", marginBottom: 24 }}>Space ventures · {TEAMS.length} teams</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10 }}>
        {TEAMS.map((team) => {
          const members = TEAM.filter((m) => team.members.indexOf(m.name) !== -1);
          return (
            <div
              key={team.id}
              onClick={() => app.patch({ activeTeam: team.id })}
              style={{ background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10, padding: 18, cursor: "pointer", position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: team.color, borderRadius: "10px 10px 0 0" }} />
              <div style={{ width: 38, height: 38, borderRadius: 9, background: team.color + "22", border: `1px solid ${team.color}44`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <TeamsIcon size={18} color={team.color} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 3, letterSpacing: "-.01em" }}>{team.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-5)", marginBottom: 14 }}>{team.desc}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  {members.slice(0, 3).map((m) => (
                    <div key={m.name} style={{ width: 24, height: 24, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", border: "2px solid var(--bg-2)", marginRight: -6 }}>
                      {m.init}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 11, color: "var(--text-5)" }}>
                  {members.length} member{members.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", background: "var(--accent)", padding: "5px 20px", borderRadius: 6, letterSpacing: "-.01em" }}>Open team →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
