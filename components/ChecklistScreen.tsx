"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/AppContext";
import { JOBS, tasksForJob } from "@/lib/data";

function RoomSection({
  room,
  items,
  jobId,
}: {
  room: string;
  items: string[];
  jobId: string;
}) {
  const { taskState, toggleTask } = useApp();
  const [open, setOpen] = useState(true);
  const states = taskState[jobId]?.[room] ?? items.map(() => false);
  const doneCount = states.filter(Boolean).length;

  const [icon, ...titleParts] = room.split(" ");
  const title = titleParts.join(" ");

  return (
    <div className="mb-1.5">
      <div
        onClick={() => setOpen((o) => !o)}
        className={`flex cursor-pointer items-center justify-between bg-white px-4 py-3.5 shadow-[0_1px_4px_rgba(13,27,42,0.06)] ${
          open ? "rounded-t" : "rounded"
        }`}
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-navy">
          <span className="text-lg">{icon}</span>
          {title}
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-muted">
            {doneCount}/{items.length}
          </span>
          <span
            className={`text-xs text-muted transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
      </div>

      {open && (
        <div className="overflow-hidden rounded-b bg-white">
          {items.map((label, idx) => {
            const done = states[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleTask(jobId, room, idx)}
                className="flex cursor-pointer items-center gap-3.5 border-t border-off-white px-4 py-3.5 transition-colors active:bg-off-white"
              >
                <div
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 text-sm ${
                    done
                      ? "border-green bg-green text-white"
                      : "border-[#D0D6DE] bg-white"
                  }`}
                >
                  {done ? "✓" : ""}
                </div>
                <div
                  className={`flex-1 text-sm leading-snug ${
                    done ? "text-muted line-through" : "text-navy"
                  }`}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ChecklistScreen({
  onOpenModal,
}: {
  onOpenModal: (pct: number, done: number, total: number) => void;
}) {
  const { currentJobId, showScreen, getJobProgress } = useApp();
  const job = currentJobId ? JOBS[currentJobId] : null;
  const template = useMemo(() => (job ? tasksForJob(job) : {}), [job]);

  if (!job || !currentJobId) return null;

  const { done, total } = getJobProgress(currentJobId);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="flex min-h-dvh flex-col bg-off-white">
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-navy px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
        <button
          onClick={() => showScreen("home")}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy-light text-lg text-gold"
        >
          ‹
        </button>
        <div className="font-serif-display flex-1 text-lg font-bold text-white">
          Task Checklist
        </div>
        <button
          onClick={() => showScreen("profile")}
          className="p-1 text-[22px] text-gold"
        >
          👤
        </button>
      </div>

      <div className="bg-navy px-5 pb-5">
        <div className="pt-3.5">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gold">
            {job.type === "deep" ? "✨ Deep Clean" : "🧹 Standard Clean"}
          </div>
          <div className="font-serif-display text-xl font-bold text-white">
            {job.name}
          </div>
          <div className="mt-1 text-[13px] text-muted">{job.address}</div>

          <div className="mt-3.5 flex gap-4">
            <div className="rounded-full border border-border bg-navy-light px-3.5 py-1.5 text-xs text-white">
              🗓 {job.date}
            </div>
            <div className="rounded-full border border-border bg-navy-light px-3.5 py-1.5 text-xs text-white">
              👤 {job.cleaner}
            </div>
            <div className="rounded-full border border-border bg-navy-light px-3.5 py-1.5 text-xs text-white">
              ✅ <strong className="text-gold">{done}</strong>/{total}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pb-[100px] pt-3">
        {Object.entries(template).map(([room, items]) => (
          <RoomSection key={room} room={room} items={items} jobId={currentJobId} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-off-white bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 shadow-[0_-4px_20px_rgba(13,27,42,0.10)]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs text-muted">{done} of {total} tasks completed</span>
          <span className="text-sm font-bold text-navy">{pct}%</span>
        </div>
        <div className="mb-2.5 h-[5px] overflow-hidden rounded-full bg-off-white">
          <div
            className="h-full rounded-full bg-gold transition-[width]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <button
          onClick={() => onOpenModal(pct, done, total)}
          className={`flex w-full items-center justify-center gap-2 rounded-sm py-[15px] text-[15px] font-bold text-white transition-opacity active:opacity-85 ${
            pct === 100 ? "bg-green" : "bg-navy"
          }`}
        >
          {pct === 100 ? "🎉 All Done — Submit" : `Mark Job Complete (${pct}%)`}
        </button>
      </div>
    </div>
  );
}
