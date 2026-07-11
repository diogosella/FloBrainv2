"use client";

import { AppProvider, useApp } from "./state/AppContext";
import { LoginPage } from "./auth/LoginPage";
import { AppShell } from "./shell/AppShell";

function Root() {
  const { state } = useApp();
  if (!state.loggedIn) return <LoginPage />;
  return <AppShell />;
}

export function FloBrainApp() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
