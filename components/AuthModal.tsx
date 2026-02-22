"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  onClose: () => void;
}

type Tab = "signin" | "signup";

export default function AuthModal({ onClose }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<Tab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  }, []);

  const switchTab = useCallback(
    (t: Tab) => {
      setTab(t);
      resetForm();
    },
    [resetForm]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (tab === "signup") {
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setSubmitting(true);

    if (tab === "signin") {
      const { error: authError } = await signIn(email, password);
      setSubmitting(false);
      if (authError) {
        setError(authError.message);
      } else {
        onClose();
      }
    } else {
      const { error: authError } = await signUp(email, password);
      setSubmitting(false);
      if (authError) {
        setError(authError.message);
      } else {
        setSuccess("Account created! Check your email to confirm, then sign in.");
      }
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Sign in or create account"
    >
      <div
        ref={dialogRef}
        className="relative max-w-sm w-full overflow-hidden animate-modal-enter rounded-lg"
        style={{
          border: "4px solid var(--gold)",
          boxShadow: "0 0 0 2px var(--gold-dark), 0 12px 40px rgba(0,0,0,0.6)",
          background: "#1A1714",
        }}
      >
        {/* Header */}
        <div
          className="halftone-overlay halftone-light px-6 py-4 text-white"
          style={{
            background: "linear-gradient(135deg, var(--album-green-500) 0%, var(--album-green-700) 100%)",
          }}
        >
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl leading-none
                       w-8 h-8 flex items-center justify-center rounded transition hover:bg-white/20 z-10"
            aria-label="Close modal"
          >
            &times;
          </button>
          <h2
            className="text-xl leading-tight"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              textTransform: "uppercase",
              textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
            }}
          >
            {tab === "signin" ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-sm opacity-80 mt-0.5 font-bold">
            {tab === "signin"
              ? "Save your collection to the cloud"
              : "Start tracking your 92"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => switchTab("signin")}
            className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              color: tab === "signin" ? "var(--gold-light)" : "rgba(255,255,255,0.4)",
              borderBottom: tab === "signin" ? "2px solid var(--gold)" : "2px solid transparent",
              background: tab === "signin" ? "rgba(255,255,255,0.03)" : "transparent",
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => switchTab("signup")}
            className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              color: tab === "signup" ? "var(--gold-light)" : "rgba(255,255,255,0.4)",
              borderBottom: tab === "signup" ? "2px solid var(--gold)" : "2px solid transparent",
              background: tab === "signup" ? "rgba(255,255,255,0.03)" : "transparent",
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label htmlFor="auth-email" className="fixture-form-label">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="fixture-form-input"
              placeholder="you@example.com"
              autoComplete="email"
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="auth-password" className="fixture-form-label">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="fixture-form-input"
              placeholder="••••••••"
              autoComplete={tab === "signin" ? "current-password" : "new-password"}
              disabled={submitting}
            />
          </div>

          {tab === "signup" && (
            <div>
              <label htmlFor="auth-confirm-password" className="fixture-form-label">
                Confirm Password
              </label>
              <input
                id="auth-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="fixture-form-input"
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={submitting}
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {success && (
            <p className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-md px-3 py-2">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="premium-button shine-sweep w-full text-center"
            style={{
              background: submitting
                ? "rgba(255,255,255,0.1)"
                : "linear-gradient(150deg, var(--foil-gold-3) 0%, var(--foil-gold-1) 38%, var(--foil-gold-2) 50%, var(--foil-gold-1) 64%, var(--foil-gold-3) 100%)",
              color: submitting ? "rgba(255,255,255,0.4)" : "#1b150c",
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting
              ? "Loading..."
              : tab === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
