"use client";

import { useApp } from "../state/AppContext";
import type { CockpitTab } from "../state/AppContext";
import { CockpitAiChat } from "./CockpitAiChat";
import { CockpitRoomsTab } from "./CockpitRoomsTab";
import { Kanban } from "./Kanban";
import { Report } from "./Report";
import { DocsPane } from "./DocsPane";

const TABS: { key: CockpitTab; label: string }[] = [
  { key: "ai", label: "AI chat" },
  { key: "tasks", label: "Tasks" },
  { key: "report", label: "Report" },
  { key: "rooms", label: "Meeting rooms" },
  { key: "docs", label: "Docs" },
];

export function CockpitSurface() {
  const app = useApp();
  const tab = app.state.cockpitTab;

  return (
    <div className="surface active" id="surface-cockpit">
      <div id="cockpitTabs">
        {TABS.map((t) => (
          <div
            key={t.key}
            className={`ctab${tab === t.key ? " active" : ""}`}
            onClick={() => app.switchCockpitTab(t.key)}
          >
            {t.label}
          </div>
        ))}
      </div>
      <div id="cockpitPanes" style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {tab === "ai" && (
          <div className="tab-pane active">
            <CockpitAiChat />
          </div>
        )}
        {tab === "rooms" && (
          <div className="tab-pane active">
            <CockpitRoomsTab />
          </div>
        )}
        {tab === "tasks" && (
          <div className="tab-pane active">
            <Kanban />
          </div>
        )}
        {tab === "docs" && (
          <div className="tab-pane active">
            <DocsPane />
          </div>
        )}
        {tab === "report" && (
          <div className="tab-pane active">
            <Report />
          </div>
        )}
      </div>
    </div>
  );
}
