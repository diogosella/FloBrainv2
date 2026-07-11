"use client";

import { useApp } from "../state/AppContext";
import { TASKS, SUBTASKS } from "@/data";
import type { Task } from "@/data";

export function TaskPanel() {
  const app = useApp();
  const id = app.state.taskPanel;
  const open = id !== null;

  const t: Task =
    id && id !== "new"
      ? TASKS.find((x) => x.id === id) || newTask()
      : newTask();
  const subs = SUBTASKS[t.id] || [];

  return (
    <aside className={`task-panel${open ? " open" : ""}`} id="taskPanel">
      {open && (
        <>
          <div className="flex-between mb-md">
            <h2 style={{ fontSize: 16 }}>{t.title || "New task"}</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => app.patch({ taskPanel: null })}>
              ×
            </button>
          </div>
          <div className="tp-field">
            <label className="tp-label">Task name</label>
            <input className="input" defaultValue={t.title} />
          </div>
          <div className="grid-2 gap-sm">
            <div className="tp-field">
              <label className="tp-label">Priority</label>
              <select className="input" defaultValue={t.pri === "high" ? "High" : t.pri === "med" ? "Medium" : "Low"}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="tp-field">
              <label className="tp-label">Due</label>
              <input className="input" defaultValue={t.due} />
            </div>
          </div>
          <div className="tp-field">
            <label className="tp-label">Description</label>
            <textarea className="input" defaultValue={t.desc || ""} />
          </div>
          <div className="tp-field">
            <label className="tp-label">Assignees</label>
            <div className="chip-row">
              {t.assignees.map((a) => (
                <span className="pill pill-violet" key={a}>
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="tp-field">
            <label className="tp-label">Subtasks</label>
            {subs.map((s) => (
              <div className={`tp-subtask ${s.done ? "done" : ""}`} key={s.id}>
                <input type="checkbox" defaultChecked={s.done} />
                <span>{s.text}</span>
              </div>
            ))}
            <input
              className="input mt-sm"
              placeholder="Add subtask…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  app.toast("Subtask added");
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              app.patch({ taskPanel: null });
              app.toast("Task saved");
            }}
          >
            Save
          </button>
        </>
      )}
    </aside>
  );
}

function newTask(): Task {
  return { id: "new", title: "", col: "todo", pri: "med", due: "TBD", assignees: ["DS"], desc: "", room: "design" };
}
