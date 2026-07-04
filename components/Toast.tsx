"use client";

import { useApp } from "@/lib/AppContext";

export default function Toast() {
  const { toastMessage } = useApp();

  return (
    <div
      className={`fixed bottom-[90px] left-1/2 z-[300] -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-5 py-3 text-[13px] font-medium text-white transition-all duration-300 ${
        toastMessage
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      {toastMessage}
    </div>
  );
}
