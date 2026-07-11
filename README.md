# FloBrain V2

A maintainable **Next.js (App Router) + TypeScript** rebuild of the original single-file
`FloBrain V2 - Standalone.html`. The standalone file was a ~2,800-line vanilla-JS SPA that
rendered HTML strings into a static shell driven by a global mutable `state` object. This
project preserves the visual design, navigation, and interactions while restructuring the
app into reusable React components, extracted data, structured styles, and clean state
management.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Architecture

```
app/
  layout.tsx            Root layout + next/font (Plus Jakarta Sans, JetBrains Mono)
  page.tsx              Renders <FloBrainApp/>
components/
  FloBrainApp.tsx       Provider + login/app switch
  state/AppContext.tsx  Central store (useReducer) replacing the global `state` + navigation
  auth/                 Login page
  shell/                App shell: rail wrap, top context bar, work area, right rail,
                        chat dock, toasts, AppShell orchestrator (keyboard + outside-click)
  navigation/           Tool rail (left nav + pinned tools flyout)
  timer/                FloTimer chip + dropdown (idle / running / paused / stop)
  surfaces/             Spaces, Rooms, Tasks, Docs, Vault surfaces
  cockpit/              Cockpit tabs: AI chat (FloBrain), Tasks (Kanban), Report,
                        Meeting rooms, Docs
  personal/             Personal space sub-nav + pages (home, onboarding, masterclasses,
                        brainwriting, progress, library, documents, meetings, calendar,
                        leaderboard, policies, profile, teams, favorites)
  buddy/                Buddy workspaces: Design (FloBrain chat + tools), Health dashboard,
                        Travel / Data / Legal / Vault / generic
  modals/               Command palette, search, customize drawer, profile/member drawer,
                        task panel, assign / accounts / pin-announcement / timer-details /
                        shortcuts modals
  ui/                   Icon (ported lucide path map), DmChip
data/                   Sample data extracted from the original (typed re-export layer)
styles/
  globals.css           Entry: imports tokens + components, wires fonts
  tokens.css            Design tokens + shell CSS (ported verbatim)
  components.css         Component + redesign styles (ported verbatim)
```

### State management

All previously-global state (current surface, cockpit tab, active room/team/buddy, timer,
chat dock, tool pins, customize prefs, overlays, toasts) lives in `AppContext` via a
`useReducer` store. Components read state and call typed actions (`navigate`, `openBuddy`,
`toggleChat`, `timerMain`, etc.) — no direct DOM manipulation or global functions.

### Styling

The original CSS (design tokens + component styles) is preserved verbatim in
`styles/tokens.css` and `styles/components.css`, so class names carry over and the visual
design matches the original. Fonts are self-hosted via `next/font` and wired into the
`--font` / `--mono` tokens. The dark theme is the default; the theme toggle adds
`light-theme` to `<body>`.

### Behavior preserved

- Navigation between all main views and the personal sub-nav
- Cockpit tabs: **AI chat (FloBrain AI, default)**, Tasks, Report, **Meeting rooms**, Docs
- Teams flow: teams grid → team detail with members → member profile drawer with
  **Message** and **Assign task** actions
- FloTimer: **Start / Pause / Resume / Stop** states with tag + session label
- Documents represent drafts/WIP; **FloVault** represents approved reusable content
- Masterclasses groups Masterclasses + Brainwriting with a **Masterclasses / Onboarding**
  toggle
- Command palette (⌘K), global search (⌘/), keyboard shortcuts, customize drawer,
  chat dock, present/focus mode
