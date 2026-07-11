"use client";

import { useApp } from "../state/AppContext";
import { Icon, hasIcon } from "../ui/Icon";
import { TOOL_CATALOG } from "@/data";

const NAV_ITEMS: { nav: string; title: string; icon: string }[] = [
  { nav: "spaces", title: "Spaces", icon: "home" },
  { nav: "cockpit", title: "Cockpit", icon: "dash" },
  { nav: "rooms", title: "Meeting rooms", icon: "videocam" },
  { nav: "tasks", title: "Tasks", icon: "check" },
  { nav: "docs", title: "Docs", icon: "file" },
  { nav: "vault", title: "Vault", icon: "db" },
  { nav: "teams", title: "Teams", icon: "users" },
  { nav: "masterclasses", title: "Learn", icon: "grad" },
];

export function ToolRail() {
  const app = useApp();
  const { state } = app;

  const handleNav = (nav: string) => {
    if (nav === "teams") {
      app.navigate("personal", { ps: "teams" });
    } else {
      app.navigate(nav);
    }
  };

  const pins = state.pinnedTools
    .map((id) => [...TOOL_CATALOG, ...state.customTools].find((t) => t.id === id))
    .filter(Boolean) as { id: string; name: string; icon: string; url?: string }[];

  const openPinned = (url?: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rail-wrap">
      <aside className="tool-rail" id="toolRail">
        <div className="fb-rail-logo" onClick={() => app.navigate("spaces")}>
          F
        </div>

        <div className="tr-group">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.nav}
              className={`tr-btn${state.activeNav === item.nav ? " active" : ""}`}
              title={item.title}
              onClick={() => handleNav(item.nav)}
            >
              <span className="tr-icon">
                <Icon name={item.icon} size={16} />
              </span>
              <span className="tr-label">{item.title}</span>
            </button>
          ))}
        </div>

        <div className="tr-sep" style={{ display: pins.length ? "" : "none" }} />
        {pins.length > 0 && (
          <div className="tr-group" id="pinnedToolsGroup">
            {pins.map((t) => (
              <button
                key={t.id}
                className="tr-btn tr-pinned-tool"
                title={`Open ${t.name}`}
                onClick={() => openPinned(t.url)}
              >
                <span className="tr-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {hasIcon(t.icon) ? <Icon name={t.icon} size={17} /> : <span>{t.icon}</span>}
                </span>
                <span className="tr-label">{t.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="tr-group bottom">
          <button
            className="tr-btn"
            id="toolsBtn"
            title="Customize sidebar"
            onClick={(e) => {
              e.stopPropagation();
              app.patch({ toolsFlyoutOpen: !state.toolsFlyoutOpen });
            }}
          >
            <span className="tr-icon">
              <Icon name="wrench" size={16} />
            </span>
            <span className="tr-label">Customize sidebar</span>
          </button>
          <button
            className="tr-btn"
            title="Inbox"
            onClick={() => app.toast("Inbox — you're all caught up")}
          >
            <span className="tr-icon">
              <Icon name="inbox" size={16} />
            </span>
            <span className="tr-label">Inbox</span>
          </button>
          <button className="tr-btn icon-btn" title="Toggle theme" onClick={() => app.toggleTheme()}>
            <span className="tr-icon">
              <Icon name={state.theme === "light" ? "moon" : "sun"} size={15} />
            </span>
            <span className="tr-label">Theme</span>
          </button>
        </div>

        <div className="rail-avatar-wrap" onClick={() => app.openSelfProfile()}>
          <div className="rail-avatar">
            DS
            <span className={`status-dot status-${state.userStatus}`} />
          </div>
          <div className="rail-avatar-label">Diogo</div>
        </div>

        {state.toolsFlyoutOpen && <ToolsFlyout />}
      </aside>
    </div>
  );
}

function ToolsFlyout() {
  const app = useApp();
  const { state } = app;
  const all = [...TOOL_CATALOG, ...state.customTools];
  return (
    <div className="tools-flyout open" id="toolsFlyout">
      <div className="tools-flyout-head">
        <span>Customize sidebar</span>
        <button className="btn btn-ghost btn-sm" onClick={() => app.patch({ toolsFlyoutOpen: false })}>
          ×
        </button>
      </div>
      <div className="tools-flyout-hint">Click a tool to pin it to your sidebar.</div>
      <div id="toolsFlyoutList">
        {all.map((t) => {
          const pinned = state.pinnedTools.includes(t.id);
          return (
            <div
              key={t.id}
              className={`tools-flyout-item${pinned ? " pinned" : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => app.togglePinTool(t.id)}
            >
              <span className="tfi-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {hasIcon(t.icon) ? <Icon name={t.icon} size={14} /> : <span>{t.icon}</span>}
              </span>
              <span className="tfi-name">{t.name}</span>
              <span className="tfi-pin">{pinned ? "✓ Pinned" : "Pin"}</span>
            </div>
          );
        })}
      </div>
      <div className="tools-flyout-item" onClick={() => app.addCustomTool()}>
        <span className="tfi-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="plus" size={14} />
        </span>
        <span className="tfi-name">Add custom tool</span>
      </div>
    </div>
  );
}
