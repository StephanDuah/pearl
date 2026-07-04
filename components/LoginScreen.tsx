"use client";

import { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { ProfileId } from "@/lib/types";

export default function LoginScreen({
  canInstall,
  onInstall,
}: {
  canInstall: boolean;
  onInstall: () => void;
}) {
  const { login, showToast } = useApp();
  const [selected, setSelected] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = () => {
    if (!selected) {
      showToast("Please select your profile");
      return;
    }
    if (pin.length < 4) {
      showToast("Enter a 4-digit PIN to continue");
      return;
    }
    login(selected as ProfileId);
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-navy px-7 py-8">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-gold text-[34px]">
          🧹
        </div>
        <h1 className="font-serif-display text-[30px] font-bold tracking-wide text-white">
          Merry Tasker
        </h1>
        <p className="mt-1 text-[13px] uppercase tracking-[0.08em] text-gold-light">
          by Merry Cleaners
        </p>
      </div>

      {canInstall && (
        <div className="mb-5 flex w-full max-w-[400px] items-center gap-2.5 rounded-sm border border-gold bg-gold-pale px-3.5 py-3 text-[13px] text-navy">
          <span className="flex-1">
            📲 Install this app on your phone for quick access
          </span>
          <button
            onClick={onInstall}
            className="whitespace-nowrap rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-gold"
          >
            Install
          </button>
        </div>
      )}

      <div className="w-full max-w-[400px] rounded border border-border bg-navy-light px-6 py-7">
        <h2 className="mb-5 text-base font-semibold text-white">
          Sign in to your account
        </h2>

        <div className="mb-4">
          <label className="mb-1.5 block text-xs uppercase tracking-[0.06em] text-muted">
            Select Profile
          </label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full appearance-none rounded-sm border border-border bg-navy px-3.5 py-3 text-[15px] text-white outline-none focus:border-gold"
          >
            <option value="">— Choose cleaner or manager —</option>
            <option value="sophie">Sophie Clarke · Cleaner</option>
            <option value="james">James Osei · Cleaner</option>
            <option value="amara">Amara Nwosu · Cleaner</option>
            <option value="manager">Rachel Davies · Manager</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-xs uppercase tracking-[0.06em] text-muted">
            PIN
          </label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN (any 4 digits)"
            maxLength={4}
            inputMode="numeric"
            className="w-full rounded-sm border border-border bg-navy px-3.5 py-3 text-[15px] text-white outline-none focus:border-gold"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full rounded-sm bg-gold py-3.5 text-[15px] font-bold tracking-wide text-navy active:bg-gold-light"
        >
          Sign In →
        </button>
      </div>
    </div>
  );
}
