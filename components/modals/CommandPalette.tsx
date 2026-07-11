"use client";

import { useMemo, useState } from "react";
import { useApp } from "../state/AppContext";
import { Icon, hasIcon } from "../ui/Icon";
import { TEAM, BUDDIES } from "@/data";

interface CmdItem {
  icon: string;
  label: string;
  action: () => void;
}

export function CommandPalette() {
  const app = useApp();
  const [q, setQ] = useState("");

  const groups = useMemo<{ group: string; items: CmdItem[] }[]>(
    () => [
      {
        group: "Spaces",
        items: [
          { icon: "rocket", label: "Space VI", action: () => app.navigate("cockpit") },
          { icon: "palette", label: "Design buddy", action: () => app.openBuddy("design") },
          { icon: "db", label: "Vault", action: () => app.navigate("vault") },
          { icon: "heartbeat", label: "Health dashboard", action: () => app.openBuddy("health") },
        ],
      },
      {
        group: "Actions",
        items: [
          { icon: "chart", label: "Run weekly report", action: () => { app.navigate("cockpit"); app.toast("Generating weekly report…"); } },
          { icon: "note", label: "Summarize last meeting", action: () => app.toast("Summarizing standup recording…") },
          { icon: "check", label: "What are my tasks today?", action: () => app.navigate("tasks") },
          { icon: "plus", label: "Add task", action: () => app.toast("New task created") },
          { icon: "file", label: "New doc", action: () => { app.navigate("docs"); app.toast("New document created"); } },
        ],
      },
      {
        group: "People",
        items: TEAM.slice(0, 6).map((t) => ({
          icon: t.init,
          label: t.name,
          action: () => app.toggleChat(t.name.split(" ")[0].toLowerCase()),
        })),
      },
      {
        group: "Buddies",
        items: Object.entries(BUDDIES).map(([k, b]) => ({
          icon: b.icon,
          label: b.name,
          action: () => app.openBuddy(k),
        })),
      },
    ],
    [app]
  );

  const query = q.toLowerCase();

  return (
    <div
      className={`cmd-overlay${app.state.cmdOpen ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) app.patch({ cmdOpen: false });
      }}
    >
      <div className="cmd-palette">
        <div className="cmd-input-wrap">
          <input
            className="cmd-input"
            autoFocus
            placeholder="Search spaces, people, docs, buddies…"
            autoComplete="off"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="cmd-results">
          {groups.map((g) => {
            const items = g.items.filter((it) => !query || it.label.toLowerCase().includes(query));
            if (!items.length) return null;
            return (
              <div key={g.group}>
                <div className="cmd-group-label">{g.group}</div>
                {items.map((item) => (
                  <div
                    className="cmd-item"
                    key={item.label}
                    onClick={() => {
                      app.patch({ cmdOpen: false });
                      item.action();
                    }}
                  >
                    <div className="ci-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {hasIcon(item.icon) ? <Icon name={item.icon} size={13} /> : <span style={{ fontSize: 12, fontWeight: 600 }}>{item.icon}</span>}
                    </div>
                    <span className="ci-label">{item.label}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
