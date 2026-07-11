"use client";

import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";
import { SPACES } from "@/data";

const SECTIONS: { label: string; ids: string[] }[] = [
  { label: "Collaboration", ids: ["design-room", "teams-card"] },
  { label: "AI Buddies", ids: ["design-buddy", "health", "travel", "data", "legal"] },
  { label: "Tools", ids: ["vault"] },
  { label: "Academy", ids: ["masterclasses"] },
  { label: "Personal", ids: ["library", "calendar", "leaderboard"] },
];

export function SpacesSurface() {
  const app = useApp();
  return (
    <div className="surface active" id="surface-spaces">
      <div className="spaces-header fade-up">
        <div>
          <h1>Good morning, Diogo.</h1>
          <div className="greeting">Space ventures · Friday, July 11</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => app.patch({ drawerOpen: true })}>
          Customize
        </button>
      </div>

      <div className="cockpit-hero fade-up">
        <div className="cockpit-hero-left">
          <div className="cockpit-hero-icon" aria-hidden="true">
            <Icon name="dash" size={20} />
          </div>
          <div>
            <div className="cockpit-hero-title">Cockpit</div>
            <div className="cockpit-hero-sub">AI chat · Tasks · Report · Docs</div>
          </div>
        </div>
        <button className="cockpit-hero-btn" onClick={() => app.navigate("cockpit")} aria-label="Open Cockpit">
          Open Cockpit
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="spaces-grid fade-up" id="spacesGrid">
        {SECTIONS.map((sec) => {
          const tiles = SPACES.filter((s) => sec.ids.includes(s.id));
          if (!tiles.length) return null;
          return (
            <div className="sg-section" key={sec.label}>
              <div className="sg-label">{sec.label}</div>
              <div className="sg-tiles">
                {tiles.map((s) => (
                  <div className="space-tile" key={s.id} onClick={() => app.handleSpaceClick(s.id)}>
                    <div className="tile-accent" style={{ background: s.color }} />
                    <div
                      className="tile-icon"
                      style={
                        s.noIconBg
                          ? { background: "transparent", border: "none", color: s.color }
                          : { background: s.color + "22", color: s.color }
                      }
                    >
                      <Icon name={s.icon} size={26} />
                    </div>
                    <div className="tile-name">{s.name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
