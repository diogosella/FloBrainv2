"use client";

import { useApp } from "../state/AppContext";
import { Icon } from "../ui/Icon";

export function LoginPage() {
  const { loginAs } = useApp();
  return (
    <div
      id="loginPage"
      style={{
        position: "fixed",
        inset: 0,
        background: "#08080C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
      }}
    >
      <div className="fb-login">
        <div className="fb-login-logo">
          <div className="fb-login-mark">F</div>
          <span className="fb-login-wordmark">FloBrain</span>
          <span className="fb-login-v2">V2</span>
        </div>
        <p className="fb-login-tag">Your AI operating system</p>

        <div className="fb-login-label">Sign in as</div>
        <div className="fb-login-users">
          <div className="fb-user-row" onClick={() => loginAs("diogo")}>
            <div className="fb-user-av" style={{ background: "linear-gradient(140deg,#8B6BFF,#6B4CF0)" }}>
              DS
            </div>
            <div className="fb-user-info">
              <div className="fb-user-name">Diogo Sela</div>
              <div className="fb-user-role">Design intern · Personal space</div>
            </div>
            <span className="fb-user-badge" style={{ color: "#A78BFF", background: "rgba(124,92,255,.15)" }}>
              INTERN
            </span>
          </div>
          <div className="fb-user-row" onClick={() => loginAs("sandeep")}>
            <div className="fb-user-av" style={{ background: "linear-gradient(135deg,#3DB8A8,#6B7FD7)" }}>
              SC
            </div>
            <div className="fb-user-info">
              <div className="fb-user-name">Sandeep</div>
              <div className="fb-user-role">COO · Mission control</div>
            </div>
            <span className="fb-user-badge" style={{ color: "#3DB8A8", background: "rgba(61,184,168,.15)" }}>
              EXEC
            </span>
          </div>
        </div>

        <div className="fb-login-or">or sign in with email</div>
        <input className="fb-login-input" type="email" placeholder="Email address" defaultValue="diogo@flolabs.com" />
        <input className="fb-login-input" type="password" placeholder="Password" defaultValue="••••••••" />
        <button className="fb-login-btn" onClick={() => loginAs("diogo")}>
          Sign in →
        </button>

        <div className="fb-login-privacy">
          <div className="fb-privacy-row">
            <span className="fb-privacy-icon">
              <Icon name="lock" size={13} strokeWidth={2} />
            </span>
            <span>
              <strong>Zero data storage</strong> — Your data never leaves your device
            </span>
          </div>
          <div className="fb-privacy-row">
            <span className="fb-privacy-icon">
              <Icon name="shield" size={13} strokeWidth={2} />
            </span>
            <span>
              <strong>AI stays scoped</strong> — Each buddy only sees its own context
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
