"use client";

import { useApp } from "../state/AppContext";
import { SpacesSurface } from "../surfaces/SpacesSurface";
import { CockpitSurface } from "../cockpit/CockpitSurface";
import { RoomsSurface } from "../surfaces/RoomsSurface";
import { TasksSurface } from "../surfaces/TasksSurface";
import { DocsSurface } from "../surfaces/DocsSurface";
import { VaultSurface } from "../surfaces/VaultSurface";
import { PersonalSurface } from "../personal/PersonalSurface";
import { BuddySurface } from "../buddy/BuddySurface";

export function WorkArea() {
  const { state } = useApp();
  const buddyFit = state.surface === "buddy" && state.activeBuddy === "design";

  return (
    <div className={`work-area${buddyFit ? " buddy-fit" : ""}`} id="workArea">
      {state.surface === "spaces" && <SpacesSurface />}
      {state.surface === "cockpit" && <CockpitSurface />}
      {state.surface === "rooms" && <RoomsSurface />}
      {state.surface === "tasks" && <TasksSurface />}
      {state.surface === "docs" && <DocsSurface />}
      {state.surface === "vault" && <VaultSurface />}
      {state.surface === "personal" && <PersonalSurface />}
      {state.surface === "buddy" && <BuddySurface />}
    </div>
  );
}
