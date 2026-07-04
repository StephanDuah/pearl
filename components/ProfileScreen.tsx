"use client";

import { useApp } from "@/lib/AppContext";
import { HISTORY } from "@/lib/data";

export default function ProfileScreen() {
  const { currentUser, currentJobId, showScreen } = useApp();
  if (!currentUser) return null;

  const history = HISTORY[currentUser.id] ?? [];

  return (
    <div className="flex min-h-dvh flex-col bg-off-white">
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-navy px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
        <button
          onClick={() => showScreen(currentJobId ? "checklist" : "home")}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy-light text-lg text-gold"
        >
          ‹
        </button>
        <div className="font-serif-display flex-1 text-lg font-bold text-white">
          My Profile
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[max(20px,env(safe-area-inset-bottom))]">
        <div className="bg-navy px-5 pb-7 text-center">
          <div className="font-serif-display mx-auto mb-3.5 mt-5 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-gold-light bg-gold text-3xl font-bold text-navy">
            {currentUser.initials}
          </div>
          <div className="font-serif-display text-xl font-bold text-white">
            {currentUser.name}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.1em] text-gold">
            {currentUser.role}
          </div>

          <div className="mt-5 flex justify-center gap-2.5">
            <div className="flex-1 rounded-sm border border-border bg-navy-light px-4 py-3 text-center">
              <div className="text-[22px] font-bold text-gold">
                {currentUser.completed}
              </div>
              <div className="mt-0.5 text-[11px] text-muted">Jobs Done</div>
            </div>
            <div className="flex-1 rounded-sm border border-border bg-navy-light px-4 py-3 text-center">
              <div className="text-[22px] font-bold text-gold">
                {currentUser.pending}
              </div>
              <div className="mt-0.5 text-[11px] text-muted">Pending</div>
            </div>
            <div className="flex-1 rounded-sm border border-border bg-navy-light px-4 py-3 text-center">
              <div className="text-[22px] font-bold text-gold">
                {currentUser.rate}
              </div>
              <div className="mt-0.5 text-[11px] text-muted">Completion</div>
            </div>
          </div>
        </div>

        <div className="px-5 pb-1 pt-4">
          <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
            Details
          </div>
          <div className="overflow-hidden rounded bg-white shadow-[0_1px_4px_rgba(13,27,42,0.06)]">
            <InfoRow icon="📱" label="Phone" value={currentUser.phone} />
            <InfoRow icon="📧" label="Email" value={currentUser.email} />
            <InfoRow icon="📍" label="Zone" value={currentUser.zone} />
            <InfoRow icon="🕒" label="Member Since" value={currentUser.since} last />
          </div>
        </div>

        <div className="px-5 pb-2.5 pt-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
            Job History
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 pb-[100px]">
          {history.length === 0 ? (
            <div className="px-8 py-16 text-center">
              <div className="mb-4 text-5xl">📂</div>
              <div className="text-[17px] font-semibold text-navy">
                No history yet
              </div>
            </div>
          ) : (
            history.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-sm bg-white px-3.5 py-3 shadow-[0_1px_4px_rgba(13,27,42,0.05)]"
              >
                <div
                  className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                    h.done ? "bg-green" : "bg-gold"
                  }`}
                />
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-navy">
                    {h.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted">{h.date}</div>
                </div>
                <div className="text-[13px] font-bold text-navy">{h.pct}%</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  last,
}: {
  icon: string;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 ${
        last ? "" : "border-b border-off-white"
      }`}
    >
      <div className="w-6 flex-shrink-0 text-center text-base">{icon}</div>
      <div className="flex-1">
        <div className="text-[11px] text-muted">{label}</div>
        <div className="mt-0.5 text-sm font-medium text-navy">{value}</div>
      </div>
    </div>
  );
}
