"use client";

import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";
import { Home, Progress, Documents, Meetings, Calendar, Leaderboard, Policies, Profile, Favorites, Brainwriting } from "./StaticPages";
import { Onboarding } from "./Onboarding";
import { Masterclasses } from "./Masterclasses";
import { Library } from "./Library";
import { Teams } from "./Teams";

const NAV: { ps: string; label: string }[] = [
  { ps: "home", label: "Personal space home" },
  { ps: "onboarding", label: "Onboarding" },
  { ps: "masterclasses", label: "Masterclasses" },
  { ps: "brainwriting", label: "Brainwriting" },
  { ps: "progress", label: "Progress" },
  { ps: "library", label: "Library" },
  { ps: "documents", label: "Documents" },
  { ps: "meetings", label: "Meetings" },
  { ps: "calendar", label: "Calendar" },
  { ps: "leaderboard", label: "Leaderboard" },
  { ps: "policies", label: "Policies" },
  { ps: "profile", label: "My profile" },
  { ps: "teams", label: "Teams" },
  { ps: "favorites", label: "Favorites" },
];

function PageContent({ page }: { page: string }) {
  switch (page) {
    case "home":
      return <Home />;
    case "onboarding":
      return <Onboarding />;
    case "masterclasses":
      return <Masterclasses />;
    case "brainwriting":
      return <Brainwriting />;
    case "progress":
      return <Progress />;
    case "library":
      return <Library />;
    case "documents":
      return <Documents />;
    case "meetings":
      return <Meetings />;
    case "calendar":
      return <Calendar />;
    case "leaderboard":
      return <Leaderboard />;
    case "policies":
      return <Policies />;
    case "profile":
      return <Profile />;
    case "teams":
    case "members":
      return <Teams />;
    case "favorites":
      return <Favorites />;
    default:
      return <Home />;
  }
}

// Pages that render their own full-bleed layout (no outer .page wrapper).
const SELF_LAYOUT = new Set(["masterclasses", "library", "teams", "members"]);

export function PersonalSurface() {
  const app = useApp();
  const page = app.state.psPage;

  return (
    <div className="surface active" id="surface-personal">
      <div className="ps-layout">
        <nav className="ps-nav" id="psNav" style={{ display: app.state.rightRail.leftCol ? undefined : "none" }}>
          <div
            className="mode-toggle"
            onClick={() => {
              app.navigate("cockpit");
              app.toast("Switched to cockpit");
            }}
          >
            <Icon name="dash" size={11} strokeWidth={2} />
            Switch to cockpit
          </div>
          {NAV.map((item) => (
            <div
              key={item.ps}
              className={`ps-nav-item${page === item.ps ? " active" : ""}`}
              onClick={() => app.showPsPage(item.ps)}
            >
              {item.label}
            </div>
          ))}
        </nav>
        <div className="ps-content" id="psContent" style={{ flex: 1, overflowY: "auto" }}>
          {SELF_LAYOUT.has(page) ? (
            <PageContent page={page} />
          ) : (
            <div className="page fade-up">
              <PageContent page={page} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
