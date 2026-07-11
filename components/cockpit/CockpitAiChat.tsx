"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";

const PROMPTS = [
  "What are my tasks today?",
  "Summarize active spaces",
  "Find recent docs",
  "Prepare weekly report",
  "Show buddy activity",
  "Help me use Cockpit",
];

export function CockpitAiChat() {
  const app = useApp();
  const { state } = app;
  const [text, setText] = useState("");
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [state.aiMessages.length]);

  const send = () => {
    if (!text.trim()) return;
    app.sendAiMsg(text);
    setText("");
  };

  return (
    <div className="cockpit-ai-workspace">
      <div className="cai-main">
        <div className="cai-context-bar">
          <div className="cai-identity">
            <div className="cai-avatar">
              <Icon name="sparkles" size={15} />
            </div>
            <div>
              <div className="cai-name">FloBrain AI</div>
              <div className="cai-sub">Your Cockpit assistant · Space ventures workspace</div>
            </div>
          </div>
          <div className="cai-autoroute">
            <span className="cai-autoroute-label">Auto-route</span>
            <div
              className={`toggle-switch ${state.autoRoute ? "on" : ""}`}
              onClick={() => {
                app.patch({ autoRoute: !state.autoRoute });
                app.toast(!state.autoRoute ? "Auto-route on" : "Auto-route off");
              }}
            />
          </div>
        </div>

        <div className="cai-prompts">
          {PROMPTS.map((s) => (
            <span className="suggestion-chip" key={s} onClick={() => app.aiSuggestion(s)}>
              {s}
            </span>
          ))}
        </div>

        <div className="ai-messages cai-messages" id="aiMessages" ref={msgsRef}>
          <div className="ai-msg bot">
            Good morning, Diogo. I&apos;m your FloBrain Cockpit AI. I can help you with tasks, spaces, docs, reports, and buddies. What would you like to work on today?
          </div>
          <div className="ai-msg user">What are my tasks for today?</div>
          <div className="ai-msg bot">
            You have <strong>4 tasks</strong> due today in Space ventures:
            <br />
            <br />
            1. Update design system tokens{" "}
            <span style={{ fontSize: 10, padding: "2px 6px", background: "rgba(229,72,72,.15)", color: "#E54848", borderRadius: 4, marginLeft: 4 }}>
              high
            </span>
            <br />
            2. Review wireframe v4 feedback
            <br />
            3. LinkedIn experience update
            <br />
            4. Vendor brief review with Ceren
            <br />
            <br />
            Want me to open the Kanban board?
          </div>
          {state.aiMessages.map((m, i) => (
            <div className={`ai-msg ${m.role}`} key={i} dangerouslySetInnerHTML={{ __html: m.html }} />
          ))}
        </div>

        <div className="cai-composer">
          <input
            className="input cai-input"
            id="aiInput"
            placeholder="Ask about tasks, spaces, docs, reports, or buddies…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button className="btn btn-primary cai-send" onClick={send} aria-label="Send message">
            <Icon name="send" size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      <aside className="cai-context-panel">
        <div className="cai-panel-section">
          <div className="cai-panel-label">Today&apos;s tasks</div>
          <div className="cai-task-row">
            <span className="cai-task-dot high" />
            Update design system tokens
          </div>
          <div className="cai-task-row">
            <span className="cai-task-dot med" />
            Review wireframe v4
          </div>
          <div className="cai-task-row">
            <span className="cai-task-dot low" />
            LinkedIn update
          </div>
          <div className="cai-task-row">
            <span className="cai-task-dot low" />
            Vendor brief review
          </div>
        </div>
        <div className="cai-panel-section">
          <div className="cai-panel-label">Active spaces</div>
          <div className="cai-space-row" onClick={() => app.handleSpaceClick("design-buddy")}>
            <span className="cai-space-dot" style={{ background: "#E85D8C" }} />
            Design buddy
            <span className="cai-space-status">Online</span>
          </div>
          <div className="cai-space-row" onClick={() => app.handleSpaceClick("health")}>
            <span className="cai-space-dot" style={{ background: "#5CB87A" }} />
            Health buddy
            <span className="cai-space-status">Online</span>
          </div>
          <div className="cai-space-row" onClick={() => app.navigate("rooms")}>
            <span className="cai-space-dot" style={{ background: "#7C5CFF" }} />
            Meeting rooms
            <span className="cai-space-status">2 active</span>
          </div>
        </div>
        <div className="cai-panel-section">
          <div className="cai-panel-label">Recent docs</div>
          {["Design System v4.fig", "Vendor Requirements Brief", "Space VI Pitch Deck"].map((d) => (
            <div className="cai-doc-row" key={d} onClick={() => app.navigate("vault")}>
              <Icon name="file" size={12} />
              {d}
            </div>
          ))}
        </div>
        <div className="cai-panel-section">
          <div className="cai-panel-label">Focus session</div>
          <div className="cai-focus-row">
            <span className="cai-focus-time">00:00</span>
            <span className="cai-focus-label">Design review</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
