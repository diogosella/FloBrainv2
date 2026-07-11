"use client";

import { useState } from "react";

const STEPS = [
  { title: "Complete profile setup", done: true, body: "Fill in your role, experience, and connections." },
  { title: 'Update your LinkedIn "Experience" section', done: true, body: "Add FloLabs Innovations Group as your current role with description." },
  { title: "Connect my Claude to my GitHub", done: false, body: "Link your GitHub account for code collaboration and AI-assisted development." },
  { title: "Review company policies & guidelines", done: true, body: "Read through the Permissions Guide and acknowledge understanding." },
  { title: "Complete design system orientation", done: true, body: "Walk through the FloLabs design system, tokens, and component library." },
  { title: "Attend first team standup", done: true, body: "Join the daily standup and introduce yourself to the team." },
  { title: "Set up FloBrain workspace", done: true, body: "Customize your speed dial, pin key spaces, and configure notifications." },
  { title: "Submit first brainwriting idea", done: true, body: "Use the brainwriting workspace to submit your first innovation idea." },
  { title: "Complete masterclass: Design fundamentals", done: true, body: "Finish the first masterclass module and pass the assessment." },
  { title: "Schedule 1:1 with mentor", done: false, body: "Book a 30-minute session with Dina Tarek for your first check-in." },
];

export function Onboarding() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const done = STEPS.filter((s) => s.done).length;
  return (
    <>
      <div className="page-hero">My onboarding</div>
      <div className="page-sub">
        <span className="mono" style={{ fontSize: 16, fontWeight: 600, color: "var(--accent-soft)" }}>{done}</span> of 10 onboarding tasks completed
      </div>
      <div className="card mb-md">
        <div className="flex-between">
          <span>Onboarding progress</span>
          <span className="mono">{done * 10}%</span>
        </div>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${done * 10}%` }} />
        </div>
      </div>
      {STEPS.map((s, i) => (
        <div
          key={i}
          className={`onboard-step ${s.done ? "done" : ""}${open[i] ? " open" : ""}`}
          onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
        >
          <div className={`onboard-step-head ${s.done ? "done" : ""}`}>
            <input type="checkbox" defaultChecked={s.done} onClick={(e) => e.stopPropagation()} />
            <span className="step-title">{s.title}</span>
            {s.done && <span className="pill pill-green">Done</span>}
          </div>
          <div className="onboard-step-body">{s.body}</div>
        </div>
      ))}
    </>
  );
}
