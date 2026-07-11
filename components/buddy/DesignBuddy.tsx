"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";
import { DESIGN_TOOLS } from "@/data/designTools";
import { CLAUDE_DESIGN, TASKS } from "@/data";
import type { Buddy, DesignTool } from "@/data";

function statusPillClass(status?: string): string {
  if (status && ["Connected", "Synced", "Active", "Online", "Ready"].includes(status)) return "pill-green";
  if (status && ["Installed", "API key set"].includes(status)) return "pill-violet";
  return "pill-grey";
}

function useOpenDesignTool() {
  const app = useApp();
  return (id: string) => {
    const all = [...DESIGN_TOOLS.essential, ...DESIGN_TOOLS.professional, ...DESIGN_TOOLS.ai, ...DESIGN_TOOLS.apis];
    const tool = all.find((t) => t.id === id);
    if (!tool) return;
    if (tool.id === CLAUDE_DESIGN.id || tool.chat) {
      document.getElementById("designBuddyInput")?.focus();
      return;
    }
    if (tool.actionKey) {
      if (tool.actionKey.startsWith("nav:")) app.navigate(tool.actionKey.slice(4));
      else if (tool.actionKey.startsWith("toast:")) app.toast(tool.actionKey.slice(6));
      return;
    }
    if (tool.url) {
      window.open(tool.url, "_blank", "noopener");
      app.toast("Opened " + tool.name);
    }
  };
}

function DesignToolChip({ t, onOpen }: { t: DesignTool; onOpen: (id: string) => void }) {
  const sub = t.api && t.api !== "—" ? t.api : t.desc.split(" ").slice(0, 4).join(" ") + "…";
  return (
    <div className={`design-tool-chip${t.essential ? " essential" : ""}`} onClick={() => onOpen(t.id)}>
      <div className="dtc-icon" style={{ background: t.color + "22", color: t.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={t.icon} size={15} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="dtc-name">{t.name}</div>
        <div className="dtc-sub">{sub}</div>
      </div>
      <span className={`pill ${statusPillClass(t.status)}`} style={{ fontSize: 9, flexShrink: 0, padding: "2px 6px" }}>
        {t.status}
      </span>
    </div>
  );
}

function ToolList({ tools, onOpen }: { tools: DesignTool[]; onOpen: (id: string) => void }) {
  return (
    <div className="design-tool-list">
      {tools.map((t) => (
        <DesignToolChip key={t.id} t={t} onOpen={onOpen} />
      ))}
    </div>
  );
}

function SideWidget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="design-side-widget">
      <div className="dsw-title">{title}</div>
      {children}
    </div>
  );
}

function RightPanel() {
  const app = useApp();
  const tab = app.state.designRightTab;
  const firstName = app.state.user === "sandeep" ? "Sandeep" : "Diogo";
  const init = app.state.user === "sandeep" ? "SC" : "DS";

  const myTasks = TASKS.filter((t) => t.room === "design" && t.assignees.includes(init) && t.col !== "done");
  const priPill: Record<string, string> = { high: "pill-violet", med: "pill-amber", low: "pill-grey" };
  const colLabel: Record<string, string> = { todo: "To do", progress: "In progress", done: "Done" };

  return (
    <div className="design-side-widget design-right-panel">
      <div className="design-right-tabs">
        <button type="button" className={`design-right-tab ${tab === "work" ? "active" : ""}`} onClick={() => app.patch({ designRightTab: "work" })}>
          Active work
        </button>
        <button type="button" className={`design-right-tab ${tab === "tasks" ? "active" : ""}`} onClick={() => app.patch({ designRightTab: "tasks" })}>
          Design team tasks
        </button>
      </div>
      <div className="design-right-pane" id="designRightPane">
        {tab === "tasks" ? (
          myTasks.length === 0 ? (
            <>
              <div className="design-right-meta">Assigned to {firstName} · Design room</div>
              <div className="design-right-empty">No open design tasks assigned to you.</div>
            </>
          ) : (
            <>
              <div className="design-right-meta">
                {myTasks.length} task{myTasks.length === 1 ? "" : "s"} assigned to {firstName}
              </div>
              {myTasks.map((t) => (
                <div className="design-work-row" key={t.id} onClick={() => app.patch({ taskPanel: t.id })}>
                  <span className="file-type-icon ft-figma" style={{ width: 24, height: 24, fontSize: 7 }}>FIG</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="dw-title">{t.title}</div>
                    <div className="dw-meta">{colLabel[t.col] || t.col} · Due {t.due}</div>
                  </div>
                  <span className={`pill ${priPill[t.pri] || "pill-grey"}`} style={{ fontSize: 9 }}>
                    {t.pri === "high" ? "High" : t.pri === "med" ? "Med" : "Low"}
                  </span>
                </div>
              ))}
            </>
          )
        ) : (
          <>
            {[
              { title: "FloBrain V2 mockup", meta: "DS, DG · In progress", pill: "pill-violet", tag: "High" },
              { title: "Design system tokens", meta: "DS · Due today", pill: "pill-amber", tag: "Today" },
              { title: "Space VI redesign", meta: "Bernard demo Friday", pill: "pill-red", tag: "Fri" },
            ].map((r) => (
              <div className="design-work-row" key={r.title} onClick={() => app.navigate("tasks")}>
                <span className="file-type-icon ft-figma" style={{ width: 24, height: 24, fontSize: 7 }}>FIG</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="dw-title">{r.title}</div>
                  <div className="dw-meta">{r.meta}</div>
                </div>
                <span className={`pill ${r.pill}`} style={{ fontSize: 9 }}>
                  {r.tag}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export function DesignBuddy({ b }: { b: Buddy }) {
  const app = useApp();
  const onOpen = useOpenDesignTool();
  const [text, setText] = useState("");
  const msgsRef = useRef<HTMLDivElement>(null);
  const firstName = app.state.user === "sandeep" ? "Sandeep" : "Diogo";

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [app.state.designMessages.length]);

  const send = () => {
    if (!text.trim()) return;
    app.sendDesignMsg(text);
    setText("");
  };

  return (
    <>
      <div className="design-buddy-header">
        <div className="bh-av" style={{ background: b.color, width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
          <Icon name={b.icon} size={20} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="bh-name" style={{ fontSize: 16, fontWeight: 600 }}>{b.name}</div>
          <div className="bh-domain" style={{ fontSize: 12, color: "var(--text-4)" }}>{b.domain} · FloLabs Design Team</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span className="pill pill-violet">Figma connected</span>
          <span className="pill pill-green">42 tokens</span>
        </div>
      </div>

      <div className="design-buddy-layout">
        <aside className="design-buddy-side design-buddy-left">
          <SideWidget title="Essential tools">
            <ToolList tools={DESIGN_TOOLS.essential} onOpen={onOpen} />
          </SideWidget>
          <SideWidget title="AI assistants">
            <ToolList tools={DESIGN_TOOLS.ai} onOpen={onOpen} />
          </SideWidget>
        </aside>

        <main className="design-buddy-focus">
          <div className="design-focus-head">
            <div className="dfh-av" style={{ background: b.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={b.icon} size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="dfh-name">FloBrain chat</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => app.navigate("vault")}>Vault</button>
            <button className="btn btn-ghost btn-sm" onClick={() => app.navigate("rooms")}>Meeting rooms</button>
          </div>

          <div className="design-focus-messages" id="designBuddyMsgs" ref={msgsRef}>
            <div className="ai-msg bot">
              Hey {firstName} — I&apos;m your design buddy. I can look up Figma files, sync tokens, run a11y scans, and draft handoff notes.
            </div>
            <div className="ai-msg bot">
              Design System v4 has <strong>42 variables</strong> ready to export. Wireframe v4 still needs your review before Thursday&apos;s design review.
            </div>
            {app.state.designMessages.map((m, i) => (
              <div className={`ai-msg ${m.role}`} key={i} dangerouslySetInnerHTML={{ __html: m.html }} />
            ))}
          </div>

          <div className="design-focus-composer">
            <input
              className="input"
              id="designBuddyInput"
              placeholder="Ask about Figma files, tokens, a11y, handoff…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button className="btn btn-primary" onClick={send}>
              Send
            </button>
          </div>
        </main>

        <aside className="design-buddy-side design-buddy-right">
          <RightPanel />
          <SideWidget title="Professional tools">
            <ToolList tools={DESIGN_TOOLS.professional} onOpen={onOpen} />
          </SideWidget>
        </aside>
      </div>
    </>
  );
}
