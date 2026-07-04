"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PROFILES, JOBS, tasksForJob } from "./data";
import { Profile, ProfileId, Screen, TaskState } from "./types";

const STORAGE_KEY = "merryTasker_state";

interface AppContextValue {
  currentUser: Profile | null;
  currentJobId: string | null;
  screen: Screen;
  taskState: TaskState;
  login: (profileId: ProfileId) => void;
  logout: () => void;
  showScreen: (screen: Screen) => void;
  openChecklist: (jobId: string) => void;
  toggleTask: (jobId: string, room: string, idx: number) => void;
  getJobProgress: (jobId: string) => { done: number; total: number };
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen>("login");
  const [taskState, setTaskState] = useState<TaskState>({});
  const [hydrated, setHydrated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // Load persisted checklist progress on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTaskState(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(taskState));
    } catch {
      // ignore quota errors
    }
  }, [taskState, hydrated]);

  const login = useCallback((profileId: ProfileId) => {
    setCurrentUser(PROFILES[profileId]);
    setScreen("home");
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentJobId(null);
    setScreen("login");
  }, []);

  const showScreen = useCallback((s: Screen) => setScreen(s), []);

  const openChecklist = useCallback(
    (jobId: string) => {
      const job = JOBS[jobId];
      if (!job) return;
      const template = tasksForJob(job);

      setTaskState((prev) => {
        if (prev[jobId]) return prev;
        const initial: Record<string, boolean[]> = {};
        Object.entries(template).forEach(([room, items]) => {
          initial[room] = items.map(() => false);
        });
        return { ...prev, [jobId]: initial };
      });

      setCurrentJobId(jobId);
      setScreen("checklist");
    },
    []
  );

  const toggleTask = useCallback(
    (jobId: string, room: string, idx: number) => {
      setTaskState((prev) => {
        const jobState = prev[jobId] ?? {};
        const roomState = [...(jobState[room] ?? [])];
        roomState[idx] = !roomState[idx];
        return {
          ...prev,
          [jobId]: { ...jobState, [room]: roomState },
        };
      });
    },
    []
  );

  const getJobProgress = useCallback(
    (jobId: string) => {
      const job = JOBS[jobId];
      if (!job) return { done: 0, total: 0 };
      const template = tasksForJob(job);
      let done = 0;
      let total = 0;
      Object.entries(template).forEach(([room, items]) => {
        total += items.length;
        const states = taskState[jobId]?.[room];
        if (states) done += states.filter(Boolean).length;
      });
      return { done, total };
    },
    [taskState]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      currentUser,
      currentJobId,
      screen,
      taskState,
      login,
      logout,
      showScreen,
      openChecklist,
      toggleTask,
      getJobProgress,
      toastMessage,
      showToast,
    }),
    [
      currentUser,
      currentJobId,
      screen,
      taskState,
      login,
      logout,
      showScreen,
      openChecklist,
      toggleTask,
      getJobProgress,
      toastMessage,
      showToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
