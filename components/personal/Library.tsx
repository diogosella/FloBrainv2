"use client";

import { useState } from "react";
import { useApp } from "../state/AppContext";

const ITEMS = [
  { name: "Design tutorials", tag: "Learning", files: ["Figma auto-layout guide", "Design tokens 101", "Component anatomy"] },
  { name: "Inspiration examples", tag: "Reference", files: ["Linear app analysis", "Notion design patterns", "OperaGX UX study"] },
  { name: "Research materials", tag: "Research", files: ["AI in productivity — 2026 report", "UX trend analysis", "Cognitive load studies"] },
  { name: "Masterclass content", tag: "Learning", files: ["Building with AI agents", "Design systems at scale", "Product-led growth fundamentals"] },
  { name: "Saved articles", tag: "Reference", files: ["Why constraints improve design", "The anatomy of great onboarding", "Future of AI-assisted work"] },
];

function tagStyle(t: string): React.CSSProperties {
  if (t === "Learning") return { background: "rgba(69,212,131,.12)", color: "#45D483" };
  if (t === "Reference") return { background: "rgba(107,127,215,.15)", color: "#8B9FE8" };
  return { background: "rgba(217,138,74,.12)", color: "#D98A4A" };
}

export function Library() {
  const app = useApp();
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? ITEMS : ITEMS.filter((i) => i.tag === filter);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.02em", color: "var(--text)" }}>Library</div>
          <div style={{ fontSize: 12, color: "var(--text-5)", marginTop: 3 }}>Reference materials and learning resources</div>
        </div>
        <button className="btn btn-sm" onClick={() => app.toast("Resource saved to Library")}>
          + Save resource
        </button>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
        {["All", "Learning", "Reference", "Research"].map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              className="btn btn-sm"
              style={{ fontSize: 11, ...(active ? { background: "rgba(124,92,255,.2)", color: "#A78BFF", borderColor: "rgba(124,92,255,.3)" } : {}) }}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          );
        })}
      </div>
      <div id="libraryItems" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((item) => (
          <div key={item.name} style={{ background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", flex: 1 }}>{item.name}</div>
              <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20, ...tagStyle(item.tag) }}>{item.tag}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.files.map((f) => (
                <div
                  key={f}
                  style={{ padding: "5px 10px", background: "var(--bg-3)", border: "1px solid var(--line)", borderRadius: 5, fontSize: 11.5, color: "var(--text-3)", cursor: "pointer" }}
                  onClick={() => app.toast(`Opening: ${f}`)}
                >
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(124,92,255,.06)", border: "1px solid rgba(124,92,255,.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>Looking for approved assets?</div>
          <div style={{ fontSize: 11, color: "var(--text-5)", marginTop: 2 }}>Templates, brand assets, and approved files live in FloVault</div>
        </div>
        <button className="btn btn-sm" onClick={() => app.navigate("vault")} style={{ flexShrink: 0 }}>
          Open FloVault →
        </button>
      </div>
    </div>
  );
}
