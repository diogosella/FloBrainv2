// Shared types for FloBrain sample data.

export interface Venture {
  id: string;
  name: string;
  icon: string;
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  url?: string;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  color: string;
  unread: number;
  active: number;
}

export interface Buddy {
  name: string;
  icon: string;
  color: string;
  domain: string;
  prompts: string[];
}

export interface RoomMessage {
  who: string;
  t: string;
  text: string;
  reactions?: string[];
}

export interface Task {
  id: string;
  title: string;
  col: "todo" | "progress" | "done";
  pri: "high" | "med" | "low";
  due: string;
  assignees: string[];
  desc: string;
  room: string;
}

export interface Subtask {
  id: string;
  text: string;
  done: boolean;
}

export interface Doc {
  id: string;
  cat: string;
  title: string;
  editor: string;
  edited: string;
  status: string;
}

export interface TimerEntry {
  session: string;
  duration: string;
  date: string;
}

export interface Account {
  name: string;
  email: string;
  init: string;
  active: boolean;
}

export interface McAlert {
  type: "danger" | "warn" | "info";
  title: string;
  desc: string;
  t: string;
}

export interface Space {
  id: string;
  name: string;
  icon: string;
  live: string;
  color: string;
  nav: string;
  ps?: string;
  buddy?: string;
  noIconBg?: boolean;
}

export interface Member {
  name: string;
  init: string;
  role: string;
  status: "online" | "away" | "leave";
  color: string;
}

export interface Team {
  id: string;
  name: string;
  desc: string;
  color: string;
  members: string[];
  activity?: string;
  rooms?: string[];
}

export interface VaultFile {
  name: string;
  type: string;
  owner: string;
  project: string;
  team: string;
  version: string;
  status: string;
}

export interface ChatMessage {
  from: "me" | "them";
  text: string;
}

export interface ChatPerson {
  id: string;
  name: string;
  init: string;
  color: string;
  type: "human" | "buddy";
  status?: "online" | "away" | "leave";
  msgs: ChatMessage[];
}

export interface DesignTool {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  api: string;
  url?: string;
  status?: string;
  essential?: boolean;
  chat?: boolean;
  actionKey?: string;
}
