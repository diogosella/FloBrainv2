"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "../state/AppContext";
import { Icon, hasIcon } from "../ui/Icon";
import { CHAT_PEOPLE } from "@/data";
import type { ChatPerson } from "@/data";

function personById(id: string): ChatPerson | undefined {
  return CHAT_PEOPLE.find((c) => c.id === id);
}

function ChatCard({ id }: { id: string }) {
  const app = useApp();
  const p = personById(id);
  const [text, setText] = useState("");
  const msgsRef = useRef<HTMLDivElement>(null);
  const msgs = app.state.chatMessages[id] || [];

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs.length]);

  if (!p) return null;

  const send = () => {
    if (!text.trim()) return;
    app.sendChat(id, text);
    setText("");
  };

  return (
    <div className="chat-card" data-card-id={id}>
      <div className="chat-card-head">
        <div className="cc-av" style={{ background: p.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {hasIcon(p.init) ? <Icon name={p.init} size={13} color="#fff" /> : p.init}
        </div>
        <span className="cc-name">{p.name}</span>
        <button className="cc-close" onClick={() => app.toggleChat(id)}>
          ×
        </button>
      </div>
      <div className="chat-card-msgs" ref={msgsRef}>
        {msgs.map((m, i) => (
          <div className={`cm ${m.from === "me" ? "me" : "them"}`} key={i}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="chat-card-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={`Message ${p.name.split(" ")[0]}…`}
        />
        <button onClick={send}>↑</button>
      </div>
    </div>
  );
}

export function ChatDock() {
  const app = useApp();
  const { state } = app;
  const [query, setQuery] = useState("");

  const humans = CHAT_PEOPLE.filter((p) => p.type === "human" && p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={`chat-dock${state.present ? " collapsed" : ""}`} id="chatDock">
      <div className="chat-cards" id="chatCards">
        {state.openChats.map((id) => (
          <ChatCard id={id} key={id} />
        ))}
      </div>
      <div className="dock-bar">
        <div className="chat-heads" id="chatHeads">
          {state.chatHeads.map((id) => {
            const p = personById(id);
            if (!p) return null;
            return (
              <div
                key={id}
                className={`chat-head ${p.type === "buddy" ? "buddy-head" : ""}`}
                style={{ background: p.color }}
                title={p.name}
                onClick={() => app.toggleChat(id)}
              >
                {p.type === "buddy" && hasIcon(p.init) ? (
                  <Icon name={p.init} size={16} />
                ) : (
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{p.init}</span>
                )}
                {p.type === "human" && <span className={`presence status-${p.status}`} />}
                <button
                  className="chat-head-remove"
                  title="Remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    app.removeChatHead(id);
                  }}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
        <div className="dock-new-dm" id="dockNewDm">
          <button
            className="dock-plus-btn"
            title="New message"
            onClick={(e) => {
              e.stopPropagation();
              app.patch({ dmPickerOpen: !state.dmPickerOpen });
            }}
          >
            <Icon name="plus" size={14} strokeWidth={2} />
          </button>
          <div className={`dm-picker${state.dmPickerOpen ? " open" : ""}`}>
            <div className="dm-picker-head">New message</div>
            <input
              className="dm-picker-search"
              placeholder="Search people…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="dm-picker-list">
              {humans.map((p) => (
                <div className="dm-picker-item" key={p.id} onClick={() => app.startDm(p.id)}>
                  <div className="dm-picker-av" style={{ background: p.color }}>
                    {p.init}
                  </div>
                  <div className="dm-picker-info">
                    <div className="dm-picker-name">{p.name}</div>
                    <div className="dm-picker-role">Team member</div>
                  </div>
                  {p.status && <div className={`dm-picker-dot status-${p.status}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
