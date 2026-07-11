"use client";

import { useApp } from "../state/AppContext";
import { CHAT_PEOPLE } from "@/data";

export function chatIdFor(nameOrInitials: string): string | null {
  const s = (nameOrInitials || "").toLowerCase();
  const match = CHAT_PEOPLE.find(
    (p) =>
      p.name.toLowerCase().startsWith(s) ||
      p.init.toLowerCase() === s ||
      p.name.toLowerCase().includes(s) ||
      p.id === s
  );
  return match ? match.id : null;
}

/** Inline "Message" chip — faithful port of the original dmBtn() helper. */
export function DmChip({ name, label }: { name: string; label?: string }) {
  const app = useApp();
  const id = chatIdFor(name);
  const text = label || name;
  if (!id) return <>{text}</>;
  return (
    <span
      className="dm-chip"
      title={`Message ${text}`}
      onClick={(e) => {
        e.stopPropagation();
        app.toggleChat(id);
      }}
    >
      <span className="dm-chip-label">{text}</span>
      <span className="dm-chip-btn">Message</span>
    </span>
  );
}
