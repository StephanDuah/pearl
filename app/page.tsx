"use client";

import { useCallback, useState } from "react";
import { AppProvider, useApp } from "@/lib/AppContext";
import { usePWAInstall } from "@/lib/usePWAInstall";
import { JOBS } from "@/lib/data";
import LoginScreen from "@/components/LoginScreen";
import HomeScreen from "@/components/HomeScreen";
import ChecklistScreen from "@/components/ChecklistScreen";
import ProfileScreen from "@/components/ProfileScreen";
import CompleteModal from "@/components/CompleteModal";
import Toast from "@/components/Toast";

interface ModalData {
  pct: number;
  done: number;
  total: number;
  jobName: string;
}

function AppShell() {
  const { screen, currentJobId, showToast } = useApp();
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const handleInstalled = useCallback(
    (msg: string) => showToast(msg),
    [showToast]
  );
  const { canInstall, promptInstall } = usePWAInstall(handleInstalled);

  const openModal = (pct: number, done: number, total: number) => {
    const job = currentJobId ? JOBS[currentJobId] : null;
    setModalData({ pct, done, total, jobName: job?.name ?? "this job" });
  };

  return (
    <>
      {screen === "login" && (
        <LoginScreen canInstall={canInstall} onInstall={promptInstall} />
      )}
      {screen === "home" && <HomeScreen />}
      {screen === "checklist" && <ChecklistScreen onOpenModal={openModal} />}
      {screen === "profile" && <ProfileScreen />}

      <CompleteModal data={modalData} onClose={() => setModalData(null)} />
      <Toast />
    </>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
