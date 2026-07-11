"use client";

import { useApp } from "../state/AppContext";
import { DmChip } from "../ui/DmChip";
import { TASKS } from "@/data";
import type { TaskFilter } from "../state/AppContext";

const COLS = [
  { name: "To do", key: "todo" },
  { name: "In progress", key: "progress" },
  { name: "Done", key: "done" },
] as const;

const FILTERS: { label: string; key: TaskFilter }[] = [
  { label: "My tasks", key: "mine" },
  { label: "Assigned by me", key: "assigned" },
  { label: "Completed", key: "completed" },
];

export function Kanban() {
  const app = useApp();
  const filter = app.state.taskFilter;
  const filtered = TASKS.filter((t) => {
    if (filter === "mine") return t.assignees.includes("DS");
    if (filter === "assigned") return t.assignees.length > 0;
    if (filter === "completed") return t.col === "done";
    return true;
  });

  return (
    <div style={{ padding: 16 }}>
      <div className="flex-between mb-md">
        <div className="chip-row" style={{ margin: 0 }}>
          {FILTERS.map((f) => (
            <span
              key={f.key}
              className={`suggestion-chip ${filter === f.key ? "" : "pill-grey"}`}
              style={{ cursor: "pointer" }}
              onClick={() => app.setTaskFilter(f.key)}
            >
              {f.label}
            </span>
          ))}
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => app.patch({ taskPanel: "new" })}>
          Add task
        </button>
      </div>
      <div className="kanban">
        {COLS.map((c) => {
          const tasks = filtered.filter((t) => t.col === c.key);
          return (
            <div className="kanban-col" key={c.key}>
              <div className="col-head">
                {c.name} <span className="cnt">{tasks.length}</span>
              </div>
              {tasks.map((t) => (
                <div className="kanban-card" key={t.id} onClick={() => app.patch({ taskPanel: t.id })}>
                  <div className="kc-title">{t.title}</div>
                  <div className="kc-meta">
                    <span className={`pill ${t.pri === "high" ? "pill-violet" : t.pri === "med" ? "pill-amber" : "pill-grey"}`}>
                      {t.pri}
                    </span>
                    <span className="mono">{t.due}</span>
                    <span className="assignee-chips">
                      {t.assignees.map((a) => (
                        <DmChip key={a} name={a} />
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
