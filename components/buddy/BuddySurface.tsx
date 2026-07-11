"use client";

import { useApp } from "../state/AppContext";
import { BUDDIES } from "@/data";
import { DesignBuddy } from "./DesignBuddy";
import { HealthDashboard } from "./HealthDashboard";
import { GenericBuddy, TravelBuddy, DataBuddy, LegalBuddy, VaultBuddy } from "./SimpleBuddies";

export function BuddySurface() {
  const app = useApp();
  const key = app.state.activeBuddy;
  const b = BUDDIES[key];

  const isDesign = key === "design";

  return (
    <div className="surface active" id="surface-buddy">
      <div id="buddyContent" className={isDesign ? "design-buddy-shell" : ""} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {!b ? null : key === "health" ? (
          <HealthDashboard />
        ) : key === "design" ? (
          <DesignBuddy b={b} />
        ) : key === "travel" ? (
          <TravelBuddy b={b} />
        ) : key === "data" ? (
          <DataBuddy b={b} />
        ) : key === "legal" ? (
          <LegalBuddy b={b} />
        ) : key === "vault" ? (
          <VaultBuddy b={b} />
        ) : (
          <GenericBuddy b={b} />
        )}
      </div>
    </div>
  );
}
