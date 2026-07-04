"use client";

import { useApp } from "@/lib/AppContext";

interface ModalData {
  pct: number;
  done: number;
  total: number;
  jobName: string;
}

export default function CompleteModal({
  data,
  onClose,
}: {
  data: ModalData | null;
  onClose: () => void;
}) {
  const { showScreen } = useApp();
  if (!data) return null;

  const isComplete = data.pct === 100;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-navy/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] rounded-t-3xl bg-white px-6 py-7 text-center"
      >
        <div className="mb-3 text-5xl">{isComplete ? "🎉" : "📋"}</div>
        <div className="font-serif-display mb-2 text-xl font-bold text-navy">
          {isComplete ? "Job Complete!" : `${data.pct}% Complete`}
        </div>
        <div className="mb-6 text-sm leading-relaxed text-muted">
          {isComplete
            ? `All ${data.total} tasks for ${data.jobName} have been signed off. Brilliant work!`
            : `${data.done} of ${data.total} tasks are done for ${data.jobName}. You can continue and submit when all tasks are finished.`}
        </div>
        <button
          onClick={() => {
            onClose();
            showScreen("home");
          }}
          className="mb-2.5 w-full rounded-sm bg-navy py-3.5 text-[15px] font-bold text-white"
        >
          Back to Jobs
        </button>
        <button
          onClick={onClose}
          className="w-full rounded-sm bg-off-white py-3.5 text-[15px] font-bold text-navy"
        >
          Stay on Checklist
        </button>
      </div>
    </div>
  );
}
