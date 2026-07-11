"use client";

import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";
import { ROOMS } from "@/data";

export function CockpitRoomsTab() {
  const app = useApp();
  return (
    <div className="cockpit-rooms-wrap">
      <div className="cockpit-rooms-head">
        <div>
          <div className="cockpit-rooms-title">Meeting rooms</div>
          <div className="cockpit-rooms-sub">
            {ROOMS.filter((r) => r.active > 0).length} active · {ROOMS.length} total
          </div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => app.navigate("rooms")}>
          + New room
        </button>
      </div>
      <div className="cockpit-rooms-grid">
        {ROOMS.map((r) => (
          <div
            className="cockpit-room-card"
            key={r.id}
            onClick={() => {
              app.patch({ activeRoom: r.id });
              app.navigate("rooms");
            }}
          >
            <div className="crc-top">
              <div className="crc-icon" style={{ background: r.color + "22", color: r.color }}>
                <Icon name={r.icon} size={16} />
              </div>
              <span className={`crc-status ${r.active > 0 ? "active" : "idle"}`}>
                {r.active > 0 ? r.active + " active" : "Idle"}
              </span>
            </div>
            <div className="crc-name">{r.name}</div>
            <div className="crc-meta">
              {r.unread > 0 ? (
                <span className="crc-unread">{r.unread} unread</span>
              ) : (
                <span className="crc-noread">No new messages</span>
              )}
            </div>
            <button className="crc-open">Open room →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
