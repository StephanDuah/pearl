"use client";

import { useApp } from "@/lib/AppContext";
import { JOBS } from "@/lib/data";
import { Job } from "@/lib/types";

function JobCard({ job }: { job: Job }) {
  const { getJobProgress, openChecklist } = useApp();
  const { done, total } = getJobProgress(job.id);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const isComplete = pct === 100;

  const badgeClass = isComplete
    ? "bg-[#F0F0F0] text-[#888]"
    : job.type === "deep"
    ? "bg-[#EDE8F7] text-[#5B3DC4]"
    : "bg-green-light text-green";

  return (
    <div
      onClick={() => openChecklist(job.id)}
      className="cursor-pointer rounded border-[1.5px] border-transparent bg-white p-4 shadow-[0_2px_10px_rgba(13,27,42,0.07)] transition-shadow active:border-gold active:shadow-card"
    >
      <div className="mb-2.5 flex items-start justify-between">
        <div>
          <div className="text-[15px] font-semibold text-navy">{job.name}</div>
          <div className="mt-0.5 text-xs text-muted">📍 {job.address}</div>
        </div>
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${badgeClass}`}
        >
          {isComplete ? "Done" : job.type === "deep" ? "Deep Clean" : "Standard"}
        </span>
      </div>

      <div className="mt-1">
        <div className="mb-1 h-[5px] overflow-hidden rounded-full bg-off-white">
          <div
            className="h-full rounded-full bg-gold transition-[width]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-[11px] text-muted">
          {done} of {total} tasks done · {pct}%
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-off-white pt-2.5">
        <div className="text-xs text-muted">🗓 {job.date}</div>
        <div className="text-xs font-medium text-navy">👤 {job.cleaner}</div>
      </div>
    </div>
  );
}

export default function HomeScreen() {
  const { currentUser, logout, showScreen } = useApp();
  if (!currentUser) return null;

  const isManager = currentUser.role === "Manager";
  const myJobs = currentUser.jobs.map((id) => JOBS[id]).filter(Boolean);

  return (
    <div className="min-h-dvh bg-off-white">
      <div className="bg-navy px-5 pb-7 pt-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="font-serif-display text-[22px] font-bold text-white">
            Merry <span className="text-gold">Tasker</span>
          </div>
          <button
            onClick={logout}
            className="rounded-full border border-border bg-navy-light px-3.5 py-1.5 text-xs text-muted"
          >
            Sign out
          </button>
        </div>

        <div
          onClick={() => showScreen("profile")}
          className="flex cursor-pointer items-center gap-3.5 rounded border border-border bg-navy-light px-4 py-3.5 transition-colors active:border-gold"
        >
          <div className="font-serif-display flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold text-xl font-bold text-navy">
            {currentUser.initials}
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-white">
              {currentUser.name}
            </div>
            <div className="mt-0.5 text-xs uppercase tracking-wide text-gold">
              {currentUser.role}
            </div>
          </div>
          <div className="text-base text-muted">›</div>
        </div>
      </div>

      <div className="px-5 pb-2.5 pt-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
        {isManager ? "All Active Jobs" : "Today's Assigned Jobs"}
      </div>

      <div className="flex flex-col gap-2.5 px-4 pb-4">
        {myJobs.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <div className="mb-4 text-5xl">🎉</div>
            <div className="mb-1.5 text-[17px] font-semibold text-navy">
              All caught up!
            </div>
            <div className="text-[13px] text-muted">
              No jobs assigned for today.
            </div>
          </div>
        ) : (
          myJobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}
