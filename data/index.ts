// Typed re-export layer over the raw ported sample data.
import * as raw from "./sampleData";
import type {
  Venture,
  Tool,
  Room,
  Buddy,
  RoomMessage,
  Task,
  Subtask,
  Doc,
  TimerEntry,
  Account,
  McAlert,
  Space,
  Member,
  Team,
  VaultFile,
  ChatPerson,
} from "./types";

export * from "./types";

export const VENTURES = raw.VENTURES as Venture[];
export const TOOL_CATALOG = raw.TOOL_CATALOG as Tool[];
export const ROOMS = raw.ROOMS as Room[];
export const BUDDIES = raw.BUDDIES as unknown as Record<string, Buddy>;
export const CLAUDE_DESIGN = raw.CLAUDE_DESIGN;
export const ROOM_MESSAGES = raw.ROOM_MESSAGES as unknown as Record<string, RoomMessage[]>;
export const TASKS = raw.TASKS as Task[];
export const SUBTASKS = raw.SUBTASKS as unknown as Record<string, Subtask[]>;
export const DOCS = raw.DOCS as Doc[];
export const TIMER_ENTRIES = raw.TIMER_ENTRIES as TimerEntry[];
export const ACCOUNTS = raw.ACCOUNTS as Account[];
export const MC_ALERTS = raw.MC_ALERTS as McAlert[];
export const SPACES = raw.SPACES as Space[];
export const TEAM = raw.TEAM as Member[];
export const TEAMS = raw.TEAMS as Team[];
export const VAULT_FILES = raw.VAULT_FILES as VaultFile[];
export const CHAT_PEOPLE = raw.CHAT_PEOPLE as ChatPerson[];
