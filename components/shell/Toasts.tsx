"use client";

import { useApp } from "../state/AppContext";

export function Toasts() {
  const { state } = useApp();
  return (
    <div className="toast-container" id="toastContainer">
      {state.toasts.map((t) => (
        <div className="toast" key={t.id}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
