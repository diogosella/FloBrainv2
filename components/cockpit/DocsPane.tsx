"use client";

import { useState } from "react";
import { useApp } from "../state/AppContext";
import { DOCS } from "@/data";
import type { Doc } from "@/data";

function statusStyle(s: string): React.CSSProperties {
  if (s === "Draft") return { background: "rgba(124,92,255,.15)", color: "#A78BFF" };
  if (s === "In Review") return { background: "rgba(217,138,74,.15)", color: "#D98A4A" };
  return { background: "rgba(69,212,131,.15)", color: "#45D483" };
}

export function DocsPane() {
  const app = useApp();
  const [selected, setSelected] = useState<Doc | null>(null);
  const cats = Array.from(new Set(DOCS.map((d) => d.cat)));

  return (
    <>
      <div
        style={{
          padding: "16px 20px 0",
          borderBottom: "1px solid var(--line-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-.02em" }}>Documents</div>
          <div style={{ fontSize: 11, color: "var(--text-5)", marginTop: 2 }}>Drafts, notes, and active work files</div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => app.toast("New document created")}>
          + New doc
        </button>
      </div>
      <div className="doc-layout" style={{ flex: 1, minHeight: 0 }}>
        <div className="doc-sidebar">
          {cats.map((c) => (
            <div key={c}>
              <div className="doc-cat">{c}</div>
              {DOCS.filter((d) => d.cat === c).map((d) => (
                <div
                  key={d.id}
                  className={`doc-cat-item${selected?.id === d.id ? " active" : ""}`}
                  onClick={() => setSelected(d)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}
                >
                  <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.title}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 3, flexShrink: 0, ...statusStyle(d.status || "Draft") }}>
                    {d.status || "Draft"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="doc-reader" id="docReader">
          {selected ? <DocReader doc={selected} /> : <DocReaderEmpty />}
        </div>
      </div>
    </>
  );
}

function DocReaderEmpty() {
  const app = useApp();
  return (
    <>
      <div className="section-heading">Documents</div>
      <div className="section-sub">
        Select a document to read or edit. Draft files are work-in-progress — promote to FloVault when approved.
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button className="btn btn-primary btn-sm" onClick={() => app.toast("New doc created")}>
          + New doc
        </button>
        <button className="btn btn-sm" onClick={() => app.navigate("vault")}>
          Browse FloVault →
        </button>
      </div>
    </>
  );
}

function DocReader({ doc }: { doc: Doc }) {
  const app = useApp();
  const status = doc.status || "Draft";
  return (
    <>
      <div className="flex-between mb-md">
        <div>
          <div className="section-heading" style={{ fontSize: 18 }}>
            {doc.title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 3, ...statusStyle(status) }}>{status}</span>
            <span className="text-muted" style={{ fontSize: 12 }}>
              Edited {doc.edited} · {doc.editor}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {status !== "Approved" && (
            <button className="btn btn-sm" onClick={() => app.toast(`Approval requested for: ${doc.title}`)}>
              Request approval
            </button>
          )}
          {status === "Approved" && (
            <button
              className="btn btn-sm"
              style={{ borderColor: "rgba(69,212,131,.3)", color: "#45D483" }}
              onClick={() => {
                app.navigate("vault");
                app.toast("Promoted to FloVault ✓");
              }}
            >
              Promote to FloVault
            </button>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => app.toast(`Editing: ${doc.title}`)}>
            Edit
          </button>
        </div>
      </div>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Overview</div>
      <p style={{ color: "var(--text-4)", marginBottom: 16 }}>
        This document covers key processes and guidelines for the {doc.cat.toLowerCase()} category at FloLabs Innovations Group.
      </p>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-3)", margin: "12px 0 4px" }}>Description</div>
      <p style={{ color: "var(--text-4)" }}>Start writing…</p>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-3)", margin: "12px 0 4px" }}>Acceptance criteria</div>
      <p style={{ color: "var(--text-4)" }}>Document reviewed and approved by team lead.</p>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-3)", margin: "12px 0 4px" }}>Deliverables</div>
      <p style={{ color: "var(--text-4)" }}>Final PDF export and Vault upload.</p>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-3)", margin: "12px 0 4px" }}>Related resources</div>
      <p style={{ color: "var(--text-4)" }}>FloLabs brand assets · Design system v4</p>
    </>
  );
}
