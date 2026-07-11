"use client";

import { useEffect, useRef } from "react";
import { useApp } from "../state/AppContext";
import { ToolRail } from "../navigation/ToolRail";
import { TopContextBar } from "./TopContextBar";
import { WorkArea } from "./WorkArea";
import { RightRail } from "./RightRail";
import { ChatDock } from "./ChatDock";
import { Toasts } from "./Toasts";
import { CommandPalette } from "../modals/CommandPalette";
import { SearchOverlay } from "../modals/SearchOverlay";
import { CustomizeDrawer } from "../modals/CustomizeDrawer";
import { ProfilePanel } from "../modals/ProfilePanel";
import { TaskPanel } from "../modals/TaskPanel";
import { Modals } from "../modals/Modals";
import { Icon } from "../ui/Icon";

export function AppShell() {
  const app = useApp();
  const { state } = app;
  const stateRef = useRef(state);
  stateRef.current = state;

  // Close transient dropdowns on outside click (matches original bindEvents).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const s = stateRef.current;
      const p: Record<string, boolean> = {};
      if (s.timerDropdownOpen && !el.closest(".timer-wrap")) p.timerDropdownOpen = false;
      if (s.venturesDropdownOpen && !el.closest(".ventures-dropdown") && !el.closest(".wt-brand")) p.venturesDropdownOpen = false;
      if (s.toolsFlyoutOpen && !el.closest(".tools-flyout") && !el.closest("#toolsBtn")) p.toolsFlyoutOpen = false;
      if (s.dmPickerOpen && !el.closest(".dm-picker") && !el.closest(".dock-plus-btn")) p.dmPickerOpen = false;
      if (Object.keys(p).length) app.patch(p);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [app]);

  // Keyboard shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      if (typing) {
        if (e.key === "Escape") app.patch({ cmdOpen: false, searchOpen: false, drawerOpen: false });
        return;
      }
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "k") { e.preventDefault(); app.patch({ cmdOpen: true }); }
      else if (mod && e.key === "/") { e.preventDefault(); app.patch({ searchOpen: true }); }
      else if (mod && e.key === "1") { e.preventDefault(); app.navigate("spaces"); }
      else if (mod && e.key === "2") { e.preventDefault(); app.navigate("cockpit"); }
      else if (mod && e.key === "i") { e.preventDefault(); app.toast("Inbox — you're all caught up"); }
      else if (mod && e.key === ".") { e.preventDefault(); stateRef.current.present ? app.exitPresent() : app.enterPresent(); }
      else if (e.key === "?") { e.preventDefault(); app.patch({ modal: "shortcuts" }); }
      else if (e.key === "Escape") {
        app.patch({ cmdOpen: false, searchOpen: false, drawerOpen: false, modal: null, profile: null });
        if (stateRef.current.present) app.exitPresent();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [app]);

  const appClass = [
    "app",
    state.present ? "present-mode" : "",
    state.rightRail.compact ? "cz-compact" : "",
    state.rightRail.fullWidth ? "cz-full-width" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* SVG gradient defs (needed by impact ring) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="impactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B6BFF" />
            <stop offset="100%" stopColor="#6B4CF0" />
          </linearGradient>
        </defs>
      </svg>

      <div className={appClass} id="app">
        {state.present && (
          <div className="present-banner show" id="presentBanner" style={{ gridColumn: "1/-1", gridRow: 1 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="sparkles" size={14} />
              Nebula focus mode
            </span>
            <button className="btn btn-sm" onClick={() => app.exitPresent()}>
              Exit present
            </button>
          </div>
        )}

        <ToolRail />

        <div className="main-area">
          {state.announcement && (
            <div className="ann-banner" id="annBanner" style={{ display: "flex" }}>
              <span id="annText">{state.announcement}</span>
            </div>
          )}

          <TopContextBar />

          <div className="content-wrap">
            <WorkArea />
            <RightRail />
          </div>

          <TaskPanel />
          <ChatDock />
        </div>

        <CommandPalette />
        <SearchOverlay />
        <CustomizeDrawer />
        <ProfilePanel />
        <Modals />
        <Toasts />
      </div>
    </>
  );
}
