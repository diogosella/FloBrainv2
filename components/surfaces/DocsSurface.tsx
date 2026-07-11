"use client";

import { DocsPane } from "../cockpit/DocsPane";

export function DocsSurface() {
  return (
    <div className="surface active" id="surface-docs">
      <div id="docsPage" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <DocsPane />
      </div>
    </div>
  );
}
