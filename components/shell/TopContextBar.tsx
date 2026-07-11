"use client";

import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";
import { TimerChip } from "../timer/TimerChip";
import { VENTURES } from "@/data";

function Breadcrumb() {
  const { state } = useApp();
  const { page, module } = state.breadcrumb;
  const parts: string[] = [];
  if (page && page !== "Home") parts.push("Home");
  if (page) parts.push(page);
  if (module) parts.push(module);
  return (
    <div id="fbBreadcrumb">
      {parts.map((p, i) =>
        i < parts.length - 1 ? (
          <span key={i}>
            <span className="bc-part bc-link">{p}</span>
            <span className="bc-sep">/</span>
          </span>
        ) : (
          <span className="bc-part bc-current" key={i}>
            {p}
          </span>
        )
      )}
    </div>
  );
}

export function TopContextBar() {
  const app = useApp();
  const { state } = app;
  return (
    <div className="ws-tabs" id="wsTabs">
      <div className="wt-left">
        <span
          className="wt-brand"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            app.patch({ venturesDropdownOpen: !state.venturesDropdownOpen });
          }}
        >
          FloBrain
        </span>
        <div className={`ventures-dropdown${state.venturesDropdownOpen ? " open" : ""}`} id="venturesDropdown">
          {VENTURES.map((v) => (
            <div
              key={v.id}
              className={`vent-item${state.activeWs === v.id ? " active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
              onClick={() => {
                app.patch({ activeWs: v.id, venturesDropdownOpen: false });
                app.toast("Switched workspace");
              }}
            >
              <Icon name={v.icon} size={14} /> {v.name}
            </div>
          ))}
        </div>
      </div>

      <Breadcrumb />

      <div className="wt-spacer" />

      <div className="wt-right">
        <button className="fb-search-btn" onClick={() => app.patch({ searchOpen: true })}>
          <Icon name="search" size={13} strokeWidth={2} />
          Search <kbd>⌘K</kbd>
        </button>

        <TimerChip />

        <button className="icon-btn" title="Toggle theme" onClick={() => app.toggleTheme()}>
          <Icon name={state.theme === "light" ? "moon" : "sun"} size={14} />
        </button>

        <div className="user-avatar-pill" onClick={() => app.openSelfProfile()}>
          <div className="av">
            DS
            <span className={`status-dot status-${state.userStatus}`} />
          </div>
          <span className="name">Diogo</span>
        </div>
      </div>
    </div>
  );
}
