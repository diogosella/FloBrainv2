"use client";

import { Kanban } from "../cockpit/Kanban";

export function TasksSurface() {
  return (
    <div className="surface active" id="surface-tasks">
      <div id="tasksPage" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: 0 }}>
        <div className="page-hero">Tasks</div>
        <div className="page-sub">Kanban board · filter and manage your work</div>
        <Kanban />
      </div>
    </div>
  );
}
