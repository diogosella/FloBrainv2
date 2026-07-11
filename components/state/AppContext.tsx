"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { CHAT_PEOPLE, TOOL_CATALOG, TIMER_ENTRIES, SPACES } from "@/data";
import type { ChatMessage, Tool } from "@/data";

export type Surface =
  | "spaces"
  | "personal"
  | "cockpit"
  | "vault"
  | "rooms"
  | "tasks"
  | "docs"
  | "buddy";

export type CockpitTab = "ai" | "tasks" | "report" | "rooms" | "docs" | "calendar" | "team";
export type TaskFilter = "mine" | "assigned" | "completed" | "all";
export type TimerState = "idle" | "running" | "paused";
export type ModalId =
  | "assign"
  | "accounts"
  | "pinAnn"
  | "timerDetails"
  | "account"
  | "shortcuts";

export interface Breadcrumb {
  page?: string;
  module?: string;
}

export interface Toast {
  id: number;
  msg: string;
}

export interface ChatMsg {
  role: "bot" | "user";
  html: string;
}

export interface ProfileTarget {
  type: "self" | "member";
  name?: string;
}

export interface RightRailPrefs {
  rightRail: boolean;
  leftCol: boolean;
  compact: boolean;
  fullWidth: boolean;
  impact: boolean;
  progress: boolean;
  myTasks: boolean;
  buddies: boolean;
}

export interface AppState {
  loggedIn: boolean;
  user: "diogo" | "sandeep";
  surface: Surface;
  activeNav: string;
  psPage: string;
  activeTeam: string | null;
  cockpitTab: CockpitTab;
  activeRoom: string;
  taskFilter: TaskFilter;
  activeBuddy: string;
  mcTab: "masterclasses" | "onboarding";
  designRightTab: "work" | "tasks";
  theme: "dark" | "light";
  autoRoute: boolean;
  userStatus: "online" | "away" | "leave";
  activeWs: string;
  breadcrumb: Breadcrumb;

  // overlays / panels
  cmdOpen: boolean;
  searchOpen: boolean;
  drawerOpen: boolean;
  missionControlOpen: boolean;
  mcPane: "projects" | "team" | "workload";
  modal: ModalId | null;
  profile: ProfileTarget | null;
  taskPanel: string | null; // task id, "new", or null(closed)
  statusMenuOpen: boolean;
  venturesDropdownOpen: boolean;
  toolsFlyoutOpen: boolean;

  // chat dock
  openChats: string[];
  chatHeads: string[];
  chatMessages: Record<string, ChatMessage[]>;
  dmPickerOpen: boolean;

  // cockpit / design chat transcripts
  aiMessages: ChatMsg[];
  designMessages: ChatMsg[];

  // timer
  timerState: TimerState;
  timerSeconds: number;
  timerSession: string;
  timerTag: string | null;
  timerTagColor: string | null;
  timerDropdownOpen: boolean;

  // tools
  pinnedTools: string[];
  customTools: Tool[];

  present: boolean;
  announcement: string | null;
  assignTarget: string | null;
  rightRail: RightRailPrefs;

  toasts: Toast[];
}

const initialChatMessages: Record<string, ChatMessage[]> = Object.fromEntries(
  CHAT_PEOPLE.map((p) => [p.id, p.msgs.map((m) => ({ ...m }))])
);

const defaultRightRail: RightRailPrefs = {
  rightRail: true,
  leftCol: true,
  compact: false,
  fullWidth: false,
  impact: true,
  progress: true,
  myTasks: true,
  buddies: true,
};

const initialState: AppState = {
  loggedIn: false,
  user: "diogo",
  surface: "spaces",
  activeNav: "spaces",
  psPage: "home",
  activeTeam: null,
  cockpitTab: "ai",
  activeRoom: "design",
  taskFilter: "mine",
  activeBuddy: "design",
  mcTab: "masterclasses",
  designRightTab: "work",
  theme: "dark",
  autoRoute: true,
  userStatus: "online",
  activeWs: "space-ventures",
  breadcrumb: { page: "Home" },

  cmdOpen: false,
  searchOpen: false,
  drawerOpen: false,
  missionControlOpen: false,
  mcPane: "projects",
  modal: null,
  profile: null,
  taskPanel: null,
  statusMenuOpen: false,
  venturesDropdownOpen: false,
  toolsFlyoutOpen: false,

  openChats: [],
  chatHeads: [],
  chatMessages: initialChatMessages,
  dmPickerOpen: false,

  aiMessages: [],
  designMessages: [],

  timerState: "idle",
  timerSeconds: 0,
  timerSession: "Design review",
  timerTag: null,
  timerTagColor: null,
  timerDropdownOpen: false,

  pinnedTools: [],
  customTools: [],

  present: false,
  announcement: null,
  assignTarget: null,
  rightRail: defaultRightRail,

  toasts: [],
};

type Action =
  | { type: "patch"; patch: Partial<AppState> }
  | { type: "toast/add"; toast: Toast }
  | { type: "toast/remove"; id: number }
  | { type: "timer/tick" }
  | { type: "chat/append"; id: string; msg: ChatMessage }
  | { type: "ai/append"; msg: ChatMsg }
  | { type: "design/append"; msg: ChatMsg };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "patch":
      return { ...state, ...action.patch };
    case "toast/add":
      return { ...state, toasts: [...state.toasts, action.toast] };
    case "toast/remove":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    case "timer/tick":
      return { ...state, timerSeconds: state.timerSeconds + 1 };
    case "chat/append":
      return {
        ...state,
        chatMessages: {
          ...state.chatMessages,
          [action.id]: [...(state.chatMessages[action.id] || []), action.msg],
        },
      };
    case "ai/append":
      return { ...state, aiMessages: [...state.aiMessages, action.msg] };
    case "design/append":
      return { ...state, designMessages: [...state.designMessages, action.msg] };
    default:
      return state;
  }
}

const NAV_NAMES: Record<string, string> = {
  spaces: "Home",
  cockpit: "Cockpit",
  rooms: "Meeting rooms",
  tasks: "Tasks",
  docs: "Docs",
  vault: "Vault",
  buddy: "Buddy",
  personal: "Personal",
  masterclasses: "Masterclasses",
};

const BUDDY_NAMES: Record<string, string> = {
  design: "Design buddy",
  health: "Health buddy",
  travel: "Travel buddy",
  data: "Data buddy",
  legal: "Legal buddy",
  vault: "Vault buddy",
};

export interface AppApi {
  state: AppState;
  patch: (patch: Partial<AppState>) => void;
  toast: (msg: string) => void;
  loginAs: (user: "diogo" | "sandeep") => void;
  navigate: (target: string, opts?: { ps?: string }) => void;
  showPsPage: (page: string) => void;
  handleSpaceClick: (id: string) => void;
  openBuddy: (key: string) => void;
  switchCockpitTab: (tab: CockpitTab) => void;
  setTaskFilter: (f: TaskFilter) => void;
  openMemberProfile: (name: string) => void;
  openSelfProfile: () => void;
  closeProfile: () => void;
  openAssign: (name: string) => void;
  submitAssign: () => void;
  toggleTheme: () => void;
  // timer
  timerMain: () => void;
  timerStop: () => void;
  selectTimerTag: (tag: string, color: string) => void;
  // chat
  toggleChat: (id: string) => void;
  removeChatHead: (id: string) => void;
  sendChat: (id: string, text: string) => void;
  startDm: (id: string) => void;
  // cockpit + design ai
  sendAiMsg: (text: string) => void;
  aiSuggestion: (s: string) => void;
  sendDesignMsg: (text: string) => void;
  // tools
  togglePinTool: (id: string) => void;
  addCustomTool: () => void;
  // present
  enterPresent: () => void;
  exitPresent: () => void;
  // announcement
  postAnnouncement: (text: string) => void;
}

const AppCtx = createContext<AppApi | null>(null);

export function useApp(): AppApi {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

let toastSeq = 0;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const patch = useCallback((p: Partial<AppState>) => dispatch({ type: "patch", patch: p }), []);

  const toast = useCallback((msg: string) => {
    const id = ++toastSeq;
    dispatch({ type: "toast/add", toast: { id, msg } });
    setTimeout(() => dispatch({ type: "toast/remove", id }), 3000);
  }, []);

  // ── Load persisted prefs on mount (client only, avoids hydration mismatch) ──
  useEffect(() => {
    try {
      const pins = localStorage.getItem("flobrain-pinned-tools");
      const custom = localStorage.getItem("flobrain-custom-tools");
      const cz = localStorage.getItem("fb_customize2");
      const p: Partial<AppState> = {};
      if (pins) p.pinnedTools = JSON.parse(pins);
      if (custom) p.customTools = JSON.parse(custom);
      if (cz) {
        const parsed = JSON.parse(cz);
        p.rightRail = { ...defaultRightRail, ...parsed } as RightRailPrefs;
      }
      if (Object.keys(p).length) dispatch({ type: "patch", patch: p });
    } catch {
      /* ignore */
    }
  }, []);

  // ── Theme side effect ──
  useEffect(() => {
    document.body.classList.toggle("light-theme", state.theme === "light");
  }, [state.theme]);

  // ── Timer interval ──
  useEffect(() => {
    if (state.timerState !== "running") return;
    const iv = setInterval(() => dispatch({ type: "timer/tick" }), 1000);
    return () => clearInterval(iv);
  }, [state.timerState]);

  const navigate = useCallback(
    (target: string, opts?: { ps?: string }) => {
      const s = stateRef.current;
      const breadcrumb: Breadcrumb = { page: NAV_NAMES[target] || target };
      if (target === "masterclasses" || target === "profile") {
        dispatch({
          type: "patch",
          patch: {
            surface: "personal",
            psPage: target,
            activeNav: target === "masterclasses" ? "masterclasses" : "profile",
            breadcrumb,
          },
        });
        return;
      }
      if (target === "personal") {
        const ps = opts?.ps || s.psPage || "home";
        dispatch({
          type: "patch",
          patch: {
            surface: "personal",
            psPage: ps,
            activeNav: ps === "masterclasses" ? "masterclasses" : "spaces",
            breadcrumb,
          },
        });
        return;
      }
      if (target === "buddy") {
        dispatch({ type: "patch", patch: { surface: "buddy" } });
        return;
      }
      if (["rooms", "tasks", "docs", "vault", "spaces"].includes(target)) {
        dispatch({
          type: "patch",
          patch: { surface: target as Surface, activeNav: target, breadcrumb },
        });
        return;
      }
      if (target === "cockpit") {
        dispatch({
          type: "patch",
          patch: { surface: "cockpit", cockpitTab: "ai", activeNav: "cockpit", breadcrumb },
        });
        return;
      }
      dispatch({ type: "patch", patch: { surface: "spaces", activeNav: "spaces", breadcrumb } });
    },
    []
  );

  const showPsPage = useCallback(
    (page: string) => {
      if (page === "health") {
        openBuddyImpl("health");
        return;
      }
      dispatch({
        type: "patch",
        patch: {
          surface: "personal",
          psPage: page,
          activeNav: page === "masterclasses" ? "masterclasses" : page === "profile" ? "profile" : "spaces",
        },
      });
    },
    []
  );

  const openBuddyImpl = useCallback((key: string) => {
    dispatch({
      type: "patch",
      patch: {
        surface: "buddy",
        activeBuddy: key,
        activeNav: "",
        breadcrumb: { page: "Buddy", module: BUDDY_NAMES[key] || key },
      },
    });
  }, []);

  const openBuddy = openBuddyImpl;

  const handleSpaceClick = useCallback(
    (id: string) => {
      const sp = SPACES.find((x) => x.id === id);
      if (!sp) return;
      if (sp.nav === "buddy" && sp.buddy) openBuddyImpl(sp.buddy);
      else if (sp.nav === "personal") showPsPage(sp.ps || "home");
      else if (sp.nav === "masterclasses") showPsPage("masterclasses");
      else navigate(sp.nav);
    },
    [navigate, showPsPage, openBuddyImpl]
  );

  const switchCockpitTab = useCallback((tab: CockpitTab) => {
    dispatch({ type: "patch", patch: { cockpitTab: tab } });
  }, []);

  const setTaskFilter = useCallback((f: TaskFilter) => {
    dispatch({ type: "patch", patch: { taskFilter: f } });
  }, []);

  const openMemberProfile = useCallback((name: string) => {
    dispatch({ type: "patch", patch: { profile: { type: "member", name } } });
  }, []);
  const openSelfProfile = useCallback(() => {
    dispatch({ type: "patch", patch: { profile: { type: "self" } } });
  }, []);
  const closeProfile = useCallback(() => {
    dispatch({ type: "patch", patch: { profile: null } });
  }, []);

  const openAssign = useCallback((name: string) => {
    dispatch({ type: "patch", patch: { assignTarget: name, modal: "assign", statusMenuOpen: false } });
  }, []);
  const submitAssign = useCallback(() => {
    const t = stateRef.current.assignTarget;
    dispatch({ type: "patch", patch: { modal: null } });
    toast("Task assigned to " + t);
  }, [toast]);

  const toggleTheme = useCallback(() => {
    const next = stateRef.current.theme === "dark" ? "light" : "dark";
    dispatch({ type: "patch", patch: { theme: next } });
    toast(next === "light" ? "Light theme enabled" : "Dark theme enabled");
  }, [toast]);

  const loginAs = useCallback(
    (user: "diogo" | "sandeep") => {
      dispatch({ type: "patch", patch: { loggedIn: true, user } });
      if (user === "sandeep") navigate("cockpit");
      else navigate("spaces");
    },
    [navigate]
  );

  // ── Timer ──
  const timerMain = useCallback(() => {
    const s = stateRef.current;
    if (s.timerState === "idle") {
      dispatch({ type: "patch", patch: { timerState: "running" } });
      toast("Tracking started · " + s.timerSession + (s.timerTag ? " [" + s.timerTag + "]" : ""));
    } else if (s.timerState === "running") {
      dispatch({ type: "patch", patch: { timerState: "paused" } });
      toast("Timer paused");
    } else {
      dispatch({ type: "patch", patch: { timerState: "running" } });
      toast("Timer resumed");
    }
  }, [toast]);

  const timerStop = useCallback(() => {
    const s = stateRef.current;
    if (s.timerState === "idle") return;
    const mins = String(Math.floor(s.timerSeconds / 60)).padStart(2, "0");
    const secs = String(s.timerSeconds % 60).padStart(2, "0");
    toast('Session stopped · ' + mins + ":" + secs + ' logged for "' + s.timerSession + '"');
    dispatch({ type: "patch", patch: { timerState: "idle", timerSeconds: 0 } });
  }, [toast]);

  const selectTimerTag = useCallback((tag: string, color: string) => {
    dispatch({ type: "patch", patch: { timerTag: tag, timerTagColor: color } });
  }, []);

  // ── Chat ──
  const toggleChat = useCallback((id: string) => {
    const s = stateRef.current;
    const idx = s.openChats.indexOf(id);
    let openChats = [...s.openChats];
    let chatHeads = [...s.chatHeads];
    if (idx >= 0) {
      openChats.splice(idx, 1);
    } else {
      openChats.push(id);
      if (!chatHeads.includes(id)) chatHeads.unshift(id);
    }
    dispatch({ type: "patch", patch: { openChats, chatHeads } });
  }, []);

  const removeChatHead = useCallback((id: string) => {
    const s = stateRef.current;
    dispatch({
      type: "patch",
      patch: {
        chatHeads: s.chatHeads.filter((h) => h !== id),
        openChats: s.openChats.filter((c) => c !== id),
      },
    });
  }, []);

  const sendChat = useCallback((id: string, text: string) => {
    const txt = text.trim();
    if (!txt) return;
    dispatch({ type: "chat/append", id, msg: { from: "me", text: txt } });
  }, []);

  const startDm = useCallback(
    (id: string) => {
      dispatch({ type: "patch", patch: { dmPickerOpen: false } });
      toggleChat(id);
    },
    [toggleChat]
  );

  // ── Cockpit AI + design chat ──
  const sendAiMsg = useCallback((text: string) => {
    const q = text.trim();
    if (!q) return;
    dispatch({ type: "ai/append", msg: { role: "user", html: escapeHtml(q) } });
    dispatch({
      type: "ai/append",
      msg: { role: "bot", html: "Got it — routing to the best buddy for your request." },
    });
  }, []);

  const aiSuggestion = useCallback(
    (s: string) => {
      toast(s + "…");
      dispatch({ type: "ai/append", msg: { role: "user", html: escapeHtml(s) } });
      dispatch({
        type: "ai/append",
        msg: { role: "bot", html: "Working on that now — I'll have results shortly." },
      });
    },
    [toast]
  );

  const sendDesignMsg = useCallback((text: string) => {
    const q = text.trim();
    if (!q) return;
    dispatch({ type: "design/append", msg: { role: "user", html: escapeHtml(q) } });
    const reply = getClaudeDesignReply(q);
    setTimeout(() => dispatch({ type: "design/append", msg: { role: "bot", html: reply } }), 600);
  }, []);

  // ── Tools ──
  const togglePinTool = useCallback(
    (id: string) => {
      const s = stateRef.current;
      const all = [...TOOL_CATALOG, ...s.customTools];
      const tool = all.find((t) => t.id === id);
      if (!tool) return;
      let pinnedTools: string[];
      if (s.pinnedTools.includes(id)) {
        pinnedTools = s.pinnedTools.filter((x) => x !== id);
        toast(tool.name + " removed from sidebar");
      } else {
        pinnedTools = [...s.pinnedTools, id];
        toast(tool.name + " pinned to sidebar");
      }
      localStorage.setItem("flobrain-pinned-tools", JSON.stringify(pinnedTools));
      dispatch({ type: "patch", patch: { pinnedTools } });
    },
    [toast]
  );

  const addCustomTool = useCallback(() => {
    const name = window.prompt("Tool name");
    if (!name?.trim()) return;
    const url = window.prompt("Tool URL (include https://)");
    if (!url?.trim()) return;
    const icon = window.prompt("Emoji icon (optional)", "🔗") || "🔗";
    const id = "custom-" + Date.now();
    const s = stateRef.current;
    const customTools = [...s.customTools, { id, name: name.trim(), icon: icon.trim(), url: url.trim() }];
    const pinnedTools = [...s.pinnedTools, id];
    localStorage.setItem("flobrain-custom-tools", JSON.stringify(customTools));
    localStorage.setItem("flobrain-pinned-tools", JSON.stringify(pinnedTools));
    dispatch({ type: "patch", patch: { customTools, pinnedTools } });
  }, []);

  const enterPresent = useCallback(() => {
    dispatch({ type: "patch", patch: { present: true } });
    toast("Entered Nebula focus mode");
  }, [toast]);
  const exitPresent = useCallback(() => {
    dispatch({ type: "patch", patch: { present: false } });
  }, []);

  const postAnnouncement = useCallback(
    (text: string) => {
      dispatch({ type: "patch", patch: { announcement: text, modal: null } });
      toast("Announcement pinned");
    },
    [toast]
  );

  const api = useMemo<AppApi>(
    () => ({
      state,
      patch,
      toast,
      loginAs,
      navigate,
      showPsPage,
      handleSpaceClick,
      openBuddy,
      switchCockpitTab,
      setTaskFilter,
      openMemberProfile,
      openSelfProfile,
      closeProfile,
      openAssign,
      submitAssign,
      toggleTheme,
      timerMain,
      timerStop,
      selectTimerTag,
      toggleChat,
      removeChatHead,
      sendChat,
      startDm,
      sendAiMsg,
      aiSuggestion,
      sendDesignMsg,
      togglePinTool,
      addCustomTool,
      enterPresent,
      exitPresent,
      postAnnouncement,
    }),
    [
      state,
      patch,
      toast,
      loginAs,
      navigate,
      showPsPage,
      handleSpaceClick,
      openBuddy,
      switchCockpitTab,
      setTaskFilter,
      openMemberProfile,
      openSelfProfile,
      closeProfile,
      openAssign,
      submitAssign,
      toggleTheme,
      timerMain,
      timerStop,
      selectTimerTag,
      toggleChat,
      removeChatHead,
      sendChat,
      startDm,
      sendAiMsg,
      aiSuggestion,
      sendDesignMsg,
      togglePinTool,
      addCustomTool,
      enterPresent,
      exitPresent,
      postAnnouncement,
    ]
  );

  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

export const TIMER_ENTRIES_DATA = TIMER_ENTRIES;

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getClaudeDesignReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("figma"))
    return "I've pulled FloBrain V2 from Figma — 128 components and 42 variables. Dev Mode specs are ready for handoff.";
  if (lower.includes("token"))
    return "Token sync complete. 42 CSS custom properties exported from Design System v4 to match your codebase.";
  if (lower.includes("a11y") || lower.includes("access"))
    return "Accessibility scan finished — 8 frames checked. 2 contrast warnings on the Space VI hero need attention.";
  if (lower.includes("wireframe"))
    return "Wireframe v4 is in review. Dina updated the 3-column layout 2 hours ago — Ceren left approval feedback.";
  if (lower.includes("critique") || lower.includes("review"))
    return "Share a Figma link or describe the screen — I'll check hierarchy, spacing, and token usage against Design System v4.";
  if (lower.includes("copy"))
    return "I can draft UI copy on-brand for FloLabs. Tell me the component and tone (formal, friendly, concise).";
  return "Got it — I'm searching design context across Figma, Vault, and your open tasks. What should I prioritize?";
}
