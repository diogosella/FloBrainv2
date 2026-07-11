"use client";

import { useState } from "react";
import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";
import { DmChip } from "../ui/DmChip";
import { ROOMS, ROOM_MESSAGES } from "@/data";

export function RoomsSurface() {
  const app = useApp();
  const [videoMin, setVideoMin] = useState(false);
  const activeRoom = app.state.activeRoom;
  const room = ROOMS.find((r) => r.id === activeRoom) || ROOMS[0];
  const msgs = ROOM_MESSAGES[activeRoom] || ROOM_MESSAGES.design;

  return (
    <div className="surface active" id="surface-rooms">
      <div id="roomsLayout" style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        <div className="rooms-sidebar fade-up" style={{ display: app.state.rightRail.leftCol ? undefined : "none" }}>
          <div className="flex-between mb-md">
            <strong style={{ fontSize: 14 }}>Meeting rooms</strong>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className="btn btn-sm"
                title="View teams"
                style={{ display: "flex", alignItems: "center", gap: 5 }}
                onClick={() => app.navigate("personal", { ps: "teams" })}
              >
                <Icon name="users" size={12} strokeWidth={2} />
                Teams
              </button>
              <button className="btn btn-sm" onClick={() => app.toast("New room created")}>
                + New
              </button>
            </div>
          </div>
          {ROOMS.map((r) => (
            <div
              key={r.id}
              className={`room-item ${r.id === activeRoom ? "active" : ""}`}
              onClick={() => app.patch({ activeRoom: r.id })}
            >
              <div className="ri-icon" style={{ background: r.color + "22", color: r.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={r.icon} size={15} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-5)" }}>{r.active} active now</div>
              </div>
              {r.unread ? <span className="ri-badge">{r.unread}</span> : null}
            </div>
          ))}
          <div
            className={`video-panel mt-md${videoMin ? " minimized" : ""}`}
            onClick={() => setVideoMin((v) => !v)}
            style={{ cursor: "pointer", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <Icon name="video" size={16} /> Video panel
          </div>
        </div>
        <div className="rooms-main fade-up">
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>{room.name}</strong>
            <span className="text-muted">{room.active} members active</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {msgs.map((m, i) => (
              <div className="room-msg" key={i}>
                <div className="rm-who">
                  <DmChip name={m.who} />
                </div>
                <div className="rm-text">{m.text}</div>
                <div className="rm-time">{m.t}</div>
                {m.reactions && (
                  <div className="room-reactions">
                    {m.reactions.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="ai-composer" style={{ padding: "12px 16px", borderTop: "1px solid var(--line)" }}>
            <input className="input" placeholder={`Message ${room.name}…`} />
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
