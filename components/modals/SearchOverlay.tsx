"use client";

import { useMemo, useState } from "react";
import { useApp } from "../state/AppContext";
import { Icon, hasIcon } from "../ui/Icon";
import { SPACES, TEAM, VAULT_FILES } from "@/data";

interface SearchItem {
  icon: string;
  label: string;
  action: () => void;
}

export function SearchOverlay() {
  const app = useApp();
  const [q, setQ] = useState("");

  const all = useMemo<SearchItem[]>(
    () => [
      ...SPACES.map((s) => ({ icon: s.icon, label: s.name, action: () => app.handleSpaceClick(s.id) })),
      ...TEAM.map((t) => ({ icon: t.init, label: t.name, action: () => app.toast("Found: " + t.name) })),
      ...VAULT_FILES.map((f) => ({ icon: "file", label: f.name, action: () => app.navigate("vault") })),
    ],
    [app]
  );

  const results = all.filter((i) => !q || i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 12);

  return (
    <div
      className={`search-overlay${app.state.searchOpen ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) app.patch({ searchOpen: false });
      }}
    >
      <div className="search-box">
        <input
          placeholder="Search everything in FloBrain…"
          autoFocus
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="search-results">
          {results.length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", color: "var(--text-5)" }}>No results found</div>
          ) : (
            results.map((i, idx) => (
              <div
                className="cmd-item"
                key={idx}
                onClick={() => {
                  app.patch({ searchOpen: false });
                  i.action();
                }}
              >
                <div className="ci-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {hasIcon(i.icon) ? <Icon name={i.icon} size={13} /> : <span style={{ fontSize: 12, fontWeight: 600 }}>{i.icon}</span>}
                </div>
                <span className="ci-label">{i.label}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
