"use client";

import { useState } from "react";
import { useApp } from "../state/AppContext";
import { VAULT_FILES } from "@/data";
import type { VaultFile } from "@/data";

const FILTERS = ["All", "DOCX", "PDF", "Figma", "JavaScript", "Python", "XLSX", "Video", "HTML"];

function statusPill(s: string): string {
  return (
    { Approved: "pill-green", "In Review": "pill-amber", Pending: "pill-grey", Rejected: "pill-red", WIP: "pill-violet" } as Record<string, string>
  )[s] || "pill-grey";
}

export function VaultSurface() {
  const app = useApp();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [detail, setDetail] = useState<VaultFile | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const iconText = (t: string) => t.toUpperCase().slice(0, 4);
  const visible = VAULT_FILES.filter((f) => {
    if (query && !f.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (typeFilter !== "All" && !iconText(f.type).includes(typeFilter.slice(0, 4).toUpperCase())) return false;
    return true;
  });

  return (
    <div className="surface active" id="surface-vault">
      <div id="vaultContent" style={{ flex: 1, overflowY: "auto" }}>
        <div className="page-hero">FloVault</div>
        <div className="page-sub">Approved templates, assets &amp; reusable knowledge · Search, filter, and manage project files</div>
        <div className="flex-between mb-md">
          <input
            className="input"
            style={{ maxWidth: 400 }}
            placeholder="Enter file name or keywords…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-sm" onClick={() => app.toast("Approval requested")}>
            Request approval
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setUploadOpen((v) => !v)}>
            Upload a file
          </button>
        </div>
        <div className="vault-filters" id="vaultFilters">
          {FILTERS.map((f) => (
            <span
              key={f}
              className={`vault-filter ${typeFilter === f ? "active" : ""}`}
              onClick={() => setTypeFilter(f)}
            >
              {f}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {["Engineering", "Marketing", "Operations", "Research"].map((t) => (
            <span className="vault-filter" style={{ fontSize: 11 }} key={t}>
              Team: {t}
            </span>
          ))}
        </div>
        <div id="vaultList">
          {visible.map((f, i) => (
            <div className="row-item vault-row" key={f.name} onClick={() => setDetail(f)}>
              <div className={`file-type-icon ft-${f.type}`}>{f.type.toUpperCase().slice(0, 4)}</div>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: 13 }}>{f.name}</strong>
                <div className="text-muted" style={{ fontSize: 11 }}>
                  {f.owner} · {f.project} · {f.team}
                </div>
              </div>
              <span className="mono" style={{ fontSize: 11, color: "var(--accent-soft)" }}>
                {f.version}
              </span>
              <span className={`pill ${statusPill(f.status)}`}>{f.status}</span>
            </div>
          ))}
        </div>
        {detail && <VaultDetail file={detail} />}
        {uploadOpen && <VaultUpload onClose={() => setUploadOpen(false)} />}
      </div>
    </div>
  );
}

function VaultDetail({ file: f }: { file: VaultFile }) {
  const app = useApp();
  const prevVer = parseFloat(f.version.replace("v", "")) - 1 || 1;
  return (
    <div className="vault-detail" id="vaultDetail" style={{ display: "block" }}>
      <div className="flex-between mb-md">
        <strong style={{ fontSize: 16 }}>{f.name}</strong>
        <span className={`pill ${statusPill(f.status)}`}>{f.status}</span>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-4)", marginBottom: 16 }}>
        What is this file and why does it matter? {f.name} is a key deliverable for the {f.project} project, maintained by {f.owner}.
      </p>
      <div className="grid-2 mb-md">
        <div>
          <div className="text-muted" style={{ fontSize: 11 }}>Owner</div>
          <strong>{f.owner}</strong>
        </div>
        <div>
          <div className="text-muted" style={{ fontSize: 11 }}>Project</div>
          <strong>{f.project}</strong>
        </div>
        <div>
          <div className="text-muted" style={{ fontSize: 11 }}>Team</div>
          <strong>{f.team}</strong>
        </div>
        <div>
          <div className="text-muted" style={{ fontSize: 11 }}>Version</div>
          <strong className="mono">{f.version}</strong>
        </div>
      </div>
      <div className="card-title" style={{ fontSize: 13 }}>Version history</div>
      <div className="version-row">
        <span className="ver">{f.version}</span>
        <span>Current · {f.owner}</span>
        <span className="text-muted">Today</span>
      </div>
      <div className="version-row">
        <span className="ver">v{prevVer}</span>
        <span>Previous revision</span>
        <span className="text-muted">Last week</span>
      </div>
      <div className="chip-row mt-sm">
        <span className="pill pill-grey">design</span>
        <span className="pill pill-grey">{f.project.toLowerCase()}</span>
        <span className="pill pill-grey">{f.team.toLowerCase()}</span>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button className="btn btn-primary btn-sm" onClick={() => app.toast("Forwarded to Ceren for feedback")}>
          Forward file to Ceren for feedback
        </button>
        <button className="btn btn-sm" onClick={() => app.toast("Download started")}>
          Download
        </button>
      </div>
      {f.status === "In Review" && (
        <div className="card mt-md" style={{ borderColor: "var(--warn)" }}>
          <div className="card-title" style={{ color: "var(--warn)" }}>Version conflict</div>
          <p style={{ fontSize: 12, color: "var(--text-4)", marginBottom: 8 }}>A newer version was uploaded while you were editing.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={() => app.toast("Kept primary version")}>Keep primary</button>
            <button className="btn btn-sm" onClick={() => app.toast("Conflict cancelled")}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function VaultUpload({ onClose }: { onClose: () => void }) {
  const app = useApp();
  return (
    <div id="vaultUploadForm" className="card mt-md fade-up">
      <div className="card-title">Upload a file or attachment</div>
      {[
        ["File name", "Enter file name"],
        ["Project", "Select project"],
      ].map(([l, p]) => (
        <div key={l}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", margin: "8px 0 4px" }}>{l}</div>
          <input className="input mb-md" placeholder={p} />
        </div>
      ))}
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", margin: "8px 0 4px" }}>Team</div>
      <select className="input mb-md">
        <option>Engineering</option>
        <option>Marketing</option>
        <option>Operations</option>
        <option>Research</option>
      </select>
      {[
        ["Tags", "Add a tag…"],
        ["Keywords", "Add a keyword…"],
      ].map(([l, p]) => (
        <div key={l}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)", margin: "8px 0 4px" }}>{l}</div>
          <input className="input mb-md" placeholder={p} />
        </div>
      ))}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            app.toast("File uploaded");
            onClose();
          }}
        >
          Upload
        </button>
        <button className="btn btn-sm" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
