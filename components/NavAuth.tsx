"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function NavAuth() {
  const { user, loading, signOut, deleteAccount } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) {
      setConfirmDelete(false);
      setDeleteError("");
      return;
    }
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  if (loading) {
    return (
      <div className="w-[70px] h-[30px] rounded-md animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
    );
  }

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="grey-button shine-sweep cursor-pointer"
          style={{ minHeight: "2rem", padding: "0 0.85rem", fontSize: "0.7rem" }}
        >
          Sign In
        </button>
        {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      </>
    );
  }

  const displayName = user.email?.split("@")[0] ?? "Account";

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer group"
        aria-expanded={showMenu}
        aria-label="Account menu"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold uppercase"
          style={{
            background: "linear-gradient(135deg, var(--album-green-500), var(--album-green-700))",
            border: "2px solid var(--gold-dark)",
            color: "var(--gold-light)",
          }}
        >
          {displayName[0]}
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider hidden lg:inline group-hover:text-[var(--gold-light)] transition-colors"
          style={{ color: "#C0B090" }}
        >
          {displayName}
        </span>
      </button>

      {showMenu && (
        <div className="mobile-menu-dropdown" style={{ minWidth: "180px" }}>
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Signed in as</p>
            <p className="text-xs text-white/80 mt-0.5 truncate">{user.email}</p>
          </div>
          <Link
            href="/leagues"
            onClick={() => setShowMenu(false)}
            className="mobile-menu-link cursor-pointer"
          >
            My Leagues
          </Link>
          <div className="border-t border-white/10" />
          <button
            onClick={() => {
              signOut();
              setShowMenu(false);
            }}
            className="mobile-menu-link w-full text-left cursor-pointer"
          >
            Sign Out
          </button>
          <div className="border-t border-white/10">
            {!confirmDelete ? (
              <button
                onClick={() => {
                  setConfirmDelete(true);
                  setDeleteError("");
                }}
                className="mobile-menu-link w-full text-left cursor-pointer"
                style={{ color: "rgba(255,100,100,0.7)", fontSize: "0.7rem" }}
              >
                Delete Account
              </button>
            ) : (
              <div className="px-4 py-3 space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#E88" }}>
                  Are you sure?
                </p>
                <p className="text-[11px] text-white/50 leading-snug">
                  This will permanently delete your account and all saved progress.
                </p>
                {deleteError && (
                  <p className="text-[11px] text-red-400">{deleteError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      setDeleting(true);
                      setDeleteError("");
                      const { error } = await deleteAccount();
                      if (error) {
                        setDeleteError(error);
                        setDeleting(false);
                      } else {
                        setShowMenu(false);
                        setConfirmDelete(false);
                        setDeleting(false);
                      }
                    }}
                    disabled={deleting}
                    className="flex-1 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                    style={{
                      background: deleting ? "rgba(255,100,100,0.15)" : "rgba(255,100,100,0.2)",
                      color: deleting ? "rgba(255,100,100,0.5)" : "#E88",
                      border: "1px solid rgba(255,100,100,0.25)",
                    }}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() => {
                      setConfirmDelete(false);
                      setDeleteError("");
                    }}
                    disabled={deleting}
                    className="flex-1 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
